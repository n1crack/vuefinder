import {ref, shallowRef} from "vue";
import DragSelect from 'dragselect';

export default function (emitter) {
    const obj = shallowRef();
    const area = ref(null);
    const explorerId = ref(Math.floor(Math.random() * 2 ** 32));
    const isDraggingRef = ref(false);
    const selectedItems = ref([]);
    const getSelected = () => selectedItems.value;
    const getSelection = () => obj.value.getSelection();
    const getCount = () => selectedItems.value.length;
    const clearSelection = () => obj.value.clearSelection(true);
    const onSelectCallback = ref();

    const init = (selectArea) => {
        area.value = selectArea;
        obj.value = new DragSelect({
            area: selectArea,
            keyboardDrag: false,
            selectedClass: 'vf-explorer-selected',
            selectorClass: 'vf-explorer-selector',
        });

        obj.value.subscribe('DS:start:pre', ({items, event, isDragging}) => {
            if (isDragging) {
                obj.value.Interaction._reset(event);
            } else {
                // Prevent starting selection when start resizing the selectable area from the corner.
                const offsetX = area.value.offsetWidth - event.offsetX;
                const offsetY = area.value.offsetHeight - event.offsetY;
                if (offsetX < 15 && offsetY < 15) {
                    obj.value.Interaction._reset(event);
                }
            }
        });

        // Immediately update the selection when dragging ends.
        document.addEventListener('dragleave', (e) => {
            if (!e.buttons && isDraggingRef.value) {
                isDraggingRef.value = false;
            }
        });
    }

    // Refresh selection after the list is updated.
    const refreshSelection = () => {
        const currentSelectedItems = getSelected().map((item) => item.path);

        clearSelection();
        // reinitialize the selectables
        obj.value.setSettings({
            selectables: document.getElementsByClassName('vf-item-' + explorerId.value),
        })
        // add the previously selected items
        obj.value.addSelection(
            obj.value.getSelectables()
                .filter(el => currentSelectedItems.includes(JSON.parse(el.dataset.item).path))
        );

        // update selection
        selectedItems.value = obj.value.getSelection().map((el) => JSON.parse(el.dataset.item));
        onSelectCallback.value(selectedItems.value);
    }

    const onSelect = (callback) => {
        onSelectCallback.value = callback;

        obj.value.subscribe("DS:end", ({items, event, isDragging}) => {
            selectedItems.value = items.map((el) => JSON.parse(el.dataset.item));
            callback(items.map((el) => JSON.parse(el.dataset.item)));
        });
    }

    return {
        obj,
        area,
        explorerId,
        isDraggingRef,
        init,
        getSelected,
        getSelection,
        clearSelection,
        refreshSelection,
        getCount,
        onSelect
    }
}
