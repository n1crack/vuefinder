<template>
  <span>
    <svg v-if="type === 'dir'" xmlns="http://www.w3.org/2000/svg"
         :class="{'h-5 w-5': small, 'h-10 w-10 md:h-12 md:w-12 m-auto': !small}"
         class="text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg"
         :class="{'h-5 w-5': small, 'h-10 w-10 md:h-12 md:w-12 m-auto': !small}"
         class="text-neutral-500" fill="none" viewBox="0 0 24 24"
         stroke="currentColor" stroke-width="1">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
    </svg>
  </span>
</template>
<script setup>

defineProps({
  type: {
    type: String,
    required: true
  },

  small: {
    type: Boolean,
    default: false
  }
})

</script>
