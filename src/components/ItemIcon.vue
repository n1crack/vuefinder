<template>
  <div class="vuefinder__item-icon" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'">
    <component v-if="comp" :is="comp.is" v-bind="comp.props || {}" />
    <FolderSVG v-else-if="item.type === 'dir'" />
    <FileSVG v-else />
    <div class="vuefinder__item-icon__extension"
        v-if="!comp && ext && item.type !== 'dir' && item.extension" >
      {{ item.extension.substring(0, 3) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import FileSVG from '@/assets/icons/file.svg';
import FolderSVG from '@/assets/icons/folder.svg';

import type { DirEntry } from '../types'

const props = defineProps<{
  item: DirEntry
  ext?: boolean
  small?: boolean
}>()

const app = inject('ServiceContainer')
const comp = app.customIcon?.(app, props.item)

</script>
