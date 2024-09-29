<template>
  <div
    :style="{opacity: ds.isDraggingRef.value && ds.getSelection().find((el) => $el === el) ? '0.5 !important' : ''}"
    :class="['vuefinder__item', 'vf-item-' + ds.explorerId]"
    :data-type="item.type"
    :key="item.path"
    :data-item="JSON.stringify(item)"
    :data-index="index"
    v-draggable="item"
    @dblclick="openItem(item)"
    @touchstart="delayedOpenItem($event)"
    @touchend="clearTimeOut()"
    @contextmenu.prevent="app.emitter.emit('vf-contextmenu-show', { event: $event, items: ds.getSelected(), target: item })"
  >
    <slot/>
    <PinSVG class="vuefinder__item--pinned" v-if="app.pinnedFolders.find(pin => pin.path === item.path)"/>
  </div>
</template>

<script setup>
import {inject} from 'vue';
import ModalPreview from "./modals/ModalPreview.vue";
import ModalMove from "./modals/ModalMove.vue";
import PinSVG from "./icons/pin.svg";

const app = inject('ServiceContainer');
const ds = app.dragSelect;

const props = defineProps({
  item: {type: Object},
  index: {type: Number},
  dragImage: {type: Object}
})

const openItem = (item) => {
  if (item.type === 'dir') {
    app.emitter.emit('vf-search-exit');
    app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: item.path}});
  } else {
    app.modal.open(ModalPreview, {adapter: app.fs.adapter, item})
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

  ds.isDraggingRef.value = true;
  e.dataTransfer.setDragImage(props.dragImage.$el, 0, 15);
  e.dataTransfer.effectAllowed = 'all';
  e.dataTransfer.dropEffect = 'copy';
  e.dataTransfer.setData('items', JSON.stringify(ds.getSelected()))
};

const handleDropZone = (e, item) => {
  e.preventDefault();
  ds.isDraggingRef.value = false;
  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage !== app.fs.adapter)) {
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
let doubleTapTimeOut = null;
let tappedTwice = false;

const clearTimeOut = () => {
  if (touchTimeOut) {
    clearTimeout(touchTimeOut);
  }
}

const delayedOpenItem = ($event) => {
    if(!tappedTwice) {
        tappedTwice = true; 
        doubleTapTimeOut = setTimeout(() => tappedTwice = false, 300)
    } else {
        tappedTwice = false; 
        openItem(props.item);
        clearTimeout(touchTimeOut);
        return false;
    }
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
