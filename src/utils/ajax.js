export const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

/**
 * @typedef RequestTransformParams
 * @property {String} url
 * @property {String} method
 * @property {Record<String, String>} headers
 * @property {*} params
 */
/**
 * @typedef RequestTransformResult
 * @property {?String} url
 * @property {?Object} params
 * @property {?Record<String, String>} headers
 */
/**
 * @callback RequestTransformer
 * @param {RequestTransformParams} request
 * @returns {RequestTransformResult}
 */
/**
 * Requester
 * @param {String} url
 * @param {Object} config
 * @param {'get'|'post'|'put'|'patch'|'delete'} config.method
 * @param {?Object} config.params
 * @param {?Boolean} config.json
 * @param {?AbortSignal} config.signal
 * @param {?RequestTransformer} config.requestTransformer
 */
export default (url, { method = 'get', params = {}, json = true, signal = null, requestTransformer = null }) => {
    /** @type {Record<String, String>} */
    let headers = {};
    if (method !== 'get') {
        if (csrf) {
            headers['X-CSRF-Token'] = csrf;
        }
    }
    if (requestTransformer != null) {
        const transformResult = requestTransformer({
            url,
            method,
            headers,
            params: params || {},
        });
        if (transformResult.url != null) {
            url = transformResult.url;
        }
        if (transformResult.params != null) {
            params = transformResult.params;
        }
        if (transformResult.headers != null) {
            headers = transformResult.headers;
        }
    }
    const init = {
        method,
        headers,
    };
    init.signal = signal;

    if (method === 'get') {
        url += '?' + new URLSearchParams(params);
    } else {

        const formData = new FormData();

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
