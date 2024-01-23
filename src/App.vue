<template>
  <div class="wrapper">
    <vue-finder
      id='my_vuefinder'
      :max-file-size="maxFileSize"
      :url="url"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// CHANGE ME, Url for development server endpoint
const url = ref("http://localhost:8005/")
const maxFileSize = ref("500MB")
</script>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  width: 800px;
  margin: 100px auto;
}
</style>
