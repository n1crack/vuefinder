<template>
  <div class="border-neutral-300 flex justify-between py-1 text-sm overflow-auto select-none">
    <div class="flex text-center">
        <div class="w-14 md:w-16 mx-2 hover:text-cyan-700 cursor-pointer" @click="emitter.emit('vf-modal-show', {type:'rename'})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
            Rename
        </div>
        <div class="w-14 md:w-16 mx-2 hover:text-cyan-700 cursor-pointer" @click="emitter.emit('vf-modal-show', {type:'delete'})">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>

            Delete
        </div>

        <div class="w-14 md:w-16 mx-2 hover:text-cyan-700 cursor-pointer"  @click="emitter.emit('vf-modal-show', {type:'new-folder'})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>

          NewFolder
        </div>

    </div>

    <div class="flex text-center justify-end">
        <div class="w-14 md:w-16 mx-2 hover:text-cyan-700 cursor-pointer" @click="emitter.emit('vf-view-toggle', view == 'list' ? 'grid' : 'list')">

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" v-if="view == 'grid'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" v-if="view == 'list'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>

          View
        </div>

        <div class="w-14 md:w-16 mx-2 hover:text-cyan-700 cursor-pointer"  @click="emitter.emit('vf-modal-show', {type:'message', title:'Custom modal', message: 'Custom title'})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>

          Upload
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFToolbar'
};
</script>

<script setup>
import {ref} from 'vue';

const emitter = inject('emitter')

const view = ref('grid')

emitter.on('vf-view-toggle', (newView) => {
  view.value = newView;
})
</script>
