<template>
  <div class="vuefinder-toolbar">
    <div class="vuefinder-toolbar-left">
      <a 
        :disabled="selectedItems.length != 1" 
        class="vuefinder-button" 
        @click="(selectedItems.length == 1) ? $emit('showMenu', 'rename') : null"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="edit" />
        </span>
        <span class="is-hidden-mobile">Rename</span>
      </a>
      <a 
        :disabled="selectedItems.length == 0" 
        class="vuefinder-button" 
        @click="(selectedItems.length != 0) ? $emit('showMenu', 'delete') : null"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="trash" />
        </span>
        <span class="is-hidden-mobile">Delete</span>
      </a>
      <a 
        class="vuefinder-button" 
        @click="$emit('showMenu', 'new-folder')"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon icon="plus-square" />
        </span>
        <span class="is-hidden-mobile">NewFolder</span>
      </a>
      <a 
        :disabled="selectedItems.length != 1" 
        class="vuefinder-button" 
        @click="(selectedItems.length == 1) ? $emit('showMenu', 'preview') : null"
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
      <a 
        class="vuefinder-button" 
        @click="$emit('update:selectMode', ! selectMode)"
      >
        <span class="vuefinder-icon">
          <font-awesome-icon 
            v-if="selectMode" 
            icon="toggle-on" 
            style="color: dodgerblue" 
          />
          <font-awesome-icon 
            v-else 
            icon="toggle-off"
          />
        </span>
        <span class="is-hidden-mobile">Select</span>
      </a>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

export default {
    name: 'Toolbar',
    components: {
        'font-awesome-icon': FontAwesomeIcon
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
        selectMode: {
            type: Boolean,
            required: true
        },

    }
};
</script>

<style lang="scss" scoped>
.vuefinder-toolbar {
  border-bottom: 1px solid whitesmoke;
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
      font-size: 16px;
      height: 20px;
    }
  }
}
</style>