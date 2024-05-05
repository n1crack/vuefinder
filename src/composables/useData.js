import {computed, onMounted, reactive, ref, watch} from "vue";

export default function (initialAdapter, initialPath) {

    const adapter = ref(initialAdapter);
    const path = ref(initialPath);
    const breadcrumbs = ref([]);

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

        if (links.length > 4) {
            links = links.slice(-5);
            links[0].name = '..';
        }

        breadcrumbs.value = [...links];
    }

    function isGoUpAvailable() {
        return breadcrumbs.value && breadcrumbs.value.length && !searchMode;
    };

    onMounted(() => {
        // load data
    });

    watch(path, updateBreadcrumbs)
    onMounted(updateBreadcrumbs)

    return {
        adapter,
        breadcrumbs,
        path,
        loading,
        searchMode,
        data,
        isGoUpAvailable
    }
}
