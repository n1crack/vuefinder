import ModalMove from "../components/modals/ModalMove.vue";
import { dirname } from "../utils/path";

/**
 *
 * @param {import('../types').App} app
 * @param {string[]} classList
 */
export function useDragNDrop(app, classList = []) {
  const ds = app.dragSelect;
  
  // Keep track of dragenter and dragleave events to avoid flicker
  // CREDIT: https://stackoverflow.com/a/21002544/3140799
  let counter = 0;

  /**
   * @param {DragEvent} e
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
          (item) =>
            item.path === target.path || dirname(item.path) === target.path
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
   * @param {DragEvent} e
   */
  function handleDragEnter(e) {
    e.preventDefault();
    counter++
  }

  /**
   * @param {DragEvent} e
   */
  function handleDragLeave(e) {
    e.preventDefault();
    counter--
    if (counter == 0) {
        e.currentTarget.classList.remove(...classList);
    }
  }

  /**
   * @param {DragEvent} e
   * @param {import('../types').DirEntry} target
   */
  function handleDropZone(e, target) {
    if (!target) {
      return;
    }

    e.preventDefault();
    ds.isDraggingRef.value = false;
    handleDragLeave(e);
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
