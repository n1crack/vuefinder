import { useStore } from '@nanostores/vue';
import { useApp } from './useApp';
import { copyPath } from '../utils/clipboard';
import { createNotifier } from '../utils/notify';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';

/**
 * Breadcrumb-related actions (refresh, navigate up, toggle tree view, copy
 * path) used by `Breadcrumb.vue`.
 *
 * Extracted into a composable so a custom menu/tool bar can reuse the exact
 * same behavior - e.g. to combine menu bar and breadcrumb functionality into
 * a single bar via `MenuBar`'s slots.
 */
export function useBreadcrumbActions() {
  const app = useApp();
  const notify = createNotifier(app);
  const fs = app.fs;
  const config = app.config;
  const { t } = app.i18n;

  // Reactive current path/breadcrumb trail, for bars that replace `Breadcrumb.vue`
  // entirely (via `config.showBreadcrumbBar = false`) but still want to display it.
  const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

  const refresh = () => {
    const path = fs.path.get().path;
    app.adapter.invalidateListQuery(path);
    app.adapter.open(path);
  };

  const goTo = (path: string) => {
    app.adapter.open(path);
  };

  const goUp = () => {
    const breadcrumb = fs.path.get()?.breadcrumb ?? [];
    const parentPath =
      breadcrumb[breadcrumb.length - 2]?.path ?? `${fs.path.get()?.storage ?? 'local'}://`;
    goTo(parentPath);
  };

  const toggleTreeView = () => {
    config.toggle('showTreeView');
  };

  const copyCurrentPath = async () => {
    await copyPath(fs.path.get()?.path || '');
    notify.success(t('Path copied to clipboard'));
  };

  return {
    currentPath,
    refresh,
    goTo,
    goUp,
    toggleTreeView,
    copyCurrentPath,
  };
}
