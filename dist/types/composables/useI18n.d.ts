export declare function loadLocale(locale: string, supportedLocales: Record<string, any>): Promise<any>;
export declare function useI18n(storage: {
    getStore: (k: string, d?: any) => any;
    setStore: (k: string, v: any) => void;
}, initialLocale: string, emitter: any, supportedLocales: Record<string, any>, config?: {
    get: (key: any) => unknown;
}): {
    t: (key: string, ...params: any[]) => string;
    locale: unknown;
    localeAtom: {
        set: (newValue: string) => void;
        get: () => string;
        readonly lc: number;
        listen: (listener: (value: string, oldValue: string) => void) => () => void;
        notify: (oldValue?: string | undefined) => void;
        off: () => void;
        subscribe: (listener: (value: string, oldValue?: string | undefined) => void) => () => void;
        readonly value: string | undefined;
    };
};
