import { computed, inject, provide, shallowRef, watch, type ComputedRef, type InjectionKey } from 'vue';
import Fuse from 'fuse.js';
import type { App, TreeViewData, TreeViewFolder } from '../types';

export interface TreeSearchContext {
  /** Current (debounced) query string */
  query: ComputedRef<string>;
  /** Whether a non-empty query is active */
  isActive: ComputedRef<boolean>;
  /** Path is visible in the filtered tree (matched, ancestor of match, or descendant inside an open branch) */
  isVisible: (path: string) => boolean;
  /** Path is an ancestor of a match, and should be force-expanded */
  shouldForceExpand: (path: string) => boolean;
  /** Path itself matched the query (for highlight wrapping) */
  isMatch: (path: string) => boolean;
  /** Wrap matched substrings of `text` with a <span> for highlighting (returns plain text if no match). */
  highlight: (text: string) => string;
}

const TreeSearchKey: InjectionKey<TreeSearchContext> = Symbol('TreeSearchContext');

interface FlatNode extends TreeViewFolder {
  /** Parent paths from root → direct parent */
  ancestors: string[];
}

/**
 * Flatten the loaded tree starting from a virtual root (the storage roots) so we
 * can both Fuse-index it and compute ancestor sets.
 */
function flattenLoadedTree(
  treeViewData: TreeViewData[],
  storages: string[]
): FlatNode[] {
  // Build a lookup of path → folders for O(1) access
  const byPath = new Map<string, TreeViewFolder[]>();
  for (const entry of treeViewData) {
    byPath.set(entry.path, entry.folders ?? []);
  }

  const result: FlatNode[] = [];
  const walk = (parentPath: string, ancestors: string[]) => {
    const children = byPath.get(parentPath);
    if (!children) return;
    for (const child of children) {
      result.push({ ...child, ancestors });
      walk(child.path, [...ancestors, child.path]);
    }
  };

  for (const storage of storages) {
    walk(`${storage}://`, []);
  }
  return result;
}

/**
 * Escape a string for inclusion in a regular expression.
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Escape for safe inclusion as HTML text.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Provide tree-search context to descendant tree components.
 *
 * Builds a Fuse.js index over the currently-loaded tree nodes. The index is
 * rebuilt only when the loaded-tree shape changes (not on every keystroke).
 */
export function provideTreeSearch(
  app: App,
  rawQuery: { value: string },
  storagesRef: { value: string[] }
): TreeSearchContext {
  // shallowRef of Fuse index — recomputed only when the tree shape changes
  const fuseRef = shallowRef<Fuse<FlatNode> | null>(null);

  // Compute a cheap signature for the loaded tree so we rebuild the index only
  // when nodes are added/removed.
  const treeSignature = computed(() => {
    const td = app.treeViewData as TreeViewData[];
    let sig = '';
    for (const entry of td) {
      sig += entry.path + ':' + (entry.folders?.length ?? 0) + '|';
    }
    sig += '#' + storagesRef.value.join(',');
    return sig;
  });

  watch(
    treeSignature,
    () => {
      const nodes = flattenLoadedTree(
        app.treeViewData as TreeViewData[],
        storagesRef.value || []
      );
      fuseRef.value = new Fuse(nodes, {
        keys: ['basename', 'path'],
        threshold: 0.4,
        ignoreLocation: true,
        includeScore: false,
      });
    },
    { immediate: true }
  );

  const query = computed(() => rawQuery.value.trim());
  const isActive = computed(() => query.value.length > 0);

  // Sets of matched paths, ancestor paths, and visible (matched ∪ ancestor) paths
  const matchInfo = computed(() => {
    if (!isActive.value || !fuseRef.value) {
      return {
        matched: new Set<string>(),
        ancestors: new Set<string>(),
        visible: new Set<string>(),
      };
    }
    const results = fuseRef.value.search(query.value);
    const matched = new Set<string>();
    const ancestors = new Set<string>();
    for (const r of results) {
      const node = r.item;
      matched.add(node.path);
      for (const a of node.ancestors) ancestors.add(a);
    }
    const visible = new Set<string>([...matched, ...ancestors]);
    return { matched, ancestors, visible };
  });

  // Pre-compile a case-insensitive regex from the query for highlighting.
  const highlightRegex = computed(() => {
    if (!isActive.value) return null;
    const escaped = escapeRegExp(query.value);
    if (!escaped) return null;
    return new RegExp(`(${escaped})`, 'ig');
  });

  const context: TreeSearchContext = {
    query,
    isActive,
    isVisible: (path: string) => {
      if (!isActive.value) return true;
      return matchInfo.value.visible.has(path);
    },
    shouldForceExpand: (path: string) => {
      if (!isActive.value) return false;
      return matchInfo.value.ancestors.has(path);
    },
    isMatch: (path: string) => {
      if (!isActive.value) return false;
      return matchInfo.value.matched.has(path);
    },
    highlight: (text: string) => {
      const safe = escapeHtml(text);
      const re = highlightRegex.value;
      if (!re) return safe;
      return safe.replace(
        re,
        '<span class="vuefinder__treeview__search-highlight">$1</span>'
      );
    },
  };

  provide(TreeSearchKey, context);
  return context;
}

/**
 * Inject the tree-search context. Returns a no-op stub if no provider exists,
 * so the tree components keep working when search isn't wired up.
 */
export function useTreeSearch(): TreeSearchContext {
  const ctx = inject(TreeSearchKey, null);
  if (ctx) return ctx;
  const inactive = computed(() => false);
  const empty = computed(() => '');
  return {
    query: empty,
    isActive: inactive,
    isVisible: () => true,
    shouldForceExpand: () => false,
    isMatch: () => false,
    highlight: (text: string) => escapeHtml(text),
  };
}
