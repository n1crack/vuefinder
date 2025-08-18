// @ts-ignore - Vue SFC import for JS with checkJs
import ModalMove from "../components/modals/ModalMove.vue";
import { dirname } from "../utils/path";

/**
 *
 * @param {import('../types').App} app
 * @param {string[]} classList
 */
export function useDragNDrop(app, classList = []) {
  const ds = app.dragSelect;
  const DATASET_COUNTER_KEY = "vfDragEnterCounter";
  
  /**
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   * @param {import('../types').DirEntry} target
   */
  function handleDragOver(e, target) {
    e.preventDefault();

    if (
      !target ||
      target.type !== "dir" ||
      ds
        .getSelected()
        .find(
          (item) => item.path === target.path || dirname(item.path) === target.path
        ) ||
      ds.getSelection().find((el) => el === e.currentTarget)
    ) {
      e.dataTransfer.dropEffect = "none";
      e.dataTransfer.effectAllowed = "none";
    } else {
      e.dataTransfer.dropEffect = "copy";
      e.currentTarget.classList.add(...classList);
    }
  }

  /**
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   */
  function handleDragEnter(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const currentCount = Number(el.dataset[DATASET_COUNTER_KEY] || 0);
    el.dataset[DATASET_COUNTER_KEY] = String(currentCount + 1);
  }

  /**
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   */
  function handleDragLeave(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const currentCount = Number(el.dataset[DATASET_COUNTER_KEY] || 0);
    const nextCount = currentCount - 1;
    if (nextCount <= 0) {
      delete el.dataset[DATASET_COUNTER_KEY];
      el.classList.remove(...classList);
    } else {
      el.dataset[DATASET_COUNTER_KEY] = String(nextCount);
    }
  }

  /**
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   * @param {import('../types').DirEntry} target
   */
  function handleDropZone(e, target) {
    if (!target) {
      return;
    }

    e.preventDefault();
    ds.isDraggingRef.value = false;
    const el = e.currentTarget;
    delete el.dataset[DATASET_COUNTER_KEY];
    el.classList.remove(...classList);
    let draggedItems = JSON.parse(e.dataTransfer.getData("items"));
    app.modal.open(ModalMove, { items: { from: draggedItems, to: target } });
  }

  function events(item) {
    return {
      dragover: (e) => handleDragOver(e, item),
      dragenter: handleDragEnter,
      dragleave: handleDragLeave,
      drop: (e) => handleDropZone(e, item),
    };
  }

  return {
    events,
  };
}
