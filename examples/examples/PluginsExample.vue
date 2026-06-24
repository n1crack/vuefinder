<script setup lang="ts">
import { ArrayDriver } from '../../src/adapters';
import { demoPlugin } from './plugins/demoPlugin';

interface Props {
  // Inherited from the host playground but unused — this demo uses its own
  // in-memory driver so it works without a backend.
  driver?: unknown;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

// Seed an in-memory tree, including a /protected/ folder the plugin guards.
const now = Date.now();
const dir = (parent: string, name: string) => ({
  storage: 'memory',
  dir: parent,
  basename: name,
  extension: '',
  path: `${parent === 'memory://' ? 'memory://' : parent + '/'}${name}`,
  type: 'dir' as const,
  file_size: null,
  last_modified: now,
  mime_type: null,
  visibility: 'public' as const,
});
const file = (parent: string, name: string, size: number) => ({
  storage: 'memory',
  dir: parent,
  basename: name,
  extension: name.split('.').pop() || '',
  path: `${parent === 'memory://' ? 'memory://' : parent + '/'}${name}`,
  type: 'file' as const,
  file_size: size,
  last_modified: now,
  mime_type: 'text/plain',
  visibility: 'public' as const,
});
const memoryDriver = new ArrayDriver({
  storage: 'memory',
  files: [
    dir('memory://', 'documents'),
    dir('memory://', 'protected'),
    file('memory://', 'readme.txt', 12),
    file('memory://', 'notes.md', 34),
    file('memory://protected', 'secret.txt', 8),
  ],
});

const plugins = [demoPlugin];
const localConfig = { initialPath: 'memory://', persist: false };
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <p style="font-size: 13px; color: var(--vf-text-secondary, #666)">
      This in-memory instance loads a demo plugin. Try: select files and open
      <strong>Archive</strong> (compression field added in the modal body), open
      <strong>Delete</strong> (warning banner + try deleting the
      <code>memory://protected/secret.txt</code> item — blocked by a hook), and use the
      <strong>Log selection</strong> toolbar button (or ⌘⇧L).
    </p>
    <vue-finder
      id="plugins_demo_vuefinder"
      :driver="memoryDriver"
      :config="{ ...config, ...localConfig }"
      :features="features"
      :plugins="plugins"
    />
  </div>
</template>
