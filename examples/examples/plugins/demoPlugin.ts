import { definePlugin } from '../../../src/index';
import CompressionLevelField from './CompressionLevelField.vue';
import DeleteWarningBanner from './DeleteWarningBanner.vue';

/**
 * Demonstrates every plugin capability:
 *  - extend a modal in place (zip compression field, delete warning banner)
 *  - add a toolbar + context-menu action
 *  - block an operation via a cancelable lifecycle hook
 *  - react to an after-hook
 */
export const demoPlugin = definePlugin({
  name: 'demo-plugin',
  setup(ctx) {
    // 1. Extend the zip (archive) modal with a compression-level field.
    ctx.modals.extend('archive', 'body-bottom', { component: CompressionLevelField });

    // 2. Add a warning banner to the top of the delete modal.
    ctx.modals.extend('delete', 'body-top', { component: DeleteWarningBanner });

    // 3. Add a "Log selection" action to the toolbar and context menu.
    ctx.actions.add({
      id: 'demo-log',
      title: () => 'Log selection',
      surfaces: ['toolbar', 'contextmenu', 'menubar'],
      hotkey: { code: 'KeyL', meta: true, shift: true },
      show: (_app, c) => c.items.length > 0,
      action: (_app, items) => {
        console.log(
          '[demo-plugin] selection:',
          items.map((i) => i.path)
        );
      },
    });

    // 4. Block deletion of anything under /protected/.
    ctx.hooks.on('beforeDelete', (e) => {
      if (e.items.some((i) => i.path.includes('/protected/'))) {
        console.warn('[demo-plugin] blocked deletion of a protected item');
        e.preventDefault();
      }
    });

    // 5. React after an upload completes.
    ctx.hooks.on('afterUpload', (e) => {
      console.log('[demo-plugin] uploaded:', e.files);
    });
  },
});

export default demoPlugin;
