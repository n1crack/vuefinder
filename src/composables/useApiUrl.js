import {ref} from 'vue';

const apiUrl = ref('');

export function useApiUrl() {
    function setApiUrl(url) {
        apiUrl.value = url;
    }

    return {apiUrl, setApiUrl};
}
