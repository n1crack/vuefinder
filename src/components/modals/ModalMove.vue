<script setup lang="ts">
import {inject} from "vue";
import ModalTransfer from "../../components/modals/ModalTransfer.vue";

const app = inject("ServiceContainer");
const {t} = app.i18n;
</script>

<template>
  <ModalTransfer
      q="move"
      :title="t('Move files')"
      :body="t('Are you sure you want to move these files')"
      :success-btn="t('Yes, Move!')"
      :success-text="t('Files moved.')"
  />
</template>
