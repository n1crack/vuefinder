<script setup lang="ts">
import { useApp } from '../../composables/useApp';
import { onMounted } from 'vue';

const app = useApp();
const emit = defineEmits(['success']);

const getPDFUrl = () => {
  const app = useApp();
  return app.adapter.getPreviewUrl({ path: app.modal.data.item.path });
};

onMounted(() => {
  emit('success');
});
</script>

<template>
  <div class="vuefinder__pdf-preview">
    <div>
      <object
        class="vuefinder__pdf-preview__object"
        :data="getPDFUrl()"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <iframe
          class="vuefinder__pdf-preview__iframe"
          :src="getPDFUrl()"
          width="100%"
          height="100%"
        >
          Your browser does not support PDFs
        </iframe>
      </object>
    </div>
  </div>
</template>
