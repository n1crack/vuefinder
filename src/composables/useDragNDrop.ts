import ModalMove from "../components/modals/ModalMove.vue";
import { dirname } from "../utils/path";
import type { App, DirEntry, DirEntryType } from "../types";
import { useStore } from '@nanostores/vue';

export interface DragNDropItem  {
  path: string;
  type: DirEntryType; 
}

export interface DragNDropEvent extends DragEvent {
  currentTarget: HTMLElement;
  isExternalDrag: boolean;
}

export function useDragNDrop(app: App, classList: string[] = []) {
  const DATASET_COUNTER_KEY = "vfDragEnterCounter";
  const fs = app.fs;
  
  // Make selectedItems reactive
  const selectedItems = useStore(fs.selectedItems);

  function handleDragOver(e: DragNDropEvent, target: DragNDropItem) {
    // Skip if this is an external drag
    if (e.isExternalDrag) {
      return;
    }
    
    e.preventDefault();

    const selfTarget = fs.getDraggedItem() === target.path;

    if (
        selfTarget ||
        !target || 
        target.type !== "dir" ||
        selectedItems.value.some((item: DirEntry) => item.path === target.path || dirname(item.path) === target.path)
    ) {
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "none";
            e.dataTransfer.effectAllowed = "none";
        }
    } else {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
        e.dataTransfer.effectAllowed = "all";
      }
      e.currentTarget.classList.add(...classList);
    }
  }

  function handleDragEnter(e: DragNDropEvent) {
    // Skip if this is an external drag
    if (e.isExternalDrag) {
      return;
    }
    
    e.preventDefault();
    const el : HTMLElement = e.currentTarget;
    const currentCount = Number(el.dataset[DATASET_COUNTER_KEY] || 0);
    el.dataset[DATASET_COUNTER_KEY] = String(currentCount + 1);
  }

  function handleDragLeave(e: DragNDropEvent) {
    // Skip if this is an external drag
    if (e.isExternalDrag) {
      return;
    }
    
    e.preventDefault();
    const el : HTMLElement = e.currentTarget;
    const currentCount = Number(el.dataset[DATASET_COUNTER_KEY] || 0);
    const nextCount = currentCount - 1;
    if (nextCount <= 0) {
      delete el.dataset[DATASET_COUNTER_KEY];
      el.classList.remove(...classList);
    } else {
      el.dataset[DATASET_COUNTER_KEY] = String(nextCount);
    }
  }

  function handleDropZone(e: DragNDropEvent, target: DragNDropItem) {
    // Skip if this is an external drag
    if (e.isExternalDrag) {
      return;
    }
    
    if (!target) return;
    e.preventDefault();
    const el : HTMLElement = e.currentTarget;
    delete el.dataset[DATASET_COUNTER_KEY];
    el.classList.remove(...classList);
    const data = e.dataTransfer?.getData("items") || '[]';
    const draggedItemKeys: string[] = JSON.parse(data);
    const draggedItems: DirEntry[] = draggedItemKeys.map((key) => fs.sortedFiles.get().find((f: DirEntry) => f.path === key) as DirEntry);
    fs.clearDraggedItem();
    app.modal.open(ModalMove, { items: { from: draggedItems, to: target } });
  }

  function events(item: DragNDropItem) {
    return {
      dragover: (e: DragNDropEvent) => handleDragOver(e, item),
      dragenter: handleDragEnter,
      dragleave: handleDragLeave,
      drop: (e: DragNDropEvent) => handleDropZone(e, item),
    } as const;
  }

  return { events };
}


