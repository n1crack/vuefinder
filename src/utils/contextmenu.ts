import {FEATURES} from "@/features";
import ModalNewFolder from "@/components/modals/ModalNewFolder.vue";
import ModalPreview from "@/components/modals/ModalPreview.vue";
import ModalArchive from "@/components/modals/ModalArchive.vue";
import ModalUnarchive from "@/components/modals/ModalUnarchive.vue";
import ModalRename from "@/components/modals/ModalRename.vue";
import ModalDelete from "@/components/modals/ModalDelete.vue";
import type { App, DirEntry } from '../types'

type TargetKey = 'none' | 'one' | 'many'

export const ContextMenuIds = {
  newfolder: "newfolder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
} as const

export type MenuContext = {
  searchQuery: string
  items: DirEntry[]
  target: DirEntry | null
}

export type Item = {
  id: string
  title: (i18n: App['i18n']) => string
  action: (app: App, selectedItems: DirEntry[]) => void
  link?: (app: App, selectedItems: DirEntry[]) => void
  show: (app: App, ctx: MenuContext) => boolean
}

// type ItemTemplate = Pick<Item, 'title' | 'action'> & { link?: Item['link']; key?: string }

type ShowOptions = {
  needsSearchQuery?: boolean
  target?: TargetKey
  targetType?: string
  mimeType?: string
  feature?: string
}

function getTarget(ctx: MenuContext): TargetKey {
  if (ctx.items.length > 1 && ctx.items.some((item) => item.path === ctx.target?.path)) {
    return 'many'
  }
  return ctx.target ? 'one' : 'none'
}

function showIf(options: Partial<ShowOptions>) {
  const merged: ShowOptions = Object.assign({
    needsSearchQuery: false,
  }, options)

  return (app: App, ctx: MenuContext) => {
    if (merged.needsSearchQuery !== !!ctx.searchQuery) return false
    if (merged.target !== undefined && merged.target !== getTarget(ctx)) return false
    if (merged.targetType !== undefined && merged.targetType !== ctx.target?.type) return false
    if (merged.mimeType !== undefined && merged.mimeType !== ctx.target?.mime_type) return false
    if (merged.feature !== undefined && !app.features.includes(merged.feature)) return false
    return true
  }
}

function showIfAny(...showFns: Item['show'][]): Item['show'] {
  return (app, ctx) => showFns.some((fn) => fn(app, ctx))
}

function showIfAll(...showFns: Item['show'][]): Item['show'] {
  return (app, ctx) => showFns.every((fn) => fn(app, ctx))
}

export const menuItems: Item[] = [
  {
    id: ContextMenuIds.openDir,
    title: ({t}) => t('Open containing folder'),
    action: (app, selectedItems) => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {
        params: { q: 'index', adapter: app.fs.adapter, path: (selectedItems[0]?.path) }
      });
    },
    show: showIf({ target: 'one', needsSearchQuery: true })
  },
  {
    id: ContextMenuIds.refresh,
    title: ({t}) => t('Refresh'),
    action: (app) => {
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
    },
    show: showIfAny(showIf({target: 'none'}), showIf({target: 'many'}))
  },
  {
    id: ContextMenuIds.selectAll,
    title: ({t}) => t('Select All'),
    action: (app) => app.emitter.emit('vf-select-all'),
    show: showIf({target: 'none'})
  },
  {
    id: ContextMenuIds.newfolder,
    title: ({t}) => t('New Folder'),
    action: (app) => app.modal.open(ModalNewFolder),
    show: showIf({target: 'none', feature: FEATURES.NEW_FOLDER})
  },
  {
    id: ContextMenuIds.open,
    title: ({t}) => t('Open'),
    action: (app, selectedItems) => {
      app.emitter.emit('vf-search-exit');
      if (!selectedItems[0]) {
          return;
      }
      app.emitter.emit('vf-fetch', {
        params: { q: 'index', adapter: app.fs.adapter, path: selectedItems[0].path }
      });
    },
    show: showIf({target: 'one', targetType: 'dir'})
  },
  {
    id: ContextMenuIds.pinFolder,
    title: ({t}) => t('Pin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.concat(selectedItems);
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
    show: showIfAll(
      showIf({target: 'one', targetType: 'dir'}),
      (app, ctx) => app.pinnedFolders.findIndex((item: any) => item.path === ctx.target?.path) === -1,
    )
  },
  {
    id: ContextMenuIds.unpinFolder,
    title: ({t}) => t('Unpin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.filter((fav: any) => !selectedItems.find((item: any) => item.path === fav.path));
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
    show: showIfAll(
      showIf({target: 'one', targetType: 'dir'}),
      (app, ctx) => app.pinnedFolders.findIndex((item: any) => item.path === ctx.target?.path) !== -1,
    )
  },
  {
    id: ContextMenuIds.preview,
    title: ({t}) => t('Preview'),
    action: (app, selectedItems) => app.modal.open(ModalPreview, {adapter: app.fs.adapter, item: selectedItems[0]}),
    show: showIfAll(
      showIf({target: 'one', feature: FEATURES.PREVIEW}),
      (app, ctx) => ctx.target?.type !== 'dir'
    )
  },
  {
    id: ContextMenuIds.download,
    link: (app, selectedItems) => app.requester.getDownloadUrl(app.fs.adapter, selectedItems[0]),
    title: ({t}) => t('Download'),
    action: () => {},
    show: showIfAll(
      showIf({target: 'one', feature: FEATURES.DOWNLOAD}),
      (app, ctx) => ctx.target?.type !== 'dir'
    )
  },
  {
    id: ContextMenuIds.rename,
    title: ({t}) => t('Rename'),
    action: (app, selectedItems) => app.modal.open(ModalRename, {items: selectedItems}),
    show: showIf({target: 'one', feature: FEATURES.RENAME})
  },
  {
    id: ContextMenuIds.archive,
    title: ({t}) => t('Archive'),
    action: (app, selectedItems) => app.modal.open(ModalArchive, {items: selectedItems}),
    show: showIfAny(
      showIf({target: 'many', feature: FEATURES.ARCHIVE}),
      showIfAll(
        showIf({target: 'one', feature: FEATURES.ARCHIVE}),
        (app, ctx) => ctx.target?.mime_type !== 'application/zip'
      )
    )
  },
  {
    id: ContextMenuIds.unarchive,
    title: ({t}) => t('Unarchive'),
    action: (app, selectedItems) => app.modal.open(ModalUnarchive, {items: selectedItems}),
    show: showIf({target: 'one', feature: FEATURES.UNARCHIVE, mimeType: 'application/zip'})
  },
  {
    id: ContextMenuIds.delete,
    title: ({t}) => t('Delete'),
    action: (app, selectedItems) => {
      app.modal.open(ModalDelete, {items: selectedItems});
    },
    show: showIfAny(
      showIf({feature: FEATURES.DELETE, target: 'one'}),
      showIf({feature: FEATURES.DELETE, target: 'many'}),
    )
  },
]


