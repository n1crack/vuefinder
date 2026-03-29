import { type Ref } from 'vue';
export declare const QUEUE_ENTRY_STATUS: {
    readonly PENDING: 0;
    readonly CANCELED: 1;
    readonly UPLOADING: 2;
    readonly ERROR: 3;
    readonly DONE: 10;
};
export type QueueEntryStatus = (typeof QUEUE_ENTRY_STATUS)[keyof typeof QUEUE_ENTRY_STATUS];
export interface QueueEntry {
    id: string;
    name: string;
    size: string;
    status: QueueEntryStatus;
    statusName: string;
    percent: string | null;
    originalFile: File;
}
export interface UseUploadReturn {
    container: Ref<HTMLElement | null>;
    internalFileInput: Ref<HTMLInputElement | null>;
    internalFolderInput: Ref<HTMLInputElement | null>;
    pickFiles: Ref<HTMLElement | null>;
    pickFolders: Ref<HTMLElement | null>;
    queue: Ref<QueueEntry[]>;
    message: Ref<string>;
    uploading: Ref<boolean>;
    hasFilesInDropArea: Ref<boolean>;
    definitions: Ref<{
        QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS;
    }>;
    openFileSelector: () => void;
    upload: (targetFolder?: any) => void;
    cancel: () => void;
    remove: (file: QueueEntry) => void;
    clear: (onlySuccessful: boolean) => void;
    close: () => void;
    getClassNameForEntry: (entry: QueueEntry) => string;
    getIconForEntry: (entry: QueueEntry) => string;
    addExternalFiles: (files: File[]) => void;
}
export default function useUpload(customUploader?: any): UseUploadReturn;
