<template>
  <div class="vuefinder__folder-loader-indicator">

    <LoadingSVG v-if="loading" class="vuefinder__folder-loader-indicator--loading" />
    <div class="vuefinder__folder-loader-indicator--icon" v-else>
      <SquareMinusSVG class="vuefinder__folder-loader-indicator--minus" v-if="opened && getLoadedFolder()?.folders.length" />
      <SquarePlusSVG class="vuefinder__folder-loader-indicator--plus" v-if="!opened" />
    </div>

  </div>
</template>

<script setup>
import {ref, inject, watch} from 'vue';

import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";
import LoadingSVG from "./icons/loading.svg";
import upsert from "../utils/upsert";

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

watch(() => opened.value, () =>
    getLoadedFolder()?.folders.length || fetchSubFolders()
);

function toggleIndicator() {
  return opened.value = !opened.value;
}

function getLoadedFolder() {
  return app.treeViewData.find(e => e.path === props.path) ;
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

