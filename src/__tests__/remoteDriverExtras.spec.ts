import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { RemoteDriver } from '../adapters/RemoteDriver';

/**
 * Verifies that plugin-contributed `extras` are forwarded by RemoteDriver as
 * extra fields on each operation's request body, and that they can never
 * clobber the operation's core fields.
 */
describe('RemoteDriver extras forwarding', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let driver: RemoteDriver;

  const okJson = () =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ files: [], storages: [], read_only: false, dirname: '' }),
      text: () => Promise.resolve(''),
    } as unknown as Response);

  const lastBody = () => JSON.parse(fetchMock.mock.calls.at(-1)![1].body);

  beforeEach(() => {
    fetchMock = vi.fn(okJson);
    vi.stubGlobal('fetch', fetchMock);
    driver = new RemoteDriver({ baseURL: 'https://api.test' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('forwards extras keys on delete', async () => {
    await driver.delete({
      path: 'local://',
      items: [{ path: 'local://a.txt', type: 'file' }],
      extras: { reason: 'cleanup', force: true },
    });
    const body = lastBody();
    expect(body.reason).toBe('cleanup');
    expect(body.force).toBe(true);
    expect(body.path).toBe('local://');
  });

  it('forwards extras on archive (e.g. compression level)', async () => {
    await driver.archive({
      path: 'local://',
      items: [{ path: 'local://a.txt', type: 'file' }],
      name: 'out.zip',
      extras: { compressionLevel: 9 },
    });
    expect(lastBody().compressionLevel).toBe(9);
  });

  it('forwards extras on createFile', async () => {
    await driver.createFile({ path: 'local://', name: 'note.txt', extras: { template: 'md' } });
    const body = lastBody();
    expect(body.template).toBe('md');
    expect(body.name).toBe('note.txt');
  });

  it('never lets extras overwrite a core field', async () => {
    await driver.createFile({
      path: 'local://real',
      name: 'real.txt',
      extras: { path: 'local://spoofed', name: 'spoofed.txt' },
    });
    const body = lastBody();
    expect(body.path).toBe('local://real');
    expect(body.name).toBe('real.txt');
  });

  it('omits nothing when extras is undefined', async () => {
    await driver.createFolder({ path: 'local://', name: 'docs' });
    const body = lastBody();
    expect(body).toEqual({ path: 'local://', name: 'docs' });
  });
});
