export default (url, {method = 'get', params = {}, json = true}) => {
    const init = {method: method};

    if (method == 'get') {
        url += '?' + new URLSearchParams(params);
    } else {
        init.headers = {};
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
        return Promise.reject(response);
    });
}
