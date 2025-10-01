<template>
  <ModalTransfer
    q="copy"
    :title="t('Copy files')"
    :body="t('Are you sure you want to copy these files')"
    :success-btn="t('Yes, Copy!')"
    :success-text="t('Files copied.')"
  />
</template>

<script setup lang="ts">
import { inject } from "vue";
import ModalTransfer from "./ModalTransfer.vue";

const app = inject("ServiceContainer");
const { t } = app.i18n;
</script>
