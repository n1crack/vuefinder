import {ref, onMounted, onUpdated, onUnmounted, nextTick, type Ref} from 'vue';
import DragSelect from 'dragselect';
import {OverlayScrollbars} from 'overlayscrollbars';

export default function useDragSelect() {
    let dragSelectInstance: any;
    const area = ref<HTMLElement | null>(null);
    const explorerId = Math.floor(Math.random() * 2 ** 32);
    const isDraggingRef = ref(false);
    const selectedItems = ref<any[]>([]);
    const getSelected = () => selectedItems.value;
    const getSelection = () => dragSelectInstance.getSelection();
    const getCount = () => selectedItems.value.length;
    const clearSelection = () => dragSelectInstance.clearSelection(true);
    const onSelectCallback = ref<(items: any[]) => void>();
    const osInstance = ref<any>(null);
    const scrollBar = ref<HTMLElement | null>(null);
    const scrollBarContainer = ref<HTMLElement | null>(null);
    const resizeObserver = ref<ResizeObserver | null>(null);

    function initDragSelect() {
        dragSelectInstance = new DragSelect({
            area: area.value as HTMLElement,
            keyboardDrag: false,
            selectedClass: 'vf-explorer-selected',
            selectorClass: 'vf-explorer-selector',
        });

        dragSelectInstance.subscribe('DS:start:pre', ({event, isDragging}: any) => {
            if (isDragging) {
                dragSelectInstance.Interaction._reset(event);
            } else {
                isDraggingRef.value = false;
                const offsetX = (area.value as HTMLElement).offsetWidth - event.offsetX;
                const offsetY = (area.value as HTMLElement).offsetHeight - event.offsetY;
                if (offsetX < 15 && offsetY < 15) dragSelectInstance.Interaction._reset(event);
                if (event.target.classList.contains('os-scrollbar-handle')) dragSelectInstance.Interaction._reset(event);
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (!(e as any).buttons && isDraggingRef.value) isDraggingRef.value = false;
        });
    }

    const selectAll = () => nextTick(() => {
        dragSelectInstance.addSelection(dragSelectInstance.getSelectables());
        updateSelection();
    });

    const updateSelection = () => {
        selectedItems.value = dragSelectInstance.getSelection().map((el: HTMLElement) => JSON.parse((el as any).dataset.item));
        onSelectCallback.value?.(selectedItems.value);
    }

    const refreshSelection = () => nextTick(() => {
        const currentSelectedItems = getSelected().map((item) => item.path);
        clearSelection();
        dragSelectInstance.setSettings({selectables: document.getElementsByClassName('vf-item-' + explorerId)})
        dragSelectInstance.addSelection(
            dragSelectInstance.getSelectables().filter((el: any) => currentSelectedItems.includes(JSON.parse(el.dataset.item).path))
        );
        updateSelection();
        updateScrollbarHeight();
    });

    const onSelect = (callback: (items: any[]) => void) => {
        onSelectCallback.value = callback;
        dragSelectInstance.subscribe("DS:end", ({items}: any) => {
            selectedItems.value = items.map((el: any) => JSON.parse(el.dataset.item));
            callback(items.map((el: any) => JSON.parse(el.dataset.item)));
        });
    }

    const updateScrollbarHeight = () => {
        if (!osInstance.value) return;
        const areaEl = area.value as HTMLElement;
        const scrollEl = scrollBar.value as HTMLElement;
        if (areaEl.getBoundingClientRect().height < areaEl.scrollHeight) {
            scrollEl.style.height = areaEl.scrollHeight + 'px';
            scrollEl.style.display = 'block';
        } else {
            scrollEl.style.height = '100%';
            scrollEl.style.display = 'none';
        }
    }

    const updateScrollBarPosition = () => {
        if (!osInstance.value) return;
        const {scrollOffsetElement} = osInstance.value.elements();
        (scrollOffsetElement as HTMLElement).scrollTo({top: (area.value as HTMLElement).scrollTop, left: 0});
    }

    onMounted(() => {
        OverlayScrollbars(scrollBarContainer.value as HTMLElement, {scrollbars: {}}, {
            initialized: (instance) => {
                osInstance.value = instance;
            },
            scroll: (instance) => {
                const {scrollOffsetElement} = instance.elements();
                (area.value as HTMLElement).scrollTo({top: (scrollOffsetElement as HTMLElement).scrollTop, left: 0})
            }
        });

        initDragSelect()
        updateScrollbarHeight();
        resizeObserver.value = new ResizeObserver(updateScrollbarHeight);
        resizeObserver.value.observe(area.value as HTMLElement);
        (area.value as HTMLElement).addEventListener('scroll', updateScrollBarPosition);
        dragSelectInstance.subscribe('DS:scroll', ({isDragging}: any) => isDragging || updateScrollBarPosition());
    });

    onUnmounted(() => {
        if (dragSelectInstance) dragSelectInstance.stop();
        resizeObserver.value?.disconnect();
    });

    onUpdated(() => {
        if (dragSelectInstance) dragSelectInstance.Area.reset()
    });

    return {
        area,
        explorerId,
        isDraggingRef,
        scrollBar,
        scrollBarContainer,
        getSelected,
        getSelection,
        selectAll,
        clearSelection,
        refreshSelection,
        getCount,
        onSelect
    }
}


