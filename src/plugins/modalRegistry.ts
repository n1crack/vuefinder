import { shallowReactive, type Component } from 'vue';
import ModalUpload from '../components/modals/ModalUpload.vue';
import ModalDelete from '../components/modals/ModalDelete.vue';
import ModalArchive from '../components/modals/ModalArchive.vue';
import ModalUnarchive from '../components/modals/ModalUnarchive.vue';
import ModalNewFile from '../components/modals/ModalNewFile.vue';
import ModalNewFolder from '../components/modals/ModalNewFolder.vue';
import ModalRename from '../components/modals/ModalRename.vue';
import ModalCopy from '../components/modals/ModalCopy.vue';
import ModalMove from '../components/modals/ModalMove.vue';
import ModalPreview from '../components/modals/ModalPreview.vue';
import ModalSearch from '../components/modals/ModalSearch.vue';
import ModalSettings from '../components/modals/ModalSettings.vue';
import ModalAbout from '../components/modals/ModalAbout.vue';
import ModalShortcuts from '../components/modals/ModalShortcuts.vue';
import ModalGoToFolder from '../components/modals/ModalGoToFolder.vue';

/**
 * Stable string identifiers for the built-in action modals. Opening a modal by
 * key (instead of by direct component import) is what lets plugins swap or
 * extend a modal without the call sites knowing which component is used.
 */
export type ModalKey =
  | 'upload'
  | 'delete'
  | 'archive'
  | 'unarchive'
  | 'newfile'
  | 'newfolder'
  | 'rename'
  | 'copy'
  | 'move'
  | 'preview'
  | 'search'
  | 'settings'
  | 'about'
  | 'shortcuts'
  | 'goToFolder';

/** Named regions inside a modal that plugins can inject content into. */
export type ModalRegion = 'header-actions' | 'body-top' | 'body-bottom' | 'footer-actions';

export interface ModalExtension {
  /** Component rendered inside the region. Receives `{ ctx, ...props }`. */
  component: Component;
  /** Static props forwarded to the component. */
  props?: Record<string, unknown>;
  /** Lower numbers render first. */
  order?: number;
  /** Internal stable key for v-for; assigned on registration. */
  _id?: string;
}

const BUILTIN_MODALS: Record<ModalKey, Component> = {
  upload: ModalUpload,
  delete: ModalDelete,
  archive: ModalArchive,
  unarchive: ModalUnarchive,
  newfile: ModalNewFile,
  newfolder: ModalNewFolder,
  rename: ModalRename,
  copy: ModalCopy,
  move: ModalMove,
  preview: ModalPreview,
  search: ModalSearch,
  settings: ModalSettings,
  about: ModalAbout,
  shortcuts: ModalShortcuts,
  goToFolder: ModalGoToFolder,
};

export type ModalRegistry = ReturnType<typeof createModalRegistry>;

/**
 * Per-instance registry mapping modal keys to components, plus plugin-provided
 * overrides and region extensions. Seeded with the built-in modals so the UI
 * behaves identically when no plugin touches it.
 */
export function createModalRegistry() {
  // shallowReactive so a freshly registered override/extension triggers a
  // re-render of the open modal, without deeply tracking component internals.
  const overrides = shallowReactive(new Map<ModalKey, Component>());
  const extensions = shallowReactive(new Map<string, ModalExtension[]>());
  let extCounter = 0;

  const isModalKey = (value: unknown): value is ModalKey =>
    typeof value === 'string' && value in BUILTIN_MODALS;

  const resolve = (key: ModalKey): Component | null =>
    overrides.get(key) ?? BUILTIN_MODALS[key] ?? null;

  const replace = (key: ModalKey, component: Component): void => {
    overrides.set(key, component);
  };

  const addExtension = (key: ModalKey, region: ModalRegion, ext: ModalExtension): void => {
    const mapKey = `${key}:${region}`;
    const list = extensions.get(mapKey) ?? [];
    const next = [...list, { ...ext, _id: ext._id ?? `vf-ext-${extCounter++}` }];
    next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    extensions.set(mapKey, next);
  };

  const getExtensions = (key: ModalKey, region: ModalRegion): ModalExtension[] =>
    extensions.get(`${key}:${region}`) ?? [];

  return { isModalKey, resolve, replace, addExtension, getExtensions };
}
