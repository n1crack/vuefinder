import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Uppy from '@uppy/core';
import uppyLocaleEn from '@uppy/locales/lib/en_US.js';
import { RemoteDriver } from '../adapters/RemoteDriver';

/**
 * Exercises the real @uppy/core + @uppy/xhr-upload packages through the same
 * wiring the upload modal uses, so a breaking change in an uppy major shows up
 * here instead of in the browser.
 *
 * uppy uploads through `@uppy/core/utils/fetcher`, which drives XMLHttpRequest
 * (it needs upload progress events), so the transport is faked at that level.
 */

interface Attempt {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: FormData;
}

interface FakeXhrOptions {
  status?: number;
  responseText?: string;
  /** Emit a network error instead of a response. */
  networkError?: boolean;
  /** Report upload progress before completing. */
  progress?: Array<{ loaded: number; total: number }>;
}

const installFakeXhr = (opts: FakeXhrOptions = {}) => {
  const { status = 200, responseText = '{"status":true}', networkError = false, progress } = opts;
  const attempts: Attempt[] = [];

  class FakeXhr {
    upload: { onprogress?: (e: any) => void } = {};
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    withCredentials = false;
    responseType = '';
    status = 0;
    statusText = '';
    responseText = '';
    response: unknown = null;
    #method = '';
    #url = '';
    #headers: Record<string, string> = {};

    open(method: string, url: string) {
      this.#method = method;
      this.#url = url;
    }

    setRequestHeader(key: string, value: string) {
      this.#headers[key] = value;
    }

    getResponseHeader() {
      return null;
    }

    abort() {}

    send(body: FormData) {
      attempts.push({ method: this.#method, url: this.#url, headers: this.#headers, body });
      queueMicrotask(() => {
        if (networkError) {
          this.statusText = '';
          this.onerror?.();
          return;
        }
        progress?.forEach((p) =>
          this.upload.onprogress?.({ lengthComputable: true, loaded: p.loaded, total: p.total })
        );
        this.status = status;
        this.statusText = status === 200 ? 'OK' : 'Error';
        this.responseText = responseText;
        this.response = responseText;
        this.onload?.();
      });
    }
  }

  vi.stubGlobal('XMLHttpRequest', FakeXhr);
  return attempts;
};

const makeUppy = (onBeforeFileAdded?: (file: any, files: any) => boolean) =>
  new Uppy({
    debug: false,
    restrictions: { maxFileSize: 10 * 1024 * 1024 },
    locale: uppyLocaleEn as any,
    ...(onBeforeFileAdded ? { onBeforeFileAdded } : {}),
  });

const addFile = (uppy: Uppy, name: string, body = 'hello') =>
  uppy.addFile({ name, type: 'text/plain', data: new File([body], name), source: 'Local' });

const wireDriver = (uppy: Uppy, config: Record<string, unknown>, path = 'local://folder') => {
  const driver = new RemoteDriver(config as any);
  driver.configureUploader(uppy, { getTargetPath: () => path });
  return driver;
};

describe('upload integration (uppy core + xhr-upload)', () => {
  let uppy: Uppy;

  beforeEach(() => {
    uppy = makeUppy();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts each file to the driver endpoint with the target path as meta', async () => {
    const attempts = installFakeXhr();
    wireDriver(uppy, { baseURL: 'https://example.test/api' });
    addFile(uppy, 'a.txt');

    const result = await uppy.upload();

    expect(result?.failed).toEqual([]);
    expect(result?.successful).toHaveLength(1);
    expect(attempts).toHaveLength(1);
    expect(attempts[0].url).toBe('https://example.test/api/upload');
    expect(attempts[0].method.toLowerCase()).toBe('post');

    // fieldName: 'file' + the path meta set by the driver's `upload` handler.
    const body = attempts[0].body;
    expect(body).toBeInstanceOf(FormData);
    expect((body.get('file') as File).name).toBe('a.txt');
    expect(body.get('path')).toBe('local://folder');
  });

  it('uploads every queued file, each carrying the target path', async () => {
    const attempts = installFakeXhr();
    wireDriver(uppy, { baseURL: '' }, 'local://sub');
    addFile(uppy, 'a.txt');
    addFile(uppy, 'b.txt');

    const result = await uppy.upload();

    expect(result?.successful).toHaveLength(2);
    expect(attempts).toHaveLength(2);
    expect(attempts.map((a) => (a.body.get('file') as File).name).sort()).toEqual([
      'a.txt',
      'b.txt',
    ]);
    expect(attempts.every((a) => a.body.get('path') === 'local://sub')).toBe(true);
  });

  it('sends auth headers and drops the JSON Content-Type so the boundary survives', async () => {
    const attempts = installFakeXhr();
    wireDriver(uppy, { baseURL: '', token: 'secret-token', headers: { 'X-Custom': '1' } });
    addFile(uppy, 'b.txt');

    await uppy.upload();

    expect(attempts[0].headers['Authorization']).toBe('Bearer secret-token');
    expect(attempts[0].headers['X-Custom']).toBe('1');
    expect(attempts[0].headers['Content-Type']).toBeUndefined();
  });

  it('emits the lifecycle events the upload modal listens to', async () => {
    installFakeXhr({ progress: [{ loaded: 5, total: 5 }] });
    wireDriver(uppy, { baseURL: '' });

    const seen: string[] = [];
    const percents: number[] = [];
    uppy.on('upload-start', () => seen.push('upload-start'));
    uppy.on('upload-progress', (_file, p) => percents.push(p.bytesUploaded));
    uppy.on('upload-success', () => seen.push('upload-success'));
    uppy.on('complete', () => seen.push('complete'));

    addFile(uppy, 'c.txt');
    await uppy.upload();

    expect(seen).toEqual(['upload-start', 'upload-success', 'complete']);
    expect(percents.at(-1)).toBe(5);
  });

  it('reports a failed upload through upload-error instead of throwing', async () => {
    installFakeXhr({ networkError: true });
    wireDriver(uppy, { baseURL: '' });

    const errors: any[] = [];
    uppy.on('upload-error', (_file, error) => errors.push(error));

    addFile(uppy, 'd.txt');
    const result = await uppy.upload();

    expect(result?.successful).toEqual([]);
    expect(result?.failed).toHaveLength(1);
    expect(errors).toHaveLength(1);
    // The modal branches on this flag to show a friendlier message.
    expect(errors[0].isNetworkError).toBe(true);
  });

  it('enforces maxFileSize via restriction-failed rather than uploading', async () => {
    const attempts = installFakeXhr();
    wireDriver(uppy, { baseURL: '' });

    const failures: string[] = [];
    uppy.on('restriction-failed', (_file, error) => failures.push(error.message));

    expect(() => addFile(uppy, 'big.txt', 'x'.repeat(11 * 1024 * 1024))).toThrow();
    expect(failures).toHaveLength(1);
    expect(uppy.getFiles()).toHaveLength(0);
    expect(attempts).toHaveLength(0);
  });

  it('runs onBeforeFileAdded and returns the new id from addFile', () => {
    const seen: string[] = [];
    const gated = makeUppy((file: any) => {
      seen.push(file.name);
      return true;
    });

    const id = addFile(gated, 'e.txt');

    expect(seen).toEqual(['e.txt']);
    expect(typeof id).toBe('string');
    expect(gated.getFile(id)?.name).toBe('e.txt');
  });

  it('supports the remove / cancel / re-add cycle the queue UI relies on', () => {
    wireDriver(uppy, { baseURL: '' });

    const id = addFile(uppy, 'f.txt');
    expect(uppy.getFiles()).toHaveLength(1);

    uppy.removeFile(id);
    expect(uppy.getFiles()).toHaveLength(0);

    const readded = addFile(uppy, 'sub/f.txt');
    expect(uppy.getFile(readded)?.name).toBe('sub/f.txt');

    uppy.cancelAll();
    expect(uppy.getFiles()).toHaveLength(0);
  });

  it('exposes translations through uppy.i18n for the duplicate-file message', () => {
    expect(uppy.i18n('noDuplicates', { fileName: 'a.txt' })).toContain('a.txt');
  });
});
