<template>
  <div
    :style="{opacity: isDragging($el) || isCut() ? '0.5 !important' : ''}"
    :class="['vuefinder__item', 'vf-item-' + ds.explorerId]"
    :data-type="item.type"
    :key="item.path"
    :data-item="JSON.stringify(item)"
    :data-index="index"
    @dragstart="handleDragStart($event, item)"
    v-on="dragNDrop.events(item)"
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
import PinSVG from "@/assets/icons/pin.svg";
import {useDragNDrop} from '../composables/useDragNDrop';
import { useCopyPaste } from '../composables/useCopyPaste';

const app = inject('ServiceContainer');
const ds = app.dragSelect;
const copyPaste = useCopyPaste(app)

const props = defineProps({
  item: {type: Object},
  index: {type: Number},
  dragImage: {type: Object},
})

function isDragging($el) {
  return ds.isDraggingRef.value && ds.getSelection().find((el) => $el === el)
}

function isCut() {
  return (
    copyPaste.isCut.value && 
    copyPaste.copiedItems.value.find((item) => item.path === props.item.path)
  )
}

const openItem = (item) => {
  const contextMenuItem = app.contextMenuItems.find((cmi) => {
    return cmi.show(app, {
      searchQuery: '', 
      items: [item], 
      target: item,
    })
  })
  contextMenuItem.action(app, [item]);
};

const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])

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
