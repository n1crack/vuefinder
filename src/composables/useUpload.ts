import {inject, onMounted, ref, type Ref} from 'vue';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import {parse} from '../utils/filesize';
import { useStore } from '@nanostores/vue';

export const QUEUE_ENTRY_STATUS = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 } as const;
export type QueueEntryStatus = typeof QUEUE_ENTRY_STATUS[keyof typeof QUEUE_ENTRY_STATUS];

export interface QueueEntry {
    id: string; name: string; size: string; status: QueueEntryStatus; statusName: string; percent: string | null; originalFile: File;
}

export interface UseUploadReturn {
    container: Ref<HTMLElement | null>; internalFileInput: Ref<HTMLInputElement | null>; internalFolderInput: Ref<HTMLInputElement | null>;
    pickFiles: Ref<HTMLElement | null>; pickFolders: Ref<HTMLElement | null>; dropArea: Ref<HTMLElement | null>;
    queue: Ref<QueueEntry[]>; message: Ref<string>; uploading: Ref<boolean>; hasFilesInDropArea: Ref<boolean>;
    definitions: Ref<{QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS}>;
    openFileSelector: () => void; upload: () => void; cancel: () => void; remove: (file: QueueEntry) => void;
    clear: (onlySuccessful: boolean) => void; close: () => void;
    getClassNameForEntry: (entry: QueueEntry) => string; getIconForEntry: (entry: QueueEntry) => string;
}

export default function useUpload(): UseUploadReturn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app: any = inject('ServiceContainer');
    const {t} = app.i18n;
    const fs = app.fs;
    const currentPath = useStore(fs.path);
    const config = app.config;
    const definitions = ref({QUEUE_ENTRY_STATUS});
    const container = ref<HTMLElement | null>(null);
    const internalFileInput = ref<HTMLInputElement | null>(null);
    const internalFolderInput = ref<HTMLInputElement | null>(null);
    const pickFiles = ref<HTMLElement | null>(null);
    const pickFolders = ref<HTMLElement | null>(null);
    const dropArea = ref<HTMLElement | null>(null);
    const queue = ref<QueueEntry[]>([]);
    const message = ref('');
    const uploading = ref(false);
    const hasFilesInDropArea = ref(false);

    let uppy: Uppy;

    const findQueueEntryIndexById = (id: string) => queue.value.findIndex(item => item.id === id);
    const addFile = (file: File, name?: string) => uppy.addFile({ name: name || file.name, type: file.type, data: file, source: 'Local' });
    const getClassNameForEntry = (entry: QueueEntry) => entry.status === QUEUE_ENTRY_STATUS.DONE ? 'text-green-600' : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED ? 'text-red-600' : '';
    const getIconForEntry = (entry: QueueEntry) => entry.status === QUEUE_ENTRY_STATUS.DONE ? '✓' : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED ? '!' : '...';
    const openFileSelector = () => pickFiles.value?.click();
    const close = () => app.modal.close();

    const upload = () => {
        if (uploading.value || !queue.value.filter(entry => entry.status !== QUEUE_ENTRY_STATUS.DONE).length) {
            if (!uploading.value) message.value = t('Please select file to upload first.');
            return;
        }
        message.value = '';
        uppy.retryAll();
        uppy.upload();
    };

    const cancel = () => {
        uppy.cancelAll();
        queue.value.forEach(entry => {
            if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
                entry.status = QUEUE_ENTRY_STATUS.CANCELED;
                entry.statusName = t('Canceled');
            }
        });
        uploading.value = false;
    };

    const remove = (file: QueueEntry) => {
        if (uploading.value) return;
        uppy.removeFile(file.id);
        queue.value.splice(findQueueEntryIndexById(file.id), 1);
    };

    const clear = (onlySuccessful: boolean) => {
        if (uploading.value) return;
        uppy.cancelAll();
        if (onlySuccessful) {
            const retryQueue = queue.value.filter(entry => entry.status !== QUEUE_ENTRY_STATUS.DONE);
            queue.value = [];
            retryQueue.forEach(entry => addFile(entry.originalFile, entry.name));
        } else {
            queue.value = [];
        }
    };

    onMounted(() => {
        uppy = new Uppy({
            debug: app.debug,
            restrictions: { maxFileSize: parse(config.maxFileSize ?? '10mb') },
            locale: app.i18n.t("uppy"),
            onBeforeFileAdded: (file: any, files: any) => {
                const duplicated = files[file.id] != null;
                if (duplicated) {
                    const i = findQueueEntryIndexById(file.id);
                    if (queue.value[i]?.status === QUEUE_ENTRY_STATUS.PENDING) {
                        message.value = uppy.i18n('noDuplicates', {fileName: file.name});
                    }
                    queue.value = queue.value.filter(entry => entry.id !== file.id);
                }
                queue.value.push({
                    id: file.id, name: file.name, size: app.filesize(file.size),
                    status: QUEUE_ENTRY_STATUS.PENDING, statusName: t('Pending upload'),
                    percent: null, originalFile: file.data,
                });
                return true;
            }
        });

        uppy.use(XHR, {
            endpoint: 'WILL_BE_REPLACED_BEFORE_UPLOAD',
            limit: 5,
            timeout: 0,
        });

        uppy.on('restriction-failed', (upFile: any, error: any) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (entry) remove(entry);
            message.value = error.message;
        });

        uppy.on('upload', () => {
            
            const reqParams = app.requester.transformRequestParams({
                url: '', method: 'post', params: {
                    q: 'upload', 
                    storage: currentPath.value.storage, 
                    path: currentPath.value.path
                },
            });
            uppy.setMeta({...reqParams.body});
            const xhrPlugin = uppy.getPlugin('XHRUpload');
            if (xhrPlugin) {
                xhrPlugin.opts.method = reqParams.method;
                xhrPlugin.opts.endpoint = reqParams.url + '?' + new URLSearchParams(reqParams.params);
                xhrPlugin.opts.headers = reqParams.headers;
            }
            delete reqParams.headers['Content-Type'];
            uploading.value = true;
            queue.value.forEach(file => {
                if (file.status === QUEUE_ENTRY_STATUS.DONE) return;
                file.percent = null; file.status = QUEUE_ENTRY_STATUS.UPLOADING; file.statusName = t('Pending upload');
            });
        });

        uppy.on('upload-progress', (upFile: any, progress: any) => {
            const total = progress.bytesTotal ?? 1;
            const p = Math.floor(progress.bytesUploaded / total * 100);
            const idx = findQueueEntryIndexById(upFile.id);
            if (idx !== -1 && queue.value[idx]) {
                queue.value[idx].percent = `${p}%`;
            }
        });

        uppy.on('upload-success', (upFile: any) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (!entry) return;
            entry.status = QUEUE_ENTRY_STATUS.DONE; entry.statusName = t('Done');
        });

        uppy.on('upload-error', (upFile: any, error: any) => {
            const entry = queue.value[findQueueEntryIndexById(upFile.id)];
            if (!entry) return;
            entry.percent = null; entry.status = QUEUE_ENTRY_STATUS.ERROR;
            entry.statusName = error?.isNetworkError ? t('Network Error, Unable establish connection to the server or interrupted.') : error?.message || t('Unknown Error');
        });

        uppy.on('error', (error: any) => {
            message.value = error.message; uploading.value = false;
            app.emitter.emit('vf-fetch', { params: {q: 'index'}, noCloseModal: true });
        });

        uppy.on('complete', () => {
            uploading.value = false;

            app.emitter.emit('vf-fetch', { params: {q: 'index', path: currentPath.value.path, storage: currentPath.value.storage}, noCloseModal: true });
        });

        // Event listeners
        pickFiles.value?.addEventListener('click', () => internalFileInput.value?.click());
        pickFolders.value?.addEventListener('click', () => internalFolderInput.value?.click());
        dropArea.value?.addEventListener('dragover', ev => { ev.preventDefault(); hasFilesInDropArea.value = true; });
        dropArea.value?.addEventListener('dragleave', ev => { ev.preventDefault(); hasFilesInDropArea.value = false; });

        const scanFiles = (resultCallback: (entry: any, file: File) => void, item: any) => {
            if (item.isFile) item.file((f: File) => resultCallback(item, f));
            if (item.isDirectory) item.createReader().readEntries((entries: any[]) => entries.forEach((entry: any) => scanFiles(resultCallback, entry)));
        };

        dropArea.value?.addEventListener('drop', ev => {
            ev.preventDefault(); hasFilesInDropArea.value = false;
            const trimFileName = /^[/\\](.+)/;
            const items = ev.dataTransfer?.items;
            if (!items) return;
            Array.from(items).forEach((item) => {
                if (item.kind === 'file') {
                    scanFiles((entry: any, file: File) => {
                        const matched = trimFileName.exec(entry.fullPath as string);
                        addFile(file, matched ? matched[1] : file.name);
                    }, item.webkitGetAsEntry());
                }
            });
        });

        const onFileInputChange = (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const files = target.files;
            if (!files) return;
            for (const file of files) addFile(file);
            target.value = '';
        };

        internalFileInput.value?.addEventListener('change', onFileInputChange);
        internalFolderInput.value?.addEventListener('change', onFileInputChange);
    });

    return {
        container, internalFileInput, internalFolderInput, pickFiles, pickFolders, dropArea,
        queue, message, uploading, hasFilesInDropArea, definitions,
        openFileSelector, upload, cancel, remove, clear, close, getClassNameForEntry, getIconForEntry,
    };
}
