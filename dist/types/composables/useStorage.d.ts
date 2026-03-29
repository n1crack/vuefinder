export declare function useStorage(key: string): {
    getStore: <T = any>(name: string, defaultValue?: T | null) => T | null;
    setStore: (name: string, value: any) => void;
    removeStore: (name: string) => void;
    clearStore: () => void;
};
