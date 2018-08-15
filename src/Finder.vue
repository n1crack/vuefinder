<template>
    <div class="vuefinder" @contextmenu.prevent>

        <tool-bar :selectedItems="selectedItems" @showMenu="showMenu"
                  :listview.sync="listview" :selectMode.sync="selectMode" @update:selectMode="selectedItems = []"></tool-bar>

        <breadcrumb-header :root="data.root" :dirname="data.dirname" :loading="loading"
                           @openFolder="openFolder"></breadcrumb-header>

        <listview-sortbar v-show="listview" :sort="sort" @select="sortItems"></listview-sortbar>

        <explorer :listview="listview" 
            :is-root="data.dirname == data.root" 
            :selectMode="selectMode" 
            @contextmenu.native="showContextMenu($event)"
            @back="openFolder(data.parent)"
        >
            <explorer-item v-for="(item, index) in sortedFiles" :key="item.path" :item="item" ref="files"
                           :selectMode="selectMode" :listview="listview"
                           :class="{ 'node-selected': isSelected(index) }"
                           @click.native.stop.prevent="open(item)"
                           @contextmenu.native="addContextItems(item, index, $event)"
                           @mouseover.native="hoverText = item.basename"
                           @mouseleave.native="hoverText = ''">
            </explorer-item>
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

        <context-menu v-show="context.active"
                      :context="context"
                      @close="hideContextMenu()"></context-menu>

        <component v-if="modal.active"
                   :is="'modal-'+ modal.type"
                   :directory="data.dirname"
                   :url="url"
                   :data="modal.item"
                   @close="modal.active = false"
                   @error="msgBox"
                   @refresh="openFolder"></component>
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
    import ToolBar from "./components/ToolBar.vue";
    import Explorer from "./components/Explorer.vue";
    import ExplorerItem from "./components/ExplorerItem.vue";
    import BreadcrumbHeader from "./components/BreadcrumbHeader.vue";
    import ListviewSortbar from "./components/ListviewSortbar.vue";

    export default {
        props: {
            url: String,
            path: String
        },
        components: {
            ToolBar, ContextMenu, ListviewSortbar, BreadcrumbHeader, Explorer, ExplorerItem,
            ModalNewFolder, ModalRename, ModalDelete, ModalUpload, ModalMessage, ModalPreview
        },
        name: "vuefinder",
        data() {
            return {
                selectMode: false,
                listview: false,
                selectedItems: [],
                data: {'dirname': '.', 'root': '.'},
                loading: false,
                hoverText: '',
                modal: {active: false, type: ''},
                sort: {active: false, by: '', order: ''},
                context: {active: false, positions: {}, items: []}
            }
        },
        mounted() {
            this.selectable = new DragSelect({
                area: document.querySelector('.vuefinder-explorer'),
                onDragStart: element => {
                    if( !this.selectMode ) {
                        this.selectable.break();
                        this.selectable.clearSelection();
                    } 
                },
                callback: elements => {
                    this.selectedItems = [];
                    elements.forEach( element => this.toggleSelection(this.getElementIndex(element)))
                    this.$root.$emit('vuefinder-items-selected', elements)
                }
            });

            if (this.path) {
                this.path = this.path.replace(/^\/+|\/+$/i, '');
            }

            this.getIndex(this.url, this.path);

            this.$root.$on("vuefinder-item-uploaded", () => {
                this.openFolder(this.data.dirname);
            });

        },

        computed: {
            sortedFiles: function () {
                let sort_by = this.sort.by;
                let sort_order = this.sort.order;

                if (this.data.files && this.sort.active) {
                    return this.data.files.sort((a, b) => {
                        if (a[sort_by] < b[sort_by])
                            return sort_order == 'asc' ? -1 : 1;
                        if (a[sort_by] > b[sort_by])
                            return sort_order == 'asc' ? 1 : -1;
                        return 0;
                    });
                }
                return this.data.files;
            },

            selectedItemsWithProps: function () {
                return this.selectedItems.map((a) => {
                    return this.data.files[a];
                })
            }
        },

        methods: {
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
                }).then(response => {
                    this.data = response.data;
                    this.loading = false;
                    this.$nextTick().then(() => {
                        this.selectable.selectables = this.getElements(); 
                    });
                }).catch(error => {
                    this.msgBox(error.message, 'error')
                });
            },

            getElements() {
                return this.$refs.files.map((a)=>{return a.$el});
            },

            getElementIndex(element) {
                return this.getElements().indexOf(element)
            },

            sortItems(sortParam) {
                let sort = (a, b, c) => {
                    this.sort.active = a;
                    this.sort.by = b;
                    this.sort.order = c;
                }
                if (this.sort.active == false || (this.sort.active == true && this.sort.by != sortParam)) {
                    sort(true, sortParam, 'asc');
                }
                else if (this.sort.active == true && this.sort.by == sortParam) {
                    if (this.sort.order == 'asc') {
                        sort(true, sortParam, 'desc');
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
                        'title': 'new folder',
                        'icon': 'folder',
                        'action': () => {
                            this.showMenu('new-folder');
                        }
                });
                this.context.items.push({
                        'title': (this.selectMode ? 'exit' : 'enter') + ' select mode',
                        'icon': this.selectMode ? 'toggle-on' : 'toggle-off',
                        'action': () => {
                            this.selectMode = ! this.selectMode;
                            this.selectedItems = [];
                            this.hideContextMenu();
                        }
                });

                let rect = this.$el.getBoundingClientRect();
                this.context.positions = {
                    left: event.pageX - rect.left - window.scrollX + "px",
                    top: event.pageY - rect.top - window.scrollY + "px"
                };
            },

            hideContextMenu() {
                this.context.items = [];
                this.context.active = false;
            },

            addContextItems(item, index, event){
                if (this.isSelected(index)) {
                    this.context.items.push({
                            'title': 'delete (' + this.selectedItemsWithProps.length + ' items)',
                            'icon': 'times-circle',
                            'action': () => {
                                this.showMenu('delete', this.selectedItemsWithProps);
                            }
                    });
                    return;
                }

                this.context.items.push({
                        'title': 'rename',
                        'icon': 'edit',
                        'action': () => {
                            this.showMenu('rename', [item]);
                        }
                });
                this.context.items.push({
                        'title': 'preview',
                        'icon': 'eye',
                        'action': () => {
                            this.showMenu('preview', [item]);
                        }
                });
                this.context.items.push({
                        'title': 'delete',
                        'icon': 'times-circle',
                        'action': () => {
                            this.showMenu('delete', [item]);
                        }
                });
            },

            isSelected(index) {
                return this.selectedItems.indexOf(index) > -1;
            },

            toggleSelection(index) {
                if (this.isSelected(index)) {
                    this.selectedItems.splice(this.selectedItems.indexOf(index), 1);
                }
                else {
                    this.selectedItems.push(index);
                }
            },

            open(item) {
                if(this.selectMode) {
                    return false;
                }

                if (item.type == 'folder') {
                    this.$root.$emit('vuefinder-folder-clicked');
                    this.getIndex(this.url, item.path);
                }
                else {
                    this.$root.$emit('vuefinder-item-clicked');
                    this.showMenu('preview', [item]);
                }
             },

            openFolder(folder) {
                this.open({'path': folder, 'type': 'folder'})
            },

            showMenu(type, item = false) {
                this.modal.item = item || this.selectedItemsWithProps;
                this.modal.type = type;
                this.modal.active = true;
            },
        }
    }
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
            opacity: .9;
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