<template>
    <modal @close="$emit('close')">
        <div class="vuefinder-modal-header">
            <h4>Create a new folder</h4>
        </div>

        <div class="vuefinder-modal-body">
            <input class="vuefinder-input" type="text" value="" placeholder="folder name"
                   v-model="tempName">
        </div>

        <div class="vuefinder-modal-footer">
            <button class="vuefinder-button" @click="makeFolder(directory,tempName)"
                    :disabled="tempName.length < 1">
                Create
            </button>
            <button class="vuefinder-button" @click="$emit('close')">Cancel</button>
        </div>
    </modal>
</template>
<script>
    import Modal from "./Modal";
    import axios from "axios";

    export default {
        props: ['url', 'directory'],
        components: {'modal': Modal},
        name: "ModalNewFolder",
        data() {
            return {
                tempName: '',
            }
        },
        methods: {
            makeFolder(dir, name) {
                if (!this.url) {
                    this.$emit('close');
                    this.$emit('error', 'There is no url defined!', 'error');
                    return;
                }

                axios.get(this.url, {
                    params: {
                        q: 'new-folder',
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

                });
            }
        }
    }
</script>