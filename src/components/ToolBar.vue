<template>
    <div class="vuefinder-toolbar">
        <div class="vuefinder-toolbar-left">
            <a class="vuefinder-button" :disabled="selectedItems.length != 1"
               @click="(selectedItems.length == 1) ? $emit('showMenu', 'rename') : null">
                    <span class="vuefinder-icon">
                        <font-awesome-icon icon="edit"></font-awesome-icon>
                      </span>
                <span class="is-hidden-mobile">Rename</span>
            </a>
            <a class="vuefinder-button" :disabled="selectedItems.length == 0"
               @click="(selectedItems.length != 0) ? $emit('showMenu', 'delete') : null">
                      <span class="vuefinder-icon">
                        <font-awesome-icon icon="trash"></font-awesome-icon>
                      </span>
                <span class="is-hidden-mobile">Delete</span>
            </a>
            <a class="vuefinder-button"
               @click="$emit('showMenu', 'new-folder')">
                      <span class="vuefinder-icon">
                        <font-awesome-icon icon="plus-square"></font-awesome-icon>
                      </span>
                <span class="is-hidden-mobile">NewFolder</span>
            </a>
            <a class="vuefinder-button" :disabled="selectedItems.length != 1"
               @click="(selectedItems.length == 1) ? $emit('showMenu', 'preview') : null">
                      <span class="vuefinder-icon">
                        <font-awesome-icon icon="eye"></font-awesome-icon>
                      </span>
                <span class="is-hidden-mobile">Preview</span>
            </a>
        </div>

        <div class="vuefinder-toolbar-right">
            <a class="vuefinder-button" @click="$emit('showMenu', 'upload')">
                          <span class="vuefinder-icon">
                            <font-awesome-icon icon="upload"></font-awesome-icon>
                          </span>
                <span class="is-hidden-mobile">Upload</span>
            </a>
            <a class="vuefinder-button" @click="$emit('update:listview', ! listview)">
                          <span class="vuefinder-icon">
                              <font-awesome-icon icon="list" v-if="listview"></font-awesome-icon>
                              <font-awesome-icon icon="th-large" v-else></font-awesome-icon>
                          </span>
                <span class="is-hidden-mobile">View</span>
            </a>
            <a class="vuefinder-button" @click="$emit('update:selectMode', ! selectMode)">
                          <span class="vuefinder-icon">
                              <font-awesome-icon icon="toggle-on" style="color: dodgerblue"
                                                 v-if="selectMode"></font-awesome-icon>
                              <font-awesome-icon icon="toggle-off" v-else></font-awesome-icon>
                          </span>
                <span class="is-hidden-mobile">Select</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {fas} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(fas)

    export default {
        props: ['selectedItems', 'listview', 'selectMode'],
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        name: "Toolbar",
    }
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