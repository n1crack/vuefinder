<script setup lang="ts">
import {ref, inject, watch} from 'vue';

import SquarePlusSVG from "../assets/icons/plus.svg";
import SquareMinusSVG from "../assets/icons/minus.svg";
import LoadingSVG from "../assets/icons/loading.svg";
import upsert from "../utils/upsert";

const props = defineProps<{
  storage: string
  path: string
}>()

const app = inject('ServiceContainer');
const {t} = app.i18n;
const opened = defineModel();
const loading = ref(false)

// loading..

watch(() => opened.value, () =>
    getLoadedFolder()?.folders.length || fetchSubFolders()
); 

function getLoadedFolder() {
  return app.treeViewData.find((e: any) => e.path === props.path);
}

const fetchSubFolders = () => {
  loading.value = true;
  app.requester.send({
    url: '',
    method: 'get',
    params: {
      q: 'subfolders',
      storage: props.storage,
      adapter: props.storage,
      path: props.path,
    },
  })
      .then((data: any) => {
        upsert(app.treeViewData, {path: props.path, type: 'dir', ...data})
      })
      .catch((e: any) => {
      })
      .finally(() => {
        loading.value = false;
      });

}
</script>


<template>
  <div class="vuefinder__folder-loader-indicator">

    <LoadingSVG v-if="loading" class="vuefinder__folder-loader-indicator--loading"/>
    <div class="vuefinder__folder-loader-indicator--icon" v-else>
      <SquareMinusSVG class="vuefinder__folder-loader-indicator--minus"
                      v-if="opened && getLoadedFolder()?.folders.length"/>
      <SquarePlusSVG class="vuefinder__folder-loader-indicator--plus" v-if="!opened"/>
    </div>

  </div>
</template>
