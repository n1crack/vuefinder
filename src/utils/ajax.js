export default (url, method = 'get', params = {}) => {
    if(method == 'get'){
        return fetch(url + '?' + new URLSearchParams(params), {method: method});
    }

    return fetch(url, {method: method, body: params});
}
