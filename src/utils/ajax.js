export const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

export default (url, {method = 'get', params = {}, json = true, signal = null}) => {
    const init = {method: method};
    init.signal = signal;

    if (method == 'get') {
        url += '?' + new URLSearchParams(params);
    } else {
        init.headers = {};

        if (csrf) {
            init.headers['X-CSRF-Token'] = csrf;
        }

        let formData = new FormData();

        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }

        init.body = formData;
    }

    return fetch(url, init).then((response) => {
        if (response.ok) {
            return json ? response.json() : response.text();
        }
        return response.json().then(Promise.reject.bind(Promise));
    });
}
