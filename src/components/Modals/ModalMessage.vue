<template>
  <modal @close="$emit('close')">
    <div class="vuefinder-modal-header">
      Message:
    </div>
    <div class="vuefinder-modal-body">
      <div>
        <span 
          :class="'message-'+type" 
          class="message-icon"
        >
          <font-awesome-icon :icon="icons[type]" />
        </span>
        {{ message }}
      </div>
    </div>

    <div class="vuefinder-modal-footer">
      <button 
        class="vuefinder-button" 
        @click="$emit('close')"
      >Close</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'ModalMessage',
    components: { Modal, FontAwesomeIcon },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            message: '',
            icons: {
                'info': 'info-circle',
                'error': 'exclamation-circle'
            },
            type: 'info'
        };
    },
    mounted () {
        this.message = this.data.message;
        this.type = this.data.type;
    }
};
</script>

<style scoped>
.message-icon {
  font-size: 24px;
}

.message-info {
  color: cornflowerblue;
}

.message-error {
  color: crimson;
}
</style>
 