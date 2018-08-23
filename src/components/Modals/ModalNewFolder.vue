<template>
  <modal @close="$emit('close')">
    <div class="vuefinder-modal-header">
      <h4>Create a new folder</h4>
    </div>

    <div class="vuefinder-modal-body">
      <input 
        v-model="tempName" 
        class="vuefinder-input" 
        type="text" 
        value="" 
        placeholder="folder name"
      >
    </div>

    <div class="vuefinder-modal-footer">
      <button 
        :disabled="tempName.length < 1" 
        class="vuefinder-button" 
        @click="makeFolder(directory,tempName)"
      >
        Create
      </button>
      <button 
        class="vuefinder-button" 
        @click="$emit('close')"
      >Cancel</button>
    </div>
  </modal>
</template>
<script>
import Modal from './Modal';
import axios from 'axios';

export default {
    name: 'ModalNewFolder',
    components: { 'modal': Modal },
    props: ['url', 'directory'],
    data () {
        return {
            tempName: '',
        };
    },
    methods: {
        makeFolder (dir, name) {
            if (!this.url) {
                this.$emit('close');
                this.$emit('error', 'There is no url defined!', 'error');
                return;
            }

            axios.get(this.url, {
                params: {
                    q: 'newfolder',
                    path: this.directory,
                    name: name
                }
            }).then(response => {
                // if no error.. if success == true then...
                if (response.data.status == true) {
                    this.$emit('close');
                    this.$emit('refresh', this.directory);
                    this.$root.$emit('vuefinder-folder-created', this.directory, name);
                } else {
                    this.$emit('close');
                    this.$emit('error', 'Error occured!!', 'error');
                }

            }).catch(error => {
                if (error.response.data.status == false) {
                    this.$emit('close');
                    this.$emit('error', error.response.data.message, 'error');
                }
            });
        }
    }
};
</script>