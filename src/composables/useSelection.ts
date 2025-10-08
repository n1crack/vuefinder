import { ref, onMounted, onUnmounted } from 'vue';
import type { SelectionEvent } from '@viselect/vanilla';
import { useFilesStore } from '@/stores/files';

export interface UseSelectionDeps<T> {
    getItemPosition: (itemIndex: number) => { row: number; col: number };
    getItemsInRange: <U>(items: U[], minRow: number, maxRow: number, minCol: number, maxCol: number) => U[];
    getKey: (item: T) => string;
}

export function useSelection<T>(deps: UseSelectionDeps<T>) {
    const {  getItemPosition, getItemsInRange, getKey } = deps;

    const fs = useFilesStore();
    
	const selectionData = ref(new Set<string>());
    const isDragging = ref(false);

	const extractIds = (els: Element[]): string[] => {
		return els
			.map((v) => v.getAttribute('data-key'))
			.filter((v): v is string => Boolean(v));
	};

	const cleanupSelection = (event: SelectionEvent) => {
		event.selection.getSelection().forEach((item: Element) => {
			event.selection.deselect(item, true);
		});
	};

	const refreshSelection = (event: SelectionEvent) => {
		fs.selectedKeys.forEach((id) => {
			const el = document.querySelector(`[data-key="${id}"]`);
			if (el) {
				event.selection.select(el, true);
			}
		});
	};

    const getSelectionRange = (selectionParam: Set<string>) => {
		if (selectionParam.size === 0) return null;
		const ids = Array.from(selectionParam);
        const positions = ids.map((key) => {
            const index = fs.sortedFiles.findIndex((f) => getKey(f as T) === key);
			return getItemPosition(index >= 0 ? index : 0);
		});
		const minRow = Math.min(...positions.map((p) => p.row));
		const maxRow = Math.max(...positions.map((p) => p.row));
		const minCol = Math.min(...positions.map((p) => p.col));
		const maxCol = Math.max(...positions.map((p) => p.col));
		return { minRow, maxRow, minCol, maxCol };
	};

    const onBeforeStart = (event: SelectionEvent) => {
        // reset drag state for new gesture
        isDragging.value = false;
		event.selection.resolveSelectables();
		cleanupSelection(event);
		refreshSelection(event);
	};

    const onStart = ({ event, selection }: SelectionEvent) => {
        const maybeTouch = event as unknown as TouchEvent | MouseEvent | undefined;
        if (maybeTouch && 'type' in maybeTouch && maybeTouch.type === 'touchend') {
            maybeTouch.preventDefault();
		}
        const mouse = event as MouseEvent | null;
		if (!mouse?.ctrlKey && !mouse?.metaKey) {
			fs.selectedKeys.clear();
			selection.clearSelection(true, true);
		}
		selectionData.value.clear();
	};

    const onMove = (event: SelectionEvent) => {
		const selection = event.selection;
		const addedData = extractIds(event.store.changed.added);
		const removedData = extractIds(event.store.changed.removed);

        isDragging.value = true;

		addedData.forEach((id) => {
			if (!fs.selectedKeys.has(id)) {
				selectionData.value.add(id);
			}
			fs.selectedKeys.add(id);
		});

        removedData.forEach((id) => {
			const el = document.querySelector(`[data-key="${id}"]`);
            if (el && fs.sortedFiles.find((file) => getKey(file as T) === id)) {
				selectionData.value.delete(id);
			}
			fs.selectedKeys.delete(id);
		});
		selection.resolveSelectables();
		refreshSelection(event);
	};

    const selectSelectionRange = (event: SelectionEvent) => {
		if (event.event && selectionData.value.size > 0) {
			const keys = Array.from(selectionData.value);
            const indices = keys
                .map((key) => fs.sortedFiles.findIndex((f) => getKey(f as T) === key))
                .filter((i) => i >= 0);
			if (indices.length === 0) return;
			const minIndex = Math.min(...indices);
			const maxIndex = Math.max(...indices);
			const minPos = getItemPosition(minIndex);
			const maxPos = getItemPosition(maxIndex);
			const minMaxIds = {
				minRow: Math.min(minPos.row, maxPos.row),
				maxRow: Math.max(minPos.row, maxPos.row),
				minCol: Math.min(minPos.col, maxPos.col),
				maxCol: Math.max(minPos.col, maxPos.col),
			};
            getItemsInRange(fs.sortedFiles, minMaxIds.minRow, minMaxIds.maxRow, minMaxIds.minCol, minMaxIds.maxCol).forEach(
                (item) => {
                    const key = getKey(item as T);
					const el = document.querySelector(`[data-key="${key}"]`);
					if (!el) {
						if (!fs.selectedKeys.has(key)) {
							fs.selectedKeys.add(key);
						} else {
							fs.selectedKeys.delete(key);
						}
					}
				}
			);
		}
	};

    const onStop = (event: SelectionEvent) => {
		selectSelectionRange(event);
		cleanupSelection(event);
		refreshSelection(event);
        fs.setSelectedCount(fs.selectedKeys.size); 

        isDragging.value = false;
	};

	// Global dragleave listener to reliably reset dragging state
	onMounted(() => {
		const handleDragLeave = (e: Event) => {
			const ev = e as unknown as MouseEvent;
			if (!ev.buttons && isDragging.value) {
				isDragging.value = false;
			}
		};
		document.addEventListener('dragleave', handleDragLeave);
		onUnmounted(() => {
			document.removeEventListener('dragleave', handleDragLeave);
		});
	});

	return {
		selectionData,
        isDragging,
		extractIds,
		cleanupSelection,
		refreshSelection,
		getSelectionRange,
		onBeforeStart,
		onStart,
		onMove,
		onStop,
		selectSelectionRange,
	};
}


