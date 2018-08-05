<template>
    <modal @close="$emit('close')">
        <div class="vuefinder-modal-header">
            Message:
        </div>
        <div class="vuefinder-modal-body">
            <div>
            <span class="message-icon" :class="'message-'+type">
                <font-awesome-icon :icon="icons[type]"></font-awesome-icon>
            </span>
                {{ message }}
            </div>
        </div>

        <div class="vuefinder-modal-footer">
            <button class="vuefinder-button" @click="$emit('close')">Close</button>
        </div>
    </modal>
</template>

<script>
    import Modal from "./Modal";

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {fas} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(fas)

    export default {
        name: "ModalMessage",
        props: ['data'],
        components: {Modal, FontAwesomeIcon},
        data() {
            return {
                message: '',
                icons: {
                    'info': 'info-circle',
                    'error': 'exclamation-circle'
                },
                type: 'info'
            }
        },
        mounted() {
            if (typeof this.data[0] === "string") {
                this.message = this.data[0];
            } else if (typeof this.data[0] === "object") {
                this.message = this.data[0].message;
                this.type = this.data[0].type;
            }
        }
    }
</script>

<style scoped>
    .message-icon {
        font-size: 24px
    }

    .message-info {
        color: cornflowerblue
    }

    .message-error {
        color: crimson
    }
</style>
 