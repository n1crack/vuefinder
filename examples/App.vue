

<script setup lang="ts">
import { ref } from 'vue';
import { FEATURE_ALL_NAMES } from '../src/features.js';
import { contextMenuItems } from '../src/index.js';
import PDFIcon from './icons/pdf_file.svg'
import TextIcon from './icons/text_file.svg'

const example = ref('default')
const examples = {
  default: "Inline select button example",
  externalSelect: "External select example",
  contextmenu: "Custom context menu example",
  customIcons: "Custom Icons"
}

/** @type {import('../src/utils/ajax.js').RequestConfig} */

const request = {
  // ----- CHANGE ME! -----
  // [REQUIRED] Url for development server endpoint
  baseUrl: "http://inertia-vuefinder.test/vuefinder",
  // ----- CHANGE ME! -----

  // Additional headers & params & body
  headers: { "X-ADDITIONAL-HEADER": 'yes' },
  params: { additionalParam1: 'yes' },
  body: { additionalBody1: ['yes'] },

  // And/or transform request callback
  transformRequest: req => {
    if (req.method === 'get') {
      req.params.vf = "1"
    }
    return req;
  },

  // XSRF Token header name
  xsrfHeaderName: "CSRF-TOKEN",
}
const maxFileSize = ref("500MB")

const features = [
  ...FEATURE_ALL_NAMES,
  // Or remove the line above, specify the features want to include
  // Like...
  //FEATURES.LANGUAGE,
]

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

const handlePathUpdate = (path: string) => {
  console.log('Path updated: ', path);
}

const customContextMenuItems = [
  ...contextMenuItems,
  {
    id: 'loginfo',
    title: () => 'Log Info',
    action: (app, selectedItems) => {
    const info = selectedItems.map((i) => `Name: ${i.basename}, Type: ${i.type}, Path: ${i.path}`)
    console.log(selectedItems.length + " item(s) selected:\n", info.join('\n'))
    console.log(selectedItems)
    },
    show: () => true,
  }
]

const customIconMap = {
  'pdf': PDFIcon,
  'txt': TextIcon
}
/**
 * @param {import('../src/types.js').App} app
 * @param {import('../src/types.js').DirEntry} item 
 */
const customIcon = (app, config, item) => {
  const props = {
    style: {
      padding: config.view === 'grid' || !config.compactListView ? '6px' : '1px',
      height: '100%',
      width: 'auto',
      margin: 'auto',
    }
  }
  const icon = customIconMap[item.extension]
  if (icon) {
    return { is: icon, props }
  }
  return undefined
}

</script>


<template>
  <div class="wrapper">
    
    <label for="example">
      Example
    </label>
    <div>
      <select id="example" v-model="example">
        <option v-for="(name, key) in examples" :value="key" :key="key">{{ name }}</option>
      </select>
    </div>

    <div style="font-weight: bold;padding: 10px">{{ examples[example] }}</div>
    <vue-finder
      v-if="example === 'default'"
      id='my_vuefinder'
      :request="request"
      :max-file-size="maxFileSize"
      :features="features"
      @path-update="handlePathUpdate"
    >
    
      <template #status-bar="{ selected, path, count }">
        <div class="vuefinder__status-bar__actions">
          <button
              class="border border-gray-300 dark:border-gray-600 rounded-xs p-0.5 disabled:opacity-50 not-disabled:hover:text-sky-400 not-disabled:cursor-pointer"
              @click="() => {
                     console.log(selected);
                     console.log(path);
                     console.log(count);
                  }"
              :disabled="!count"
          >
            Show Selected  ({{ count ?? 0 }} selected)
          </button>
        </div>
      </template>

    </vue-finder>

    <div v-if="example === 'externalSelect'">
      <vue-finder
        id='my_vuefinder2'
        :request="request"
        :max-file-size="maxFileSize"
        :features="features"
        loadingIndicator="linear"
        @select="handleSelect"
      />

      <button class="btn" @click="handleButton" :disabled="!selectedFiles.length">Show Selected  ({{ selectedFiles.length ?? 0 }} selected)</button>
      <div v-show="selectedFiles.length">

        <h3>Selected Files ({{ selectedFiles.length }} selected)</h3>
        <ul>
          <li v-for="file in selectedFiles" :key="file.path">
            {{ file.path }}
          </li>
        </ul>
      </div>
    </div>

    <vue-finder
      v-if="example === 'contextmenu'"
      id='my_vuefinder3'
      :request="request"
      :max-file-size="maxFileSize"
      :features="features"
      :context-menu-items="customContextMenuItems"
    />

    <vue-finder
      v-if="example === 'customIcons'"
      id='my_vuefinder4'
      :request="request"
      :max-file-size="maxFileSize"
      :features="features"
      :icon="customIcon"
    />

  </div>
</template>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  max-width: 800px;
  margin: 80px auto;
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
