import {ref, shallowRef} from "vue";
import DragSelect from 'dragselect';

export default function (emitter) {
    const obj = shallowRef();

    const area = ref(null);

    const init = (selectArea) => {
        area.value = selectArea;
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

        obj.value.subscribe('DS:update:pre', ({event, isDragging, isDraggingKeyboard}) => {
            if (isDragging || isDraggingKeyboard) {
                obj.value.break();
            } else {
                // Prevent starting selection when resizing the selectable area from the corner.
                const offsetX = area.value.offsetWidth - event.offsetX;
                const offsetY = area.value.offsetHeight - event.offsetY;
                if (offsetX < 15 && offsetY < 15) {
                    obj.value.Selector.stop()
                    obj.value.break();
                }
            }
        });

        obj.value.subscribe("DS:end", ({items, event, isDragging}) => {
            selectedItems.value = obj.value.getSelection().map((el) => JSON.parse(el.dataset.item));
        })
    }
    const selectedItems = ref([]);

    const getSelected = () => selectedItems.value;

    const getCount = () => selectedItems.value.length;

    const onSelect = (callback) => {
        obj.value.subscribe("DS:end", ({items, event, isDragging}) => {
            callback(obj.value.getSelection().map((el) => JSON.parse(el.dataset.item)));
        });
    }

    return {
        obj,
        area,
        init,
        getSelected,
        getCount,
        onSelect
    }
}
