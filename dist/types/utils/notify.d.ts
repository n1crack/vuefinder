export type NotifyType = 'success' | 'error' | 'info' | 'warning';
export interface NotifyPayload {
    type: NotifyType;
    message: string;
}
export type NotifierSource = {
    emitter?: {
        emit?: (event: string, payload?: unknown) => void;
    };
    config?: {
        get?: (key: string) => unknown;
    };
};
export type Notifier = {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
    emit: (type: NotifyType, message: string) => void;
};
export declare function notify(source: NotifierSource | undefined, type: NotifyType, message: string): void;
export declare function createNotifier(source?: NotifierSource): Notifier;
