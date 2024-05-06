import {computed, onMounted, reactive, ref, watch} from "vue";

export default function (initialAdapter, initialPath) {

    const adapter = ref(initialAdapter);
    const path = ref(initialPath);
    const breadcrumbs = ref([]);
    const breadcrumbItems = ref([]);
    const hiddenBreadcrumbs = ref([]);
    const showHiddenBreadcrumbs = ref(false);
    const breadcrumbItemLimit = ref(5);

    let loading = false; // loading state

    let searchMode = false;

    // fetched items
    const data = reactive({
        adapter: adapter,
        storages: [],
        dirname: path,
        files: []
    });

    // breadcrumbs for the current path
    function updateBreadcrumbs() {
        let items = [], links = [];

        let dirname = path.value ?? (adapter.value + '://');

        if (dirname.length === 0) {
            breadcrumbs.value = [];
        }

        dirname
            .replace(adapter.value + '://', '')
            .split('/')
            .forEach(function (item) {
                items.push(item);
                if (items.join('/') !== '') {
                    links.push({
                        'basename': item,
                        'name': item,
                        'path': adapter.value + '://' + items.join('/'),
                        'type': 'dir'
                    });
                }
            });

        breadcrumbItems.value = links;

        const [linksToDisplay, hiddenLinks ] = separateBreadcrumbs(links, breadcrumbItemLimit.value);

        hiddenBreadcrumbs.value = hiddenLinks;
        breadcrumbs.value = linksToDisplay;
    }

    function limitBreadcrumbItems(count){
        breadcrumbItemLimit.value = count;
        updateBreadcrumbs();
    }

    function separateBreadcrumbs(links, show) {
        if (links.length > show) {
            return [links.slice(-show), links.slice(0, -show)];
        }

        return [links, []]
    }

    function toggleHiddenBreadcrumbs(value = null) {
        showHiddenBreadcrumbs.value = value ?? !showHiddenBreadcrumbs.value;
    }

    function isGoUpAvailable() {
        return breadcrumbs.value && breadcrumbs.value.length && !searchMode;
    };

    const parentFolderPath =  computed(()  => {
        return breadcrumbs.value[breadcrumbs.value.length - 2]?.path ?? (adapter.value + '://');
    });

    onMounted(() => {
        // load data
    });

    watch(path, updateBreadcrumbs)
    onMounted(updateBreadcrumbs)

    return {
        adapter,
        path,
        loading,
        searchMode,
        data,
        breadcrumbs,
        breadcrumbItems,
        limitBreadcrumbItems,
        hiddenBreadcrumbs,
        showHiddenBreadcrumbs,
        toggleHiddenBreadcrumbs,
        isGoUpAvailable,
        parentFolderPath
    }
}
