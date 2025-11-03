# Examples

Practical examples showing how to use VueFinder in different scenarios.

## Basic File Manager

A simple file manager with basic functionality:

```vue
<template>
  <div class="file-manager">
    <h2>My File Manager</h2>
    <vue-finder id="basic_manager" :request="backendUrl" locale="en" theme="light" />
  </div>
</template>

<script setup>
const backendUrl = 'http://localhost:8000/api/files';
</script>
```

## File Manager with Custom Configuration

Advanced configuration with custom headers and error handling:

```vue
<template>
  <div class="advanced-file-manager">
    <vue-finder
      id="advanced_manager"
      :request="requestConfig"
      :max-file-size="'50mb'"
      :max-height="'800px'"
      :persist="true"
      :full-screen="false"
      @select="handleFileSelect"
      @update:path="handlePathChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const requestConfig = {
  baseUrl: 'http://localhost:8000/api/files',
  headers: {
    Authorization: 'Bearer your-token',
    'X-Custom-Header': 'value',
  },
  params: {
    version: 'v1',
  },
  transformRequest: (req) => {
    // Add custom logic to requests
    if (req.method === 'get') {
      req.params.timestamp = Date.now();
    }
    return req;
  },
};

const handleFileSelect = (items) => {
  console.log('Selected files:', items);
  // Process selected files
};

const handlePathChange = (path) => {
  console.log('Navigated to:', path);
  // Update breadcrumb or other UI elements
};
</script>
```

## File Manager with Selection Button

Using the built-in select button for file selection:

```vue
<template>
  <div class="file-selector">
    <vue-finder id="file_selector" :request="backendUrl" :select-button="selectConfig" />
  </div>
</template>

<script setup>
const backendUrl = 'http://localhost:8000/api/files';

const selectConfig = {
  active: true,
  multiple: true, // Allow multiple file selection
  click: (items, event) => {
    if (!items.length) {
      alert('Please select at least one file');
      return;
    }

    // Process selected files
    const filePaths = items.map((item) => item.path);
    console.log('Selected files:', filePaths);

    // You can emit an event or call a parent method
    // this.$emit('files-selected', filePaths)
  },
};
</script>
```

## File Manager with Custom Styling

Customizing the appearance with CSS:

```vue
<template>
  <div class="custom-file-manager">
    <vue-finder id="custom_styled" :request="backendUrl" theme="dark" />
  </div>
</template>

<script setup>
const backendUrl = 'http://localhost:8000/api/files';
</script>

<style scoped>
.custom-file-manager {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

/* Custom VueFinder styling */
.custom-file-manager :deep(.vf-toolbar) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-file-manager :deep(.vf-breadcrumb) {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.custom-file-manager :deep(.vf-file-item:hover) {
  background-color: #f1f5f9;
}
</style>
```

## Multi-language File Manager

Implementing multiple languages:

```vue
<template>
  <div class="multilang-file-manager">
    <div class="language-selector">
      <label>Language:</label>
      <select v-model="selectedLocale" @change="updateLocale">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="ru">Русский</option>
        <option value="de">Deutsch</option>
      </select>
    </div>

    <vue-finder id="multilang_manager" :request="backendUrl" :locale="selectedLocale" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const backendUrl = 'http://localhost:8000/api/files';
const selectedLocale = ref('en');

const updateLocale = () => {
  // Locale will be automatically updated via the reactive prop
  console.log('Language changed to:', selectedLocale.value);
};
</script>
```

## File Manager with Error Handling

Implementing custom error handling:

```vue
<template>
  <div class="error-handling-file-manager">
    <div v-if="error" class="error-message">
      <h3>Error occurred:</h3>
      <p>{{ error }}</p>
      <button @click="clearError">Dismiss</button>
    </div>

    <vue-finder id="error_handling_manager" :request="backendUrl" :on-error="handleError" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const backendUrl = 'http://localhost:8000/api/files';
const error = ref(null);

const handleError = (errorData) => {
  console.error('VueFinder error:', errorData);
  error.value = errorData.message || 'An unknown error occurred';
};

const clearError = () => {
  error.value = null;
};
</script>

<style scoped>
.error-message {
  background-color: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #c53030;
}
</style>
```

## File Manager with Initial Path

Starting in a specific directory:

```vue
<template>
  <div class="initial-path-file-manager">
    <vue-finder
      id="initial_path_manager"
      :request="backendUrl"
      path="media://public/uploads"
      :persist="true"
    />
  </div>
</template>

<script setup>
const backendUrl = 'http://localhost:8000/api/files';
</script>
```

## Full Screen File Manager

Starting in full screen mode:

```vue
<template>
  <div class="fullscreen-file-manager">
    <vue-finder
      id="fullscreen_manager"
      :request="backendUrl"
      :full-screen="true"
      :max-height="'100vh'"
    />
  </div>
</template>

<script setup>
const backendUrl = 'http://localhost:8000/api/files';
</script>
```

## Integration with Vue Router

Using VueFinder with Vue Router for navigation:

```vue
<template>
  <div class="routed-file-manager">
    <vue-finder id="routed_manager" :request="backendUrl" @update:path="handleNavigation" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const backendUrl = 'http://localhost:8000/api/files';

const handleNavigation = (path) => {
  // Update URL without triggering navigation
  router.replace({
    query: { ...router.currentRoute.value.query, path },
  });
};
</script>
```

## Next Steps

- [API Reference](/api-reference/props) - Complete documentation
- [Backend Integration](/guide/drivers-adapters) - Set up your backend
- [Theming Guide](/guide/theming) - Customize appearance
- [Localization Guide](/guide/localization) - Add multiple languages
