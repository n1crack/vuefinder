import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { useApp } from './useApp';
import { useFeature } from './useFeature';
import type { DirEntry, MenuItem } from '../types';
import { copyPath, copyDownloadUrl } from '../utils/clipboard';
import { entryKey } from '../utils/entryKey';
import ModalNewFolder from '../components/modals/ModalNewFolder.vue';
import ModalNewFile from '../components/modals/ModalNewFile.vue';
import ModalRename from '../components/modals/ModalRename.vue';
import ModalDelete from '../components/modals/ModalDelete.vue';
import ModalUpload from '../components/modals/ModalUpload.vue';
import ModalUnarchive from '../components/modals/ModalUnarchive.vue';
import ModalArchive from '../components/modals/ModalArchive.vue';
import ModalAbout from '../components/modals/ModalAbout.vue';
import ModalMove from '../components/modals/ModalMove.vue';
import ModalCopy from '../components/modals/ModalCopy.vue';
import ModalPreview from '../components/modals/ModalPreview.vue';
import ModalSearch from '../components/modals/ModalSearch.vue';
import ModalSettings from '../components/modals/ModalSettings.vue';
import ModalShortcuts from '../components/modals/ModalShortcuts.vue';
import ModalGoToFolder from '../components/modals/ModalGoToFolder.vue';
import { format as filesizeDefault, metricFormat as filesizeMetric } from '../utils/filesize';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';

/**
 * Default menu bar structure (File/Edit/View/Go/Help) as used by `MenuBar.vue`.
 *
 * Extracted into a composable so the same items (and, importantly, the same
 * modal-opening actions) can be reused to build a custom menu bar layout via
 * `MenuBar`'s slots, without duplicating any business logic.
 */
export function useMenuItems() {
  const app = useApp();
  const { enabled } = useFeature();

  const { t } = app?.i18n || { t: (key: string) => key };

  const fs = app?.fs;
  const config = app?.config;

  const configState: StoreValue<ConfigState> = useStore(config.state);
  const selectedItems: StoreValue<DirEntry[]> = useStore(fs.selectedItems);
  const storages: StoreValue<string[]> = useStore(fs?.storages || []);

  const shouldShowExit = computed(() => {
    const canClose = window.opener !== null || window.name !== '' || window.history.length <= 1;
    return canClose;
  });

  const menuItems = computed<MenuItem[]>(() => [
    {
      id: 'file',
      label: t('File'),
      items: [
        {
          id: 'new-folder',
          label: t('New Folder'),
          action: () => app?.modal?.open(ModalNewFolder, { items: selectedItems.value }),
          hidden: () => !enabled('newfolder'),
        },
        {
          id: 'new-file',
          label: t('New File'),
          action: () => app?.modal?.open(ModalNewFile, { items: selectedItems.value }),
          hidden: () => !enabled('newfile'),
        },
        {
          type: 'separator',
          hidden: () => (!enabled('newfolder') && !enabled('newfile')) || !enabled('upload'),
        },
        {
          id: 'upload',
          label: t('Upload'),
          action: () => app?.modal?.open(ModalUpload, { items: selectedItems.value }),
          hidden: () => !enabled('upload'),
        },
        { type: 'separator', hidden: () => !enabled('search') },
        {
          id: 'search',
          label: t('Search'),
          action: () => app.modal.open(ModalSearch),
          hidden: () => !enabled('search'),
        },
        { type: 'separator', hidden: () => !enabled('archive') && !enabled('unarchive') },
        {
          id: 'archive',
          label: t('Archive'),
          action: () => {
            if (selectedItems.value.length > 0) {
              app?.modal?.open(ModalArchive, { items: selectedItems.value });
            }
          },
          enabled: () => selectedItems.value.length > 0,
          hidden: () => !enabled('archive'),
        },
        {
          id: 'unarchive',
          label: t('Unarchive'),
          action: () => {
            if (
              selectedItems.value.length === 1 &&
              selectedItems.value[0]?.mime_type === 'application/zip'
            ) {
              app?.modal?.open(ModalUnarchive, { items: selectedItems.value });
            }
          },
          enabled: () =>
            selectedItems.value.length === 1 &&
            selectedItems.value[0]?.mime_type === 'application/zip',
          hidden: () => !enabled('unarchive'),
        },
        { type: 'separator', hidden: () => !enabled('preview') },
        {
          id: 'preview',
          label: t('Preview'),
          action: () => {
            if (selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir') {
              app?.modal?.open(ModalPreview, {
                storage: fs?.path?.get()?.storage,
                item: selectedItems.value[0],
              });
            }
          },
          enabled: () => selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
          hidden: () => !enabled('preview'),
        },
        {
          id: 'open-as',
          label: t('Preview as'),
          items: [
            {
              id: 'open-as-text',
              label: t('Text'),
              action: () =>
                app?.modal?.open(ModalPreview, {
                  storage: fs?.path?.get()?.storage,
                  item: selectedItems.value[0],
                  forceType: 'text',
                }),
              enabled: () =>
                selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
            },
            {
              id: 'open-as-image',
              label: t('Image'),
              action: () =>
                app?.modal?.open(ModalPreview, {
                  storage: fs?.path?.get()?.storage,
                  item: selectedItems.value[0],
                  forceType: 'image',
                }),
              enabled: () =>
                selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
            },
          ],
          enabled: () => selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
          hidden: () => !enabled('preview'),
        },
        // Only show exit option if we can actually close the window
        ...(shouldShowExit.value
          ? [
              { type: 'separator' as const },
              {
                id: 'exit',
                label: t('Exit'),
                action: () => {
                  try {
                    window.close();
                  } catch {
                    // Window cannot be closed programmatically
                  }
                },
                enabled: () => true,
              },
            ]
          : []),
      ],
    },
    {
      id: 'edit',
      label: t('Edit'),
      items: [
        // Only show Select All and Deselect All in multiple selection mode
        ...(app?.selectionMode === 'multiple'
          ? [
              {
                id: 'select-all',
                label: t('Select All'),
                action: () =>
                  fs?.selectAll((app?.selectionMode as 'single' | 'multiple') || 'multiple', app),
                enabled: () => true,
              },
              {
                id: 'deselect',
                label: t('Deselect All'),
                action: () => fs?.clearSelection(),
                enabled: () => selectedItems.value.length > 0,
              },
              { type: 'separator' as const },
            ]
          : []),
        ...(enabled('copy')
          ? [
              {
                id: 'cut',
                label: t('Cut'),
                action: () => {
                  if (selectedItems.value.length > 0) {
                    fs?.setClipboard(
                      'cut',
                      new Set(selectedItems.value.map((item: DirEntry) => entryKey(item)))
                    );
                  }
                },
                enabled: () => selectedItems.value.length > 0,
              },
              {
                id: 'copy',
                label: t('Copy'),
                action: () => {
                  if (selectedItems.value.length > 0) {
                    fs?.setClipboard(
                      'copy',
                      new Set(selectedItems.value.map((item: DirEntry) => entryKey(item)))
                    );
                  }
                },
                enabled: () => selectedItems.value.length > 0,
              },
              {
                id: 'paste',
                label: t('Paste'),
                action: () => {
                  const clipboard = fs?.getClipboard();
                  if (clipboard?.items?.size > 0) {
                    app?.modal?.open(clipboard.type === 'cut' ? ModalMove : ModalCopy, {
                      items: { from: Array.from(clipboard.items), to: fs?.path?.get() },
                    });
                  }
                },
                enabled: () => {
                  const clipboard = fs?.getClipboard();
                  return clipboard?.items?.size > 0;
                },
              },
            ]
          : []),
        ...(enabled('move')
          ? [
              {
                id: 'move',
                label: t('Move files'),
                action: () => {
                  if (selectedItems.value.length > 0) {
                    const target = {
                      storage: fs?.path?.get()?.storage || '',
                      path: fs?.path?.get()?.path || '',
                      type: 'dir' as const,
                    };
                    app?.modal?.open(ModalMove, {
                      items: { from: selectedItems.value, to: target },
                    });
                  }
                },
                enabled: () => selectedItems.value.length > 0,
              },
              { type: 'separator' as const },
            ]
          : []),
        {
          id: 'copy-path',
          label: t('Copy Path'),
          action: async () => {
            if (selectedItems.value.length === 1) {
              // Copy selected item's path
              const item = selectedItems.value[0];
              await copyPath(item.path);
            } else {
              // Copy current path if no item selected
              const currentPath = fs?.path?.get();
              if (currentPath?.path) {
                await copyPath(currentPath.path);
              }
            }
          },
          enabled: () => true,
        },
        {
          id: 'copy-download-url',
          label: t('Copy Download URL'),
          action: async () => {
            if (selectedItems.value.length === 1) {
              const item = selectedItems.value[0];
              const downloadUrl = app?.adapter?.getDownloadUrl({ path: item.path });
              if (downloadUrl) {
                await copyDownloadUrl(downloadUrl);
              }
            }
          },
          enabled: () => selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
        },
        { type: 'separator', hidden: () => !enabled('rename') && !enabled('delete') },
        {
          id: 'rename',
          label: t('Rename'),
          action: () => {
            if (selectedItems.value.length === 1) {
              app?.modal?.open(ModalRename, { items: selectedItems.value });
            }
          },
          enabled: () => selectedItems.value.length === 1,
          hidden: () => !enabled('rename'),
        },
        {
          id: 'delete',
          label: t('Delete'),
          action: () => {
            if (selectedItems.value.length > 0) {
              app?.modal?.open(ModalDelete, { items: selectedItems.value });
            }
          },
          enabled: () => selectedItems.value.length > 0,
          hidden: () => !enabled('delete'),
        },
      ],
    },
    {
      id: 'view',
      label: t('View'),
      items: [
        {
          id: 'refresh',
          label: t('Refresh'),
          action: () => {
            app.adapter.invalidateListQuery(fs.path.get().path);
            app.adapter.open(fs.path.get().path);
          },
          enabled: () => true,
        },
        { type: 'separator' },
        {
          id: 'grid-view',
          label: t('Grid View'),
          action: () => config?.set('view', 'grid'),
          enabled: () => true,
          checked: () => configState.value?.view === 'grid',
        },
        {
          id: 'list-view',
          label: t('List View'),
          action: () => config?.set('view', 'list'),
          enabled: () => true,
          checked: () => configState.value?.view === 'list',
        },
        { type: 'separator' },
        {
          id: 'tree-view',
          label: t('Tree View'),
          action: () => config?.toggle('showTreeView'),
          enabled: () => true,
          checked: () => configState.value?.showTreeView,
        },
        {
          id: 'thumbnails',
          label: t('Show Thumbnails'),
          action: () => config?.toggle('showThumbnails'),
          enabled: () => true,
          checked: () => configState.value?.showThumbnails,
        },
        {
          id: 'show-hidden-files',
          label: t('Show Hidden Files'),
          action: () => config?.toggle('showHiddenFiles'),
          enabled: () => true,
          checked: () => configState.value?.showHiddenFiles,
        },
        { type: 'separator', hidden: () => !enabled('fullscreen') },
        {
          id: 'fullscreen',
          label: t('Full Screen'),
          action: () => config?.toggle('fullScreen'),
          enabled: () => enabled('fullscreen'),
          checked: () => configState.value?.fullScreen,
          hidden: () => !enabled('fullscreen'),
        },
        { type: 'separator' },
        {
          id: 'persist-path',
          label: t('Persist Path'),
          action: () => {
            config?.toggle('persist');
            app.emitter.emit('vf-persist-path-saved');
          },
          enabled: () => true,
          checked: () => configState.value?.persist,
        },
        {
          id: 'metric-units',
          label: t('Metric Units'),
          action: () => {
            config?.toggle('metricUnits');
            app.filesize = config?.get('metricUnits') ? filesizeMetric : filesizeDefault;
            app.emitter.emit('vf-metric-units-saved');
          },
          enabled: () => true,
          checked: () => configState.value?.metricUnits,
        },
      ],
    },
    {
      id: 'go',
      label: t('Go'),
      items: [
        ...(enabled('history')
          ? [
              {
                id: 'forward',
                label: t('Forward'),
                action: () => {
                  fs?.goForward();
                  const pathInfo = fs?.path?.get();
                  if (pathInfo?.path) {
                    app?.adapter.open(pathInfo.path);
                  }
                },
                enabled: () => fs?.canGoForward?.get() ?? false,
              },
              {
                id: 'back',
                label: t('Back'),
                action: () => {
                  fs?.goBack();
                  const pathInfo = fs?.path?.get();
                  if (pathInfo?.path) {
                    app?.adapter.open(pathInfo.path);
                  }
                },
                enabled: () => fs?.canGoBack?.get() ?? false,
              },
            ]
          : []),
        {
          id: 'open-containing-folder',
          label: t('Open containing folder'),
          action: () => {
            const pathInfo = fs?.path?.get();

            if (pathInfo?.breadcrumb && pathInfo.breadcrumb.length > 1) {
              // Get parent path from breadcrumb (second to last item)
              const parentBreadcrumb = pathInfo.breadcrumb[pathInfo.breadcrumb.length - 2];
              const parentPath = parentBreadcrumb?.path ?? `${pathInfo.storage}://`;

              app?.adapter.open(parentPath);
            }
          },
          enabled: () => {
            const pathInfo = fs?.path?.get();
            return pathInfo?.breadcrumb && pathInfo.breadcrumb.length > 1;
          },
        },
        { type: 'separator' },
        // Dynamic storage list items will be added here
        ...(storages.value || []).map((storage: string) => ({
          id: `storage-${storage}`,
          label: storage,
          action: () => {
            const storagePath = `${storage}://`;
            app?.adapter.open(storagePath);
          },
          enabled: () => true,
        })),
        { type: 'separator' },
        {
          id: 'go-to-folder',
          label: t('Go to Folder'),
          action: () => app?.modal?.open(ModalGoToFolder),
          enabled: () => true,
        },
      ],
    },

    {
      id: 'help',
      label: t('Help'),
      items: [
        {
          id: 'settings',
          label: t('Settings'),
          action: () => app?.modal?.open(ModalSettings),
          enabled: () => true,
        },
        {
          id: 'shortcuts',
          label: t('Shortcuts'),
          action: () => app?.modal?.open(ModalShortcuts),
          enabled: () => true,
        },
        {
          id: 'about',
          label: t('About'),
          action: () => app?.modal?.open(ModalAbout),
          enabled: () => true,
        },
      ],
    },
  ]);

  return { menuItems, shouldShowExit };
}
