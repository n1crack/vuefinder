import type { App, DirEntryType } from '../types';
export interface DragNDropItem {
    path: string;
    type: DirEntryType;
}
export interface DragNDropEvent extends DragEvent {
    currentTarget: HTMLElement;
    isExternalDrag: boolean;
}
export declare function useDragNDrop(app: App, classList?: string[]): {
    events: (item: DragNDropItem) => {
        readonly dragover: (e: DragNDropEvent) => void;
        readonly dragenter: (e: DragNDropEvent) => void;
        readonly dragleave: (e: DragNDropEvent) => void;
        readonly drop: (e: DragNDropEvent) => void;
    };
};
