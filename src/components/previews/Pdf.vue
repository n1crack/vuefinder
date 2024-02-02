<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="app.modal.data.item.path" data-microtip-position="bottom-right" role="tooltip">{{ app.modal.data.item.basename }}</h3>
  <div>
    <object class="h-[60vh]" :data="getPDFUrl()" type="application/pdf" width="100%" height="100%">
      <iframe
          class="border-0"
          :src="getPDFUrl()"
          width="100%"
          height="100%"
        >
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        </iframe>
    </object>
  </div>
</template>

<script setup>

import {inject,onMounted} from 'vue';

const app = inject('ServiceContainer');

const emit = defineEmits(['success']);

const getPDFUrl = () => {
  return app.requester.getPreviewUrl(app.modal.data.adapter, app.modal.data.item)
}

onMounted(() => {
  emit('success');
});


</script>
