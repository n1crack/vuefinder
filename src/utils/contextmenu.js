import {computed} from 'vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "../components/modals/ModalNewFolder.vue";
import ModalPreview from "../components/modals/ModalPreview.vue";
import ModalArchive from "../components/modals/ModalArchive.vue";
import ModalUnarchive from "../components/modals/ModalUnarchive.vue";
import ModalRename from "../components/modals/ModalRename.vue";
import ModalDelete from "../components/modals/ModalDelete.vue";

const TARGET = {
  none: 'none',
  one: 'one',
  many: 'many',
}

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
}

/**
 * @typedef {typeof import('../ServiceContainer.js')['default']} ServiceContainer
 * @typedef {ReturnType<ServiceContainer>} App
 * 
 * @typedef {any} DirEntry
 * 
 * @typedef MenuContext
 * @prop {string} searchQuery
 * @prop {DirEntry[]} items
 * @prop {DirEntry | null} target
 * 
 * 
 * @typedef Item
 * @prop {string} id
 * @prop {(i18n: App['i18n']) => string} title
 * @prop {(app: App, selectedItems: DirEntry[]) => void} action
 * @prop {(app: App, selectedItems: DirEntry[]) => void} [link]
 * @prop {(app: App, ctx: MenuContext) => boolean} show
 * 
 * @typedef ItemTemplate
 * @prop {Item['title']} title
 * @prop {Item['action']} action
 * @prop {Item['link']} [link]
 * @prop {string} [key]
 * 
 * @typedef ShowOptions
 * @prop {boolean} needsSearchQuery (default: `false`)
 * @prop {keyof typeof TARGET} target
 * @prop {string} targetType
 * @prop {string} mimeType
 * @prop {string} feature
 * 
 */

/**
 * @param {MenuContext} ctx
 * @returns {ShowOptions['target']}
 */
function getTarget(ctx) {
  if (ctx.items.length > 1 && ctx.items.some((item) => item.path === ctx.target?.path)) {
    return 'many'
  }
  return ctx.target ? 'one' : 'none'
}

/**
 * @param {Partial<ShowOptions>} options 
 * @returns {Item['show']}
 */
function showIf(options) {
  options = Object.assign(
    {
      needsSearchQuery: false, 
    }, 
    options,
  )

  return (app, ctx) => {
    if (options.needsSearchQuery !== !!ctx.searchQuery) {
      return false
    }
    if (options.target !== undefined && options.target !== getTarget(ctx)) {
      return false
    }
    if (options.targetType !== undefined && options.targetType !== ctx.target?.type) {
      return false
    }
    if (options.mimeType !== undefined && options.mimeType !== ctx.target?.mime_type) {
      return false
    }
    if (options.feature !== undefined && !app.features.includes(options.feature)) {
      return false
    }

    return true
  }
}

/**
 * @param  {...Item['show']} showFns
 * @returns {Item['show']}
 */
function showIfAny(...showFns) {
  return (app, ctx) => {
    for (let fn of showFns) {
      if (fn(app, ctx)) {
        return true
      }
    }
    return false
  }
}

/**
 * @param  {...Item['show']} showFns
 * @returns {Item['show']}
 */
function showIfAll(...showFns) {
  return (app, ctx) => {
    for (let fn of showFns) {
      if (!fn(app, ctx)) {
        return false
      }
    }
    return true
  }
}

/** @type {Item[]} */
export const menuItems = [
  {
    id: ContextMenuIds.openDir,
    title: ({t}) => t('Open containing folder'),
    action: (app, selectedItems) => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'index',
          adapter: app.fs.adapter,
          path: (selectedItems.value[0].dir)
        }
      });
    },
    show: showIf({
      target: 'one',
      needsSearchQuery: true,
    })
  },
  {
    id: ContextMenuIds.refresh,
    title: ({t}) => t('Refresh'),
    action: (app) => {
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
    },
    show: showIfAny(
      showIf({target: 'none'}), 
      showIf({target: 'many'})
    )
  },
  {
    id: ContextMenuIds.selectAll,
    title: ({t}) => t('Select All'),
    action: (app) => app.dragSelect.selectAll(),
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
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'index',
          adapter: app.fs.adapter,
          path: selectedItems.value[0].path
        }
      });
    },
    show: showIf({target: 'one', targetType: 'dir'})
  },
  {
    id: ContextMenuIds.pinFolder,
    title: ({t}) => t('Pin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.concat(selectedItems.value);
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
    show: showIfAll(
      showIf({target: 'one', targetType: 'dir'}), 
      (app, ctx) => app.pinnedFolders.findIndex((item) => item.path === ctx.target?.path) === -1,
    )
  },
  {
    id: ContextMenuIds.unpinFolder,
    title: ({t}) => t('Unpin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.filter(fav => !selectedItems.value.find(item => item.path === fav.path));
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
    show: showIfAll(
      showIf({target: 'one', targetType: 'dir'}), 
      (app, ctx) => app.pinnedFolders.findIndex((item) => item.path === ctx.target?.path) !== -1,
    )
  },
  {
    id: ContextMenuIds.preview,
    title: ({t}) => t('Preview'),
    action: (app, selectedItems) => app.modal.open(ModalPreview, {adapter: app.fs.adapter, item: selectedItems.value[0]}),
    show: showIfAll(
      showIf({target: 'one', feature: FEATURES.PREVIEW}), 
      (app, ctx) => ctx.target?.type !== 'dir'
    )
  },
  {
    id: ContextMenuIds.download,
    link: (app, selectedItems) => app.requester.getDownloadUrl(app.fs.adapter, selectedItems.value[0]),
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