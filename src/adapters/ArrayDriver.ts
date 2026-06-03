import { BaseAdapter } from './Adapter';
import type {
  DeleteParams,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ArchiveParams,
  SaveParams,
  RenameParams,
  TransferParams,
  ListParams,
  SearchParams,
  GetContentParams,
} from './types';
import type { DirEntry, FsData } from '../types';

type FilesSource = { value: DirEntry[] } | DirEntry[];

export interface ArrayDriverConfig {
  files: FilesSource;
  storage?: string; // defaults to 'memory'
  storages?: string[]; // multi-storage support
  readOnly?: boolean;
  contentStore?: Map<string, string | ArrayBuffer>;
}

// All full paths are in the form `${storage}://${pathPart}`
// where pathPart is '' for root or 'a/b/c' without leading slash.
export class ArrayDriver extends BaseAdapter {
  private filesSource: FilesSource;
  private defaultStorage: string;
  private storages: string[];
  private storagesSet: Set<string>;
  private readOnly: boolean;
  private contentStore: Map<string, string | ArrayBuffer>;

  constructor(config: ArrayDriverConfig) {
    super();
    this.filesSource = config.files;

    const configuredStorages =
      config.storages && config.storages.length > 0
        ? config.storages
        : [config.storage || 'memory'];

    this.storages = [...new Set(configuredStorages)];
    this.defaultStorage = config.storage || this.storages[0] || 'memory';
    if (!this.storages.includes(this.defaultStorage)) {
      this.storages.unshift(this.defaultStorage);
    }
    this.storagesSet = new Set(this.storages);

    this.readOnly = Boolean(config.readOnly);
    this.contentStore = config.contentStore || new Map();
  }

  private get files(): DirEntry[] {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }

  private set files(next: DirEntry[]) {
    if (Array.isArray(this.filesSource)) {
      this.filesSource.length = 0;
      this.filesSource.push(...next);
    } else {
      this.filesSource.value = next;
    }
  }

  private ensureWritable(): void {
    if (this.readOnly) {
      throw new Error('Driver is read-only');
    }
  }

  private ensureStorageSupported(storage: string): void {
    if (!this.storagesSet.has(storage)) {
      throw new Error(`Unsupported storage: ${storage}`);
    }
  }

  private combine(pathPart?: string, storage = this.defaultStorage): string {
    this.ensureStorageSupported(storage);
    const part = pathPart ?? '';
    if (part === '') return `${storage}://`;
    return `${storage}://${part}`;
  }

  private split(full: string): { storage?: string; path?: string } {
    return this.parsePath(full);
  }

  private normalizePath(full?: string, fallbackStorage = this.defaultStorage): string {
    const { storage, path } = this.split(full || '');
    const resolvedStorage = storage || fallbackStorage;
    return this.combine(path ?? '', resolvedStorage);
  }

  private parent(full: string): string {
    const { storage, path } = this.split(full);
    const resolvedStorage = storage || this.defaultStorage;
    if (!path) return this.combine('', resolvedStorage);

    const trimmed = path.replace(/\/+$/g, '').replace(/^\/+/, '');
    const idx = trimmed.lastIndexOf('/');
    if (idx <= 0) return this.combine('', resolvedStorage);
    return this.combine(trimmed.slice(0, idx), resolvedStorage);
  }

  private join(dirFull: string, name: string): string {
    const { storage, path } = this.split(dirFull);
    const resolvedStorage = storage || this.defaultStorage;
    const dirPart = (path ?? '').replace(/\/$/, '');
    const joined = dirPart ? `${dirPart}/${name}` : name;
    return this.combine(joined, resolvedStorage);
  }

  private getExtension(name: string): string {
    const idx = name.lastIndexOf('.');
    return idx > 0 ? name.slice(idx + 1) : '';
  }

  private cloneEntry(entry: DirEntry, overrides: Partial<DirEntry> = {}): DirEntry {
    return { ...entry, ...overrides };
  }

  private findByPath(full: string): DirEntry | undefined {
    return this.files.find((e) => e.path === full);
  }

  private listChildren(dirnameFull: string): DirEntry[] {
    return this.files.filter((e) => e.dir === dirnameFull);
  }

  private replaceAll(next: DirEntry[]): void {
    this.files = next;
  }

  private upsert(entry: DirEntry): void {
    const next = this.files.slice();
    const idx = next.findIndex((e) => e.path === entry.path);
    if (idx === -1) next.push(entry);
    else next[idx] = entry;
    this.replaceAll(next);
  }

  private removeExact(full: string): void {
    const next = this.files.filter((e) => e.path !== full);
    this.replaceAll(next);
  }

  private removeTree(rootFull: string): DirEntry[] {
    const deleted: DirEntry[] = [];
    const keep: DirEntry[] = [];
    for (const e of this.files) {
      if (this.isInTree(e.path, rootFull)) {
        deleted.push(e);
      } else {
        keep.push(e);
      }
    }
    this.replaceAll(keep);
    for (const entry of deleted) {
      this.contentStore.delete(entry.path);
    }
    return deleted;
  }

  private isInTree(path: string, root: string): boolean {
    return path === root || path.startsWith(`${root}/`);
  }

  private getTree(root: string, source: DirEntry[] = this.files): DirEntry[] {
    return source
      .filter((e) => this.isInTree(e.path, root))
      .sort((a, b) => a.path.length - b.path.length);
  }

  private uniqueName(dirFull: string, base: string, taken: Set<string>): string {
    if (!taken.has(this.join(dirFull, base))) return base;
    const idx = base.lastIndexOf('.');
    const stem = idx > 0 ? base.slice(0, idx) : base;
    const ext = idx > 0 ? base.slice(idx) : '';
    let n = 1;
    while (true) {
      const candidate = `${stem} copy ${n}${ext}`;
      const full = this.join(dirFull, candidate);
      if (!taken.has(full)) return candidate;
      n++;
    }
  }

  private topLevelSources(rawSources: string[], fallbackStorage = this.defaultStorage): string[] {
    const unique = [...new Set(rawSources)]
      .map((p) => this.normalizePath(p, fallbackStorage))
      .filter((p) => this.findByPath(p))
      .sort((a, b) => a.length - b.length);

    const top: string[] = [];
    for (const p of unique) {
      if (top.some((root) => this.isInTree(p, root))) continue;
      top.push(p);
    }
    return top;
  }

  private makeDirEntry(dirFull: string, name: string): DirEntry {
    const full = this.join(dirFull, name);
    const { storage } = this.split(full);
    return {
      storage: storage || this.defaultStorage,
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
    const { storage } = this.split(full);
    return {
      storage: storage || this.defaultStorage,
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

  private resultForDir(dirnameFull: string): FileOperationResult {
    return {
      files: this.listChildren(dirnameFull),
      storages: this.storages,
      read_only: this.readOnly,
      dirname: dirnameFull,
    } as unknown as FileOperationResult;
  }

  async list(params?: ListParams): Promise<FsData> {
    const dirnameFull = this.normalizePath(params?.path);
    return {
      storages: this.storages,
      dirname: dirnameFull,
      files: this.listChildren(dirnameFull),
      read_only: this.readOnly,
    };
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    this.ensureWritable();
    this.validateParam(params.items, 'items');
    this.validateParam(params.path, 'path');

    const currentDir = this.normalizePath(params.path);
    const { storage: currentStorage } = this.split(currentDir);

    const deleted: DirEntry[] = [];
    for (const it of params.items) {
      const itemPath = this.normalizePath(it.path, currentStorage || this.defaultStorage);
      const entry = this.findByPath(itemPath);
      if (!entry) continue;

      if (entry.type === 'dir') {
        deleted.push(...this.removeTree(entry.path));
      } else {
        this.removeExact(entry.path);
        this.contentStore.delete(entry.path);
        deleted.push(entry);
      }
    }

    const op = this.resultForDir(currentDir);
    return { ...op, deleted };
  }

  async rename(params: RenameParams): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.name, 'name');

    const contextDir = this.normalizePath(params.path);
    const { storage: contextStorage } = this.split(contextDir);
    const targetPath = this.normalizePath(
      params.item || params.path,
      contextStorage || this.defaultStorage
    );

    const entry = this.findByPath(targetPath);
    if (!entry) throw new Error('Item not found');

    const parentFull = entry.dir;
    const newFull = this.join(parentFull, params.name);
    if (newFull !== entry.path && this.findByPath(newFull)) {
      throw new Error('Target already exists');
    }

    if (entry.type === 'dir') {
      const oldPrefix = entry.path;
      const newPrefix = newFull;
      const next = this.files.map((e) => {
        if (e.storage !== entry.storage || !this.isInTree(e.path, oldPrefix)) return e;
        const replacedPath = newPrefix + e.path.slice(oldPrefix.length);
        return this.cloneEntry(e, {
          path: replacedPath,
          dir: this.parent(replacedPath),
          basename: e.path === oldPrefix ? params.name : e.basename,
          last_modified: Date.now(),
        });
      });

      for (const [p, v] of Array.from(this.contentStore.entries())) {
        if (!this.isInTree(p, oldPrefix)) continue;
        this.contentStore.delete(p);
        this.contentStore.set(newPrefix + p.slice(oldPrefix.length), v);
      }

      this.replaceAll(next);
    } else {
      const updated = this.cloneEntry(entry, {
        path: newFull,
        basename: params.name,
        extension: this.getExtension(params.name),
        last_modified: Date.now(),
      });
      this.upsert(updated);
      this.removeExact(entry.path);

      const content = this.contentStore.get(entry.path);
      if (content !== undefined) {
        this.contentStore.delete(entry.path);
        this.contentStore.set(updated.path, content);
      }
    }

    const parentParam = params.path
      ? this.normalizePath(params.path, entry.storage || this.defaultStorage)
      : parentFull;
    return this.resultForDir(parentParam || parentFull);
  }

  async copy(params: TransferParams): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');

    const destination = this.normalizePath(
      params.destination,
      params.path
        ? this.split(this.normalizePath(params.path)).storage || this.defaultStorage
        : this.defaultStorage
    );
    const { storage: destinationStorage } = this.split(destination);
    const sources = this.topLevelSources(params.sources, destinationStorage || this.defaultStorage);
    const taken = new Set(this.files.map((e) => e.path));
    const additions: DirEntry[] = [];

    for (const sourcePath of sources) {
      const source = this.findByPath(sourcePath);
      if (!source) continue;

      if (source.type === 'file') {
        const newName = this.uniqueName(destination, source.basename, taken);
        const clone = this.makeFileEntry(
          destination,
          newName,
          source.file_size || 0,
          source.mime_type
        );
        additions.push(clone);
        taken.add(clone.path);

        const content = this.contentStore.get(source.path);
        if (content !== undefined) this.contentStore.set(clone.path, content);
        continue;
      }

      const tree = this.getTree(source.path);
      const rootName = this.uniqueName(destination, source.basename, taken);
      const pathMap = new Map<string, string>();
      pathMap.set(source.path, this.join(destination, rootName));

      for (const node of tree) {
        const mappedPath =
          node.path === source.path
            ? pathMap.get(source.path)!
            : this.join(pathMap.get(node.dir)!, node.basename);

        pathMap.set(node.path, mappedPath);
        const mappedDir = node.path === source.path ? destination : pathMap.get(node.dir)!;
        const mappedBase = node.path === source.path ? rootName : node.basename;
        const clone = this.cloneEntry(node, {
          path: mappedPath,
          dir: mappedDir,
          basename: mappedBase,
          extension: node.type === 'file' ? this.getExtension(mappedBase) : '',
          last_modified: Date.now(),
        });

        additions.push(clone);
        taken.add(clone.path);

        if (node.type === 'file') {
          const content = this.contentStore.get(node.path);
          if (content !== undefined) this.contentStore.set(clone.path, content);
        }
      }
    }

    this.replaceAll(this.files.concat(additions));
    return this.resultForDir(destination);
  }

  async move(params: TransferParams): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');

    const destination = this.normalizePath(
      params.destination,
      params.path
        ? this.split(this.normalizePath(params.path)).storage || this.defaultStorage
        : this.defaultStorage
    );
    const { storage: destinationStorage } = this.split(destination);
    const sources = this.topLevelSources(params.sources, destinationStorage || this.defaultStorage);
    let next = this.files.slice();

    for (const sourcePath of sources) {
      const source = next.find((e) => e.path === sourcePath);
      if (!source) continue;

      if (source.type === 'dir' && this.isInTree(destination, source.path)) {
        throw new Error('Cannot move directory into itself');
      }

      if (source.dir === destination) {
        continue;
      }

      const tree = this.getTree(source.path, next);
      const movingPaths = new Set(tree.map((e) => e.path));
      const occupied = new Set(next.filter((e) => !movingPaths.has(e.path)).map((e) => e.path));

      const rootName = this.uniqueName(destination, source.basename, occupied);
      const pathMap = new Map<string, string>();
      pathMap.set(source.path, this.join(destination, rootName));

      const updates = new Map<string, DirEntry>();
      for (const node of tree) {
        const mappedPath =
          node.path === source.path
            ? pathMap.get(source.path)!
            : this.join(pathMap.get(node.dir)!, node.basename);

        pathMap.set(node.path, mappedPath);
        const mappedDir = node.path === source.path ? destination : pathMap.get(node.dir)!;
        const mappedBase = node.path === source.path ? rootName : node.basename;

        updates.set(
          node.path,
          this.cloneEntry(node, {
            path: mappedPath,
            dir: mappedDir,
            basename: mappedBase,
            extension: node.type === 'file' ? this.getExtension(mappedBase) : '',
            last_modified: Date.now(),
          })
        );
      }

      next = next.map((entry) => updates.get(entry.path) || entry);

      for (const [oldPath, newPath] of pathMap.entries()) {
        if (oldPath === newPath) continue;
        const content = this.contentStore.get(oldPath);
        if (content !== undefined) {
          this.contentStore.delete(oldPath);
          this.contentStore.set(newPath, content);
        }
      }
    }

    this.replaceAll(next);
    return this.resultForDir(destination);
  }

  async archive(params: ArchiveParams): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.path, 'path');
    this.validateParam(params.items, 'items');
    this.validateParam(params.name, 'name');

    const dir = this.normalizePath(params.path);
    const zipName = params.name.endsWith('.zip') ? params.name : `${params.name}.zip`;
    const file = this.makeFileEntry(dir, zipName, 0, 'application/zip');
    this.upsert(file);
    return this.resultForDir(dir);
  }

  async unarchive(params: { item: string; path: string }): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.item, 'item');
    this.validateParam(params.path, 'path');

    const itemPath = this.normalizePath(params.item);
    const dirPath = this.normalizePath(params.path);
    const entry = this.findByPath(itemPath);
    if (!entry) throw new Error('Archive not found');

    const base = entry.basename.replace(/\.zip$/i, '');
    const dirEntry = this.makeDirEntry(dirPath, base);
    this.upsert(dirEntry);
    return this.resultForDir(dirPath);
  }

  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');

    const dir = this.normalizePath(params.path);
    const file = this.makeFileEntry(dir, params.name, 0, null);
    this.upsert(file);
    this.contentStore.set(file.path, '');
    return this.resultForDir(dir);
  }

  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.ensureWritable();
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');

    const dir = this.normalizePath(params.path);
    const folder = this.makeDirEntry(dir, params.name);
    this.upsert(folder);
    return this.resultForDir(dir);
  }

  getPreviewUrl(_params: { path: string }): string {
    return '';
  }

  async getContent(params: GetContentParams): Promise<FileContentResult> {
    this.validatePath(params.path);
    const normalizedPath = this.normalizePath(params.path);
    const value = this.contentStore.get(normalizedPath);

    if (typeof value === 'string' || value === undefined) {
      return {
        content: value ?? '',
        mimeType: this.findByPath(normalizedPath)?.mime_type || undefined,
      };
    }

    const bytes = new Uint8Array(value);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
    return {
      content: btoa(binary),
      mimeType: this.findByPath(normalizedPath)?.mime_type || undefined,
    };
  }

  getDownloadUrl(_params: { path: string }): string {
    return '';
  }

  async search(params: SearchParams): Promise<DirEntry[]> {
    const filter = (params.filter || '').toLowerCase();
    const base = params.path ? this.normalizePath(params.path) : undefined;

    return this.files.filter((e) => {
      if (base) {
        if (params.deep) {
          if (!this.isInTree(e.path, base)) return false;
        } else if (e.dir !== base) {
          return false;
        }
      }
      return e.basename.toLowerCase().includes(filter) || e.path.toLowerCase().includes(filter);
    });
  }

  async save(params: SaveParams): Promise<string> {
    this.ensureWritable();
    this.validateParam(params.path, 'path');

    const path = this.normalizePath(params.path);
    const entry = this.findByPath(path);
    if (!entry) throw new Error('File not found');
    if (entry.type !== 'file') throw new Error('Can only save file content');

    this.contentStore.set(path, params.content);
    this.upsert(
      this.cloneEntry(entry, { file_size: params.content.length, last_modified: Date.now() })
    );
    return path;
  }

  configureUploader?(uppy: any, context: { getTargetPath: () => string }): void {
    if (!uppy) return;

    uppy.on('upload-success', async (file: any) => {
      try {
        this.ensureWritable();

        const target = this.normalizePath(context.getTargetPath());
        const name = file?.name || 'file';
        const type = file?.type || null;
        const data: Blob | undefined = file?.data;
        const size = file?.size || 0;

        const entry = this.makeFileEntry(target, name, size, type);
        this.upsert(entry);

        if (data) {
          try {
            const buf = await data.arrayBuffer();
            this.contentStore.set(entry.path, buf);
          } catch {
            this.contentStore.set(entry.path, '');
          }
        } else {
          this.contentStore.set(entry.path, '');
        }
      } catch {
        // Keep uploader flow resilient for local drivers.
      }
    });
  }
}
