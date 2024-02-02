import {reactive, watch} from 'vue';


/** @param {String} key */
export function useStorage(key) {
    let storedValues = localStorage.getItem(key + '_storage');

    const storage = reactive(JSON.parse(storedValues ?? '{}'));

    watch(storage, setItem);

    function setItem() {
        if (!Object.keys(storage).length) {
            localStorage.removeItem(key + '_storage');
        } else {
            localStorage.setItem(key + '_storage', JSON.stringify(storage));
        }
    }

    /**
     * @param {String} key
     * @param {*} value
     */
    function setStore(key, value) {
        storage[key] = value;
    }

    /**
     * @param {String} key
     */
    function removeStore(key) {
        delete storage[key];
    }

    function clearStore() {
        Object.keys(storage).map(key => removeStore(key));
    }

    /**
     * @param {String} key
     * @param {*} defaultValue
     */
    const getStore = (key, defaultValue = null) => {
        if (storage.hasOwnProperty(key)) {
            return storage[key]
        }
        return defaultValue;
    }

    return {getStore, setStore, removeStore, clearStore};
}
