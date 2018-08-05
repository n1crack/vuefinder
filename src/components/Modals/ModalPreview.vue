<template>
    <modal @close="$emit('close')">
        <div class="vuefinder-modal-header">
            <h4>{{ title_shorten(item.basename) }}</h4>
        </div>
        <div class="vuefinder-modal-body">
            <transition-group name="vuefinder-fade" tag="div" class="vuefinder-modal-content">

                <file-previewer
                        v-show="item.size > 0"
                        key="previewer"
                        :url="url+'?q=read'"
                        :path="item.path"
                        :type="item.type">
                </file-previewer>

                <div key="vuefinder-info-extra" class="vuefinder-info-extra">
                    <div class="vuefinder-info-size" v-show="item.type != 'folder'"><span class="vuefinder-info-title">size:</span><span>{{ fileSizeIEC(item.size) }}</span>
                    </div>
                    <div class="vuefinder-info-time"><span class="vuefinder-info-title">time:</span>
                        <span>{{ time() }}</span></div>
                    <div class="vuefinder-info-url" v-show="item.fileUrl">
                        <span class="vuefinder-info-title">url:</span>
                        <input type="text" class="vuefinder-input" :value="item.fileUrl">
                    </div>
                </div>
            </transition-group>
        </div>

        <div class="vuefinder-modal-footer">
            <button class="vuefinder-button" @click="$emit('close')">Close</button>

            <button class="vuefinder-button" v-if="item.type != 'folder'" @click="download">
                <font-awesome-icon icon="download"></font-awesome-icon>
                Download
            </button>
        </div>
    </modal>
</template>

<script>
    import Modal from "./Modal.vue";
    import FilePreviewer from "../FilePreviewer.vue"

    import moment from 'moment';
    import axios from "axios";
    import filesize from '../../mixins/filesize'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {fas} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(fas)

    export default {
        name: "ModalPreview",
        props: ['data', 'url'],
        components: {Modal, FilePreviewer, FontAwesomeIcon},
        mixins: [filesize],
        data() {
            return {
                item: this.data[0]
            }
        },

        methods: {
            time() {
                return moment.unix(this.item.timestamp).format('LLL');
            },

            title_shorten(title) {
                return title.replace(/((?=([\w\W]{0,15}))([\w\W]{9,})([\w\W]{9,}))/, '$2..$4');
            },

            download() {
                if (!this.url) {
                    this.$emit('close');
                    this.$emit('error', 'There is no url defined!', 'error');
                    return;
                }
                axios(this.url, {
                    responseType: 'blob',
                    params: {
                        q: 'download',
                        path: this.item.path
                    }
                }).then(response => {
                    //download started..
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.item.basename);
                    document.body.appendChild(link);
                    link.click();
                });

            }
        }
    }
</script>

<style>
    .vuefinder-modal-content {
        box-sizing: border-box;
        padding: 5px;
    }

    .vuefinder-info-extra {
        user-select: text;

    }

    .vuefinder-info-url, .vuefinder-info-size, .vuefinder-info-time {
        display: flex;
        line-height: 2.5;
    }

    .vuefinder-info-title {
        font-weight: bold;
        width: 50px;
    }

</style>