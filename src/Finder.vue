<template>
  <div
    class="vuefinder"
    @contextmenu.prevent>

    <tool-bar
      :selected-items="getSelectedItems()"
      :listview.sync="listview"
      :select-mode.sync="selectMode"
      @showMenu="showMenu"
      @update:selectMode="selectable.clearSelection()"/>

    <breadcrumb-header
      :root="data.root"
      :dirname="data.dirname"
      :loading="loading"
      @openFolder="openFolder"/>

    <listview-sortbar
      v-show="listview"
      :sort="sort"
      @select="sortItems"/>

    <explorer
      :listview="listview"
      :is-root="data.dirname == data.root"
      :select-mode="selectMode"
      @contextmenu.native="showContextMenu($event)"
      @back="openFolder(data.parent)">
      <explorer-item
        v-for="item in sortedFiles"
        ref="files"
        :key="item.path"
        :item="item"
        :select-mode="selectMode"
        :listview="listview"
        @click.native.stop.prevent="open(item)"
        @contextmenu.native="addContextItems(item)"
        @mouseover.native="hoverText = item.basename"
        @mouseleave.native="hoverText = ''"/>
    </explorer>

    <div class="vuefinder-footer">
      <span>
        <span v-show="selectedItems.length">
          {{ selectedItems.length }} item{{ selectedItems.length>1?'s':'' }} selected
        </span>
        <span v-show="! selectMode">
          {{ hoverText }}
        </span>
      </span>
      <span class="vuefinder-status-message">
        vuefinder v0.1beta
      </span>
    </div>

    <context-menu
      v-show="context.active"
      :context="context"
      @close="hideContextMenu()"/>

    <component
      v-if="modal.active"
      :is="'modal-'+ modal.type"
      :directory="data.dirname"
      :url="url"
      :data="modal.item"
      @close="modal.active = false"
      @error="msgBox"
      @refresh="openFolder"/>
  </div>
</template>

<script>
import axios from 'axios';
import DragSelect from 'dragselect';

import ModalNewFolder from './components/Modals/ModalNewFolder.vue';
import ModalRename from './components/Modals/ModalRename.vue';
import ModalDelete from './components/Modals/ModalDelete.vue';
import ModalUpload from './components/Modals/ModalUpload.vue';
import ModalMessage from './components/Modals/ModalMessage.vue';
import ModalPreview from './components/Modals/ModalPreview.vue';
import ContextMenu from './components/ContextMenu.vue';
import ToolBar from './components/ToolBar.vue';
import Explorer from './components/Explorer.vue';
import ExplorerItem from './components/ExplorerItem.vue';
import BreadcrumbHeader from './components/BreadcrumbHeader.vue';
import ListviewSortbar from './components/ListviewSortbar.vue';

export default {
    name: 'Vuefinder',
    components: {
        ToolBar,
        ContextMenu,
        ListviewSortbar,
        BreadcrumbHeader,
        Explorer,
        ExplorerItem,
        ModalNewFolder,
        ModalRename,
        ModalDelete,
        ModalUpload,
        ModalMessage,
        ModalPreview
    },
    props: {
        url: {
            type: String,
            required: true
        },
        path: {
            type: String,
            default: '.'
        },
    },
    data() {
        return {
            selectMode: false,
            listview: false,
            selectedItems: [],
            data: {dirname: '.', root: '.'},
            loading: false,
            hoverText: '',
            modal: {active: false, type: ''},
            sort: {active: false, by: '', order: ''},
            context: {active: false, positions: {}, items: []}
        };
    },

    computed: {
        sortedFiles: function () {
            let sort_by = this.sort.by;
            let sort_order = this.sort.order;

            if (this.data.files && this.sort.active) {
                return this.data.files.slice(0).sort((a, b) => {
                    if (a[sort_by] < b[sort_by]) return sort_order == 'asc' ? -1 : 1;
                    if (a[sort_by] > b[sort_by]) return sort_order == 'asc' ? 1 : -1;
                    return 0;
                });
            }
            return this.data.files;
        }
        
    },
    mounted() {
        this.selectable = new DragSelect({
            area: document.querySelector('.vuefinder-explorer'),
            selectedClass: 'node-selected',
            onDragStart: () => {
                if (!this.selectMode) {
                    this.selectable.break();
                    this.selectable.clearSelection();
                }
            },
            callback: elements => {
                this.selectedItems = elements;
                this.$root.$emit('vuefinder-items-selected', elements);
            }
        });

        this.path = this.path.replace(/^\/+|\/+$/i, '');
        this.getIndex(this.url, this.path);

        this.$root.$on('vuefinder-item-uploaded', () => {
            this.openFolder(this.data.dirname);
        });
    },

    methods: {
        getComponentbyNode(element) {
            return this.$refs.files.find(a => a.$el == element);
        },

        getSelectedComponents(){
            return this.selectedItems.map(element => this.getComponentbyNode(element));
        },

        getSelectedItems () {
            return this.getSelectedComponents().map(a => a.item);
        },

        getNodeElements() {
            return this.$refs.files.map(a => a.$el);
        },

        getIndex(url, path = null) {
            if (!url) {
                this.msgBox('There is no url defined.', 'error');
                return;
            }
            this.loading = true;
            axios(url, {
                params: {
                    q: 'index',
                    path: path
                }
            })
                .then(response => {
                    this.data = response.data;
                    this.loading = false;
                    this.$nextTick(() => {
                        this.selectable.selectables = this.getNodeElements();
                    });
                })
                .catch(error => {
                    this.msgBox(error.message, 'error');
                });
        },

        sortItems(args) {
            let sort = (a, b, c) => {
                this.sort.active = a;
                this.sort.by = b;
                this.sort.order = c;
            };
            if (!this.sort.active || (this.sort.active && this.sort.by != args)) {
                sort(true, args, 'asc');
            } else if (this.sort.active == true && this.sort.by == args) {
                if (this.sort.order == 'asc') {
                    sort(true, args, 'desc');
                } else if (this.sort.order == 'desc') {
                    this.sort.active = false;
                    this.openFolder(this.data.dirname);
                }
            }
        },

        msgBox(message, type = 'error') {
            this.showMenu('message', {message: message, type: type});
        },

        showContextMenu(event) {
            this.context.active = true;
            this.context.items.push({
                title: 'new folder',
                icon: 'folder',
                action: () => {
                    this.showMenu('new-folder');
                }
            });
            this.context.items.push({
                title: (this.selectMode ? 'exit' : 'enter') + ' select mode',
                icon: this.selectMode ? 'toggle-on' : 'toggle-off',
                action: () => {
                    this.selectMode = !this.selectMode;
                    this.selectable.clearSelection();
                    this.hideContextMenu();
                }
            });

            let rect = this.$el.getBoundingClientRect();
            this.context.positions = {
                left: event.pageX - rect.left - window.scrollX + 'px',
                top: event.pageY - rect.top - window.scrollY + 'px'
            };
        },

        hideContextMenu() {
            this.context.items = [];
            this.context.active = false;
        },

        addContextItems(item) {
            if (this.isSelected(item)) {
                this.context.items.push({
                    title: 'delete (' + this.getSelectedItems().length + ' items)',
                    icon: 'times-circle',
                    action: () => {
                        this.showMenu('delete', this.getSelectedItems());
                    }
                });
                return;
            }

            this.context.items.push({
                title: 'rename',
                icon: 'edit',
                action: () => {
                    this.showMenu('rename', [item]);
                }
            });
            this.context.items.push({
                title: 'preview',
                icon: 'eye',
                action: () => {
                    this.showMenu('preview', [item]);
                }
            });
            this.context.items.push({
                title: 'delete',
                icon: 'times-circle',
                action: () => {
                    this.showMenu('delete', [item]);
                }
            });
        },

        isSelected(item) {
            return this.getSelectedItems().indexOf(item) > -1;
        },

        open(item) {
            if (this.selectMode) {
                return false;
            }

            if (item.type == 'folder') {
                this.$root.$emit('vuefinder-folder-clicked');
                this.getIndex(this.url, item.path);
            } else {
                this.$root.$emit('vuefinder-item-clicked');
                this.showMenu('preview', [item]);
            }
        },

        openFolder(folder) {
            this.open({path: folder, type: 'folder'});
        },

        showMenu(type, item = false) {
            this.modal.item = item || this.getSelectedItems();
            this.modal.type = type;
            this.modal.active = true;
        }
    }
};
</script>
<style lang="scss" scoped>
    .vuefinder {
        font-family: Helvetica, sans-serif;
        letter-spacing: 1px;
        position: relative;
        border: 1px solid #cbd0d3;
        border-radius: 4px 4px 0 0;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .vuefinder-footer {
        background-color: whitesmoke;
        padding: 5px;
        font-size: 12px;
        min-height: 28px;
        line-height: 18px;
        display: flex;
        .vuefinder-status-message {
            text-align: right;
            flex: 1;
        }
    }

    @media screen and (max-width: 768px) {
        #{"/deep/"} .is-hidden-mobile {
            display: none !important;
        }
    }

    #{"/deep/"} .vuefinder-input {
        padding: 8px;
        font-size: 14px;
        font-weight: 200;
        &:focus {
            outline: 0;
        }
    }

    #{"/deep/"} .vuefinder-button {
        letter-spacing: 1.1px;
        font-size: 13px;
        font-weight: 200;
        padding: 0.4rem 0.8em;
        cursor: pointer;
        color: #2d4e5c;
        border: 1px solid #8db3c1;
        background-color: transparent;
        &:active {
            position: relative;
            top: 1px;
        }
        &:focus {
            outline: 0;
        }
        &:hover {
            opacity: 0.9;
            background-color: #f9f9f9;
        }
        &[disabled] {
            background-color: transparent;
            opacity: 0.4;
            cursor: not-allowed;
        }
        &[disabled]:active {
            position: relative;
            top: 0px;
        }
    }
</style>