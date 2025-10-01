export const csrf: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

export type RequestConfig = {
    baseUrl: string
    headers?: Record<string, string>
    params?: Record<string, string | null | undefined>
    body?: Record<string, unknown>
    transformRequest?: (request: RequestTransformParams) => RequestTransformResult
    xsrfHeaderName?: string
    fetchParams?: RequestInit
    fetchRequestInterceptor?: (options: RequestInit | undefined) => RequestInit | undefined
    fetchResponseInterceptor?: (response: Response) => Promise<Response>
}

export type RequestTransformParams = {
    url: string
    method: 'get'|'post'|'put'|'patch'|'delete'
    headers: Record<string, string>
    params: Record<string, string | null | undefined>
    body: Record<string, string | null | undefined> | FormData | null
}

export type RequestTransformResult = Partial<RequestTransformParams>

export type RequestTransformResultInternal = {
    url: string
    method: 'get'|'post'|'put'|'patch'|'delete'
    headers: Record<string, string>
    params: Record<string, string | null | undefined>
    body?: Record<string, string | null | undefined> | FormData
}

export class Requester {
    config: Required<Omit<RequestConfig, 'transformRequest'|'fetchRequestInterceptor'|'fetchResponseInterceptor'>> & Pick<RequestConfig,'transformRequest'|'fetchRequestInterceptor'|'fetchResponseInterceptor'>

    constructor(config: RequestConfig) {
        this.config = Object.assign({
            baseUrl: '',
            headers: {},
            params: {},
            body: {},
            xsrfHeaderName: 'X-CSRF-Token',
            fetchParams: {}
        }, config)
    }

    customFetch = async (...args: [RequestInfo | URL, RequestInit?]) => {
        let [resource, options] = args;

        if (this.config.fetchRequestInterceptor) {
            options = this.config.fetchRequestInterceptor(options);
        }

        let response = await fetch(resource, options);

        if (this.config.fetchResponseInterceptor) {
            response = await this.config.fetchResponseInterceptor(response);
        }

        return response;
    }

    transformRequestParams(input: {
        url: string
        method: 'get'|'post'|'put'|'patch'|'delete'
        headers?: Record<string, string>
        params?: Record<string, string | null | undefined>
        body?: Record<string, string | null | undefined> | FormData
    }): RequestTransformResultInternal {
        const config = this.config;
        const ourHeaders: Record<string, string> = {};
        if (csrf != null && csrf !== '' && config.xsrfHeaderName) {
            ourHeaders[config.xsrfHeaderName] = csrf;
        }
        const headers = Object.assign({}, config.headers, ourHeaders, input.headers);
        const params = Object.assign({}, config.params, input.params);
        const url = config.baseUrl + input.url;
        const method = input.method;
        let newBody: RequestTransformResultInternal['body']
        if (method !== 'get') {
            if (!(input.body instanceof FormData)) {
                const bodyObj = Object.assign({}, input.body ?? {});
                if (config.body != null) Object.assign(bodyObj, this.config.body);
                newBody = bodyObj;
            } else {
                const fd = input.body;
                if (config.body != null) {
                    Object.entries(this.config.body).forEach(([key, value]) => {
                        fd.append(key, String(value));
                    });
                }
                newBody = fd;
            }
        }
        const transformed: RequestTransformResultInternal = { url, method, headers, params, body: newBody }
        if (config.transformRequest != null) {
            const tr = config.transformRequest({ url, method, headers, params, body: newBody ?? null });
            if (tr.url != null) transformed.url = tr.url as string;
            if (tr.method != null) transformed.method = tr.method as typeof method;
            if (tr.params != null) transformed.params = tr.params as typeof params;
            if (tr.headers != null) transformed.headers = tr.headers as typeof headers;
            if (tr.body != null) transformed.body = tr.body as typeof newBody;
        }
        return transformed
    }

    getDownloadUrl(adapter: string, node: { path: string; url?: string }): string {
        if (node.url != null) return node.url
        const transform = this.transformRequestParams({ url: '', method: 'get', params: {q: 'download', adapter, path: node.path} });
        return transform.url + '?' + new URLSearchParams(transform.params as Record<string,string>).toString()
    }

    getPreviewUrl(adapter: string, node: { path: string; url?: string }): string {
        if (node.url != null) return node.url
        const transform = this.transformRequestParams({ url: '', method: 'get', params: {q: 'preview', adapter, path: node.path} });
        return transform.url + '?' + new URLSearchParams(transform.params as Record<string,string>).toString()
    }

    async send(input: {
        url: string
        method: 'get'|'post'|'put'|'patch'|'delete'
        headers?: Record<string, string>
        params?: Record<string, string | null | undefined>
        body?: Record<string, string | null | undefined> | FormData | null
        responseType?: 'arrayBuffer'|'blob'|'json'|'text'
        abortSignal?: AbortSignal
    }): Promise<ArrayBuffer|Blob|Record<string, unknown>|string|null> {
        const reqParams = this.transformRequestParams(input);
        const responseType = input.responseType || 'json';
        const init: RequestInit = { method: input.method, headers: reqParams.headers, signal: input.abortSignal };
        const url = reqParams.url + '?' + new URLSearchParams(reqParams.params as Record<string,string>);
        if (reqParams.method !== 'get' && reqParams.body != null) {
            let newBody: string | FormData
            if (!(reqParams.body instanceof FormData)) {
                newBody = JSON.stringify(reqParams.body);
                (init.headers as Record<string,string>)['Content-Type'] = 'application/json';
            } else {
                newBody = input.body as FormData;
            }
            init.body = newBody;
        }
        if (this.config.fetchParams) Object.assign(init, this.config.fetchParams);
        const response = await this.customFetch(url, init);
        if (response.ok) return await (response as any)[responseType]();
        throw await response.json();
    }
}

export function buildRequester(userConfig: string | RequestConfig): Requester {
    const config: RequestConfig = { baseUrl: '', headers: {}, params: {}, body: {}, xsrfHeaderName: 'X-CSRF-Token', fetchParams: {} };
    if (typeof userConfig === 'string') Object.assign(config, {baseUrl: userConfig});
    else Object.assign(config, userConfig);
    return new Requester(config as RequestConfig);
}

export {}


