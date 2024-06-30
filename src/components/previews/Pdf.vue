<template>
  <div class="vuefinder__pdf-preview">
    <h3 class="vuefinder__pdf-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <object class="vuefinder__pdf-preview__object" :data="getPDFUrl()" type="application/pdf" width="100%" height="100%">
        <iframe class="vuefinder__pdf-preview__iframe" :src="getPDFUrl()" width="100%" height="100%">
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>.
          </p>
        </iframe>
      </object>
    </div>
  </div>
</template>

<style>
.vuefinder__pdf-preview__title {
  @apply mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400;
}

.vuefinder .vuefinder__pdf-preview__object {
  @apply h-[60vh];
}

.vuefinder .vuefinder__pdf-preview__iframe {
  @apply border-0;
}
</style>

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
