<template>
  <div class="wrapper">
    <vue-finder
      id='my_vuefinder'
      :max-file-size="maxFileSize"
      :url="url"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// CHANGE ME, Url for development server endpoint
const url = ref("http://localhost:8005/")
const maxFileSize = ref("500MB")

// an example how to show selected files, outside of vuefinder
// you can create a ref object and assign the items to it,
// then with a button click, you can get the selected items easily
const handleSelect = (selection) => {
  console.log(selection)
}
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
