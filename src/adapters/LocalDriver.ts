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

type FilesSource = { value: DirEntry[] } | DirEntry[];

interface LocalDriverConfig {
  files: FilesSource;
  storage?: string; // defaults to 'memory'
  readOnly?: boolean;
  contentStore?: Map<string, string | ArrayBuffer>;
}

// All full paths are in the form `${storage}://${pathPart}`
// where pathPart is '' for root or 'a/b/c' without leading slash.
export class LocalDriver extends BaseAdapter {
  private filesSource: FilesSource;
  private storage: string;
  private readOnly: boolean;
  private contentStore: Map<string, string | ArrayBuffer>;

  constructor(config: LocalDriverConfig) {
    super();
    this.filesSource = config.files;
    this.storage = config.storage || 'memory';
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

  private findByPath(full: string): DirEntry | undefined {
    const norm = full;
    return this.files.find((e) => e.storage === this.storage && e.path === norm);
  }

  private listChildren(dirnameFull: string): DirEntry[] {
    const norm = dirnameFull;
    return this.files.filter((e) => e.storage === this.storage && e.dir === norm);
  }

  private replaceAll(next: DirEntry[]): void {
    this.files = next;
  }

  private upsert(entry: DirEntry): void {
    const next = this.files.slice();
    const idx = next.findIndex((e) => e.storage === this.storage && e.path === entry.path);
    if (idx === -1) next.push(entry);
    else next[idx] = entry;
    this.replaceAll(next);
  }

  private removeExact(full: string): void {
    const next = this.files.filter((e) => !(e.storage === this.storage && e.path === full));
    this.replaceAll(next);
  }

  private removeTree(rootFull: string): DirEntry[] {
    const deleted: DirEntry[] = [];
    const keep: DirEntry[] = [];
    for (const e of this.files) {
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
    this.replaceAll(keep);
    return deleted;
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

  private makeFileEntry(dirFull: string, name: string, size = 0, mime: string | null = null): DirEntry {
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

  private resultForDir(dirnameFull: string): FileOperationResult {
    const files = this.listChildren(dirnameFull);
    return {
      files,
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: dirnameFull,
    } as unknown as FileOperationResult;
  }

  async list(params?: { path?: string }): Promise<FsData> {
    const requested = params?.path ?? this.combine('');
    const { storage, path } = this.split(requested);
    const dirnameFull = storage && storage !== this.storage ? this.combine('') : this.combine(path ?? '');
    return {
      storage: this.storage,
      storages: [this.storage],
      storage_info: { [this.storage]: {} },
      dirname: dirnameFull,
      files: this.listChildren(dirnameFull),
      read_only: this.readOnly,
    };
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    this.validateParam(params.items, 'items');
    const deleted: DirEntry[] = [];
    for (const it of params.items) {
      const entry = this.findByPath(it.path);
      if (!entry) continue;
      if (entry.type === 'dir') {
        deleted.push(...this.removeTree(entry.path));
      } else {
        this.removeExact(entry.path);
        deleted.push(entry);
      }
      this.contentStore.delete(entry.path);
    }
    return { deleted };
  }

  async rename(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const entry = this.findByPath(params.path);
    if (!entry) throw new Error('Item not found');

    const parentFull = entry.dir;
    const newFull = this.join(parentFull, params.name);

    if (entry.type === 'dir') {
      const oldPrefix = entry.path;
      const newPrefix = newFull;
      const next = this.files.map((e) => {
        if (e.storage !== this.storage) return e;
        if (e.path === oldPrefix || e.path.startsWith(oldPrefix + '/')) {
          const replacedPath = newPrefix + e.path.slice(oldPrefix.length);
          const replacedDir = this.parent(replacedPath);
          return this.cloneEntry(e, {
            path: replacedPath,
            dir: replacedDir,
            basename: e.path === oldPrefix ? params.name : e.basename,
          });
        }
        return e;
      });
      for (const [p, v] of Array.from(this.contentStore.entries())) {
        if (p === oldPrefix || p.startsWith(oldPrefix + '/')) {
          this.contentStore.delete(p);
          const np = newPrefix + p.slice(oldPrefix.length);
          this.contentStore.set(np, v);
        }
      }
      this.replaceAll(next);
    } else {
      const updated = this.cloneEntry(entry, {
        path: newFull,
        dir: parentFull,
        basename: params.name,
        extension: this.getExtension(params.name),
        last_modified: Date.now(),
      });
      this.upsert(updated);
      const content = this.contentStore.get(entry.path);
      if (content !== undefined) {
        this.contentStore.delete(entry.path);
        this.contentStore.set(updated.path, content);
      }
    }

    return this.resultForDir(parentFull);
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

  async copy(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    const destDir = params.destination;
    const taken = new Set(this.files.map((e) => e.path));
    const additions: DirEntry[] = [];

    const copyTree = (e: DirEntry, targetDirFull: string) => {
      if (e.type === 'dir') {
        const newName = this.uniqueName(targetDirFull, e.basename, taken);
        const dirEntry = this.makeDirEntry(targetDirFull, newName);
        taken.add(dirEntry.path);
        additions.push(dirEntry);
        const oldPrefix = e.path + '/';
        const children = this.files.filter(
          (c) => c.storage === this.storage && c.path.startsWith(oldPrefix)
        );
        for (const c of children) {
          const suffix = c.path.slice(oldPrefix.length);
          const suffixParent = suffix.includes('/') ? suffix.slice(0, suffix.lastIndexOf('/')) : '';
          const childDirFull = suffixParent ? this.join(dirEntry.path, suffixParent) : dirEntry.path;
          if (c.type === 'dir') {
            copyTree(c, childDirFull);
          } else {
            const newChildName = this.uniqueName(childDirFull, c.basename, taken);
            const fileEntry = this.makeFileEntry(childDirFull, newChildName, c.file_size || 0, c.mime_type);
            additions.push(fileEntry);
            taken.add(fileEntry.path);
            const content = this.contentStore.get(c.path);
            if (content !== undefined) this.contentStore.set(fileEntry.path, content);
          }
        }
      } else {
        const newName = this.uniqueName(targetDirFull, e.basename, taken);
        const fileEntry = this.makeFileEntry(targetDirFull, newName, e.file_size || 0, e.mime_type);
        additions.push(fileEntry);
        taken.add(fileEntry.path);
        const content = this.contentStore.get(e.path);
        if (content !== undefined) this.contentStore.set(fileEntry.path, content);
      }
    };

    for (const src of params.sources) {
      const e = this.findByPath(src);
      if (e) copyTree(e, destDir);
    }

    this.replaceAll(this.files.concat(additions));
    return this.resultForDir(destDir);
  }

  async move(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    const destDir = params.destination;
    const taken = new Set(this.files.map((e) => e.path));
    let next = this.files.slice();

    const moveTree = (e: DirEntry, targetDirFull: string) => {
      if (e.type === 'dir') {
        const oldPrefix = e.path;
        const newName = this.uniqueName(targetDirFull, e.basename, taken);
        const newDirPath = this.join(targetDirFull, newName);
        const updated = next.map((x) => {
          if (x.storage !== this.storage) return x;
          if (x.path === oldPrefix || x.path.startsWith(oldPrefix + '/')) {
            const replacedPath = newDirPath + x.path.slice(oldPrefix.length);
            return this.cloneEntry(x, {
              path: replacedPath,
              dir: this.parent(replacedPath),
              basename: x.path === oldPrefix ? newName : x.basename,
            });
          }
          return x;
        });
        next = updated;
        for (const [p, v] of Array.from(this.contentStore.entries())) {
          if (p === oldPrefix || p.startsWith(oldPrefix + '/')) {
            this.contentStore.delete(p);
            const np = newDirPath + p.slice(oldPrefix.length);
            this.contentStore.set(np, v);
          }
        }
      } else {
        const newName = this.uniqueName(targetDirFull, e.basename, taken);
        const newPath = this.join(targetDirFull, newName);
        next = next.map((x) =>
          x === e
            ? this.cloneEntry(x, {
                path: newPath,
                dir: targetDirFull,
                basename: newName,
                extension: this.getExtension(newName),
                last_modified: Date.now(),
              })
            : x
        );
        const content = this.contentStore.get(e.path);
        if (content !== undefined) {
          this.contentStore.delete(e.path);
          this.contentStore.set(newPath, content);
        }
      }
    };

    for (const src of params.sources) {
      const e = this.findByPath(src);
      if (e) moveTree(e, destDir);
    }

    this.replaceAll(next);
    return this.resultForDir(destDir);
  }

  async archive(params: ArchiveParams): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.items, 'items');
    this.validateParam(params.name, 'name');
    const zipName = params.name.endsWith('.zip') ? params.name : `${params.name}.zip`;
    const file = this.makeFileEntry(params.path, zipName, 0, 'application/zip');
    this.upsert(file);
    return this.resultForDir(params.path);
  }

  async unarchive(params: { item: string; path: string }): Promise<FileOperationResult> {
    this.validateParam(params.item, 'item');
    this.validateParam(params.path, 'path');
    const entry = this.findByPath(params.item);
    if (!entry) throw new Error('Archive not found');
    const base = entry.basename.replace(/\.zip$/i, '');
    const dirEntry = this.makeDirEntry(params.path, base);
    this.upsert(dirEntry);
    return this.resultForDir(params.path);
  }

  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const file = this.makeFileEntry(params.path, params.name, 0, null);
    this.upsert(file);
    this.contentStore.set(file.path, '');
    return this.resultForDir(params.path);
  }

  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const dir = this.makeDirEntry(params.path, params.name);
    this.upsert(dir);
    return this.resultForDir(params.path);
  }

  getPreviewUrl(_params: { path: string }): string {
    return '';
  }

  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validatePath(params.path);
    const value = this.contentStore.get(params.path);
    if (typeof value === 'string' || value === undefined) {
      return { content: value ?? '', mimeType: this.findByPath(params.path)?.mime_type || undefined };
    }
    const bytes = new Uint8Array(value);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const base64 = btoa(binary);
    return { content: base64, mimeType: this.findByPath(params.path)?.mime_type || undefined };
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
    return this.files.filter((e) => {
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
    const entry = this.findByPath(params.path);
    if (!entry) throw new Error('File not found');
    if (entry.type !== 'file') throw new Error('Can only save file content');
    this.contentStore.set(params.path, params.content);
    this.upsert(this.cloneEntry(entry, { file_size: params.content.length, last_modified: Date.now() }));
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
    });
  }
}


