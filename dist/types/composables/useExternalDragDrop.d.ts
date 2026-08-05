export interface ExternalFile {
    name: string;
    size: number;
    type: string;
    lastModified: Date;
    file: File;
    /** Path relative to the drop, e.g. "my-folder/sub/file.txt". */
    path: string;
}
export declare function useExternalDragDrop(): {
    isDraggingExternal: import("vue").Ref<boolean, boolean>;
    externalFiles: import("vue").Ref<{
        name: string;
        size: number;
        type: string;
        lastModified: Date;
        file: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array<ArrayBuffer>>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
            text: () => Promise<string>;
        };
        path: string;
    }[], ExternalFile[] | {
        name: string;
        size: number;
        type: string;
        lastModified: Date;
        file: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array<ArrayBuffer>>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
            text: () => Promise<string>;
        };
        path: string;
    }[]>;
    handleDragEnter: (e: DragEvent) => void;
    handleDragOver: (e: DragEvent) => void;
    handleDragLeave: (e: DragEvent) => void;
    handleDrop: (e: DragEvent) => Promise<{
        name: string;
        size: number;
        type: string;
        lastModified: Date;
        file: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array<ArrayBuffer>>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
            text: () => Promise<string>;
        };
        path: string;
    }[]>;
    clearExternalFiles: () => void;
};
