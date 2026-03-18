import { BaseAdapter } from './Adapter';
import type { DeleteParams, DeleteResult, FileOperationResult, FileContentResult, ArchiveParams, SaveParams, RenameParams, TransferParams, UploaderContext } from './types';
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
    getPreviewUrl(params: {
        path: string;
    }): string;
    getContent(params: {
        path: string;
    }): Promise<FileContentResult>;
    getDownloadUrl(params: {
        path: string;
    }): string;
    search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: 'all' | 'small' | 'medium' | 'large';
    }): Promise<DirEntry[]>;
    save(params: SaveParams): Promise<string>;
    configureUploader?(uppy: any, context: UploaderContext): void;
}
