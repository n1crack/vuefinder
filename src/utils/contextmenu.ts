import ModalNewFolder from '../components/modals/ModalNewFolder.vue';
import ModalPreview from '../components/modals/ModalPreview.vue';
import ModalArchive from '../components/modals/ModalArchive.vue';
import ModalUnarchive from '../components/modals/ModalUnarchive.vue';
import ModalRename from '../components/modals/ModalRename.vue';
import ModalDelete from '../components/modals/ModalDelete.vue';
import ModalMove from '../components/modals/ModalMove.vue';
import ModalCopy from '../components/modals/ModalCopy.vue';
import type { App, DirEntry } from '../types';

type TargetKey = 'none' | 'one' | 'many';

export const ContextMenuIds = {
  new_folder: 'new_folder',
  selectAll: 'selectAll',
  pinFolder: 'pinFolder',
  unpinFolder: 'unpinFolder',
  delete: 'delete',
  refresh: 'refresh',
  preview: 'preview',
  open: 'open',
  openDir: 'openDir',
  download: 'download',
  download_archive: 'download_archive',
  archive: 'archive',
  unarchive: 'unarchive',
  rename: 'rename',
  move: 'move',
  copy: 'copy',
  paste: 'paste',
} as const;

export type MenuContext = {
  searchQuery: string;
  items: DirEntry[];
  target: DirEntry | null;
};

export type Item = {
  id: string;
  title: (i18n: App['i18n']) => string;
  action: (app: App, selectedItems: DirEntry[]) => void;
  link?: (app: App, selectedItems: DirEntry[]) => void;
  show: (app: App, ctx: MenuContext) => boolean;
  order?: number;
};

type ShowOptions = {
  needsSearchQuery?: boolean;
  target?: TargetKey;
  targetType?: string;
  mimeType?: string;
  feature?: string;
};

function getTarget(ctx: MenuContext): TargetKey {
  if (ctx.items.length > 1 && ctx.items.some((item) => item.path === ctx.target?.path)) {
    return 'many';
  }
  return ctx.target ? 'one' : 'none';
}

function showIf(options: Partial<ShowOptions>) {
  const merged: ShowOptions = Object.assign(
    {
      needsSearchQuery: false,
    },
    options
  );

  return (app: App, ctx: MenuContext) => {
    if (merged.needsSearchQuery !== !!ctx.searchQuery) return false;
    if (merged.target !== undefined && merged.target !== getTarget(ctx)) return false;
    if (merged.targetType !== undefined && merged.targetType !== ctx.target?.type) return false;
    if (merged.mimeType !== undefined && merged.mimeType !== ctx.target?.mime_type) return false;
    if (merged.feature !== undefined) {
      const features = app.features as Record<string, boolean>;
      if (!(features[merged.feature] ?? false)) return false;
    }
    return true;
  };
}

function showIfAny(...showFns: Item['show'][]): Item['show'] {
  return (app, ctx) => showFns.some((fn) => fn(app, ctx));
}

function showIfAll(...showFns: Item['show'][]): Item['show'] {
  return (app, ctx) => showFns.every((fn) => fn(app, ctx));
}

export const menuItems: Item[] = [
  {
    id: ContextMenuIds.openDir,
    title: ({ t }) => t('Open containing folder'),
    action: (app, selectedItems) => {
      const selectedItem = selectedItems[0];
      if (!selectedItem) {
        return;
      }
      app.adapter.open(selectedItem.dir);
    },
    show: showIf({ target: 'one', needsSearchQuery: true }),
    order: 10,
  },
  {
    id: ContextMenuIds.refresh,
    title: ({ t }) => t('Refresh'),
    action: (app) => {
      const fs = app.fs;
      app.adapter.invalidateListQuery(fs.path.get().path);
      app.adapter.open(fs.path.get().path);
    },
    show: showIfAny(showIf({ target: 'none' }), showIf({ target: 'many' })),
    order: 20,
  },
  {
    id: ContextMenuIds.selectAll,
    title: ({ t }) => t('Select All'),
    action: (app) => {
      const fs = app.fs;
      fs.selectAll(app.selectionMode || 'multiple');
    },
    show: (app, ctx) => {
      // Only show Select All in multiple selection mode
      return app.selectionMode === 'multiple' && showIf({ target: 'none' })(app, ctx);
    },
    order: 30,
  },
  {
    id: ContextMenuIds.new_folder,
    title: ({ t }) => t('New Folder'),
    action: (app) => app.modal.open(ModalNewFolder),
    show: showIf({ target: 'none', feature: 'newfolder' }),
    order: 40,
  },
  {
    id: ContextMenuIds.open,
    title: ({ t }) => t('Open'),
    action: (app, selectedItems) => {
      if (!selectedItems[0]) {
        return;
      }
      app.adapter.open(selectedItems[0].path);
    },
    show: showIf({ target: 'one', targetType: 'dir' }),
    order: 50,
  },
  {
    id: ContextMenuIds.pinFolder,
    title: ({ t }) => t('Pin Folder'),
    action: (app, selectedItems) => {
      const config = app.config;
      const currentPinnedFolders = config.get('pinnedFolders');
      const newPinnedFolders = currentPinnedFolders.concat(
        selectedItems.filter(
          (fav: DirEntry) =>
            currentPinnedFolders.findIndex((item: DirEntry) => item.path === fav.path) === -1
        )
      );
      config.set('pinnedFolders', newPinnedFolders);
    },
    show: showIfAll(showIf({ target: 'one', targetType: 'dir', feature: 'pinned' }), (app, ctx) => {
      const config = app.config;
      const currentPinnedFolders = config.get('pinnedFolders');
      return (
        currentPinnedFolders.findIndex((item: DirEntry) => item.path === ctx.target?.path) === -1
      );
    }),
    order: 60,
  },
  {
    id: ContextMenuIds.unpinFolder,
    title: ({ t }) => t('Unpin Folder'),
    action: (app, selectedItems) => {
      const config = app.config;
      const currentPinnedFolders = config.get('pinnedFolders');
      config.set(
        'pinnedFolders',
        currentPinnedFolders.filter(
          (fav: DirEntry) => !selectedItems.find((item: DirEntry) => item.path === fav.path)
        )
      );
    },
    show: showIfAll(showIf({ target: 'one', targetType: 'dir', feature: 'pinned' }), (app, ctx) => {
      const config = app.config;
      const currentPinnedFolders = config.get('pinnedFolders');
      return (
        currentPinnedFolders.findIndex((item: DirEntry) => item.path === ctx.target?.path) !== -1
      );
    }),
    order: 70,
  },
  {
    id: ContextMenuIds.preview,
    title: ({ t }) => t('Preview'),
    action: (app, selectedItems) =>
      app.modal.open(ModalPreview, { storage: selectedItems[0]?.storage, item: selectedItems[0] }),
    show: showIfAll(
      showIf({ target: 'one', feature: 'preview' }),
      (app, ctx) => ctx.target?.type !== 'dir'
    ),
    order: 80,
  },
  {
    id: ContextMenuIds.download,
    link: (app, selectedItems) => {
      if (!selectedItems[0]) {
        return;
      }
      return app.adapter.getDownloadUrl(selectedItems[0]);
    },
    title: ({ t }) => t('Download'),
    action: () => {},
    show: showIfAll(
      showIf({ target: 'one', feature: 'download' }),
      (app, ctx) => ctx.target?.type !== 'dir'
    ),
    order: 90,
  },
  {
    id: ContextMenuIds.rename,
    title: ({ t }) => t('Rename'),
    action: (app, selectedItems) => app.modal.open(ModalRename, { items: selectedItems }),
    show: showIf({ target: 'one', feature: 'rename' }),
    order: 100,
  },
  {
    id: ContextMenuIds.move,
    title: ({ t }) => t('Move'),
    action: (app, selectedItems) => {
      const fs = app.fs;
      const target = {
        storage: fs.path.get().storage || '',
        path: fs.path.get().path || '',
        type: 'dir' as const,
      };
      app.modal.open(ModalMove, { items: { from: selectedItems, to: target } });
    },
    show: showIfAny(
      showIf({ target: 'one', feature: 'move' }),
      showIf({ target: 'many', feature: 'move' })
    ),
    order: 110,
  },
  {
    id: ContextMenuIds.copy,
    title: ({ t }) => t('Copy'),
    action: (app, selectedItems) => {
      if (selectedItems.length > 0) {
        app.fs.setClipboard('copy', new Set(selectedItems.map((item: DirEntry) => item.path)));
      }
    },
    show: showIfAny(
      showIf({ target: 'one', feature: 'copy' }),
      showIf({ target: 'many', feature: 'copy' })
    ),
    order: 120,
  },
  {
    id: ContextMenuIds.paste,
    title: ({ t }) => t('Paste'),
    action: (app, selectedItems) => {
      const clipboard = app.fs.getClipboard();
      if (clipboard?.items?.size > 0) {
        const fs = app.fs;
        const currentPath = fs.path.get();

        // Determine target path
        let targetPath = currentPath.path;
        let targetStorage = currentPath.storage;

        // If a single folder is selected, use its path as target
        if (selectedItems.length === 1 && selectedItems[0]?.type === 'dir') {
          targetPath = selectedItems[0].path;
          targetStorage = selectedItems[0].storage;
        }

        const target = {
          storage: targetStorage || '',
          path: targetPath || '',
          type: 'dir' as const,
        };

        app.modal.open(clipboard.type === 'cut' ? ModalMove : ModalCopy, {
          items: { from: Array.from(clipboard.items), to: target },
        });
      }
    },
    show: (app, _ctx) => {
      const features = app.features as Record<string, boolean>;
      if (!(features?.copy ?? false)) return false;
      const clipboard = app.fs.getClipboard();
      return clipboard?.items?.size > 0;
    },
    order: 130,
  },
  {
    id: ContextMenuIds.archive,
    title: ({ t }) => t('Archive'),
    action: (app, selectedItems) => app.modal.open(ModalArchive, { items: selectedItems }),
    show: showIfAny(
      showIf({ target: 'many', feature: 'archive' }),
      showIfAll(
        showIf({ target: 'one', feature: 'archive' }),
        (app, ctx) => ctx.target?.mime_type !== 'application/zip'
      )
    ),
    order: 140,
  },
  {
    id: ContextMenuIds.unarchive,
    title: ({ t }) => t('Unarchive'),
    action: (app, selectedItems) => app.modal.open(ModalUnarchive, { items: selectedItems }),
    show: showIf({ target: 'one', feature: 'unarchive', mimeType: 'application/zip' }),
    order: 150,
  },
  {
    id: ContextMenuIds.delete,
    title: ({ t }) => t('Delete'),
    action: (app, selectedItems) => {
      app.modal.open(ModalDelete, { items: selectedItems });
    },
    show: showIfAny(
      showIf({ feature: 'delete', target: 'one' }),
      showIf({ feature: 'delete', target: 'many' })
    ),
    order: 160,
  },
];
