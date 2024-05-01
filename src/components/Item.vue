<template>
  <div
      :class="'vf-item-' + ds.explorerId.value"
      v-draggable="item"
      @dblclick="openItem(item)"
      @touchstart="delayedOpenItem($event)"
      @touchend="clearTimeOut()"
      @contextmenu.prevent="app.emitter.emit('vf-contextmenu-show', {event: $event, items: ds.getSelected(), target: item })"
  >
    <slot/>
  </div>
</template>

<script setup>
import {ref, defineProps, inject} from 'vue';
import ModalPreview from "./modals/ModalPreview.vue";
import ModalMove from "./modals/ModalMove.vue";

const app = inject('ServiceContainer');
const ds = app.dragSelect;

const props = defineProps({
  item: {type: Object},
  dragImage: {type: Object}
})

const openItem = (item) => {
  if (item.type === 'dir') {
    app.emitter.emit('vf-search-exit');
    app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.data.adapter, path: item.path}});
  } else {
    app.modal.open(ModalPreview, {adapter: app.data.adapter, item})
  }
};

const vDraggable = {
  mounted(el, binding, vnode, prevVnode) {
    if (!!vnode.props.draggable) {
      el.addEventListener('dragstart', (event) => handleDragStart(event, binding.value));
      el.addEventListener('dragover', (event) => handleDragOver(event, binding.value));
      el.addEventListener('drop', (event) => handleDropZone(event, binding.value));
    }
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    if (!!vnode.props.draggable) {
      el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('drop', handleDropZone);
    }
  }
}

const handleDragStart = (e, item) => {
  if (e.altKey || e.ctrlKey || e.metaKey) {
    e.preventDefault();
    return false;
  }

  e.dataTransfer.setDragImage(props.dragImage.$el, 0, 15);
  e.dataTransfer.effectAllowed = 'all';
  e.dataTransfer.dropEffect = 'copy';
  e.dataTransfer.setData('items', JSON.stringify(ds.getSelected()))
};

const handleDropZone = (e, item) => {
  e.preventDefault();
  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage !== app.adapter)) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  app.modal.open(ModalMove, {items: {from: draggedItems, to: item}})
};

const handleDragOver = (e, item) => {
  e.preventDefault();
  if (!item || item.type !== 'dir' || ds.getSelection().find(el => el === e.currentTarget)) {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  } else {
    e.dataTransfer.dropEffect = 'copy';
  }
};

let touchTimeOut = null;

const clearTimeOut = () => {
  if (touchTimeOut) {
    clearTimeout(touchTimeOut);
  }
}
const delayedOpenItem = ($event) => {
  touchTimeOut = setTimeout(() => {
    const cmEvent = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: false,
      view: window,
      button: 2,
      buttons: 0,
      clientX: $event.target.getBoundingClientRect().x,
      clientY: $event.target.getBoundingClientRect().y
    });
    $event.target.dispatchEvent(cmEvent);

  }, 500)
}

</script>
