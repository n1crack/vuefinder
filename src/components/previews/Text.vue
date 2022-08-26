<template>
  <div>
    <pre class="border font-normal border-gray-200 dark:border-gray-700/50 p-2 rounded min-h-[100px] text-sm">{{ content }}</pre>
      <!--              <textarea class="w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500" name="text" id="" cols="30" rows="10">{{ content }}</textarea>-->
  </div>
</template>

<script setup>

import {onMounted, ref} from 'vue';
import ajax from '../../utils/ajax.js';

const emit = defineEmits(['load'])
const content = ref('');

const props = defineProps({
  selection: Object
});

onMounted(() => {
  ajax(props.selection.url, {
    params: {q: 'preview', adapter: props.selection.adapter, path: props.selection.item.path},
    json: false
  })
      .then(response => response.text())
      .then(data => {
        content.value = data;
        emit('load');
      });
});


</script>
