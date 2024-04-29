import {computed, ref, shallowRef} from "vue";
import DragSelect from 'dragselect';

export default function (emitter) {
    const obj = shallowRef();

    const init = (selectArea) => {
        obj.value = new DragSelect({
            area: selectArea,
            keyboardDrag: false,
            selectedClass: 'vf-explorer-selected',
            selectorClass: 'vf-explorer-selector',
        });

        obj.value.subscribe('DS:start:pre', ({items, isDragging, isDraggingKeyboard}) => {
            if (isDragging) {
                selectedItems.value = obj.value.getSelection().map((el) => JSON.parse(el.dataset.item));
                obj.value.break();
            }
        });

        obj.value.subscribe('DS:update:pre', ({isDragging, isDraggingKeyboard}) => {
            if (isDragging || isDraggingKeyboard) {
                obj.value.break();
            }
        });

        obj.value.subscribe("DS:end", ({items, event, isDragging}) => {
            selectedItems.value = obj.value.getSelection().map((el) => JSON.parse(el.dataset.item));
            emitter.emit('vf-nodes-selected', selectedItems.value);
        })
    }
    const selectedItems = ref([]);

    const getSelected = () => selectedItems.value;

    const getCount = () => selectedItems.value.length;

    return {
        obj,
        init,
        getSelected,
        getCount
    }
}
