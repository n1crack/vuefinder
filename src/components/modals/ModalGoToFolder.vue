<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import ModalLayout from './ModalLayout.vue';
import ModalHeader from './ModalHeader.vue';
import OpenFolderSVG from '../../assets/icons/open_folder.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import GoUpSVG from '../../assets/icons/go_up.svg';
import { useApp } from '../../composables/useApp';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';
import { addRecentPath, getRecentPaths, removeRecentPath } from '../../utils/recentPaths';
import type { DirEntry } from '../../types';

defineOptions({ name: 'ModalGoToFolder' });

interface Suggestion {
  path: string;
  label: string;
  kind: 'recent' | 'dir' | 'storage';
}

const app = useApp();
const notify = createNotifier(app);
const { t } = app.i18n;
const fs = app.fs;

const storages = useStore(fs.storages);

const input = ref('');
const suggestions = ref<Suggestion[]>([]);
const highlightedIndex = ref(0);
const isLoading = ref(false);
const isNavigating = ref(false);
const errorMessage = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const suggestionListRef = ref<HTMLElement | null>(null);

// Monotonic counter — only the most recent list lookup updates suggestions,
// so out-of-order responses can't overwrite fresh results.
let lookupId = 0;

const validStorages = computed<string[]>(() => (storages.value ?? []) as string[]);

const splitInput = (
  raw: string
): { storage: string | null; parent: string; filter: string; hasProtocol: boolean } => {
  const value = raw ?? '';
  const protoIndex = value.indexOf('://');
  if (protoIndex === -1) {
    return { storage: null, parent: '', filter: value.trim(), hasProtocol: false };
  }
  const storage = value.slice(0, protoIndex);
  const rest = value.slice(protoIndex + 3);
  const lastSlash = rest.lastIndexOf('/');
  const parentPath =
    lastSlash === -1
      ? `${storage}://`
      : `${storage}://${rest.slice(0, lastSlash).replace(/^\/+/, '')}`;
  const filter = lastSlash === -1 ? rest : rest.slice(lastSlash + 1);
  return { storage, parent: parentPath, filter, hasProtocol: true };
};

const loadStorageSuggestions = (filter: string) => {
  const f = filter.toLowerCase();
  suggestions.value = validStorages.value
    .filter((name) => !f || name.toLowerCase().includes(f))
    .map<Suggestion>((name) => ({
      path: `${name}://`,
      label: `${name}://`,
      kind: 'storage',
    }));
  highlightedIndex.value = suggestions.value.length ? 0 : -1;
  errorMessage.value = '';
};

const loadRecents = () => {
  const recents = getRecentPaths();
  suggestions.value = recents.map<Suggestion>((path) => ({
    path,
    label: path,
    kind: 'recent',
  }));
  highlightedIndex.value = suggestions.value.length ? 0 : -1;
  errorMessage.value = '';
};

const loadFolderSuggestions = async (parent: string, filter: string) => {
  const id = ++lookupId;
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const data = await app.adapter.list(parent);
    if (id !== lookupId) return; // a newer lookup superseded us
    const f = filter.toLowerCase();
    const folders = (data?.files ?? []).filter(
      (entry: DirEntry) =>
        entry.type === 'dir' && (!f || entry.basename.toLowerCase().startsWith(f))
    );
    suggestions.value = folders.map((entry: DirEntry): Suggestion => ({
      path: entry.path,
      label: entry.basename,
      kind: 'dir',
    }));
    highlightedIndex.value = suggestions.value.length ? 0 : -1;
  } catch (err) {
    if (id !== lookupId) return;
    suggestions.value = [];
    highlightedIndex.value = -1;
    errorMessage.value = getErrorMessage(err, t('Folder not found'));
  } finally {
    if (id === lookupId) {
      isLoading.value = false;
    }
  }
};

let lookupTimer: ReturnType<typeof setTimeout> | null = null;
const scheduleLookup = (value: string) => {
  if (lookupTimer) clearTimeout(lookupTimer);
  lookupTimer = setTimeout(() => runLookup(value), 150);
};

const runLookup = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    lookupId++;
    isLoading.value = false;
    loadRecents();
    return;
  }
  const { hasProtocol, parent, filter } = splitInput(trimmed);
  if (!hasProtocol) {
    lookupId++;
    isLoading.value = false;
    loadStorageSuggestions(trimmed);
    return;
  }
  void loadFolderSuggestions(parent, filter);
};

watch(input, (value) => scheduleLookup(value));

onMounted(() => {
  loadRecents();
  nextTick(() => inputRef.value?.focus());
});

const ensureHighlightedVisible = () => {
  nextTick(() => {
    const container = suggestionListRef.value;
    if (!container) return;
    const child = container.children[highlightedIndex.value] as HTMLElement | undefined;
    if (!child) return;
    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;
    const top = child.offsetTop;
    const bottom = top + child.offsetHeight;
    if (top < cTop) container.scrollTop = top;
    else if (bottom > cBottom) container.scrollTop = bottom - container.clientHeight;
  });
};

const moveHighlight = (delta: number) => {
  if (!suggestions.value.length) return;
  const len = suggestions.value.length;
  highlightedIndex.value = ((highlightedIndex.value + delta) % len + len) % len;
  ensureHighlightedVisible();
};

const completeWithSuggestion = (suggestion: Suggestion) => {
  // For directories: append a trailing slash so the next keystroke immediately
  // lists the children of the just-completed folder.
  input.value = suggestion.kind === 'dir' ? `${suggestion.path}/` : suggestion.path;
  nextTick(() => {
    inputRef.value?.setSelectionRange(input.value.length, input.value.length);
  });
};

const isValidPath = (value: string): { ok: boolean; reason?: string } => {
  if (!value.includes('://')) {
    return {
      ok: false,
      reason: t('Invalid path format. Path must be in format: storage://path/to/folder'),
    };
  }
  const storage = value.slice(0, value.indexOf('://'));
  if (!validStorages.value.includes(storage)) {
    return { ok: false, reason: t('Invalid storage. Storage "%s" is not available.', storage) };
  }
  return { ok: true };
};

const navigateTo = async (path: string) => {
  if (isNavigating.value) return;
  const target = path.trim();
  if (!target) return;
  const validation = isValidPath(target);
  if (!validation.ok) {
    errorMessage.value = validation.reason ?? '';
    return;
  }
  isNavigating.value = true;
  try {
    const result = await app.adapter.open(target);
    if (result === undefined) {
      // Cancelled — leave modal open.
      return;
    }
    addRecentPath(target);
    app.modal.close();
  } catch (err) {
    errorMessage.value = getErrorMessage(err, t('Failed to navigate to folder'));
    fs.setLoading(false);
  } finally {
    isNavigating.value = false;
  }
};

const handleEnter = () => {
  const current = suggestions.value[highlightedIndex.value];
  // Enter always navigates: to the highlighted suggestion if there is one,
  // otherwise to whatever the user typed. Tab is the key to "complete" a
  // partial folder name into the input.
  void navigateTo(current ? current.path : input.value);
};

const handleTab = (event: KeyboardEvent) => {
  if (!suggestions.value.length) return;
  event.preventDefault();
  const current = suggestions.value[highlightedIndex.value];
  if (current) completeWithSuggestion(current);
};

const handleSuggestionClick = (suggestion: Suggestion) => {
  if (suggestion.kind === 'dir') {
    completeWithSuggestion(suggestion);
    return;
  }
  void navigateTo(suggestion.path);
};

const handleSuggestionDblClick = (suggestion: Suggestion) => {
  void navigateTo(suggestion.path);
};

const handleRemoveRecent = (event: MouseEvent, path: string) => {
  event.stopPropagation();
  event.preventDefault();
  removeRecentPath(path);
  loadRecents();
};

const handleFillInput = (event: MouseEvent, path: string) => {
  event.stopPropagation();
  event.preventDefault();
  input.value = path;
  nextTick(() => {
    inputRef.value?.focus();
    inputRef.value?.setSelectionRange(input.value.length, input.value.length);
  });
};

const placeholder = computed(() => {
  const first = validStorages.value[0];
  return first ? `${first}://path/to/folder` : 'storage://path/to/folder';
});
</script>

<template>
  <ModalLayout>
    <div class="vuefinder__go-to-folder-modal">
      <ModalHeader :icon="OpenFolderSVG" :title="t('Go to Folder')" />
      <div class="vuefinder__go-to-folder-modal__content">
        <input
          ref="inputRef"
          v-model="input"
          class="vuefinder__go-to-folder-modal__input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          :placeholder="placeholder"
          @keydown.down.prevent="moveHighlight(1)"
          @keydown.up.prevent="moveHighlight(-1)"
          @keydown.enter.prevent="handleEnter"
          @keydown.tab="handleTab"
        />

        <div v-if="errorMessage" class="vuefinder__go-to-folder-modal__error">
          {{ errorMessage }}
        </div>

        <div
          v-if="suggestions.length"
          ref="suggestionListRef"
          class="vuefinder__go-to-folder-modal__suggestions"
        >
          <div
            v-for="(suggestion, index) in suggestions"
            :key="`${suggestion.kind}:${suggestion.path}`"
            class="vuefinder__go-to-folder-modal__suggestion"
            :class="{
              'vuefinder__go-to-folder-modal__suggestion--active': index === highlightedIndex,
            }"
            @mouseenter="highlightedIndex = index"
            @click="handleSuggestionClick(suggestion)"
            @dblclick="handleSuggestionDblClick(suggestion)"
          >
            <FolderSVG class="vuefinder__go-to-folder-modal__suggestion-icon" />
            <span class="vuefinder__go-to-folder-modal__suggestion-label">
              {{ suggestion.label }}
            </span>
            <span
              v-if="suggestion.kind === 'recent'"
              class="vuefinder__go-to-folder-modal__suggestion-tag"
            >
              {{ t('Recent') }}
            </span>
            <button
              v-if="suggestion.kind === 'recent'"
              type="button"
              class="vuefinder__go-to-folder-modal__suggestion-fill"
              :title="t('Edit this path')"
              @click="handleFillInput($event, suggestion.path)"
            >
              <GoUpSVG class="vuefinder__go-to-folder-modal__suggestion-fill-icon" />
            </button>
            <button
              v-if="suggestion.kind === 'recent'"
              type="button"
              class="vuefinder__go-to-folder-modal__suggestion-remove"
              :title="t('Remove from recent')"
              @click="handleRemoveRecent($event, suggestion.path)"
            >
              ×
            </button>
          </div>
        </div>

        <div
          v-else-if="!isLoading"
          class="vuefinder__go-to-folder-modal__empty"
        >
          <template v-if="!input.trim()">{{ t('No recent folders yet.') }}</template>
          <template v-else>{{ t('No matching folders.') }}</template>
        </div>

        <div v-if="isLoading" class="vuefinder__go-to-folder-modal__loading">
          {{ t('Loading…') }}
        </div>
      </div>
    </div>

    <template #buttons>
      <button
        type="button"
        class="vf-btn vf-btn-primary"
        :disabled="isNavigating"
        @click="handleEnter"
      >
        {{ t('Go') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
