import {computed, onMounted, reactive, ref, watch} from "vue";

export default function useData(initialAdapter: string, initialPath: string) {
    const adapter = ref(initialAdapter);
    const path = ref(initialPath);
    const breadcrumbs = ref<any[]>([]);
    const breadcrumbItems = ref<any[]>([]);
    const hiddenBreadcrumbs = ref<any[]>([]);
    const showHiddenBreadcrumbs = ref(false);
    const breadcrumbItemLimit = ref(5);

    let loading = false;
    let searchMode = false;

    const data = reactive({
        adapter: adapter,
        storages: [] as string[],
        storage_info: {} as Record<string, any>,
        dirname: path,
        files: [] as any[],
    });

    function updateBreadcrumbs() {
        let items: string[] = [], links: any[] = [];
        let dirname = path.value ?? (adapter.value + '://');
        if (dirname.length === 0) {
            breadcrumbs.value = [];
        }
        dirname.replace(adapter.value + '://', '').split('/').forEach(function (item) {
            items.push(item);
            if (items.join('/') !== '') {
                links.push({ basename: item, name: item, path: adapter.value + '://' + items.join('/'), type: 'dir' });
            }
        });
        breadcrumbItems.value = links;
        const [linksToDisplay, hiddenLinks ] = separateBreadcrumbs(links, breadcrumbItemLimit.value);
        hiddenBreadcrumbs.value = hiddenLinks;
        breadcrumbs.value = linksToDisplay;
    }

    function limitBreadcrumbItems(count: number){
        breadcrumbItemLimit.value = count;
        updateBreadcrumbs();
    }

    function separateBreadcrumbs<T>(links: T[], show: number): [T[], T[]] {
        if (links.length > show) return [links.slice(-show), links.slice(0, -show)];
        return [links, []]
    }

    function toggleHiddenBreadcrumbs(value: boolean | null = null) {
        showHiddenBreadcrumbs.value = value ?? !showHiddenBreadcrumbs.value;
    }

    function isGoUpAvailable() { return !!(breadcrumbs.value && breadcrumbs.value.length && !searchMode); };

    const parentFolderPath =  computed(()  => breadcrumbs.value[breadcrumbs.value.length - 2]?.path ?? (adapter.value + '://'));

    onMounted(() => {});
    watch(path, updateBreadcrumbs)
    onMounted(updateBreadcrumbs)

    return { adapter, path, loading, searchMode, data, breadcrumbs, breadcrumbItems, limitBreadcrumbItems, hiddenBreadcrumbs, showHiddenBreadcrumbs, toggleHiddenBreadcrumbs, isGoUpAvailable, parentFolderPath }
}


