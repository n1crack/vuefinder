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
  let counterKey = 'data-drag-counter';

  /**
   * @param {HTMLElement} el
   * @returns {number} 
   */
  function getCounter(el) {
    if(!el.hasAttribute(counterKey)) {
      return 0
    }
    return parseInt(el.getAttribute(counterKey))
  }

  /**
   * @param {HTMLElement} el 
   * @param {number} value 
   */
  function setCounter(el, value) {
    el.setAttribute(counterKey, value+"")
  }

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
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   */
  function handleDragEnter(e) {
    e.preventDefault();
    setCounter(e.currentTarget, getCounter(e.currentTarget) + 1)
  }

  /**
   * @param {DragEvent & { currentTarget: HTMLElement }} e
   */
  function handleDragLeave(e) {
    e.preventDefault();
    setCounter(e.currentTarget, getCounter(e.currentTarget) - 1)
    if (getCounter(e.currentTarget) == 0) {
        e.currentTarget.classList.remove(...classList);
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
