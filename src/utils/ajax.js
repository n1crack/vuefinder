export const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

/**
 * @typedef RequestConfig
 * @property {String} baseUrl
 * @property {?Record<String,String>} headers Additional headers
 * @property {?Record<String,?String>} params Additional query params
 * @property {?RequestTransformer} transformRequest Transform request callback
 * @property {?ResponseTransformer} transformResponse Transform response callback
 * @property {?String} xsrfHeaderName The http header that carries the xsrf token value
 */
/**
 * @typedef RequestTransformParams
 * @property {String} url
 * @property {'get'|'post'|'put'|'patch'|'delete'} method
 * @property {Record<String, String>} headers
 * @property {Record<String, ?String>} params
 * @property {Record<String,?String>|FormData|null} body
 */
/**
 * @typedef RequestTransformResult
 * @property {String|null|undefined} url
 * @property {'get'|'post'|'put'|'patch'|'delete'|null|undefined} method
 * @property {Record<String, String>|null|undefined} headers
 * @property {Record<String, ?String>|null|undefined} params
 * @property {Record<String,?String>|FormData|null|undefined} body
 */
/**
 * @typedef RequestTransformResultInternal
 * @property {String} url
 * @property {'get'|'post'|'put'|'patch'|'delete'} method
 * @property {Record<String, String>} headers
 * @property {Record<String, ?String>} params
 * @property {Record<String,?String>|FormData|null} body
 */
/**
 * @callback RequestTransformer
 * @param {RequestTransformParams} request
 * @returns {RequestTransformResult}
 */

/**
 * Base http requester
 */
export class Requester {
    /** @type {RequestConfig} */
    #config

    /** @param {RequestConfig} config */
    constructor(config) {
        this.#config = config;
    }

    /** @type {RequestConfig} */
    get config() {
        return this.#config;
    }

    /**
     * Transform request params
     * @param {Object} input
     * @param {String} input.url
     * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
     * @param {Record<String,String>|null|undefined} input.headers
     * @param {Record<String,?String>|null|undefined} input.params
     * @param {Record<String,?String>|FormData|null|undefined} input.body
     * @return {RequestTransformResultInternal}
     */
    transformRequestParams(input ) {
        const config = this.#config;
        /** @type {Record<String, String>} */
        const headers = Object.assign({}, config.headers, {
            [config.xsrfHeaderName]: csrf,
        }, input.headers);
        const params = input.params || {};
        const body = input.body;
        const url = config.baseUrl + input.url;
        const method = input.method;
        /** @type {RequestTransformResultInternal} */
        const transformed = {
            url,
            method,
            headers,
            params,
            body,
        }
        if (config.transformRequest != null) {
            const transformResult = config.transformRequest({
                url,
                method,
                headers,
                params,
                body,
            });
            if (transformResult.url != null) {
                transformed.url = transformResult.url;
            }
            if (transformResult.method != null) {
                transformed.method = transformResult.method;
            }
            if (transformResult.params != null) {
                transformed.params = transformResult.params || {};
            }
            if (transformResult.headers != null) {
                transformed.headers = transformResult.headers || {};
            }
            if (transformResult.body != null) {
                transformed.body = transformResult.body;
            }
        }
        return transformed
    }

    /**
     * Get download url
     * @param {String} adapter
     * @param {String} path
     * @return {String}
     */
    getDownloadUrl(adapter, path) {
        const transform = this.transformRequestParams({
            url: '',
            method: 'get',
            params: { q: 'download', adapter, path }
        });
        return transform.url + '?' + new URLSearchParams(transform.params).toString()
    }

    /**
     * Get preview url
     * @param {String} adapter
     * @param {String} path
     * @return {String}
     */
    getPreviewUrl(adapter, path) {
        const transform = this.transformRequestParams({
            url: '',
            method: 'get',
            params: { q: 'preview', adapter, path }
        });
        return transform.url + '?' + new URLSearchParams(transform.params).toString()
    }

    /**
     * Send request
     * @param {Object} input
     * @param {String} input.url
     * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
     * @param {Record<String,String>|null|undefined} input.headers
     * @param {Record<String,?String>|null|undefined} input.params
     * @param {Record<String,?String>|FormData|null|undefined} input.body
     * @param {'arrayBuffer'|'blob'|'json'|'text'|null|undefined} input.responseType
     * @param {AbortSignal|null|undefined} input.abortSignal
     * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
     * @throws {?Record<String,?String>} resp json error
     */
    async send(input) {
        const reqParams = this.transformRequestParams(input);
        const responseType = input.responseType || 'json';
        /** @type {RequestInit} */
        const init = {
            method: input.method,
            headers: reqParams.headers,
            signal: input.abortSignal,
        };
        const url = reqParams.url + '?' + new URLSearchParams(reqParams.params);
        if (reqParams.method !== 'get' && reqParams.body != null) {
            let body
            if (!(reqParams.body instanceof FormData)) {
                body = JSON.stringify(reqParams.body);
                init.headers['Content-Type'] = 'application/json';
            } else {
                body = input.body;
            }
            init.body = body;
        }
        const response = await fetch(url, init);
        if (response.ok) {
            return await response[responseType]();
        }
        throw await response.json();
    }
}

/**
 * Build requester from user config
 * @param {String|RequestConfig} userConfig
 * @return {Requester}
 */
export function buildRequester(userConfig) {
    /** @type {RequestConfig} */
    const config = {
        baseUrl: '',
        headers: {},
        params: {},
        transformRequest: null,
        xsrfHeaderName: 'X-CSRF-Token',
    };
    if (typeof userConfig === 'string') {
        Object.assign(config, { baseUrl: userConfig });
    } else {
        Object.assign(config, userConfig);
    }
    return new Requester(config);
}
