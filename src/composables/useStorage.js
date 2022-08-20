import {ref, watch} from 'vue';


export function useStorage(key) {
    let storedValues = localStorage.getItem(key + '_storage');

    const storage = ref(JSON.parse(storedValues));

    watch(storage, setItem);

    function setItem() {
        if (storage.value === null || storage.value === '') {
            localStorage.removeItem(key + '_storage');
        } else {
            localStorage.setItem(key + '_storage', JSON.stringify(storage.value));
        }
    }

    function setStore(key, value){
      storage.value = Object.assign({...storage.value}, {...{[key]:value}});
    }

    function clearStore() {
       storage.value = null
    }

    const getStore = (key, defaultValue= null )  => {
        if (storage.value === null || storage.value === '') {
            return defaultValue;
        }
        if (storage.value.hasOwnProperty(key)) {
            return storage.value[key]
        }
        return defaultValue;
    }

    return {getStore, setStore, clearStore};
}
