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

defineOptions({ name: 'CodeMirrorEditor' });

const props = defineProps<{
  modelValue: string;
  readonly?: boolean;
  filename?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const container = ref<HTMLDivElement | null>(null);
let view: EditorView | null = null;
const readonlyCompartment = new Compartment();
const languageCompartment = new Compartment();

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
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (!update.docChanged) return;
      const next = update.state.doc.toString();
      if (next !== props.modelValue) emit('update:modelValue', next);
    }),
  ];
}

onMounted(async () => {
  if (!container.value) return;

  const language = props.filename ? await loadLanguage(extensionFor(props.filename)) : [];

  const state = EditorState.create({
    doc: props.modelValue ?? '',
    extensions: [
      ...baseExtensions(),
      readonlyCompartment.of(EditorState.readOnly.of(!!props.readonly)),
      languageCompartment.of(language),
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
  <div ref="container" class="vuefinder__codemirror-editor"></div>
</template>
