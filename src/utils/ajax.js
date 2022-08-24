export default (url, {method = 'get', params = {},json = true}) => {
    const init = {method: method};

    if (method == 'get') {
        url += '?' + new URLSearchParams(params);
    } else {
        init.body = params;
    }

    if (!json) {
        return fetch(url, init);
    }

    return fetch(url, init).then(response => response.json());
}
