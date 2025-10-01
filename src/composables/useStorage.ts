import {reactive, watch} from 'vue';

export function useStorage(key: string) {
    let storedValues = localStorage.getItem(key + '_storage');
    const storage = reactive<Record<string, any>>(JSON.parse(storedValues ?? '{}'));
    watch(storage, setItem);

    function setItem() {
        if (!Object.keys(storage).length) {
            localStorage.removeItem(key + '_storage');
        } else {
            localStorage.setItem(key + '_storage', JSON.stringify(storage));
        }
    }

    function setStore(name: string, value: any) { storage[name] = value; }
    function removeStore(name: string) { delete storage[name]; }
    function clearStore() { Object.keys(storage).forEach(k => removeStore(k)); }
    const getStore = <T = any>(name: string, defaultValue: T | null = null): T | null => (name in storage ? storage[name] : defaultValue);

    return {getStore, setStore, removeStore, clearStore};
}


