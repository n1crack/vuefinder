import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useApp } from '../composables/useApp';
import Uppy from '@uppy/core';
import { parse } from '../utils/filesize';
import { useStore } from '@nanostores/vue';
import { scanFiles } from '../utils/scanFiles';
import type { CurrentPathState } from '../stores/files';
import type { StoreValue } from 'nanostores';

export const QUEUE_ENTRY_STATUS = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10,
} as const;
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
  definitions: Ref<{ QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS }>;
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

export default function useUpload(customUploader?: any): UseUploadReturn {
  const app = useApp();
  const { t } = app.i18n;
  const fs = app.fs;
  const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);
  const config = app.config;
  const definitions = ref({ QUEUE_ENTRY_STATUS });
  const container = ref<HTMLElement | null>(null);
  const internalFileInput = ref<HTMLInputElement | null>(null);
  const internalFolderInput = ref<HTMLInputElement | null>(null);
  const pickFiles = ref<HTMLElement | null>(null);
  const pickFolders = ref<HTMLElement | null>(null);

  const queue = ref<QueueEntry[]>([]);
  const message = ref('');
  const uploading = ref(false);
  const hasFilesInDropArea = ref(false);
  const uploadTargetFolder = ref<any>(null);

  let uppy: Uppy;

  // Document-level drag event handlers
  const handleDocumentDragOver = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = true;
  };
  const handleDocumentDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = true;
  };

  const handleDocumentDragLeave = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    // Only hide if leaving the document completely
    if (!ev.relatedTarget || ev.relatedTarget === document.body) {
      hasFilesInDropArea.value = false;
    }
  };

  const handleDocumentDrop = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = false;

    // Always accept files when upload modal is open
    const trimFileName = /^[/\\](.+)/;
    const dt = ev.dataTransfer;
    if (!dt) return;

    // Prefer items for folder support; fallback to files
    if (dt.items && dt.items.length) {
      Array.from(dt.items).forEach((item) => {
        if (item.kind === 'file') {
          const getAsEntry = (item as any).webkitGetAsEntry?.();
          if (getAsEntry) {
            scanFiles((entry: any, file: File) => {
              const matched = trimFileName.exec((entry?.fullPath as string) || '');
              addFile(file, matched ? matched[1] : file.name);
            }, getAsEntry);
          } else {
            const f = item.getAsFile?.();
            if (f) addFile(f);
          }
        }
      });
    } else if (dt.files && dt.files.length) {
      Array.from(dt.files).forEach((file) => addFile(file));
    }
  };

  const findQueueEntryIndexById = (id: string) => queue.value.findIndex((item) => item.id === id);
  const addFile = (file: File, name?: string) =>
    uppy.addFile({ name: name || file.name, type: file.type, data: file, source: 'Local' });
  const getClassNameForEntry = (entry: QueueEntry) =>
    entry.status === QUEUE_ENTRY_STATUS.DONE
      ? 'text-green-600'
      : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED
        ? 'text-red-600'
        : '';
  const getIconForEntry = (entry: QueueEntry) =>
    entry.status === QUEUE_ENTRY_STATUS.DONE
      ? '✓'
      : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED
        ? '!'
        : '...';
  const openFileSelector = () => pickFiles.value?.click();
  const close = () => app.modal.close();

  const upload = (targetFolder?: any) => {
    if (
      uploading.value ||
      !queue.value.filter((entry) => entry.status !== QUEUE_ENTRY_STATUS.DONE).length
    ) {
      if (!uploading.value) message.value = t('Please select file to upload first.');
      return;
    }
    message.value = '';

    // Store the target folder for use in the upload event handler
    uploadTargetFolder.value = targetFolder || currentPath.value;

    // will look into retrying failed uploads later
    // uppy.retryAll();
    uppy.upload();
  };

  const cancel = () => {
    uppy.cancelAll();
    queue.value.forEach((entry) => {
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
      const retryQueue = queue.value.filter((entry) => entry.status !== QUEUE_ENTRY_STATUS.DONE);
      queue.value = [];
      retryQueue.forEach((entry) => addFile(entry.originalFile, entry.name));
    } else {
      queue.value = [];
    }
  };

  const addExternalFiles = (files: File[]) => {
    files.forEach((file) => {
      addFile(file);
    });
  };

  onMounted(() => {
    uppy = new Uppy({
      debug: app.debug,
      restrictions: { maxFileSize: parse(config.maxFileSize ?? '10mb') },
      locale: app.i18n.t('uppy'),
      onBeforeFileAdded: (file: any, files: any) => {
        const duplicated = files[file.id] != null;
        if (duplicated) {
          const i = findQueueEntryIndexById(file.id);
          if (queue.value[i]?.status === QUEUE_ENTRY_STATUS.PENDING) {
            message.value = uppy.i18n('noDuplicates', { fileName: file.name });
          }
          queue.value = queue.value.filter((entry) => entry.id !== file.id);
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
      },
    });

    const context = {
      getTargetPath: () => {
        const target = uploadTargetFolder.value || currentPath.value;
        return target.path;
      },
    };

    if (customUploader) {
      customUploader(uppy, context);
    } else if (app.adapter.getAdapter().configureUploader) {
      app.adapter.getAdapter().configureUploader(uppy, context);
    } else {
      throw new Error('No uploader configured');
    }

    uppy.on('restriction-failed', (upFile: any, error: any) => {
      const entry = queue.value[findQueueEntryIndexById(upFile.id)];
      if (entry) remove(entry);
      message.value = error.message;
    });

    uppy.on('upload-progress', (upFile: any, progress: any) => {
      const total = progress.bytesTotal ?? 1;
      const p = Math.floor((progress.bytesUploaded / total) * 100);
      const idx = findQueueEntryIndexById(upFile.id);
      if (idx !== -1 && queue.value[idx]) {
        queue.value[idx].percent = `${p}%`;
      }
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
      entry.statusName = error?.isNetworkError
        ? t('Network Error, Unable establish connection to the server or interrupted.')
        : error?.message || t('Unknown Error');
    });

    uppy.on('error', (error: any) => {
      message.value = error.message;
      uploading.value = false;
      app.adapter.open(currentPath.value.path);
    });

    uppy.on('complete', () => {
      uploading.value = false;

      // Use the target folder for refreshing the file list
      const targetPath = uploadTargetFolder.value || currentPath.value;

      // Refresh the target folder and emit upload complete
      app.adapter.invalidateListQuery(targetPath.path);
      app.adapter.open(targetPath.path);

      // Get uploaded file names from queue
      const uploadedFiles = queue.value
        .filter((entry) => entry.status === QUEUE_ENTRY_STATUS.DONE)
        .map((entry) => entry.name);
      app.emitter.emit('vf-upload-complete', uploadedFiles);
    });

    // Event listeners
    pickFiles.value?.addEventListener('click', () => internalFileInput.value?.click());
    pickFolders.value?.addEventListener('click', () => internalFolderInput.value?.click());

    // Add document-level listeners
    const listenerOptions: AddEventListenerOptions | boolean = { capture: true };
    document.addEventListener('dragover', handleDocumentDragOver, listenerOptions);
    document.addEventListener('dragenter', handleDocumentDragEnter, listenerOptions);
    document.addEventListener('dragleave', handleDocumentDragLeave, listenerOptions);
    document.addEventListener('drop', handleDocumentDrop, listenerOptions);

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

  // Cleanup on unmount
  onUnmounted(() => {
    const listenerOptions: AddEventListenerOptions | boolean = { capture: true };
    document.removeEventListener('dragover', handleDocumentDragOver, listenerOptions);
    document.removeEventListener('dragenter', handleDocumentDragEnter, listenerOptions);
    document.removeEventListener('dragleave', handleDocumentDragLeave, listenerOptions);
    document.removeEventListener('drop', handleDocumentDrop, listenerOptions);
  });

  return {
    container,
    internalFileInput,
    internalFolderInput,
    pickFiles,
    pickFolders,
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
    addExternalFiles,
  };
}
