<script setup lang="ts">
import {inject} from 'vue';
import { useApp } from '../composables/useApp';
import FileSVG from '../assets/icons/file.svg';
import FolderSVG from '../assets/icons/folder.svg';

import type {DirEntry} from '../types'
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';

const props = defineProps<{
  item: DirEntry
  ext?: boolean
  small?: boolean
}>()

const app = useApp()
const configState: StoreValue<ConfigState> = useStore(app.config.state)

// Scoped slot için gerekli verileri hazırla
const slotData = {
  app,
  config: configState.value,
  item: props.item
}
</script>

<template>
  <div class="vuefinder__item-icon" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'">
    <!-- Scoped slot ile custom icon desteği -->
    <slot name="icon" v-bind="slotData">
      <!-- Default icon'lar -->
      <FolderSVG class="vuefinder__item-icon__folder" v-if="item.type === 'dir'"/>
      <FileSVG class="vuefinder__item-icon__file" v-else/>
      <div class="vuefinder__item-icon__extension"
           v-if="ext && item.type !== 'dir' && item.extension">
        {{ item.extension.substring(0, 3) }}
      </div>
    </slot>
  </div>
</template>
