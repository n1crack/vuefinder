<template>
  <div class="vuefinder-toolbar">
    <div class="vuefinder-toolbar-left">
      <a 
        :disabled="selectedItems.length != 1" 
        class="vuefinder-button" 
        @click="(selectedItems.length == 1) && $emit('showMenu', 'rename')"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="edit" />
        </span>
        <span class="is-hidden-mobile">Rename</span>
      </a>
      <a 
        :disabled="selectedItems.length == 0" 
        class="vuefinder-button" 
        @click="(selectedItems.length != 0) && $emit('showMenu', 'delete')"
      >
        <span class="vuefinder-icon">
          <font-awesome-layers class="fa-layers fa-fw"> 
            <font-awesome-icon icon="trash" />
            <font-awesome-layers-text 
              v-show="selectedItems.length > 1"
              :value="selectedItems.length" 
              class="fa-layers-counter vuefinder-badge" 
              transform="down-8 shrink-9" />
          </font-awesome-layers>
        </span>
        <span class="is-hidden-mobile">Delete</span>
      </a>
      <a 
        class="vuefinder-button" 
        @click="$emit('showMenu', 'new-folder')"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="folder-plus" />
        </span>
        <span class="is-hidden-mobile">NewFolder</span>
      </a>
      <a 
        :disabled="selectedItems.length != 1" 
        class="vuefinder-button" 
        @click="(selectedItems.length == 1) && $emit('showMenu', 'preview')"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="eye" />
        </span>
        <span class="is-hidden-mobile">Preview</span>
      </a>
    </div>

    <div class="vuefinder-toolbar-right">
      <a 
        class="vuefinder-button" 
        @click="$emit('showMenu', 'upload')"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="upload" />
        </span>
        <span class="is-hidden-mobile">Upload</span>
      </a>
      <a 
        class="vuefinder-button" 
        @click="$emit('update:listview', ! listview)"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon 
            v-if="listview" 
            icon="list"
          />
          <font-awesome-icon 
            v-else 
            icon="th-large"
          />
        </span>
        <span class="is-hidden-mobile">View</span>
      </a>
    </div>
  </div>
</template>

<script>

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

export default {
    name: 'Toolbar',
    components: {
        FontAwesomeIcon, 
        FontAwesomeLayers,
        FontAwesomeLayersText
    },
    props:{
        selectedItems: {
            type: Array,
            required: true
        },
        listview: {
            type: Boolean,
            required: true
        },
    }
};
</script>

<style lang="scss" scoped>
.vuefinder-toolbar {
  display: flex;

  .vuefinder-toolbar-left {
    display: flex;
    flex: 1;
  }

  .vuefinder-toolbar-right {
    display: flex;
    text-align: right;
  }

  .vuefinder-button {
    border: 1px solid transparent;
    font-size: 14px;
  }

  .vuefinder-icon {
    display: block;
    font-size: 32px;
    text-align: center;
    height: 38px;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .vuefinder-icon {
      font-size: 20px;
      height: 20px;
    }
  }
}
</style>