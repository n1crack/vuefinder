<template>
  <modal @close="$emit('close')">
    <div class="vuefinder-modal-header">
      Rename
    </div>
    <div class="vuefinder-modal-body">
      <div>
        <span>{{ item.dirname }}/</span>{{ item.basename }}
      </div>
      <input 
        ref="nameInput"
        v-model="tempName" 
        :placeholder="item.basename" 
        class="vuefinder-input" 
        type="text"
      >
    </div>

    <div class="vuefinder-modal-footer">
      <button 
        :disabled="tempName.length ==0 " 
        class="vuefinder-button" 
        @click="rename(item.path,directory + '/' + tempName)"
      >Rename
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
    name: 'ModalRename',
    components: { 'modal': Modal },
    props: {
        data: {
            type: Array,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        directory: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            tempName: this.data[0].basename,
            item: this.data[0]
        };
    },
    mounted(){
        this.$refs.nameInput.focus();
    },
    methods: {
        rename (from, to) {
            if (!this.url) {
                this.$emit('close');
                this.$emit('error', 'There is no url defined!', 'error');
                return;
            }
            axios.get(this.url, {
                params: {
                    q: 'rename',
                    from: from,
                    to: to
                }
            }).then(response => {
                if (response.data.status == true) {
                    this.$emit('close');
                    this.$emit('refresh', this.directory);
                    this.$root.$emit('vuefinder-item-renamed', from, to);
                } else {
                    this.$emit('close');
                    this.$emit('error', 'Error occured!!', 'error');
                }
            }).catch(error => {
                this.$emit('close');
                this.$emit('error', error.response.data.message, 'error');
            });
        }
    }
};
</script>