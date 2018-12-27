// define a mixin object
export default {
    directives: {
        dragarea: {
            bind: function (el, binding, vnode, oldVnode) {
                el.addEventListener('mousedown', function (e) {
                    if (e.altKey) {
                        vnode.context.selectable.stop();
                    } else {
                        vnode.context.selectable.start();
                    }
                });
            }
        },
        draggable: {
            bind: function (el, binding, vnode, oldVnode) {

                el.addEventListener('dragstart', function (e) {
                    if (!e.altKey) {
                        e.preventDefault();
                        return false;
                    }
                    let img = vnode.context.$refs.dragImage.$el;
                    e.dataTransfer.setDragImage(img, 0, 15);
                    e.dataTransfer.effectAllowed = 'all';
                    e.dataTransfer.dropEffect = 'copy';
                    e.dataTransfer.setData('data', JSON.stringify(vnode.context.getSelectedItems()));
                });
                el.addEventListener('dragover', function (e) {
                    if (vnode.context.isSelected(vnode.componentInstance.item) || vnode.componentInstance.item.type !== 'folder') {
                        e.dataTransfer.dropEffect = 'none';
                        e.dataTransfer.effectAllowed = 'none';
                    }
                });
                el.addEventListener('dragend', function (e) {
                    vnode.context.selectable.start();
                });
            },
        },
        dropzone: {
            bind: function (el, binding, vnode, oldVnode) {
                el.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                });
                el.addEventListener('dragover', function (e) {
                    e.preventDefault();

                });
                el.addEventListener('drop', function (e) {
                    e.preventDefault();

                    vnode.context.selectable.start();
                    console.log(e.dataTransfer.getData('data'));
                    console.log(vnode.context.getSelectedItems());

                });
            },
            unbind: function (el) {
                //return  el.removeEventListener('drop');
            }
        }
    },
};
