import ModalMove from "../components/modals/ModalMove.vue";
import { dirname } from "../utils/path";
import type { App, DirEntry } from "../types";

export function useDragNDrop(app: App, classList: string[] = []) {
  const ds = app.dragSelect;
  const DATASET_COUNTER_KEY = "vfDragEnterCounter";

  function handleDragOver(e: DragEvent & { currentTarget: HTMLElement }, target: DirEntry) {
    e.preventDefault();
    if (!target || target.type !== "dir" ||
        ds.getSelected().find((item: DirEntry) => item.path === target.path || dirname(item.path) === target.path) ||
        ds.getSelection().find((el: HTMLElement) => el === e.currentTarget)) {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "none";
        e.dataTransfer.effectAllowed = "none";
      }
    } else {
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
      e.currentTarget.classList.add(...classList);
    }
  }

  function handleDragEnter(e: DragEvent & { currentTarget: HTMLElement }) {
    e.preventDefault();
    const el = e.currentTarget;
    const currentCount = Number((el as any).dataset[DATASET_COUNTER_KEY] || 0);
    (el as any).dataset[DATASET_COUNTER_KEY] = String(currentCount + 1);
  }

  function handleDragLeave(e: DragEvent & { currentTarget: HTMLElement }) {
    e.preventDefault();
    const el = e.currentTarget;
    const currentCount = Number((el as any).dataset[DATASET_COUNTER_KEY] || 0);
    const nextCount = currentCount - 1;
    if (nextCount <= 0) {
      delete (el as any).dataset[DATASET_COUNTER_KEY];
      el.classList.remove(...classList);
    } else {
      (el as any).dataset[DATASET_COUNTER_KEY] = String(nextCount);
    }
  }

  function handleDropZone(e: DragEvent & { currentTarget: HTMLElement }, target: DirEntry) {
    if (!target) return;
    e.preventDefault();
    ds.isDraggingRef.value = false;
    const el = e.currentTarget;
    delete (el as any).dataset[DATASET_COUNTER_KEY];
    el.classList.remove(...classList);
    const data = e.dataTransfer?.getData("items") || '[]';
    const draggedItems: DirEntry[] = JSON.parse(data);
    app.modal.open(ModalMove, { items: { from: draggedItems, to: target } });
  }

  function events(item: DirEntry) {
    return {
      dragover: (e: DragEvent & { currentTarget: HTMLElement }) => handleDragOver(e, item),
      dragenter: handleDragEnter,
      dragleave: handleDragLeave,
      drop: (e: DragEvent & { currentTarget: HTMLElement }) => handleDropZone(e, item),
    } as const;
  }

  return { events };
}


