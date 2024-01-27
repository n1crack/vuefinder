<template>
  <div class="wrapper">
    <vue-finder
      id='my_vuefinder'
      :max-file-size="maxFileSize"
      :url="url"
      @select="handleSelect"
    />

    <button class="btn" @click="handleButton" :disabled="!selectedFiles.length">Show Selected</button>

    <div v-show="selectedFiles.length">
      <h3>Selected Files</h3>
      <ul>
        <li v-for="file in selectedFiles" :key="file.path">
          {{ file.path }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// CHANGE ME, Url for development server endpoint
const url = ref("http://localhost:8005/")
const maxFileSize = ref("500MB")


const selectedFiles = ref([]);
// an example how to show selected files, outside of vuefinder
// you can create a ref object and assign the items to it,
// then with a button click, you can get the selected items easily
const handleSelect = (selection) => {
  selectedFiles.value = selection
}

const handleButton = () => {
  console.log(selectedFiles.value)
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
.btn{
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}
</style>
