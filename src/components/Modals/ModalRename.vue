<template>
    <modal @close="$emit('close')">
        <div class="vuefinder-modal-header">
            <h4>Rename</h4>
        </div>
        <div class="vuefinder-modal-body">
            <div>
                <span style="color: darkgray">{{ item.dirname }}/</span>{{item.basename}}
            </div>
            <input class="vuefinder-input" type="text" v-model="tempName" :placeholder="item.basename">
        </div>

        <div class="vuefinder-modal-footer">
            <button class="vuefinder-button"
                    @click="rename(item.path,directory + '/' + tempName)"
                    :disabled="tempName.length ==0 ">Rename
            </button>
            <button class="vuefinder-button" @click="$emit('close')">Cancel</button>
        </div>
    </modal>
</template>

<script>
    import Modal from "./Modal";
    import axios from "axios";

    export default {
        props: ['data', 'directory', 'url'],
        components: {'modal': Modal},
        name: "ModalRename",
        data() {
            return {
                tempName: this.data[0].basename,
                item: this.data[0]
            }
        },
        methods: {
            rename(from, to) {
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
    }
</script>