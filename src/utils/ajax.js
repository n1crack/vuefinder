export const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

/**
 * @typedef RequestConfig
 * @property {String} baseUrl
 * @property {Record<String,String>=} headers Additional headers
 * @property {Record<String,?String>=} params Additional query params
 * @property {Record<String,*>=} body Additional body key pairs
 * @property {RequestTransformer=} transformRequest Transform request callback
 * @property {String=} xsrfHeaderName The http header that carries the xsrf token value
 */
/**
 * @typedef RequestTransformParams
 * @property {String} url
 * @property {'get'|'post'|'put'|'patch'|'delete'} method
 * @property {Record<String,String>} headers
 * @property {Record<String,?String>} params
 * @property {Record<String,?String>|FormData|null} body
 */
/**
 * @typedef RequestTransformResult
 * @property {String=} url
 * @property {'get'|'post'|'put'|'patch'|'delete'=} method
 * @property {Record<String, String>=} headers
 * @property {Record<String, ?String>=} params
 * @property {Record<String,?String>|FormData=} body
 */
/**
 * @typedef RequestTransformResultInternal
 * @property {String} url
 * @property {'get'|'post'|'put'|'patch'|'delete'} method
 * @property {Record<String, String>} headers
 * @property {Record<String, ?String>} params
 * @property {Record<String,?String>|FormData=} body
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
    config

    /** @param {RequestConfig} config */
    constructor(config) {
        this.config = config;
    }

    /** @type {RequestConfig} */
    get config() {
        return this.config;
    }

    /**
     * Transform request params
     * @param {Object} input
     * @param {String} input.url
     * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
     * @param {Record<String,String>=} input.headers
     * @param {Record<String,?String>=} input.params
     * @param {Record<String,?String>|FormData=} input.body
     * @return {RequestTransformResultInternal}
     */
    transformRequestParams(input ) {
        const config = this.config;
        const ourHeaders = {};
        if (csrf != null && csrf !== '') {
            ourHeaders[config.xsrfHeaderName] = csrf;
        }
        /** @type {Record<String, String>} */
        const headers = Object.assign({}, config.headers, ourHeaders, input.headers);
        const params = Object.assign({}, config.params, input.params);
        const body = input.body;
        const url = config.baseUrl + input.url;
        const method = input.method;
        let newBody
        if (method !== 'get') {
            /** @type {Record<String,*>|FormData} */
            if (!(body instanceof FormData)) {
                // JSON
                newBody = { ...body };
                if (config.body != null) {
                    Object.assign(newBody, this.config.body);
                }
            } else {
                // FormData
                newBody = body;
                if (config.body != null) {
                    Object.entries(this.config.body).forEach(([key, value]) => {
                        newBody.append(key, value);
                    });
                }
            }
        }
        /** @type {RequestTransformResultInternal} */
        const transformed = {
            url,
            method,
            headers,
            params,
            body: newBody,
        }
        if (config.transformRequest != null) {
            const transformResult = config.transformRequest({
                url,
                method,
                headers,
                params,
                body: newBody,
            });
            if (transformResult.url != null) {
                transformed.url = transformResult.url;
            }
            if (transformResult.method != null) {
                transformed.method = transformResult.method;
            }
            if (transformResult.params != null) {
                transformed.params = transformResult.params ?? {};
            }
            if (transformResult.headers != null) {
                transformed.headers = transformResult.headers ?? {};
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
     * @param {String} node
     * @param {String} node.path
     * @param {String=} node.url
     * @return {String}
     */
    getDownloadUrl(adapter, node) {
        if (node.url != null) {
            return node.url
        }
        const transform = this.transformRequestParams({
            url: '',
            method: 'get',
            params: { q: 'download', adapter, path: node.path }
        });
        return transform.url + '?' + new URLSearchParams(transform.params).toString()
    }

    /**
     * Get preview url
     * @param {String} adapter
     * @param {String} node
     * @param {String} node.path
     * @param {String=} node.url
     * @return {String}
     */
    getPreviewUrl(adapter, node) {
        if (node.url != null) {
            return node.url
        }
        const transform = this.transformRequestParams({
            url: '',
            method: 'get',
            params: { q: 'preview', adapter, path: node.path }
        });
        return transform.url + '?' + new URLSearchParams(transform.params).toString()
    }

    /**
     * Send request
     * @param {Object} input
     * @param {String} input.url
     * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
     * @param {Record<String,String>=} input.headers
     * @param {Record<String,?String>=} input.params
     * @param {(Record<String,?String>|FormData|null)=} input.body
     * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
     * @param {AbortSignal=} input.abortSignal
     * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
     * @throws {Record<String,?String>|null} resp json error
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
            /** @type {String|FormData} */
            let newBody
            if (!(reqParams.body instanceof FormData)) {
                // JSON
                newBody = JSON.stringify(reqParams.body);
                init.headers['Content-Type'] = 'application/json';
            } else {
                // FormData
                newBody = input.body;
            }
            init.body = newBody;
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
        body: {},
        xsrfHeaderName: 'X-CSRF-Token',
    };
    if (typeof userConfig === 'string') {
        Object.assign(config, { baseUrl: userConfig });
    } else {
        Object.assign(config, userConfig);
    }
    return new Requester(config);
}

export {}
