export const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

/**
 * @typedef RequestTransformParams
 * @property {String} url
 * @property {String} method
 * @property {*} params
 */
/**
 * @typedef RequestTransformResult
 * @property {?String} url
 * @property {?Object} params
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
 * @param {String} config.method
 * @param {?Object} config.params
 * @param {?Boolean} config.json
 * @param {?AbortSignal} config.signal
 * @param {?RequestTransformer} config.requestTransformer
 */
export default (url, { method = 'get', params = {}, json = true, signal = null, requestTransformer = null }) => {
    if (requestTransformer != null) {
        const transformResult = requestTransformer({ url, method, params: params || {} });
        if (transformResult.url != null) {
            url = transformResult.url
        }
        if (transformResult.params != null) {
            params = transformResult.params
        }
    }
    const init = {method: method};
    init.signal = signal;

    if (method === 'get') {
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
