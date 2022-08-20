export default (url, {method = 'get', params = {}}) => {
    const init = {method: method};

    if (method == 'get') {
        url += '?' + new URLSearchParams(params);
    } else {
        init.body = params;
    }

    return fetch(url, init).then(response => response.json());
}
