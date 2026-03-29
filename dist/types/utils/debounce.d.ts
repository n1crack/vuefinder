export declare const debounce: <T extends (...args: any[]) => void>(fn: T, delay?: number, immediate?: boolean) => (...args: Parameters<T>) => void;
