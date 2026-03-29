import { BaseAdapter } from './Adapter';
import type { DeleteParams, DeleteResult, FileOperationResult, FileContentResult, ArchiveParams, SaveParams, RenameParams, TransferParams } from './types';
import type { DirEntry, FsData } from '../types';
type FilesSource = {
    value: DirEntry[];
} | DirEntry[];
export interface ArrayDriverConfig {
    files: FilesSource;
    storage?: string;
    storages?: string[];
    readOnly?: boolean;
    contentStore?: Map<string, string | ArrayBuffer>;
}
export declare class ArrayDriver extends BaseAdapter {
    private filesSource;
    private defaultStorage;
    private storages;
    private storagesSet;
    private readOnly;
    private contentStore;
    constructor(config: ArrayDriverConfig);
    private get files();
    private set files(value);
    private ensureWritable;
    private ensureStorageSupported;
    private combine;
    private split;
    private normalizePath;
    private parent;
    private join;
    private getExtension;
    private cloneEntry;
    private findByPath;
    private listChildren;
    private replaceAll;
    private upsert;
    private removeExact;
    private removeTree;
    private isInTree;
    private getTree;
    private uniqueName;
    private topLevelSources;
    private makeDirEntry;
    private makeFileEntry;
    private resultForDir;
    list(params?: {
        path?: string;
    }): Promise<FsData>;
    delete(params: DeleteParams): Promise<DeleteResult>;
    rename(params: RenameParams): Promise<FileOperationResult>;
    copy(params: TransferParams): Promise<FileOperationResult>;
    move(params: TransferParams): Promise<FileOperationResult>;
    archive(params: ArchiveParams): Promise<FileOperationResult>;
    unarchive(params: {
        item: string;
        path: string;
    }): Promise<FileOperationResult>;
    createFile(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    createFolder(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    getPreviewUrl(_params: {
        path: string;
    }): string;
    getContent(params: {
        path: string;
    }): Promise<FileContentResult>;
    getDownloadUrl(_params: {
        path: string;
    }): string;
    search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: 'all' | 'small' | 'medium' | 'large';
    }): Promise<DirEntry[]>;
    save(params: SaveParams): Promise<string>;
    configureUploader?(uppy: any, context: {
        getTargetPath: () => string;
    }): void;
}
export {};
