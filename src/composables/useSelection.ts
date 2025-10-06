import { reactive, ref, type Ref } from 'vue';
import type { SelectionEvent } from '@viselect/vanilla';

export interface UseSelectionDeps<T> {
	files: Ref<T[]>;
	getItemPosition: (itemIndex: number) => { row: number; col: number };
	getItemsInRange: <U>(items: U[], minRow: number, maxRow: number, minCol: number, maxCol: number) => U[];
}

export function useSelection<T>(deps: UseSelectionDeps<T>) {
	const { files, getItemPosition, getItemsInRange } = deps;

	const selectedIds = reactive(new Set<string>());
	const selectionData = ref(new Set<string>());
	const totalSelectedItem = ref(0);

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
		selectedIds.forEach((id) => {
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
			const index = files.value.findIndex((f: any) => (f?.path ?? f?.id ?? f?.key) === key);
			return getItemPosition(index >= 0 ? index : 0);
		});
		const minRow = Math.min(...positions.map((p) => p.row));
		const maxRow = Math.max(...positions.map((p) => p.row));
		const minCol = Math.min(...positions.map((p) => p.col));
		const maxCol = Math.max(...positions.map((p) => p.col));
		return { minRow, maxRow, minCol, maxCol };
	};

	const onBeforeStart = (event: SelectionEvent) => {
		event.selection.resolveSelectables();
		cleanupSelection(event);
		refreshSelection(event);
	};

	const onStart = ({ event, selection }: SelectionEvent) => {
		if (event && 'type' in event && (event as any).type === 'touchend') {
			(event as any).preventDefault();
		}
		const mouse = event as MouseEvent | null;
		if (!mouse?.ctrlKey && !mouse?.metaKey) {
			selectedIds.clear();
			selection.clearSelection(true, true);
		}
		selectionData.value.clear();
	};

	const onMove = (event: SelectionEvent) => {
		const selection = event.selection;
		const addedData = extractIds(event.store.changed.added);
		const removedData = extractIds(event.store.changed.removed);

		addedData.forEach((id) => {
			if (!selectedIds.has(id)) {
				selectionData.value.add(id);
			}
			selectedIds.add(id);
		});

		removedData.forEach((id) => {
			const el = document.querySelector(`[data-key="${id}"]`);
			if (el && files.value.find((file: any) => (file?.path ?? file?.id ?? file?.key) === id)) {
				selectionData.value.delete(id);
			}
			selectedIds.delete(id);
		});
		selection.resolveSelectables();
		refreshSelection(event);
	};

	const selectSelectionRange = (event: SelectionEvent) => {
		if (event.event && selectionData.value.size > 0) {
			const keys = Array.from(selectionData.value);
			const indices = keys
				.map((key) => files.value.findIndex((f: any) => (f?.path ?? f?.id ?? f?.key) === key))
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
			getItemsInRange(files.value, minMaxIds.minRow, minMaxIds.maxRow, minMaxIds.minCol, minMaxIds.maxCol).forEach(
				(item: any) => {
					const key = (item?.path ?? item?.id ?? item?.key) as string;
					const el = document.querySelector(`[data-key="${key}"]`);
					if (!el) {
						if (!selectedIds.has(key)) {
							selectedIds.add(key);
						} else {
							selectedIds.delete(key);
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
		totalSelectedItem.value = selectedIds.size;
	};

	return {
		selectedIds,
		selectionData,
		totalSelectedItem,
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


