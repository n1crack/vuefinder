<script>
import {ref, inject} from "vue";

export default {
  name: "Downloader",

  setup() {
    /** @type {import('vue').Ref<HTMLIFrameElement>} */
    const downloadFrame = ref(null)
    const app = inject('VueFinder');

    app.emitter.on('vf-download', (url) => {
      downloadFrame.value.src = url;
      app.emitter.emit('vf-modal-close');
    });

    return {
      downloadFrame
    };
  }
}
</script>

<template>
  <iframe ref="downloadFrame" style="display:none;"></iframe>
</template>
