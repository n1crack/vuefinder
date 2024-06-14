<template>
  <div class="h-5 w-5 shrink-0"
       @click=" (!opened || isFolderLoaded()?.folders.length) && toggleIndicator() && (isFolderLoaded() || fetchSubFolders())">

    <LoadingSVG v-if="loading"/>
    <div class=" cursor-pointer" v-else>
      <SquareMinusSVG class="text-gray-600" v-if="opened && isFolderLoaded()?.folders.length" />
      <SquarePlusSVG class="text-gray-400" v-if="!opened" />
    </div>

  </div>
</template>


<script setup>
import {ref, inject, defineProps} from 'vue';

import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";
import LoadingSVG from "./icons/loading.svg";

const props = defineProps({
  adapter: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  }
});

const app = inject('ServiceContainer');
const {t} = app.i18n;
const opened = defineModel();
const loading = ref(false)

// loading..

function toggleIndicator() {
  return opened.value = !opened.value;
}

function isFolderLoaded() {
  return app.treeViewData.find(e => e.path === props.path) ;
}

function upsert(array, element) { // (1)
  const i = array.findIndex(e => e.path === element.path);
  if (i > -1) array[i] = element; // (2)
  else array.push(element);
}

const fetchSubFolders = () => {
  loading.value = true;
  app.requester.send({
    url: '',
    method: 'get',
    params: {
      q: 'subfolders',
      adapter: props.adapter,
      path: props.path,
    },
  })
      .then(data => {
        upsert(app.treeViewData, {path: props.path, ...data})
      })
      .catch((e) => {
      })
      .finally(() => {
        loading.value = false;
      });

}
</script>

