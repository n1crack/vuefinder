import { inject, ref, onMounted, onUnmounted, type Ref } from 'vue';
import SelectionArea, { type SelectionEvent } from '@viselect/vanilla';
import type { DirEntry } from '@/types';
import { useStore } from '@nanostores/vue';

export interface UseSelectionDeps<T> {
    getItemPosition: (itemIndex: number) => { row: number; col: number };
    getItemsInRange: <U>(items: U[], minRow: number, maxRow: number, minCol: number, maxCol: number) => U[];
    getKey: (item: T) => string;
    selectionObject: Ref<SelectionArea | null>;
    rowHeight: Ref<number>;
    itemWidth: number;
}

export function useSelection<T>(deps: UseSelectionDeps<T>) {
    const {  getItemPosition, getItemsInRange, getKey, selectionObject, rowHeight, itemWidth } = deps;

    const explorerId = Math.floor(Math.random() * 2 ** 32).toString();
    const app = inject('ServiceContainer');
    const fs = app.fs;
    const config = app.config;
    
    // Make nanostores reactive in Vue context
    const selectedKeys = useStore(fs.selectedKeys);
    const sortedFiles = useStore(fs.sortedFiles);
    const configState = useStore(config.state);
    
	const tempSelection = ref(new Set<string>());
    const isDragging = ref(false);
    const selectionStarted = ref(false);
    const startPosition = ref<{ row: number; col: number } | null>(null);

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
		if (selectedKeys.value) {
			selectedKeys.value.forEach((id: string) => {
				const el = document.querySelector(`[data-key="${id}"]`);
				if (el) {
					event.selection.select(el, true);
				}
			});
		}
	};

    const getSelectionRange = (selectionParam: Set<string>) => {
		if (selectionParam.size === 0) return null;
		const ids = Array.from(selectionParam);
        const positions = ids.map((key) => {
            const index = sortedFiles.value?.findIndex((f: DirEntry) => getKey(f as T) === key) ?? -1;
			return getItemPosition(index >= 0 ? index : 0);
		});
		const minRow = Math.min(...positions.map((p) => p.row));
		const maxRow = Math.max(...positions.map((p) => p.row));
		const minCol = Math.min(...positions.map((p) => p.col));
		const maxCol = Math.max(...positions.map((p) => p.col));
		return { minRow, maxRow, minCol, maxCol };
	};

    const onBeforeStart = (event: SelectionEvent) => {
        // Disable drag selection in single mode
        if (configState.value.selectionMode === 'single') {
            return false;
        }
        
        // reset drag state for new gesture
        isDragging.value = false;
        if(!event.event?.metaKey && !event.event?.ctrlKey) { 
            selectionStarted.value = true;
        }
		event.selection.resolveSelectables();
		cleanupSelection(event);
		refreshSelection(event);
	};

    const onStart = ({ event, selection }: SelectionEvent) => {
        // Disable drag selection in single mode
        if (configState.value.selectionMode === 'single') {
            return;
        }
        
        const maybeTouch = event as unknown as TouchEvent | MouseEvent | undefined;
        if (maybeTouch && 'type' in maybeTouch && maybeTouch.type === 'touchend') {
            maybeTouch.preventDefault();
		}
        const mouse = event as MouseEvent | null;
		if (!mouse?.ctrlKey && !mouse?.metaKey) {
			fs.clearSelection();
			selection.clearSelection(true, true);
		}
		tempSelection.value.clear();
		
		// Calculate start position from mouse coordinates
		if (mouse && selectionObject.value) {
			const container = selectionObject.value.getSelectables()[0]?.closest('.scroller-' + explorerId ) as HTMLElement;
			if (container) {
				const rect = container.getBoundingClientRect();
				const relativeY = mouse.clientY - rect.top + container.scrollTop;
				const relativeX = mouse.clientX - rect.left;
				
				// Find the row and column based on mouse position
				const row = Math.floor(relativeY / rowHeight.value);
				const col = Math.floor(relativeX / itemWidth);
				
				startPosition.value = { row, col };
			}
		}
	};

    const onMove = (event: SelectionEvent) => {
        // Disable drag selection in single mode
        if (configState.value.selectionMode === 'single') {
            return;
        }
        
		const selection = event.selection;
		const addedData = extractIds(event.store.changed.added);
		const removedData = extractIds(event.store.changed.removed);

        selectionStarted.value = false;
        isDragging.value = true;

		addedData.forEach((id) => {
			if (selectedKeys.value && !selectedKeys.value.has(id)) {
				tempSelection.value.add(id);
			}
			fs.select(id, configState.value.selectionMode);
		});

        removedData.forEach((id) => {
			const el = document.querySelector(`[data-key="${id}"]`);
            if (el && sortedFiles.value?.find((file: DirEntry) => getKey(file as T) === id)) {
				tempSelection.value.delete(id);
			}
			fs.deselect(id);
		});
		selection.resolveSelectables();
		refreshSelection(event);
	};

    const clearTempSelection = () => {
        tempSelection.value.clear();
    }

    const selectSelectionRange = (event: SelectionEvent) => {
		if (event.event && startPosition.value) {
			// If we have tempSelection items, use them along with start position
			if (tempSelection.value.size > 0) {
				const keys = Array.from(tempSelection.value);
				const positions = keys
					.map((key) => {
						const index = sortedFiles.value?.findIndex((f: DirEntry) => getKey(f as T) === key) ?? -1;
						return index >= 0 ? getItemPosition(index) : null;
					})
					.filter((pos): pos is { row: number; col: number } => pos !== null);
				
				if (positions.length > 0) {
					// Include start position in the range calculation
					const allPositions = [...positions, startPosition.value];
					
					// Calculate the actual min/max row and column from all positions including start
					const minMaxIds = {
						minRow: Math.min(...allPositions.map(p => p.row)),
						maxRow: Math.max(...allPositions.map(p => p.row)),
						minCol: Math.min(...allPositions.map(p => p.col)),
						maxCol: Math.max(...allPositions.map(p => p.col)),
					};
					getItemsInRange(sortedFiles.value || [], minMaxIds.minRow, minMaxIds.maxRow, minMaxIds.minCol, minMaxIds.maxCol).forEach(
						(item) => {
							const key = getKey(item as T);
							const el = document.querySelector(`[data-key="${key}"]`);
							if (!el) {
								fs.select(key, configState.value.selectionMode);
							}
						}
					);
				}
			} else {
				// If no tempSelection, don't do range selection
				// This prevents unwanted selections when dragging over empty areas
			}
		}
	};

    const onStop = (event: SelectionEvent) => {
		selectSelectionRange(event);
		cleanupSelection(event);
		refreshSelection(event);
        fs.setSelectedCount(selectedKeys.value?.size || 0);

        isDragging.value = false;
        startPosition.value = null;
	};

	// Initialize SelectionArea
	const initializeSelectionArea = () => {
		selectionObject.value = new SelectionArea({
			selectables: ['.file-item-' + explorerId],
			boundaries: ['.scroller-'+ explorerId],
            selectionContainerClass: 'selection-area-container',
			behaviour: {
				overlap: 'invert',
				intersect: 'touch',
				startThreshold: 0,
				triggers: [0],
				scrolling: {
					speedDivider: 10,
					manualSpeed: 750,
					startScrollMargins: {x: 0, y: 10}
				}
			},
			features: {
				touch: true,
				range: true,
				deselectOnBlur: true,
				singleTap: {
					allow: false,
					intersect: 'native'
				}
			}
		});

		selectionObject.value.on('beforestart', onBeforeStart);
		selectionObject.value.on('start', onStart);
		selectionObject.value.on('move', onMove);
		selectionObject.value.on('stop', onStop);
	};

	// Cleanup SelectionArea
	const destroySelectionArea = () => {
		if (selectionObject.value) {
			selectionObject.value.destroy();
			selectionObject.value = null;
		}
	};

	// Handle content click to clear selection
	const handleContentClick = (event: Event|PointerEvent) => {
		if (selectionStarted.value) {
			selectionObject.value?.clearSelection();
            clearTempSelection()
			selectionStarted.value = false;
		}
        const mouse = event as PointerEvent;
        if (!tempSelection.value.size && !selectionStarted.value && !mouse?.ctrlKey && !mouse?.metaKey) {
          fs.clearSelection();
          selectionObject.value?.clearSelection();
        }
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
        isDragging,
		selectionStarted,
        explorerId,
		extractIds,
		cleanupSelection,
		refreshSelection,
		getSelectionRange,
		selectSelectionRange,
		initializeSelectionArea,
		destroySelectionArea,
		handleContentClick,
	};
}


