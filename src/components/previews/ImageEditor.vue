<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useApp } from '../../composables/useApp';
import { adjustToFilter, bakeFilter, bakeRotation, mimeForFilename } from '../../utils/imageEditor';

defineOptions({ name: 'ImageEditor' });

type Tab = 'crop' | 'rotate' | 'grayscale' | 'adjust';

const props = defineProps<{
  src: string;
  filename: string;
}>();

const emit = defineEmits<{
  (e: 'update:src', value: string): void;
}>();

const app = useApp();
const { t } = app.i18n;

const activeTab = ref<Tab>('crop');
const applying = ref(false);

// Each tab's pending state is local and discarded silently when switching
// (per design — Apply commits, switching cancels).
const aspect = ref<number | null>(null); // null = free
const ASPECTS: { label: string; value: number | null }[] = [
  { label: 'Original', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
];

const cropperRef = useTemplateRef<{
  getResult: (options?: { size?: { width?: number; height?: number }; fillColor?: string }) => {
    canvas?: HTMLCanvasElement;
  };
} | null>('cropperRef');

// Rotate state (pending until Apply). Kept as unbounded degrees so the
// 4th rotate-right click reads as "another +90° in the same direction"
// to CSS instead of "−270° back" (which is what the shortest-path
// animation does once a modulo'd value wraps).
const pendingRotation = ref<number>(0);
const pendingFlipX = ref(false);
const pendingFlipY = ref(false);

// Grayscale toggle.
const grayscaleOn = ref(false);

// Adjust sliders.
const brightness = ref(0);
const contrast = ref(0);
const saturation = ref(0);

const adjustFilter = computed(() =>
  adjustToFilter(brightness.value, contrast.value, saturation.value)
);

// Reset all per-tab pending state whenever switching tabs OR whenever the
// upstream src changes (because a sibling tab applied something). Prevents
// stale rotation / slider values from leaking across operations.
watch([() => props.src, activeTab], () => {
  pendingRotation.value = 0;
  pendingFlipX.value = false;
  pendingFlipY.value = false;
  grayscaleOn.value = false;
  brightness.value = 0;
  contrast.value = 0;
  saturation.value = 0;
});

const mime = computed(() => mimeForFilename(props.filename));

const rotatePreviewStyle = computed(() => {
  const tx: string[] = [];
  if (pendingRotation.value) tx.push(`rotate(${pendingRotation.value}deg)`);
  if (pendingFlipX.value) tx.push('scaleX(-1)');
  if (pendingFlipY.value) tx.push('scaleY(-1)');
  return tx.length ? { transform: tx.join(' ') } : {};
});

const setTab = (tab: Tab) => {
  if (applying.value) return;
  activeTab.value = tab;
};

const applyCrop = () => {
  const result = cropperRef.value?.getResult();
  const canvas = result?.canvas;
  if (!canvas) return;
  const dataUrl = canvas.toDataURL(mime.value, mime.value === 'image/jpeg' ? 0.92 : undefined);
  emit('update:src', dataUrl);
};

const applyRotate = async () => {
  if (!rotateHasPending.value) return;
  applying.value = true;
  try {
    const next = await bakeRotation(
      props.src,
      normalizedRotation.value,
      pendingFlipX.value,
      pendingFlipY.value,
      mime.value
    );
    emit('update:src', next);
  } finally {
    applying.value = false;
  }
};

const applyGrayscale = async () => {
  if (!grayscaleOn.value) return;
  applying.value = true;
  try {
    const next = await bakeFilter(props.src, 'grayscale(1)', mime.value);
    emit('update:src', next);
  } finally {
    applying.value = false;
  }
};

const applyAdjust = async () => {
  if (brightness.value === 0 && contrast.value === 0 && saturation.value === 0) return;
  applying.value = true;
  try {
    const next = await bakeFilter(props.src, adjustFilter.value, mime.value);
    emit('update:src', next);
  } finally {
    applying.value = false;
  }
};

const resetAdjust = () => {
  brightness.value = 0;
  contrast.value = 0;
  saturation.value = 0;
};

const rotateLeft = () => {
  pendingRotation.value -= 90;
};
const rotateRight = () => {
  pendingRotation.value += 90;
};
const toggleFlipX = () => {
  pendingFlipX.value = !pendingFlipX.value;
};
const toggleFlipY = () => {
  pendingFlipY.value = !pendingFlipY.value;
};

// Normalized rotation in 0..270 used at bake time (canvas needs a
// concrete quarter-turn). The unbounded pending value above feeds CSS.
const normalizedRotation = computed(
  () => (((pendingRotation.value % 360) + 360) % 360) as 0 | 90 | 180 | 270
);

const rotateHasPending = computed(
  () => normalizedRotation.value !== 0 || pendingFlipX.value || pendingFlipY.value
);
const adjustHasPending = computed(
  () => brightness.value !== 0 || contrast.value !== 0 || saturation.value !== 0
);
const grayscaleHasPending = computed(() => grayscaleOn.value);
</script>

<template>
  <div class="vuefinder__image-editor">
    <!-- Tool strip: tabs across the top of the edit pane. -->
    <div class="vuefinder__image-editor__strip" role="tablist">
      <button
        v-for="tab in ['crop', 'rotate', 'grayscale', 'adjust'] as Tab[]"
        :key="tab"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab"
        class="vuefinder__image-editor__tab"
        :class="{ 'vuefinder__image-editor__tab--active': activeTab === tab }"
        @click="setTab(tab)"
      >
        <svg
          v-if="tab === 'crop'"
          class="vuefinder__image-editor__tab-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 2v16a2 2 0 0 0 2 2h14" />
          <path d="M2 6h16a2 2 0 0 1 2 2v14" />
        </svg>
        <svg
          v-else-if="tab === 'rotate'"
          class="vuefinder__image-editor__tab-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        <svg
          v-else-if="tab === 'grayscale'"
          class="vuefinder__image-editor__tab-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M12 3a9 9 0 0 0 0 18" fill="currentColor" />
        </svg>
        <svg
          v-else
          class="vuefinder__image-editor__tab-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" y1="6" x2="14" y2="6" />
          <circle cx="17" cy="6" r="2" />
          <line x1="10" y1="12" x2="20" y2="12" />
          <circle cx="7" cy="12" r="2" />
          <line x1="4" y1="18" x2="14" y2="18" />
          <circle cx="17" cy="18" r="2" />
        </svg>
        <span class="vuefinder__image-editor__tab-label">
          {{
            tab === 'crop'
              ? t('Crop')
              : tab === 'rotate'
                ? t('Rotate')
                : tab === 'grayscale'
                  ? t('Grayscale')
                  : t('Adjust')
          }}
        </span>
      </button>
    </div>

    <!-- Per-tab panel. Image area lives inside each panel so the layout
         can adapt (cropper takes more height; others show the bitmap with
         CSS preview). -->

    <!-- CROP -->
    <div v-if="activeTab === 'crop'" class="vuefinder__image-editor__panel">
      <div class="vuefinder__image-editor__stage">
        <Cropper
          ref="cropperRef"
          class="vuefinder__image-editor__cropper"
          crossorigin="anonymous"
          :src="props.src"
          :stencil-props="aspect === null ? {} : { aspectRatio: aspect }"
          :auto-zoom="true"
          :priority="'image'"
          :transitions="true"
        />
      </div>
      <div class="vuefinder__image-editor__controls">
        <div class="vuefinder__image-editor__chips">
          <button
            v-for="opt in ASPECTS"
            :key="opt.label"
            type="button"
            class="vuefinder__image-editor__chip"
            :class="{ 'vuefinder__image-editor__chip--active': aspect === opt.value }"
            @click="aspect = opt.value"
          >
            {{ t(opt.label) }}
          </button>
        </div>
        <button
          type="button"
          class="vuefinder__image-editor__apply"
          :disabled="applying"
          @click="applyCrop"
        >
          {{ t('Apply') }}
        </button>
      </div>
    </div>

    <!-- ROTATE -->
    <div v-else-if="activeTab === 'rotate'" class="vuefinder__image-editor__panel">
      <div class="vuefinder__image-editor__stage">
        <img
          class="vuefinder__image-editor__preview"
          :src="props.src"
          :style="rotatePreviewStyle"
          :alt="props.filename"
        />
      </div>
      <div class="vuefinder__image-editor__controls">
        <div class="vuefinder__image-editor__rotate-btns">
          <button
            type="button"
            class="vuefinder__image-editor__icon-btn"
            :title="t('Rotate left 90°')"
            @click="rotateLeft"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
          <button
            type="button"
            class="vuefinder__image-editor__icon-btn"
            :title="t('Rotate right 90°')"
            @click="rotateRight"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button
            type="button"
            class="vuefinder__image-editor__icon-btn"
            :class="{ 'vuefinder__image-editor__icon-btn--active': pendingFlipX }"
            :title="t('Flip horizontal')"
            @click="toggleFlipX"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="8 3 4 7 8 11" />
              <polyline points="16 3 20 7 16 11" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="12" y1="13" x2="12" y2="21" />
            </svg>
          </button>
          <button
            type="button"
            class="vuefinder__image-editor__icon-btn"
            :class="{ 'vuefinder__image-editor__icon-btn--active': pendingFlipY }"
            :title="t('Flip vertical')"
            @click="toggleFlipY"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 8 7 4 11 8" />
              <polyline points="3 16 7 20 11 16" />
              <line x1="7" y1="4" x2="7" y2="20" />
              <line x1="13" y1="12" x2="21" y2="12" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          class="vuefinder__image-editor__apply"
          :disabled="applying || !rotateHasPending"
          @click="applyRotate"
        >
          {{ t('Apply') }}
        </button>
      </div>
    </div>

    <!-- GRAYSCALE -->
    <div v-else-if="activeTab === 'grayscale'" class="vuefinder__image-editor__panel">
      <div class="vuefinder__image-editor__stage">
        <img
          class="vuefinder__image-editor__preview"
          :src="props.src"
          :style="grayscaleOn ? { filter: 'grayscale(1)' } : {}"
          :alt="props.filename"
        />
      </div>
      <div class="vuefinder__image-editor__controls">
        <label class="vuefinder__image-editor__toggle">
          <input v-model="grayscaleOn" type="checkbox" />
          <span>{{ t('Grayscale') }}</span>
        </label>
        <button
          type="button"
          class="vuefinder__image-editor__apply"
          :disabled="applying || !grayscaleHasPending"
          @click="applyGrayscale"
        >
          {{ t('Apply') }}
        </button>
      </div>
    </div>

    <!-- ADJUST -->
    <div v-else class="vuefinder__image-editor__panel">
      <div class="vuefinder__image-editor__stage">
        <img
          class="vuefinder__image-editor__preview"
          :src="props.src"
          :style="{ filter: adjustFilter }"
          :alt="props.filename"
        />
      </div>
      <div class="vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked">
        <div class="vuefinder__image-editor__slider">
          <label
            >{{ t('Brightness') }}<span>{{ brightness }}</span></label
          >
          <input v-model.number="brightness" type="range" min="-100" max="100" step="1" />
        </div>
        <div class="vuefinder__image-editor__slider">
          <label
            >{{ t('Contrast') }}<span>{{ contrast }}</span></label
          >
          <input v-model.number="contrast" type="range" min="-100" max="100" step="1" />
        </div>
        <div class="vuefinder__image-editor__slider">
          <label
            >{{ t('Saturation') }}<span>{{ saturation }}</span></label
          >
          <input v-model.number="saturation" type="range" min="-100" max="100" step="1" />
        </div>
        <div class="vuefinder__image-editor__row">
          <button type="button" class="vuefinder__image-editor__reset" @click="resetAdjust">
            {{ t('Reset') }}
          </button>
          <button
            type="button"
            class="vuefinder__image-editor__apply"
            :disabled="applying || !adjustHasPending"
            @click="applyAdjust"
          >
            {{ t('Apply') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
