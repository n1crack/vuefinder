/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject, onMounted, ref, type Ref} from 'vue';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import {parse} from '@/utils/filesize';

export const QUEUE_ENTRY_STATUS = {
    PENDING: 0,
    CANCELED: 1,
    UPLOADING: 2,
    ERROR: 3,
    DONE: 10,
} as const;

export type QueueEntryStatus = typeof QUEUE_ENTRY_STATUS[keyof typeof QUEUE_ENTRY_STATUS];

export interface QueueEntry {
    id: string;
    name: string;
    size: string;
    status: QueueEntryStatus;
    statusName: string;
    percent: string | null;
    originalFile: File;
}

export interface UseUploadDefinitions {
    QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS;
}

export interface UseUploadReturn {
    // DOM refs
    container: Ref<HTMLElement | null>;
    internalFileInput: Ref<HTMLInputElement | null>;
    internalFolderInput: Ref<HTMLInputElement | null>;
    pickFiles: Ref<HTMLElement | null>;
    pickFolders: Ref<HTMLElement | null>;
    dropArea: Ref<HTMLElement | null>;
    // state
    queue: Ref<QueueEntry[]>;
    message: Ref<string>;
    uploading: Ref<boolean>;
    hasFilesInDropArea: Ref<boolean>;
    // helpers
    definitions: Ref<UseUploadDefinitions>;
    // actions
    openFileSelector: () => void;
    upload: () => void;
    cancel: () => void;
    remove: (file: QueueEntry) => void;
    clear: (onlySuccessful: boolean) => void;
    close: () => void;
    getClassNameForEntry: (entry: QueueEntry) => string;
    getIconForEntry: (entry: QueueEntry) => string;
}

export default function useUpload(): UseUploadReturn {
    const app: any = inject('ServiceContainer');
    const {t} = app.i18n;

    const definitions = ref<UseUploadDefinitions>({QUEUE_ENTRY_STATUS});

    const container = ref<HTMLElement | null>(null);
    const internalFileInput = ref<HTMLInputElement | null>(null);
    const internalFolderInput = ref<HTMLInputElement | null>(null);
    const pickFiles = ref<HTMLElement | null>(null);
    const pickFolders = ref<HTMLElement | null>(null);
    const dropArea = ref<HTMLElement | null>(null);
    const queue = ref<QueueEntry[]>([]);
    const message = ref<string>('');
    const uploading = ref<boolean>(false);
    const hasFilesInDropArea = ref<boolean>(false);

    let uppy: any;

    function findQueueEntryIndexById(id: string): number {
        return queue.value.findIndex((item) => item.id === id);
    }

    function addFile(file: File, name: string | null = null) {
        const finalName = name != null ? name : ((file as any).webkitRelativePath || file.name);
        uppy.addFile({
            name: finalName,
            type: file.type,
            data: file,
            source: 'Local',
        });
    }

    function getClassNameForEntry(entry: QueueEntry): string {
        switch (entry.status) {
            case QUEUE_ENTRY_STATUS.DONE:
                return 'text-green-600'
            case QUEUE_ENTRY_STATUS.ERROR:
            case QUEUE_ENTRY_STATUS.CANCELED:
                return 'text-red-600';
            case QUEUE_ENTRY_STATUS.PENDING:
            default:
                return '';
        }
    }

    const getIconForEntry = (entry: QueueEntry): string => {
        switch (entry.status) {
            case QUEUE_ENTRY_STATUS.DONE:
                return '✓'
            case QUEUE_ENTRY_STATUS.ERROR:
            case QUEUE_ENTRY_STATUS.CANCELED:
                return '!';
            case QUEUE_ENTRY_STATUS.PENDING:
            default:
                return '...';
        }
    }

    function openFileSelector() {
        pickFiles.value?.click();
    }

    function upload() {
        if (uploading.value) return;
        if (!queue.value.filter(entry => entry.status !== QUEUE_ENTRY_STATUS.DONE).length) {
            message.value = t('Please select file to upload first.');
            return;
        }
        message.value = '';
        uppy.retryAll();
        uppy.upload();
    }

    function cancel() {
        (uppy as any).cancelAll({reason: 'user'});
        queue.value.forEach(entry => {
            if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
                entry.status = QUEUE_ENTRY_STATUS.CANCELED;
                entry.statusName = t('Canceled');
            }
        });
        uploading.value = false;
    }

    function remove(file: QueueEntry) {
        if (uploading.value) return;
        (uppy as any).removeFile(file.id, 'removed-by-user');
        queue.value.splice(findQueueEntryIndexById(file.id), 1);
    }

    function clear(onlySuccessful: boolean) {
        if (uploading.value) return;
        (uppy as any).cancelAll({reason: 'user'});
        if (onlySuccessful) {
            const retryQueue: QueueEntry[] = [];
            queue.value.forEach(entry => {
                if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
                    retryQueue.push(entry);
                }
            });
            queue.value = [];
            retryQueue.forEach(entry => {
                addFile(entry.originalFile, entry.name);
            });
            return;
        }
        queue.value.splice(0);
    }

    function close() {
        app.modal.close();
    }

    function buildReqParams() {
        return app.requester.transformRequestParams({
            url: '',
            method: 'post',
            params: {q: 'upload', adapter: app.fs.adapter, path: app.fs.data.dirname},
        });
    }

    onMounted(async () => {
        const uppyLocale = app.i18n.t("uppy");
        uppy = new Uppy({
            debug: app.debug,
            restrictions: {
                maxFileSize: parse(app.maxFileSize),
            },
            locale: uppyLocale,
            onBeforeFileAdded(file: any, files: Record<string, any>) {
                const duplicated = files[file.id] != null;
                if (duplicated) {
                    const i = findQueueEntryIndexById(file.id);
                    if (queue.value[i]?.status === QUEUE_ENTRY_STATUS.PENDING) {
                        // Undocumented, as long as uppy don't change this we are good.
                        message.value = uppy.i18n('noDuplicates', {fileName: file.name});
                    }
                    queue.value = queue.value.filter(entry => entry.id !== file.id);
                }
                queue.value.push({
                    id: file.id,
                    name: file.name,
                    size: app.filesize(file.size),
                    status: QUEUE_ENTRY_STATUS.PENDING,
                    statusName: t('Pending upload'),
                    percent: null,
                    originalFile: file.data,
                });
                return true;
            }
        });

        uppy.use(XHR as any, {
            endpoint: 'WILL_BE_REPLACED_BEFORE_UPLOAD',
            limit: 5,
            timeout: 0,
            getResponseError(responseText: string) {
                let msg: string;
                try {
                    const body = JSON.parse(responseText);
                    msg = body.message;
                } catch {
                    msg = t('Cannot parse server response.');
                }
                return new Error(msg);
            },
        } as any);

        uppy.on('restriction-failed', (upFile: any, error: { message: string }) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (entry) remove(entry);
            message.value = error.message;
        });

        uppy.on('upload', () => {
            const reqParams = buildReqParams();
            uppy.setMeta({...reqParams.body});
            const xhrPlugin: any = uppy.getPlugin('XHRUpload');
            if (xhrPlugin) {
                xhrPlugin.opts.method = reqParams.method;
                xhrPlugin.opts.endpoint = reqParams.url + '?' + new URLSearchParams(reqParams.params as Record<string, string>);
                xhrPlugin.opts.headers = reqParams.headers;
            }
            delete reqParams.headers['Content-Type'];
            uploading.value = true;
            queue.value.forEach(file => {
                if (file.status === QUEUE_ENTRY_STATUS.DONE) return;
                file.percent = null;
                file.status = QUEUE_ENTRY_STATUS.UPLOADING;
                file.statusName = t('Pending upload');
            });
        });

        uppy.on('upload-progress', (upFile: any, progress: { bytesUploaded: number; bytesTotal: number | null }) => {
            const total = progress.bytesTotal ?? 1;
            const p = Math.floor(progress.bytesUploaded / total * 100);
            const idx = findQueueEntryIndexById(upFile.id);
            if (idx !== -1) queue.value[idx].percent = `${p}%`;
        });

        uppy.on('upload-success', (upFile: any) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (!entry) return;
            entry.status = QUEUE_ENTRY_STATUS.DONE;
            entry.statusName = t('Done');
        });

        uppy.on('upload-error', (upFile: any, error: any) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (!entry) return;
            entry.percent = null;
            entry.status = QUEUE_ENTRY_STATUS.ERROR;
            // noinspection JSUnresolvedReference
            if (error && error.isNetworkError) {
                entry.statusName = t(`Network Error, Unable establish connection to the server or interrupted.`);
            } else {
                entry.statusName = error ? error.message : t('Unknown Error');
            }
        });

        uppy.on('error', (error: any) => {
            message.value = error.message;
            uploading.value = false;
            app.emitter.emit('vf-fetch', {
                params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname},
                noCloseModal: true,
            });
        })

        uppy.on('complete', () => {
            uploading.value = false;
            app.emitter.emit('vf-fetch', {
                params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname},
                noCloseModal: true,
            });
        });

        pickFiles.value?.addEventListener('click', () => {
            internalFileInput.value?.click();
        });
        pickFolders.value?.addEventListener('click', () => {
            internalFolderInput.value?.click();
        });

        dropArea.value?.addEventListener('dragover', ev => {
            ev.preventDefault();
            hasFilesInDropArea.value = true;
        });
        dropArea.value?.addEventListener('dragleave', ev => {
            ev.preventDefault();
            hasFilesInDropArea.value = false;
        });

        function scanFiles(resultCallback: (entry: any, file: File) => void, item: any) {
            if (item.isFile) {
                item.file((f: File) => resultCallback(item, f));
            }
            if (item.isDirectory) {
                item.createReader().readEntries((entries: any[]) => {
                    entries.forEach((entry: any) => {
                        scanFiles(resultCallback, entry);
                    });
                });
            }
        }

        dropArea.value?.addEventListener('drop', ev => {
            ev.preventDefault();
            hasFilesInDropArea.value = false;
            const trimFileName = /^[/\\](.+)/;
            const items = ev.dataTransfer?.items;
            if (!items) return;
            // DataTransferItemList is array-like
            Array.from(items).forEach((item) => {
                if (item.kind === 'file') {
                    scanFiles((entry: any, file: File) => {
                        const matched = trimFileName.exec(entry.fullPath as string);
                        addFile(file, matched ? matched[1] : file.name);
                    }, item.webkitGetAsEntry());
                }
            });
        });

        const onFileInputChange = ({target}: {target: HTMLInputElement}) => {
            const files = target.files;
            if (!files) return;
            for (const file of files) {
                addFile(file);
            }
            target.value = '';
        };

        internalFileInput.value?.addEventListener('change', onFileInputChange as unknown as EventListener);
        internalFolderInput.value?.addEventListener('change', onFileInputChange as unknown as EventListener);
    });

    return {
        container,
        internalFileInput,
        internalFolderInput,
        pickFiles,
        pickFolders,
        dropArea,
        queue,
        message,
        uploading,
        hasFilesInDropArea,
        definitions,
        openFileSelector,
        upload,
        cancel,
        remove,
        clear,
        close,
        getClassNameForEntry,
        getIconForEntry,
    };
}
