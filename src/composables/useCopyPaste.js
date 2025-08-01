import { inject, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { splitPath } from "../utils/path";
import ModalCopy from "../components/modals/ModalCopy.vue";
import ModalMove from "../components/modals/ModalMove.vue";

/**
 * @param {import('../types').App} app
 */
function initCopyPaste(app) {
  const ds = app.dragSelect;
  const { t } = app.i18n;

  let isCut = ref(false)
  /** @type {import("vue").Ref<import("../types").DirEntry[]>} */
  let copiedItems = ref([])

  /**
   * @param {ClipboardEvent} e
   */
  function handleCopy(e, cut=false) {
    isCut.value = cut;
    const items = ds.getSelected();
    if (items.length === 0) {
      return;
    }

    e.preventDefault();
    copiedItems.value = items
    e.clipboardData.setData(
      "text/plain",
      JSON.stringify(items)
    );
    app.emitter.emit("vf-toast-push", {
      label:
        items.length === 1
          ? t("Item copied to clipboard")
          : t("%s items copied to clipboard", items.length),
    });
  }

  /**
   * @param {ClipboardEvent} e
   */
  function handleCut(e) {
    return handleCopy(e, true)
  }

  /**
   * @param {ClipboardEvent} e
   */
  function handlePaste(e) {
    const data = e.clipboardData.getData("text/plain")
    
    let items = []
    try {
      /** @type {import("../types").DirEntry[]} */
      items = JSON.parse(data).filter((item) => {
        const [storage] = splitPath(item.path)
        return app.fs.data.storages.includes(storage)
      })
    } catch(e) {
      console.error("Failed to parse pasted data")
      console.error(e)
    }

    if (items.length === 0) {
      return
    }
    e.preventDefault();
    
    const target = {
      storage: app.fs.data.adapter,
      path: app.fs.data.dirname,
      type: 'dir'
    }
    
    app.modal.open(isCut.value ? ModalMove : ModalCopy, { items: { from: items, to: target } });
  }

  onMounted(() => {
    app.root.addEventListener("copy", handleCopy);
    app.root.addEventListener("paste", handlePaste);
    app.root.addEventListener("cut", handleCut)
  });

  onBeforeUnmount(() => {
    app.root.removeEventListener("copy", handleCopy);
    app.root.removeEventListener("paste", handlePaste);
    app.root.removeEventListener("cut", handleCut)
  });

  return {
    isCut, copiedItems
  }
}


/**
 * @param {import('../types').App} app
 * @returns {ReturnType<typeof initCopyPaste>}
 */
export function useCopyPaste(app) {
  return inject('useCopyPaste', () => {
    const instance = initCopyPaste(app)
    provide('useCopyPaste', instance)
    return instance
  }, true)
}