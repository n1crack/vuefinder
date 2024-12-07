import {computed} from 'vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "../components/modals/ModalNewFolder.vue";
import ModalPreview from "../components/modals/ModalPreview.vue";
import ModalArchive from "../components/modals/ModalArchive.vue";
import ModalUnarchive from "../components/modals/ModalUnarchive.vue";
import ModalRename from "../components/modals/ModalRename.vue";
import ModalDelete from "../components/modals/ModalDelete.vue";

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
 * @typedef SimpleItemOptions
 * @prop {boolean} needsSearchQuery (default: `false`)
 * @prop {null|'one'|'many'} target (default: `'one'`)
 * @prop {string} targetType
 * @prop {string} mimeType
 * @prop {string} feature
 * @prop {Item['show']} show
 */

/**
 * @class
 * @implements {Item}
 */
export class SimpleItem {

  /**
   * 
   * @param {Item['title']} title 
   * @param {Item['action']} action 
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options 
   */
  constructor(title, action, link, options) {
    this.title = title
    this.action = action
    this.link = link
    this.options = Object.assign(
      {
        needsSearchQuery: false, 
        target: 'one',
      }, 
      options,
    )
  }

  /**
   * @type {Item['show']}
   */
  show(app, ctx) {
    /** @type {(ctx: MenuContext) => SimpleItemOptions['target']} */
    const actualTarget = (ctx) => {
      if (ctx.items.length > 1 && ctx.items.some((item) => item.path === ctx.target?.path)) {
        return 'many'
      }
      return ctx.target ? 'one' : null
    }

    if (this.options.needsSearchQuery !== !!ctx.searchQuery) {
      return false
    }
    if (this.options.target !== undefined && this.options.target !== actualTarget(ctx)) {
      return false
    }
    if (this.options.targetType !== undefined && this.options.targetType !== ctx.target?.type) {
      return false
    }
    if (this.options.mimeType !== undefined && this.options.mimeType !== ctx.target?.mime_type) {
      return false
    }
    if (this.options.feature !== undefined && !app.features.includes(this.options.feature)) {
      return false
    }
    if (this.options.show !== undefined && !this.options.show(app, ctx)) {
      return false
    }

    return true
  }
}

/**
 * 
 * @param {ItemTemplate[]} templates 
 * @param {SimpleItemOptions} options
 * @returns {Item[]}
 */
function itemBundle(templates, options) {
  return templates.map((template) => {
    return new SimpleItem(template.title, template.action, template.link, {
      ...options,
      feature: template.key
    })
  })
}

/** @type {Record<string, ItemTemplate>} */
const templateMap = {
  newfolder: {
    key: FEATURES.NEW_FOLDER,
    title: ({t}) => t('New Folder'),
    action: (app) => app.modal.open(ModalNewFolder),
  },
  selectAll: {
    title: ({t}) => t('Select All'),
    action: (app) => app.dragSelect.selectAll(),
  },
  pinFolder: {
    title: ({t}) => t('Pin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.concat(selectedItems.value);
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
  },

  unpinFolder: {
    title: ({t}) => t('Unpin Folder'),
    action: (app, selectedItems) => {
        app.pinnedFolders = app.pinnedFolders.filter(fav => !selectedItems.value.find(item => item.path === fav.path));
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
  },
  delete: {
    key: FEATURES.DELETE,
    title: ({t}) => t('Delete'),
    action: (app, selectedItems) => {
      app.modal.open(ModalDelete, {items: selectedItems});
    },
  },
  refresh: {
    title: ({t}) => t('Refresh'),
    action: (app) => {
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
    },
  },
  preview: {
    key: FEATURES.PREVIEW,
    title: ({t}) => t('Preview'),
    action: (app, selectedItems) => app.modal.open(ModalPreview, {adapter: app.fs.adapter, item: selectedItems.value[0]}),
  },
  open: {
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
  },
  openDir: {
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
  },
  download: {
    key: FEATURES.DOWNLOAD,
    link: (app, selectedItems) => app.requester.getDownloadUrl(app.fs.adapter, selectedItems.value[0]),
    title: ({t}) => t('Download'),
    action: () => {},
  },
  archive: {
    key: FEATURES.ARCHIVE,
    title: ({t}) => t('Archive'),
    action: (app, selectedItems) => app.modal.open(ModalArchive, {items: selectedItems}),
  },
  unarchive: {
    key: FEATURES.UNARCHIVE,
    title: ({t}) => t('Unarchive'),
    action: (app, selectedItems) => app.modal.open(ModalUnarchive, {items: selectedItems}),
  },
  rename: {
    key: FEATURES.RENAME,
    title: ({t}) => t('Rename'),
    action: (app, selectedItems) => app.modal.open(ModalRename, {items: selectedItems}),
  }
};

/** @type {Item[]} */
export const menuItems = [
  ...itemBundle([templateMap.openDir], {
    needsSearchQuery: true,
  }),
  ...itemBundle([templateMap.refresh, templateMap.selectAll, templateMap.newfolder], {
    target: null,
  }),
  ...itemBundle([templateMap.refresh, templateMap.archive, templateMap.delete], {
    target: 'many'
  }),
  ...itemBundle([templateMap.open], {
    targetType: 'dir',
  }),
  ...itemBundle([templateMap.unpinFolder], {
    targetType: 'dir',
    show: (app, ctx) => app.pinnedFolders.findIndex((item) => item.path === ctx.target?.path) !== -1
  }),
  ...itemBundle([templateMap.pinFolder], {
    targetType: 'dir',
    show: (app, ctx) => app.pinnedFolders.findIndex((item) => item.path === ctx.target?.path) === -1
  }),
  ...itemBundle([templateMap.preview, templateMap.download], {
    show: (app, ctx) => ctx.target?.type !== 'dir'
  }),
  ...itemBundle([templateMap.rename], {numItems: 'one',}),
  ...itemBundle([templateMap.unarchive], {
    mimeType: 'application/zip',
  }),
  ...itemBundle([templateMap.archive], {
    show: (app, ctx) => ctx.target?.mime_type !== 'application/zip'
  }),
  ...itemBundle([templateMap.delete], {}),
]