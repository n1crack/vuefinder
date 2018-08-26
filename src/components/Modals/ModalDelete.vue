<template>
  <modal @close="$emit('close')">
    <div class="vuefinder-modal-header">
      Are you sure you want to delete these items?
    </div>
    <div>{{ data.length }} item{{ data.length > 1 ? 's':'' }} selected.</div>
    <div class="vuefinder-modal-body">
      <ul class="delete-list">
        <li 
          v-for="item in data" 
          :key="item.path"
        >
          <div class="delete-list-item">
            <span class="file_path">{{ item.dirname?'/':'' }}{{ item.dirname }}/</span>
            <span class="file_name">{{ item.basename }}</span>
          </div>
          <div class="delete-list-type">{{ item.type }}</div>
        </li>
      </ul>
    </div>
    <div class="vuefinder-modal-footer">
      <button 
        class="vuefinder-button" 
        @click="remove"
      >Yes, delete!</button>
      <button 
        class="vuefinder-button" 
        @click="$emit('close')"
      >Cancel</button>
      <div style="color:crimson">
        <span style="font-weight:bold">Caution:</span>
        You
        <span style="font-weight:bold">cannot</span> undo this action!
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal';
import axios from 'axios';

export default {
    name: 'ModalDelete',
    components: { 'modal': Modal },
    props: {
        data: {
            type: Array,
            required: true
        }, 
        directory:{
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    methods: {
        remove () {
            if (!this.url) {
                this.$emit('close');
                this.$emit('error', 'There is no url defined!', 'error');
                return;
            }

            let deleted = this.data.map(function (item) {
                return { path: item.path, type: item.type };
            });

            axios.get(this.url, {
                params: {
                    q: 'delete',
                    items: JSON.stringify(deleted)
                }
            }).then(response => {
                if (response.data.status == true) {
                    this.$root.$emit('vuefinder-item-deleted', deleted);
                    this.$emit('close');
                    this.$emit('refresh', this.directory);
                } else {
                    this.$emit('close');
                    this.$emit('error', 'Error occured!!', 'error');
                }
            });

        },
    }
};
</script>

<style scoped>
.delete-list {
  font-size: 13px;
  margin: 0;
  padding: 0;
}

.delete-list li {
  display: flex;
  padding-top: 5px;
  border-bottom: 1px dashed lightgray;
}

.delete-list-item {
  flex: 1;
  user-select: text;
}

.delete-list-type {
  margin-left: 10px;
  align-self: center;
}

.file_name {
  color: crimson;
}

.file_path {
  color: darkslategrey;
}
</style>
