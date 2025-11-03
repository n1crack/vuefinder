import { BaseAdapter } from './Adapter';
import type {
  DeleteParams,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ArchiveParams,
  SaveParams,
} from './types';
import type { DirEntry, FsData } from '../types';

export interface IndexedDBDriverConfig {
  dbName?: string; // defaults to 'vuefinder'
  storage?: string; // defaults to 'indexeddb'
  readOnly?: boolean;
  version?: number; // defaults to 1
}

// All full paths are in the form `${storage}://${pathPart}`
// where pathPart is '' for root or 'a/b/c' without leading slash.
export class IndexedDBDriver extends BaseAdapter {
  private dbName: string;
  private storage: string;
  private readOnly: boolean;
  private version: number;
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor(config: IndexedDBDriverConfig = {}) {
    super();
    this.dbName = config.dbName || 'vuefinder';
    this.storage = config.storage || 'indexeddb';
    this.readOnly = Boolean(config.readOnly);
    this.version = config.version || 1;
    this.initDB();
  }

  private async initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create files store if it doesn't exist
        if (!db.objectStoreNames.contains('files')) {
          const filesStore = db.createObjectStore('files', { keyPath: 'path' });
          filesStore.createIndex('storage', 'storage', { unique: false });
          filesStore.createIndex('dir', 'dir', { unique: false });
        }

        // Create content store if it doesn't exist
        if (!db.objectStoreNames.contains('content')) {
          db.createObjectStore('content', { keyPath: 'path' });
        }
      };
    });

    return this.dbPromise;
  }

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return this.initDB();
  }

  private combine(pathPart?: string): string {
    // Ensure storage root is represented as `${storage}://`
    const part = pathPart ?? '';
    if (part === '') return `${this.storage}://`;
    return `${this.storage}://${part}`;
  }

  private split(full: string): { storage?: string; path?: string } {
    return this.parsePath(full);
  }

  private parent(full: string): string {
    const { path } = this.split(full);
    if (!path) return this.combine('');
    const trimmed = path.replace(/\/+$/g, '').replace(/^\/+/, '');
    const idx = trimmed.lastIndexOf('/');
    if (idx <= 0) return this.combine('');
    return this.combine(trimmed.slice(0, idx));
  }

  private join(dirFull: string, name: string): string {
    const { path } = this.split(dirFull);
    const dirPart = (path ?? '').replace(/\/$/, '');
    const joined = dirPart ? `${dirPart}/${name}` : name;
    return this.combine(joined);
  }

  private getExtension(name: string): string {
    const idx = name.lastIndexOf('.');
    return idx > 0 ? name.slice(idx + 1) : '';
  }

  private cloneEntry(entry: DirEntry, overrides: Partial<DirEntry> = {}): DirEntry {
    return { ...entry, ...overrides };
  }

  private async findByPath(full: string): Promise<DirEntry | undefined> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const request = store.get(full);
      request.onsuccess = () => {
        const entry = request.result;
        if (entry && entry.storage === this.storage) {
          resolve(entry);
        } else {
          resolve(undefined);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  private async listChildren(dirnameFull: string): Promise<DirEntry[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const index = store.index('dir');
      const request = index.getAll(dirnameFull);
      request.onsuccess = () => {
        const entries = request.result.filter(
          (e: DirEntry) => e.storage === this.storage && e.dir === dirnameFull
        );
        resolve(entries);
      };
      request.onerror = () => reject(request.error);
    });
  }

  private async getAllFiles(): Promise<DirEntry[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const index = store.index('storage');
      const request = index.getAll(this.storage);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async upsert(entry: DirEntry): Promise<void> {
    if (this.readOnly) throw new Error('Driver is read-only');
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      const request = store.put(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async removeExact(full: string): Promise<void> {
    if (this.readOnly) throw new Error('Driver is read-only');
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files', 'content'], 'readwrite');
      const filesStore = transaction.objectStore('files');
      const contentStore = transaction.objectStore('content');
      const deleteRequest = filesStore.delete(full);
      contentStore.delete(full);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    });
  }

  private async removeTree(rootFull: string): Promise<DirEntry[]> {
    if (this.readOnly) throw new Error('Driver is read-only');
    const allFiles = await this.getAllFiles();
    const deleted: DirEntry[] = [];
    const keep: DirEntry[] = [];

    for (const e of allFiles) {
      if (e.storage !== this.storage) {
        keep.push(e);
        continue;
      }
      if (e.path === rootFull || e.path.startsWith(rootFull + '/')) {
        deleted.push(e);
      } else {
        keep.push(e);
      }
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files', 'content'], 'readwrite');
      const filesStore = transaction.objectStore('files');
      const contentStore = transaction.objectStore('content');

      for (const entry of deleted) {
        filesStore.delete(entry.path);
        contentStore.delete(entry.path);
      }

      transaction.oncomplete = () => resolve(deleted);
      transaction.onerror = () => reject(transaction.error);
    });
  }

  private makeDirEntry(dirFull: string, name: string): DirEntry {
    const full = this.join(dirFull, name);
    return {
      storage: this.storage,
      dir: dirFull,
      basename: name,
      extension: '',
      path: full,
      type: 'dir',
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: 'public',
    };
  }

  private makeFileEntry(
    dirFull: string,
    name: string,
    size = 0,
    mime: string | null = null
  ): DirEntry {
    const full = this.join(dirFull, name);
    return {
      storage: this.storage,
      dir: dirFull,
      basename: name,
      extension: this.getExtension(name),
      path: full,
      type: 'file',
      file_size: size,
      last_modified: Date.now(),
      mime_type: mime,
      visibility: 'public',
    };
  }

  private async resultForDir(dirnameFull: string): Promise<FileOperationResult> {
    const files = await this.listChildren(dirnameFull);
    return {
      files,
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: dirnameFull,
    } as unknown as FileOperationResult;
  }

  async list(params?: { path?: string }): Promise<FsData> {
    const requested = params?.path ?? this.combine('');
    const { path } = this.split(requested);
    const dirnameFull = this.combine(path ?? '');
    const { storage } = this.split(dirnameFull);
    const files = await this.listChildren(dirnameFull);
    return {
      storages: [storage || ''],
      dirname: dirnameFull,
      files,
      read_only: this.readOnly,
    };
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    this.validateParam(params.items, 'items');
    this.validateParam(params.path, 'path');
    const deleted: DirEntry[] = [];

    for (const it of params.items) {
      const entry = await this.findByPath(it.path);
      if (!entry) continue;
      if (entry.type === 'dir') {
        const treeDeleted = await this.removeTree(entry.path);
        deleted.push(...treeDeleted);
      } else {
        await this.removeExact(entry.path);
        deleted.push(entry);
      }
    }

    const op = await this.resultForDir(params.path);
    return { ...op, deleted } as unknown as DeleteResult;
  }

  async rename(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const entry = await this.findByPath(params.path);
    if (!entry) throw new Error('Item not found');

    const parentFull = entry.dir;
    const newFull = this.join(parentFull, params.name);

    if (entry.type === 'dir') {
      const allFiles = await this.getAllFiles();
      const oldPrefix = entry.path;
      const newPrefix = newFull;

      for (const e of allFiles) {
        if (e.storage !== this.storage) continue;
        if (e.path === oldPrefix || e.path.startsWith(oldPrefix + '/')) {
          const replacedPath = newPrefix + e.path.slice(oldPrefix.length);
          const replacedDir = this.parent(replacedPath);
          const updated = this.cloneEntry(e, {
            path: replacedPath,
            dir: replacedDir,
            basename: e.path === oldPrefix ? params.name : e.basename,
            last_modified: Date.now(),
          });
          await this.upsert(updated);

          // Move content if it exists
          const db = await this.getDB();
          const transaction = db.transaction(['content'], 'readwrite');
          const contentStore = transaction.objectStore('content');
          const getRequest = contentStore.get(e.path);
          getRequest.onsuccess = () => {
            const content = getRequest.result;
            if (content) {
              contentStore.delete(e.path);
              contentStore.put({ path: replacedPath, content: content.content });
            }
          };
          await new Promise((resolve) => {
            transaction.oncomplete = () => resolve(undefined);
          });

          // Remove old entry
          if (e.path !== replacedPath) {
            await this.removeExact(e.path);
          }
        }
      }
    } else {
      const updated = this.cloneEntry(entry, {
        path: newFull,
        dir: parentFull,
        basename: params.name,
        extension: this.getExtension(params.name),
        last_modified: Date.now(),
      });
      await this.upsert(updated);

      // Move content
      const db = await this.getDB();
      const transaction = db.transaction(['content'], 'readwrite');
      const contentStore = transaction.objectStore('content');
      const getRequest = contentStore.get(entry.path);
      getRequest.onsuccess = () => {
        const content = getRequest.result;
        if (content) {
          contentStore.delete(entry.path);
          contentStore.put({ path: newFull, content: content.content });
        }
      };
      await new Promise((resolve) => {
        transaction.oncomplete = () => resolve(undefined);
      });
      await this.removeExact(entry.path);
    }

    return this.resultForDir(parentFull);
  }

  private async uniqueName(dirFull: string, base: string, taken: Set<string>): Promise<string> {
    const candidate = this.join(dirFull, base);
    if (!taken.has(candidate)) return base;
    const idx = base.lastIndexOf('.');
    const stem = idx > 0 ? base.slice(0, idx) : base;
    const ext = idx > 0 ? base.slice(idx) : '';
    let n = 1;
    while (true) {
      const candidateName = `${stem} copy ${n}${ext}`;
      const full = this.join(dirFull, candidateName);
      if (!taken.has(full)) return candidateName;
      n++;
    }
  }

  async copy(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    const destDir = params.destination;
    const allFiles = await this.getAllFiles();
    const taken = new Set(allFiles.map((e) => e.path));
    const additions: DirEntry[] = [];

    const copyTree = async (e: DirEntry, targetDirFull: string) => {
      if (e.type === 'dir') {
        const newName = await this.uniqueName(targetDirFull, e.basename, taken);
        const dirEntry = this.makeDirEntry(targetDirFull, newName);
        taken.add(dirEntry.path);
        additions.push(dirEntry);
        await this.upsert(dirEntry);

        const oldPrefix = e.path + '/';
        const children = allFiles.filter(
          (c) => c.storage === this.storage && c.path.startsWith(oldPrefix)
        );

        for (const c of children) {
          const suffix = c.path.slice(oldPrefix.length);
          const suffixParent = suffix.includes('/') ? suffix.slice(0, suffix.lastIndexOf('/')) : '';
          const childDirFull = suffixParent
            ? this.join(dirEntry.path, suffixParent)
            : dirEntry.path;
          if (c.type === 'dir') {
            await copyTree(c, childDirFull);
          } else {
            const newChildName = await this.uniqueName(childDirFull, c.basename, taken);
            const fileEntry = this.makeFileEntry(
              childDirFull,
              newChildName,
              c.file_size || 0,
              c.mime_type
            );
            additions.push(fileEntry);
            taken.add(fileEntry.path);
            await this.upsert(fileEntry);

            // Copy content
            const db = await this.getDB();
            const transaction = db.transaction(['content'], 'readwrite');
            const contentStore = transaction.objectStore('content');
            const getRequest = contentStore.get(c.path);
            getRequest.onsuccess = () => {
              const content = getRequest.result;
              if (content) {
                contentStore.put({ path: fileEntry.path, content: content.content });
              }
            };
            await new Promise((resolve) => {
              transaction.oncomplete = () => resolve(undefined);
            });
          }
        }
      } else {
        const newName = await this.uniqueName(targetDirFull, e.basename, taken);
        const fileEntry = this.makeFileEntry(targetDirFull, newName, e.file_size || 0, e.mime_type);
        additions.push(fileEntry);
        taken.add(fileEntry.path);
        await this.upsert(fileEntry);

        // Copy content
        const db = await this.getDB();
        const transaction = db.transaction(['content'], 'readwrite');
        const contentStore = transaction.objectStore('content');
        const getRequest = contentStore.get(e.path);
        getRequest.onsuccess = () => {
          const content = getRequest.result;
          if (content) {
            contentStore.put({ path: fileEntry.path, content: content.content });
          }
        };
        await new Promise((resolve) => {
          transaction.oncomplete = () => resolve(undefined);
        });
      }
    };

    for (const src of params.sources) {
      const e = await this.findByPath(src);
      if (e) await copyTree(e, destDir);
    }

    return this.resultForDir(destDir);
  }

  async move(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    const destDir = params.destination;
    const allFiles = await this.getAllFiles();
    const taken = new Set(allFiles.map((e) => e.path));

    const moveTree = async (e: DirEntry, targetDirFull: string) => {
      if (e.type === 'dir') {
        const oldPrefix = e.path;
        const newName = await this.uniqueName(targetDirFull, e.basename, taken);
        const newDirPath = this.join(targetDirFull, newName);

        const children = allFiles.filter(
          (c) => c.storage === this.storage && (c.path === oldPrefix || c.path.startsWith(oldPrefix + '/'))
        );

        for (const child of children) {
          const replacedPath = newDirPath + child.path.slice(oldPrefix.length);
          const replacedDir = this.parent(replacedPath);
          const updated = this.cloneEntry(child, {
            path: replacedPath,
            dir: replacedDir,
            basename: child.path === oldPrefix ? newName : child.basename,
            last_modified: Date.now(),
          });
          await this.upsert(updated);

          // Move content
          const db = await this.getDB();
          const transaction = db.transaction(['content'], 'readwrite');
          const contentStore = transaction.objectStore('content');
          const getRequest = contentStore.get(child.path);
          getRequest.onsuccess = () => {
            const content = getRequest.result;
            if (content) {
              contentStore.delete(child.path);
              contentStore.put({ path: replacedPath, content: content.content });
            }
          };
          await new Promise((resolve) => {
            transaction.oncomplete = () => resolve(undefined);
          });

          if (child.path !== replacedPath) {
            await this.removeExact(child.path);
          }
        }
      } else {
        const newName = await this.uniqueName(targetDirFull, e.basename, taken);
        const newPath = this.join(targetDirFull, newName);
        const updated = this.cloneEntry(e, {
          path: newPath,
          dir: targetDirFull,
          basename: newName,
          extension: this.getExtension(newName),
          last_modified: Date.now(),
        });
        await this.upsert(updated);

        // Move content
        const db = await this.getDB();
        const transaction = db.transaction(['content'], 'readwrite');
        const contentStore = transaction.objectStore('content');
        const getRequest = contentStore.get(e.path);
        getRequest.onsuccess = () => {
          const content = getRequest.result;
          if (content) {
            contentStore.delete(e.path);
            contentStore.put({ path: newPath, content: content.content });
          }
        };
        await new Promise((resolve) => {
          transaction.oncomplete = () => resolve(undefined);
        });
        await this.removeExact(e.path);
      }
    };

    for (const src of params.sources) {
      const e = await this.findByPath(src);
      if (e) await moveTree(e, destDir);
    }

    return this.resultForDir(destDir);
  }

  async archive(params: ArchiveParams): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.items, 'items');
    this.validateParam(params.name, 'name');
    const zipName = params.name.endsWith('.zip') ? params.name : `${params.name}.zip`;
    const file = this.makeFileEntry(params.path, zipName, 0, 'application/zip');
    await this.upsert(file);
    return this.resultForDir(params.path);
  }

  async unarchive(params: { item: string; path: string }): Promise<FileOperationResult> {
    this.validateParam(params.item, 'item');
    this.validateParam(params.path, 'path');
    const entry = await this.findByPath(params.item);
    if (!entry) throw new Error('Archive not found');
    const base = entry.basename.replace(/\.zip$/i, '');
    const dirEntry = this.makeDirEntry(params.path, base);
    await this.upsert(dirEntry);
    return this.resultForDir(params.path);
  }

  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const file = this.makeFileEntry(params.path, params.name, 0, null);
    await this.upsert(file);
    const db = await this.getDB();
    const transaction = db.transaction(['content'], 'readwrite');
    const contentStore = transaction.objectStore('content');
    contentStore.put({ path: file.path, content: '' });
    await new Promise((resolve) => {
      transaction.oncomplete = () => resolve(undefined);
    });
    return this.resultForDir(params.path);
  }

  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const dir = this.makeDirEntry(params.path, params.name);
    await this.upsert(dir);
    return this.resultForDir(params.path);
  }

  getPreviewUrl(_params: { path: string }): string {
    return '';
  }

  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validatePath(params.path);
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['content'], 'readonly');
      const contentStore = transaction.objectStore('content');
      const request = contentStore.get(params.path);
      request.onsuccess = async () => {
        const result = request.result;
        const entry = await this.findByPath(params.path);
        if (result && result.content) {
          const content = result.content;
          if (typeof content === 'string') {
            resolve({
              content,
              mimeType: entry?.mime_type || undefined,
            });
          } else {
            // Convert ArrayBuffer to base64
            const bytes = new Uint8Array(content);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
            const base64 = btoa(binary);
            resolve({
              content: base64,
              mimeType: entry?.mime_type || undefined,
            });
          }
        } else {
          resolve({
            content: '',
            mimeType: entry?.mime_type || undefined,
          });
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  getDownloadUrl(_params: { path: string }): string {
    return '';
  }

  async search(params: {
    path?: string;
    filter: string;
    deep?: boolean;
    size?: 'all' | 'small' | 'medium' | 'large';
  }): Promise<DirEntry[]> {
    const filter = (params.filter || '').toLowerCase();
    const base = params.path;
    const allFiles = await this.getAllFiles();
    return allFiles.filter((e) => {
      if (e.storage !== this.storage) return false;
      if (base) {
        if (params.deep) {
          if (!(e.path === base || e.path.startsWith(base + '/'))) return false;
        } else if (e.dir !== base) {
          return false;
        }
      }
      return e.basename.toLowerCase().includes(filter) || e.path.toLowerCase().includes(filter);
    });
  }

  async save(params: SaveParams): Promise<string> {
    this.validateParam(params.path, 'path');
    const entry = await this.findByPath(params.path);
    if (!entry) throw new Error('File not found');
    if (entry.type !== 'file') throw new Error('Can only save file content');
    const updated = this.cloneEntry(entry, {
      file_size: params.content.length,
      last_modified: Date.now(),
    });
    await this.upsert(updated);

    const db = await this.getDB();
    const transaction = db.transaction(['content'], 'readwrite');
    const contentStore = transaction.objectStore('content');
    contentStore.put({ path: params.path, content: params.content });
    await new Promise((resolve) => {
      transaction.oncomplete = () => resolve(undefined);
    });
    return params.path;
  }

  configureUploader?(uppy: any, context: { getTargetPath: () => string }): void {
    if (!uppy) return;
    uppy.on('upload-success', async (file: any) => {
      const target = context.getTargetPath();
      const name = file?.name || 'file';
      const type = file?.type || null;
      const data: Blob | undefined = file?.data;
      const size = file?.size || 0;
      const entry = this.makeFileEntry(target, name, size, type);
      await this.upsert(entry);
      if (data) {
        try {
          const buf = await data.arrayBuffer();
          const db = await this.getDB();
          const transaction = db.transaction(['content'], 'readwrite');
          const contentStore = transaction.objectStore('content');
          contentStore.put({ path: entry.path, content: buf });
          await new Promise((resolve) => {
            transaction.oncomplete = () => resolve(undefined);
          });
        } catch {
          const db = await this.getDB();
          const transaction = db.transaction(['content'], 'readwrite');
          const contentStore = transaction.objectStore('content');
          contentStore.put({ path: entry.path, content: '' });
          await new Promise((resolve) => {
            transaction.oncomplete = () => resolve(undefined);
          });
        }
      } else {
        const db = await this.getDB();
        const transaction = db.transaction(['content'], 'readwrite');
        const contentStore = transaction.objectStore('content');
        contentStore.put({ path: entry.path, content: '' });
        await new Promise((resolve) => {
          transaction.oncomplete = () => resolve(undefined);
        });
      }
    });
  }
}

