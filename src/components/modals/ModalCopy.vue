<script setup lang="ts">
import {inject} from "vue";
import ModalTransfer from "./ModalTransfer.vue";

const app = inject("ServiceContainer");
const {t} = app.i18n;

</script>


<template>
  <ModalTransfer
      q="copy"
  />
</template>
