<script setup lang="ts">
  import { ref, onMounted, onUnmounted, h, computed } from 'vue';
  import Selecto from 'selecto';
  
  // Icon Components
  const FolderIcon = () => h('svg', { 
    class: 'w-full h-full text-yellow-500', 
    fill: 'currentColor', 
    viewBox: '0 0 20 20' 
  }, [
    h('path', { d: 'M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' })
  ]);
  
  const ImageIcon = () => h('svg', { 
    class: 'w-full h-full text-purple-500', 
    fill: 'currentColor', 
    viewBox: '0 0 20 20' 
  }, [
    h('path', { 
      'fill-rule': 'evenodd', 
      d: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z', 
      'clip-rule': 'evenodd' 
    })
  ]);
  
  const DocumentIcon = () => h('svg', { 
    class: 'w-full h-full text-blue-500', 
    fill: 'currentColor', 
    viewBox: '0 0 20 20' 
  }, [
    h('path', { 
      'fill-rule': 'evenodd', 
      d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z', 
      'clip-rule': 'evenodd' 
    })
  ]);
  
  const VideoIcon = () => h('svg', { 
    class: 'w-full h-full text-red-500', 
    fill: 'currentColor', 
    viewBox: '0 0 20 20' 
  }, [
    h('path', { d: 'M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' })
  ]);
  
  const AudioIcon = () => h('svg', { 
    class: 'w-full h-full text-green-500', 
    fill: 'currentColor', 
    viewBox: '0 0 20 20' 
  }, [
    h('path', { d: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z' })
  ]);
  
  // Refs
  const scrollContainer = ref(null);
  const files = ref([]);
  const selectedIds = ref(new Set());
  const itemsPerRow = ref(6);
  const scrollTop = ref(0);
  const containerHeight = ref(600);
  
  let selecto = null;
  
  // Generate files
  const generateFiles = () => {
    const types = ['folder', 'image', 'document', 'video', 'audio'];
    const extensions = {
      image: ['.jpg', '.png', '.gif', '.svg'],
      document: ['.pdf', '.docx', '.txt', '.xlsx'],
      video: ['.mp4', '.avi', '.mov', '.mkv'],
      audio: ['.mp3', '.wav', '.flac', '.m4a'],
      folder: ['']
    };
  
    return Array.from({ length: 500 }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const ext = type === 'folder' ? '' : extensions[type][Math.floor(Math.random() * extensions[type].length)];
      
      return {
        id: i,
        name: type === 'folder' ? `Folder ${i + 1}` : `File_${i + 1}${ext}`,
        type,
        size: type === 'folder' ? '--' : `${Math.floor(Math.random() * 10000)}KB`,
        modified: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
      };
    });
  };
  
  const getFileIcon = (type) => {
    const icons = {
      folder: FolderIcon,
      image: ImageIcon,
      document: DocumentIcon,
      video: VideoIcon,
      audio: AudioIcon
    };
    return icons[type] || DocumentIcon;
  };
  
  // Custom virtualizer
  const rowHeight = 100; // Height of each row
  const overscan = 2; // Extra rows to render
  
  const totalRows = computed(() => Math.ceil(files.value.length / itemsPerRow.value));
  const totalHeight = computed(() => totalRows.value * rowHeight);
  
  const visibleRange = computed(() => {
    const start = Math.max(0, Math.floor(scrollTop.value / rowHeight) - overscan);
    const end = Math.min(totalRows.value, Math.ceil((scrollTop.value + containerHeight.value) / rowHeight) + overscan);
    return { start, end };
  });
  
  const visibleRows = computed(() => {
    const { start, end } = visibleRange.value;
    return Array.from({ length: end - start }, (_, i) => start + i);
  });
  
  const getRowFiles = (rowIndex) => {
    const startIndex = rowIndex * itemsPerRow.value;
    return files.value.slice(startIndex, startIndex + itemsPerRow.value);
  };
  
  const updateItemsPerRow = () => {
    if (scrollContainer.value) {
      const width = scrollContainer.value.clientWidth - 48;
      const itemWidth = 120; // w-28 = 112px + gap
      itemsPerRow.value = Math.max(Math.floor(width / itemWidth), 2);
    }
  };
  
  const handleScroll = (event) => {
    scrollTop.value = event.target.scrollTop;
  };
  
  const handleClearSelection = () => {
    selectedIds.value = new Set();
    document.querySelectorAll('.selected').forEach(el => {
      el.classList.remove('selected');
    });
  };
  
  const handleSelectAll = () => {
    selectedIds.value = new Set(files.value.map(f => f.id));
    document.querySelectorAll('.file-item').forEach(el => {
      el.classList.add('selected');
    });
  };
  
  onMounted(() => {
    files.value = generateFiles();
    updateItemsPerRow();
    
    // Debug: Log to console to verify component is working
    console.log('NewExplorer mounted with', files.value.length, 'files');
    console.log('Items per row:', itemsPerRow.value);
    console.log('Total rows:', totalRows.value);
    console.log('Visible rows:', visibleRows.value);

    // Initialize Selecto
    selecto = new Selecto({
      container: scrollContainer.value,
      selectableTargets: ['.file-item'],
      selectByClick: true,
      selectFromInside: false,
      continueSelect: false,
      toggleContinueSelect: 'shift',
      keyContainer: window,
      hitRate: 0,
    });
  
    selecto.on('select', (e) => {
      e.added.forEach(el => el.classList.add('selected'));
      e.removed.forEach(el => el.classList.remove('selected'));
  
      const newSelectedIds = new Set(selectedIds.value);
      
      e.added.forEach(el => {
        const id = parseInt(el.dataset.id);
        newSelectedIds.add(id);
      });
      
      e.removed.forEach(el => {
        const id = parseInt(el.dataset.id);
        newSelectedIds.delete(id);
      });
  
      selectedIds.value = newSelectedIds;
    });
  
    window.addEventListener('resize', updateItemsPerRow);
  });

  onUnmounted(() => {
    if (selecto) selecto.destroy();
    window.removeEventListener('resize', updateItemsPerRow);
  });
  </script>
  
  <style scoped>
  </style>

<template>
    <div class="w-full h-screen bg-gray-900 flex flex-col">
      <!-- Toolbar -->
      <div class="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-bold text-white">File Manager</h1>
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <span>{{ files.length }} items</span>
              <template v-if="selectedIds.size > 0">
                <span>•</span>
                <span class="text-blue-400">{{ selectedIds.size }} selected</span>
              </template>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <template v-if="selectedIds.size > 0">
              <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                Delete
              </button>
              <button class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                Move
              </button>
              <button @click="handleClearSelection" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                Clear
              </button>
            </template>
            <button v-else @click="handleSelectAll" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
              Select All
            </button>
          </div>
        </div>
      </div>
  
      <!-- File Grid -->
      <div ref="scrollContainer" class="flex-1 overflow-auto p-6" style="height: 600px;" @scroll="handleScroll">
        <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
          <div
            v-for="rowIndex in visibleRows"
            :key="rowIndex"
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${rowHeight}px`,
              transform: `translateY(${rowIndex * rowHeight}px)`,
            }"
          >
            <div class="grid grid-cols-6 gap-4">
              <div
                v-for="file in getRowFiles(rowIndex)"
                :key="file.id"
                :data-id="file.id"
                :class="[
                  'file-item flex-shrink-0 w-28 p-2 rounded-lg cursor-pointer transition-all',
                  selectedIds.has(file.id) 
                    ? 'selected bg-blue-600 shadow-lg scale-105' 
                    : 'bg-gray-800 hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <div class="flex flex-col items-center gap-1 relative">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    selectedIds.has(file.id) ? 'bg-blue-700' : 'bg-gray-700'
                  ]">
                    <component :is="getFileIcon(file.type)" class="w-6 h-6" />
                  </div>
                  <div class="w-full text-center">
                    <p :class="[
                      'text-xs font-medium truncate leading-tight',
                      selectedIds.has(file.id) ? 'text-white' : 'text-gray-200'
                    ]">
                      {{ file.name }}
                    </p>
                    <p :class="[
                      'text-xs leading-tight',
                      selectedIds.has(file.id) ? 'text-blue-200' : 'text-gray-500'
                    ]">
                      {{ file.size }}
                    </p>
                  </div>
                  <div v-if="selectedIds.has(file.id)" class="absolute top-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg class="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  