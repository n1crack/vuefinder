import {ref, shallowRef} from "vue";

export default function useModal() {
    const type = shallowRef<any>(null);
    const visible = ref(false);
    const data = ref<any>();

    const open = (modal: any, payload: any = null) => {
        document.querySelector('body')!.style.overflow = 'hidden';
        visible.value = true;
        type.value = modal;
        data.value = payload;
    }

    const close = () => {
        document.querySelector('body')!.style.overflow = '';
        visible.value = false;
        type.value = null;
    }

    return {visible, type, data, open, close}
}


