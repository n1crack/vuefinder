import {ref, shallowRef} from "vue";
import DragSelect from 'dragselect';

export default function () {
    const obj = shallowRef();

    const init = (selectArea) => {
        obj.value = new DragSelect({
            area: selectArea,
            keyboardDrag: false,
            selectedClass: 'vf-explorer-selected',
            selectorClass: 'vf-explorer-selector',
        });
    }

    return {
        obj,
        init
    }
}
