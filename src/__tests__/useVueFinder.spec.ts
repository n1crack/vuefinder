import { beforeEach, describe, expect, it, vi } from 'vitest';
import { atom } from 'nanostores';
import { useVueFinder } from '../composables/useVueFinder';
import { registerApp, unregisterApp } from '../composables/useApp';
import type { App, DirEntry } from '../types';

function file(path: string, type: 'file' | 'dir' = 'file'): DirEntry {
  const [storage, rawPath] = path.split('://');
  const parts = (rawPath || '').split('/').filter(Boolean);
  const basename = parts[parts.length - 1] || storage || 'item';
  const dirPath = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  return {
    storage: storage || 'local',
    dir: `${storage}://${dirPath}`,
    basename,
    extension: type === 'file' ? (basename.split('.').pop() || '') : '',
    path,
    type,
    file_size: type === 'file' ? 1 : null,
    last_modified: Date.now(),
    mime_type: type === 'file' ? 'text/plain' : null,
    visibility: 'public',
  };
}

function createMockApp() {
  const files = [file('local://docs/a.txt'), file('local://docs/b.txt'), file('local://docs/folder', 'dir')];
  const selectedItems: DirEntry[] = [];
  const selectionSet = new Set<string>();

  const fs = {
    path: atom({ storage: 'local', breadcrumb: [], path: 'local://docs' }),
    files: { get: vi.fn(() => files) },
    storages: { get: vi.fn(() => ['local']) },
    selectedItems: { get: vi.fn(() => selectedItems) },
    setSelection: vi.fn((paths: string[]) => {
      selectionSet.clear();
      paths.forEach((p) => selectionSet.add(p));
      selectedItems.length = 0;
      files.forEach((f) => {
        if (selectionSet.has(f.path)) selectedItems.push(f);
      });
    }),
    clearSelection: vi.fn(() => {
      selectionSet.clear();
      selectedItems.length = 0;
    }),
    setFiles: vi.fn(),
    isLoading: vi.fn(() => false),
    getReadOnly: vi.fn(() => false),
  };

  const adapter = {
    invalidateListQuery: vi.fn(),
    open: vi.fn(async () => undefined),
    createFolder: vi.fn(async () => ({ files: [file('local://docs/new-folder', 'dir')] })),
    createFile: vi.fn(async () => ({ files: [file('local://docs/new-file.txt')] })),
    delete: vi.fn(async () => ({ files: [file('local://docs/b.txt')], deleted: [file('local://docs/a.txt')] })),
    rename: vi.fn(async () => ({ files: [file('local://docs/renamed.txt')] })),
    copy: vi.fn(async () => ({ files: [file('local://docs/copy.txt')] })),
    move: vi.fn(async () => ({ files: [file('local://docs/moved.txt')] })),
  };

  return { fs, adapter } as unknown as App;
}

describe('useVueFinder', () => {
  const id = 'vf-test-composable';

  beforeEach(() => {
    unregisterApp(id);
  });

  it('throws when app instance is not registered', () => {
    expect(() => useVueFinder(id)).toThrow();
  });

  it('refresh invalidates and opens current path', async () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    await finder.refresh();

    expect(app.adapter.invalidateListQuery).toHaveBeenCalledWith('local://docs');
    expect(app.adapter.open).toHaveBeenCalledWith('local://docs');
  });

  it('select filters to current directory loaded items', () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    finder.select(['local://docs/a.txt', 'local://missing.txt']);

    expect(app.fs.setSelection).toHaveBeenCalledWith(['local://docs/a.txt']);
  });

  it('createFolder and createFile sync files', async () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    await finder.createFolder('new-folder');
    await finder.createFile('new-file.txt');

    expect(app.adapter.createFolder).toHaveBeenCalled();
    expect(app.adapter.createFile).toHaveBeenCalled();
    expect(app.fs.setFiles).toHaveBeenCalledTimes(2);
  });

  it('rename/delete/copy/move call adapter and sync files', async () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    await finder.rename('local://docs/a.txt', 'renamed.txt');
    await finder.delete(['local://docs/a.txt']);
    await finder.copy(['local://docs/a.txt'], 'local://docs');
    await finder.move(['local://docs/a.txt'], 'local://docs');

    expect(app.adapter.rename).toHaveBeenCalled();
    expect(app.adapter.delete).toHaveBeenCalled();
    expect(app.adapter.copy).toHaveBeenCalled();
    expect(app.adapter.move).toHaveBeenCalled();
    expect(app.fs.setFiles).toHaveBeenCalled();
  });

  it('exposes a reactive path ref that tracks navigation', () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    expect(finder.path.value).toBe('local://docs');

    app.fs.path.set({ storage: 'local', breadcrumb: [], path: 'local://docs/sub' });
    expect(finder.path.value).toBe('local://docs/sub');
  });

  it('readonly getters return snapshots', () => {
    const app = createMockApp();
    registerApp(id, app);
    const finder = useVueFinder(id);

    expect(finder.getPath()).toBe('local://docs');
    expect(finder.getStorages()).toEqual(['local']);
    expect(finder.isLoading()).toBe(false);
    expect(finder.isReadOnly()).toBe(false);
    expect(Array.isArray(finder.getFiles())).toBe(true);
    expect(Array.isArray(finder.getSelectedPaths())).toBe(true);
  });
});
