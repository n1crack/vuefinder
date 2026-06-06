<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import PreviewChrome from '../../components/previews/PreviewChrome.vue';
import type { StoreValue } from 'nanostores';
import Text from '../../components/previews/Text.vue';
import Csv from '../../components/previews/Csv.vue';
import Image from '../../components/previews/Image.vue';
import Default from '../../components/previews/Default.vue';
import Video from '../../components/previews/Video.vue';
import Audio from '../../components/previews/Audio.vue';
import Pdf from '../../components/previews/Pdf.vue';
import type { DirEntry } from '../../types';

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;
const loaded = ref(false);
const getExtension = (path: string): string => {
  const name = (path || '').split('/').pop() || '';
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : '';
};

const extMatches = (type: string, ext: string): boolean => {
  if (!ext) return false;
  const image = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico', 'avif']);
  const video = new Set(['mp4', 'webm', 'ogg', 'ogv', 'mov', 'm4v']);
  const audio = new Set(['mp3', 'wav', 'ogg', 'oga', 'm4a', 'flac', 'aac']);
  const text = new Set([
    'txt', 'md', 'markdown', 'json', 'jsonc', 'js', 'mjs', 'cjs', 'ts', 'tsx',
    'jsx', 'vue', 'svelte', 'css', 'scss', 'sass', 'less', 'html', 'htm',
    'xml', 'svg', 'csv', 'tsv', 'log', 'yml', 'yaml', 'toml', 'ini', 'conf',
    'env', 'sh', 'bash', 'zsh', 'fish', 'py', 'rb', 'php', 'go', 'rs', 'java',
    'kt', 'swift', 'c', 'h', 'cpp', 'hpp', 'cs', 'sql', 'graphql', 'gql',
    'dockerfile', 'gitignore', 'gitattributes', 'editorconfig', 'prettierrc',
    'eslintrc', 'lock',
  ]);

  if (type === 'image') return image.has(ext);
  if (type === 'video') return video.has(ext);
  if (type === 'audio') return audio.has(ext);
  if (type === 'csv') return ext === 'csv' || ext === 'tsv';
  if (type === 'text') return text.has(ext);
  if (type === 'application/pdf') return ext === 'pdf';
  return false;
};

const loadPreview = (type: string) => {
  const force = app.modal.data.forceType as string | undefined;
  if (force) return force === type;

  const mime = app.modal.data.item.mime_type;
  if (mime && typeof mime === 'string' && mime.startsWith(type)) return true;
  const ext = getExtension(app.modal.data.item.path);
  return extMatches(type, ext);
};

const enabledPreview = enabled('preview');
if (!enabledPreview) {
  loaded.value = true;
}

// Navigation logic - filter only files
const currentItem = computed(() => app.modal.data.item);
const files: StoreValue<DirEntry[]> = useStore(app.fs.sortedFiles);
const fileOnlyItems = computed(() => files.value.filter((f: DirEntry) => f.type === 'file'));
const currentIndex = computed(() =>
  fileOnlyItems.value.findIndex((f: DirEntry) => f.path === currentItem.value.path)
);

// app is reactive() so refs are auto-unwrapped: app.modal.controls is
// the value, not the ref.
const isEditable = computed(() => Boolean(unref((app.modal as any).controls?.isEditable)));
const isEditing = computed(() => Boolean(unref((app.modal as any).controls?.isEditing)));
const isDirty = computed(() => Boolean(unref((app.modal as any).controls?.isDirty)));
const primaryActionLabel = computed(
  () => unref((app.modal as any).controls?.primaryActionLabel) ?? t('Save')
);

// Edit-lifecycle actions wired to the active previewer's contract. Live
// in the modal footer so they're easy to reach with thumb on mobile.
const onEditToggle = async () => {
  await (app.modal as any).controls?.enterEdit?.();
};

const onCommitEdit = async () => {
  await (app.modal as any).controls?.commitEdit?.();
};

const onCancelEdit = async () => {
  if (isDirty.value) {
    const ok = window.confirm(t('Discard unsaved changes?'));
    if (!ok) return;
  }
  await (app.modal as any).controls?.cancelEdit?.();
};

const canNavigatePrevious = computed(() => !isEditing.value && currentIndex.value > 0);
const canNavigateNext = computed(
  () => !isEditing.value && currentIndex.value < fileOnlyItems.value.length - 1
);

const navigateToPrevious = () => {
  if (!canNavigatePrevious.value) return;
  const previousItem = fileOnlyItems.value[currentIndex.value - 1];
  if (!previousItem) return;
  app.fs.clearSelection();
  app.fs.select(previousItem.path);
  app.modal.data.item = previousItem;
  loaded.value = false;
};

const navigateToNext = () => {
  if (!canNavigateNext.value) return;
  const nextItem = fileOnlyItems.value[currentIndex.value + 1];
  if (!nextItem) return;
  app.fs.clearSelection();
  app.fs.select(nextItem.path);
  app.modal.data.item = nextItem;
  loaded.value = false;
};

// Single close path: × button, Esc, overlay click all flow through here.
// If a previewer is mid-edit with unsaved changes, ask before closing.
const requestClose = () => {
  if (isEditing.value && isDirty.value) {
    const ok = window.confirm(t('Discard unsaved changes?'));
    if (!ok) return;
  }
  app.modal.close();
};

// Drag-with-animation swipe gesture for mobile navigation.
//
// Behavior:
// - Touch starts on a non-interactive surface (title or empty preview area)
// - On touchmove the entire preview pane (chrome + content) translates with
//   the finger via translateX
// - On touchend, if the horizontal drag exceeds COMMIT_RATIO of the viewport
//   width, animate the pane fully off-screen in that direction, then swap to
//   the next/previous file. Otherwise snap back to 0.
// - Skipped entirely when in edit mode, or when the touch begins on
//   interactive content (text editor, video, audio, form fields, cropper,
//   chrome buttons, etc.).
const DRAG_START_THRESHOLD = 8; // px before we commit to a drag (vs a tap)
const HORIZONTAL_BIAS = 1.4;
const COMMIT_RATIO = 0.22; // fraction of viewport width to trigger nav
const ANIM_MS = 220;
const INTERACTIVE_SELECTOR =
  'input, textarea, select, button, a, audio, video, .cm-editor, .vue-advanced-cropper, .vuefinder__codemirror-wrapper, .vuefinder__csv-preview__table, .vuefinder__image-preview__zoom-controls, .vuefinder__preview-chrome__actions';

const dragX = ref(0);
const animating = ref(false);
let touchStartX = 0;
let touchStartY = 0;
let touchActive = false;
let dragCommitted = false;

const paneStyle = computed(() => ({
  transform: `translate3d(${dragX.value}px, 0, 0)`,
  transition: animating.value ? `transform ${ANIM_MS}ms ease-out` : 'none',
}));

const settleAfter = (ms: number, fn: () => void) => {
  setTimeout(fn, ms);
};

const onTouchStart = (e: TouchEvent) => {
  if (isEditing.value) return;
  if (e.touches.length !== 1) return;
  const target = e.target as HTMLElement | null;
  if (target?.closest?.(INTERACTIVE_SELECTOR)) return;
  touchActive = true;
  dragCommitted = false;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  animating.value = false;
};

const onTouchMove = (e: TouchEvent) => {
  if (!touchActive) return;
  const touch = e.touches[0];
  if (!touch) return;
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  // Decide drag vs scroll once we leave the dead-zone. Vertical-dominant
  // movement aborts so the user can scroll long content.
  if (!dragCommitted) {
    if (Math.abs(dx) < DRAG_START_THRESHOLD && Math.abs(dy) < DRAG_START_THRESHOLD) return;
    if (Math.abs(dx) < Math.abs(dy) * HORIZONTAL_BIAS) {
      touchActive = false;
      return;
    }
    dragCommitted = true;
  }
  // Resist swiping past the first/last file — visual rubber-band.
  let effective = dx;
  if (dx > 0 && !canNavigatePrevious.value) effective = dx * 0.3;
  if (dx < 0 && !canNavigateNext.value) effective = dx * 0.3;
  dragX.value = effective;
  if (e.cancelable) e.preventDefault();
};

// Two-stage card-swap commit. Outgoing pane slides fully off in the drag
// direction, then we swap the item and the new pane is pre-positioned
// off-screen on the OPPOSITE side and slides in. Gives the "the next file
// is right next door" feel instead of just sliding content around.
const commitNavigation = (direction: 'prev' | 'next') => {
  const viewport = window.innerWidth || 1;
  const outTo = direction === 'prev' ? viewport : -viewport;
  const enterFrom = direction === 'prev' ? -viewport : viewport;
  const navigate = direction === 'prev' ? navigateToPrevious : navigateToNext;

  // Stage 1: slide current pane fully off-screen.
  animating.value = true;
  dragX.value = outTo;
  settleAfter(ANIM_MS, () => {
    // Swap item content, jump pane to the opposite side with no animation.
    navigate();
    animating.value = false;
    dragX.value = enterFrom;
    // Wait two frames so the browser commits the jump before we start the
    // entrance animation; otherwise the transition is collapsed.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animating.value = true;
        dragX.value = 0;
        settleAfter(ANIM_MS, () => {
          animating.value = false;
        });
      });
    });
  });
};

const onTouchEnd = () => {
  if (!touchActive) return;
  touchActive = false;
  if (!dragCommitted) return;

  const viewport = window.innerWidth || 1;
  const dx = dragX.value;
  const commit = Math.abs(dx) >= viewport * COMMIT_RATIO;

  if (commit && dx > 0 && canNavigatePrevious.value) {
    commitNavigation('prev');
    return;
  }
  if (commit && dx < 0 && canNavigateNext.value) {
    commitNavigation('next');
    return;
  }
  // Snap back.
  animating.value = true;
  dragX.value = 0;
  settleAfter(ANIM_MS, () => {
    animating.value = false;
  });
};

const onTouchCancel = () => {
  if (!touchActive) return;
  touchActive = false;
  if (!dragCommitted) return;
  animating.value = true;
  dragX.value = 0;
  settleAfter(ANIM_MS, () => {
    animating.value = false;
  });
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    requestClose();
    return;
  }
  // Cmd/Ctrl+S → commit edit
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
    const c = (app.modal as any).controls;
    if (c && unref(c.isEditing)) {
      event.preventDefault();
      void c.commitEdit();
      return;
    }
  }
  if (isEditing.value) return; // arrow nav off in edit mode
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'ArrowLeft') navigateToPrevious();
    else navigateToNext();
  }
};

onMounted(() => {
  const modalWrapper = document.querySelector('.vuefinder__preview-modal');
  if (modalWrapper) (modalWrapper as HTMLElement).focus();
});
</script>

<template>
  <ModalLayout
    :on-request-close="requestClose"
    :body-style="paneStyle"
    body-class="vuefinder__modal-layout__body--swipeable"
    :on-body-touchstart="onTouchStart"
    :on-body-touchmove="onTouchMove"
    :on-body-touchend="onTouchEnd"
    :on-body-touchcancel="onTouchCancel"
  >
    <div class="vuefinder__preview-modal" tabindex="0" @keydown="handleKeydown">
      <PreviewChrome @close-request="requestClose" />

      <!-- Side-anchored desktop navigation arrows (hidden on mobile / edit). -->
      <Teleport to="body">
        <div
          v-if="!isEditing"
          class="vuefinder__themer vuefinder__preview-modal__nav-overlay"
          :data-theme="app.theme.current"
        >
          <button
            :disabled="!canNavigatePrevious"
            class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left"
            :title="t('Previous file')"
            @click="navigateToPrevious"
          >
            <svg
              class="vuefinder__preview-modal__nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            :disabled="!canNavigateNext"
            class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right"
            :title="t('Next file')"
            @click="navigateToNext"
          >
            <svg
              class="vuefinder__preview-modal__nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </Teleport>

      <div class="vuefinder__preview-modal__content">
        <div v-if="enabledPreview">
          <Csv
            v-if="loadPreview('csv')"
            :key="`csv-${currentItem.path}`"
            @success="loaded = true"
          />
          <Text
            v-else-if="loadPreview('text')"
            :key="`text-${currentItem.path}`"
            @success="loaded = true"
          />
          <Image
            v-else-if="loadPreview('image')"
            :key="`image-${currentItem.path}`"
            @success="loaded = true"
          />
          <Video
            v-else-if="loadPreview('video')"
            :key="`video-${currentItem.path}`"
            @success="loaded = true"
          />
          <Audio
            v-else-if="loadPreview('audio')"
            :key="`audio-${currentItem.path}`"
            @success="loaded = true"
          />
          <Pdf
            v-else-if="loadPreview('application/pdf')"
            :key="`pdf-${currentItem.path}`"
            @success="loaded = true"
          />
          <Default v-else :key="`default-${currentItem.path}`" @success="loaded = true" />
        </div>

        <!-- Mobile pagination strip. Always rendered when there's more
             than one file so the modal height stays constant between view
             and edit modes; visibility-hidden in edit mode preserves the
             slot height without distracting the user. -->
        <div
          v-if="fileOnlyItems.length > 1"
          class="vuefinder__preview-modal__pagination"
          :class="{ 'vuefinder__preview-modal__pagination--hidden': isEditing }"
          :aria-label="t('File %s of %s', String(currentIndex + 1), String(fileOnlyItems.length))"
        >
          <span class="vuefinder__preview-modal__pagination-text">
            {{ currentIndex + 1 }} / {{ fileOnlyItems.length }}
          </span>
        </div>

        <div class="vuefinder__preview-modal__loading">
          <div v-if="loaded === false" class="vuefinder__preview-modal__loading-indicator">
            <svg
              class="vuefinder__preview-modal__spinner"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="vuefinder__preview-modal__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="vuefinder__preview-modal__spinner-path"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ t('Loading') }}</span>
          </div>
        </div>
      </div>
    </div>

    <template v-if="isEditable" #buttons>
      <!-- Wrapper keeps actions on one row even on mobile, so the modal
           height doesn't grow when switching view↔edit (1 button vs 2). -->
      <div class="vuefinder__preview-modal__edit-actions">
        <template v-if="!isEditing">
          <button
            type="button"
            class="vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn"
            @click="onEditToggle"
          >
            {{ t('Edit') }}
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn"
            :disabled="!isDirty"
            @click="onCommitEdit"
          >
            {{ primaryActionLabel }}
          </button>
          <button
            type="button"
            class="vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn"
            @click="onCancelEdit"
          >
            {{ t('Cancel') }}
          </button>
        </template>
      </div>
    </template>
  </ModalLayout>
</template>
