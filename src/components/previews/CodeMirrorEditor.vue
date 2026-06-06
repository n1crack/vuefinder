<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { EditorState, Compartment, type Extension } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { useApp } from '../../composables/useApp';

defineOptions({ name: 'CodeMirrorEditor' });

const props = defineProps<{
  modelValue: string;
  readonly?: boolean;
  filename?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const app = useApp();
const { t } = app.i18n;

const WRAP_STORAGE_KEY = 'vuefinder:codemirror-wrap';

const readStoredWrap = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(WRAP_STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1';
  } catch {
    return true;
  }
};

const writeStoredWrap = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(WRAP_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore (private mode / quota)
  }
};

const container = ref<HTMLDivElement | null>(null);
const wrap = ref(readStoredWrap());
let view: EditorView | null = null;
const readonlyCompartment = new Compartment();
const languageCompartment = new Compartment();
const wrapCompartment = new Compartment();

// Cache resolved language extensions by extension key so navigation between
// files of the same type doesn't re-import the language package.
const languageCache = new Map<string, Extension>();

function extensionFor(filename: string): string {
  const name = filename.split('/').pop() ?? '';
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i + 1).toLowerCase() : '';
}

async function loadLanguage(ext: string): Promise<Extension> {
  const cached = languageCache.get(ext);
  if (cached) return cached;

  let resolved: Extension = [];
  switch (ext) {
    case 'json':
    case 'jsonc':
    case 'lock': {
      const { json } = await import('@codemirror/lang-json');
      resolved = json();
      break;
    }
    case 'js':
    case 'mjs':
    case 'cjs': {
      const { javascript } = await import('@codemirror/lang-javascript');
      resolved = javascript();
      break;
    }
    case 'jsx': {
      const { javascript } = await import('@codemirror/lang-javascript');
      resolved = javascript({ jsx: true });
      break;
    }
    case 'ts': {
      const { javascript } = await import('@codemirror/lang-javascript');
      resolved = javascript({ typescript: true });
      break;
    }
    case 'tsx': {
      const { javascript } = await import('@codemirror/lang-javascript');
      resolved = javascript({ typescript: true, jsx: true });
      break;
    }
    case 'vue':
    case 'svelte':
    case 'html':
    case 'htm': {
      const { html } = await import('@codemirror/lang-html');
      resolved = html();
      break;
    }
    case 'css':
    case 'scss':
    case 'sass':
    case 'less': {
      const { css } = await import('@codemirror/lang-css');
      resolved = css();
      break;
    }
    case 'md':
    case 'markdown': {
      const { markdown } = await import('@codemirror/lang-markdown');
      resolved = markdown();
      break;
    }
    case 'yml':
    case 'yaml': {
      const { yaml } = await import('@codemirror/lang-yaml');
      resolved = yaml();
      break;
    }
    case 'xml':
    case 'svg': {
      const { xml } = await import('@codemirror/lang-xml');
      resolved = xml();
      break;
    }
    default:
      resolved = [];
  }
  languageCache.set(ext, resolved);
  return resolved;
}

function baseExtensions(): Extension[] {
  return [
    lineNumbers(),
    highlightActiveLineGutter(),
    history(),
    foldGutter(),
    indentOnInput(),
    bracketMatching(),
    highlightSelectionMatches(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap, ...searchKeymap, indentWithTab]),
    EditorView.updateListener.of((update) => {
      if (!update.docChanged) return;
      const next = update.state.doc.toString();
      if (next !== props.modelValue) emit('update:modelValue', next);
    }),
  ];
}

const wrapExtension = (enabled: boolean): Extension => (enabled ? EditorView.lineWrapping : []);

const toggleWrap = () => {
  wrap.value = !wrap.value;
  writeStoredWrap(wrap.value);
  view?.dispatch({ effects: wrapCompartment.reconfigure(wrapExtension(wrap.value)) });
};

onMounted(async () => {
  if (!container.value) return;

  const language = props.filename ? await loadLanguage(extensionFor(props.filename)) : [];

  const state = EditorState.create({
    doc: props.modelValue ?? '',
    extensions: [
      ...baseExtensions(),
      readonlyCompartment.of(EditorState.readOnly.of(!!props.readonly)),
      languageCompartment.of(language),
      wrapCompartment.of(wrapExtension(wrap.value)),
    ],
  });

  view = new EditorView({ state, parent: container.value });
});

watch(
  () => props.readonly,
  (next) => {
    view?.dispatch({
      effects: readonlyCompartment.reconfigure(EditorState.readOnly.of(!!next)),
    });
  }
);

watch(
  () => props.filename,
  async (next) => {
    if (!view) return;
    const ext = next ? extensionFor(next) : '';
    const language = ext ? await loadLanguage(ext) : [];
    view.dispatch({ effects: languageCompartment.reconfigure(language) });
  }
);

// Sync external doc changes (different file opened, save round-trip, …) into
// the editor while leaving user-side edits unbothered.
watch(
  () => props.modelValue,
  (next) => {
    if (!view) return;
    const current = view.state.doc.toString();
    if (next === current) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: next ?? '' },
    });
  }
);

onBeforeUnmount(() => {
  view?.destroy();
  view = null;
});
</script>

<template>
  <div class="vuefinder__codemirror-wrapper">
    <button
      type="button"
      class="vuefinder__codemirror-wrap-toggle"
      :class="{ 'vuefinder__codemirror-wrap-toggle--active': wrap }"
      :title="wrap ? t('Word wrap on — click to disable') : t('Word wrap off — click to enable')"
      :aria-label="t('Toggle word wrap')"
      :aria-pressed="wrap"
      @click="toggleWrap"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M3 12h13a4 4 0 010 8h-3" />
        <polyline points="16,16 13,20 16,24" />
        <path d="M3 18h6" />
      </svg>
    </button>
    <div
      ref="container"
      class="vuefinder__codemirror-editor"
      :class="{ 'vuefinder__codemirror-editor--readonly': readonly }"
    ></div>
  </div>
</template>
