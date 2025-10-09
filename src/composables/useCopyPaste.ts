import { inject, onBeforeUnmount, onMounted, provide, ref } from "vue";
import ModalCopy from "../components/modals/ModalCopy.vue";
import ModalMove from "../components/modals/ModalMove.vue";
import type { App, DirEntry } from "../types";
import { useFilesStore } from "@/stores/files";

function initCopyPaste(app: App) {
  const { t } = app.i18n;
  const fs = useFilesStore();
  const isCut = ref(false)
  const copiedItems = ref<DirEntry[]>([])

  function handleCopy(e: ClipboardEvent, cut = false) {
    isCut.value = cut;
    const items = fs.selectedItems;
    if (items.length === 0) return;
    e.preventDefault();
    copiedItems.value = items
    e.clipboardData?.setData("text/plain", JSON.stringify(items));
    app.emitter.emit("vf-toast-push", { label: items.length === 1 ? t("Item copied to clipboard") : t("%s items copied to clipboard", items.length) });
  }

  function handleCut(e: ClipboardEvent) { return handleCopy(e, true) }

  function handlePaste(e: ClipboardEvent) {
    const data = e.clipboardData?.getData("text/plain") || ''
    let items: DirEntry[] = []
    try {
      items = (JSON.parse(data) as DirEntry[])
    } catch {
      console.error("Failed to parse pasted data")
    }
    if (items.length === 0) return
    e.preventDefault();
    const target = { storage: fs.path.storage, path: fs.path.path, type: 'dir' as const }
    app.modal.open(isCut.value ? ModalMove : ModalCopy, { items: { from: items, to: target } });
  }

  onMounted(() => {
    app.root.addEventListener("copy", handleCopy as any);
    app.root.addEventListener("paste", handlePaste as any);
    app.root.addEventListener("cut", handleCut as any)
  });

  onBeforeUnmount(() => {
    app.root.removeEventListener("copy", handleCopy as any);
    app.root.removeEventListener("paste", handlePaste as any);
    app.root.removeEventListener("cut", handleCut as any)
  });

  return { isCut, copiedItems }
}

export function useCopyPaste(app: App) {
  return inject('useCopyPaste', () => {
    const instance = initCopyPaste(app)
    provide('useCopyPaste', instance)
    return instance
  }, true)
}


