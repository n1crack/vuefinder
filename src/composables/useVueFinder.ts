import { useApp } from './useApp';
import type { DirEntry, VueFinderComposable } from '../types';
import { notify as emitNotify } from '../utils/notify';

export function useVueFinder(id: string): VueFinderComposable {
  const app = useApp(id);

  const resolvePath = (path?: string): string => {
    return path || app.fs.path.get().path || '';
  };

  const syncFilesFromResult = (result: { files?: DirEntry[] }) => {
    if (Array.isArray(result.files)) {
      app.fs.setFiles(result.files);
    }
  };

  return {
    async refresh() {
      const current = app.fs.path.get().path || '';
      app.adapter.invalidateListQuery(current);
      await app.adapter.open(current);
    },

    async open(path: string) {
      await app.adapter.open(path);
    },

    preview(path: string) {
      const item = (app.fs.files.get() || []).find((entry: DirEntry) => entry.path === path);
      if (!item || item.type !== 'file') return;
      app.modal.open('preview', { storage: item.storage, item });
    },

    notify(type: 'success' | 'error' | 'info' | 'warning', message: string) {
      emitNotify(app, type, message);
    },

    getPath() {
      return app.fs.path.get().path || '';
    },

    select(paths: string[]) {
      const available = new Set((app.fs.files.get() || []).map((item: DirEntry) => item.path));
      const matched = (paths || []).filter((path) => available.has(path));
      app.fs.setSelection(matched);
    },

    selectOne(path: string) {
      const available = new Set((app.fs.files.get() || []).map((item: DirEntry) => item.path));
      if (available.has(path)) {
        app.fs.setSelection([path]);
      }
    },

    clearSelection() {
      app.fs.clearSelection();
    },

    getSelectedPaths() {
      return (app.fs.selectedItems.get() || []).map((item: DirEntry) => item.path);
    },

    async createFolder(name: string, path?: string) {
      const result = await app.adapter.createFolder({ path: resolvePath(path), name });
      syncFilesFromResult(result);
    },

    async createFile(name: string, path?: string) {
      const result = await app.adapter.createFile({ path: resolvePath(path), name });
      syncFilesFromResult(result);
    },

    async delete(paths: string[], path?: string) {
      const basePath = resolvePath(path);
      const fileMap = new Map(
        (app.fs.files.get() || []).map((item: DirEntry) => [item.path, item] as const)
      );
      const items = (paths || [])
        .map((itemPath) => fileMap.get(itemPath))
        .filter((item): item is DirEntry => Boolean(item))
        .map((item) => ({ path: item.path, type: item.type }));

      const result = await app.adapter.delete({ path: basePath, items });
      syncFilesFromResult(result);
    },

    async rename(itemPath: string, newName: string, path?: string) {
      const result = await app.adapter.rename({
        path: resolvePath(path),
        item: itemPath,
        name: newName,
      });
      syncFilesFromResult(result);
    },

    async copy(sources: string[], destination: string, path?: string) {
      const result = await app.adapter.copy({
        path: resolvePath(path),
        sources,
        destination,
      });
      syncFilesFromResult(result);
    },

    async move(sources: string[], destination: string, path?: string) {
      const result = await app.adapter.move({
        path: resolvePath(path),
        sources,
        destination,
      });
      syncFilesFromResult(result);
    },

    getFiles() {
      return app.fs.files.get() || [];
    },

    getStorages() {
      return app.fs.storages.get() || [];
    },

    isLoading() {
      return app.fs.isLoading();
    },

    isReadOnly() {
      return app.fs.getReadOnly();
    },
  };
}
