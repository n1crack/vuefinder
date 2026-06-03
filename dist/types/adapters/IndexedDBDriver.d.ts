import { BaseAdapter } from './Adapter';
import type { DeleteParams, DeleteResult, FileOperationResult, FileContentResult, ArchiveParams, UnarchiveParams, SaveParams, RenameParams, TransferParams, UploaderContext, ListParams, SearchParams, GetContentParams } from './types';
import type { DirEntry, FsData } from '../types';
export interface IndexedDBDriverConfig {
    dbName?: string;
    storage?: string;
    storages?: string[];
    readOnly?: boolean;
    version?: number;
}
export declare class IndexedDBDriver extends BaseAdapter {
    private dbName;
    private defaultStorage;
    private storages;
    private storagesSet;
    private readOnly;
    private version;
    private db;
    private dbPromise;
    private entries;
    private contentStore;
    private driver;
    private readyPromise;
    constructor(config?: IndexedDBDriverConfig);
    private isManagedStorage;
    private isManagedPath;
    private initDB;
    private getDB;
    private requestToPromise;
    private waitTransaction;
    private loadSnapshotFromDB;
    private persistSnapshot;
    private ensureReady;
    list(params?: ListParams): Promise<FsData>;
    delete(params: DeleteParams): Promise<DeleteResult>;
    rename(params: RenameParams): Promise<FileOperationResult>;
    copy(params: TransferParams): Promise<FileOperationResult>;
    move(params: TransferParams): Promise<FileOperationResult>;
    archive(params: ArchiveParams): Promise<FileOperationResult>;
    unarchive(params: UnarchiveParams): Promise<FileOperationResult>;
    createFile(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    createFolder(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    getPreviewUrl(params: {
        path: string;
    }): string;
    getContent(params: GetContentParams): Promise<FileContentResult>;
    getDownloadUrl(params: {
        path: string;
    }): string;
    search(params: SearchParams): Promise<DirEntry[]>;
    save(params: SaveParams): Promise<string>;
    configureUploader?(uppy: any, context: UploaderContext): void;
}
