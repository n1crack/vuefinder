import type { Emitter } from 'mitt';
import type { DirEntry } from '../types';
import type { FileOperationResult } from '../adapters/types';

export interface Cancelable {
  /** Set to true once a handler calls preventDefault(). */
  defaultPrevented: boolean;
  /** Cancel the default operation (the caller checks defaultPrevented). */
  preventDefault(): void;
}

export type CancelableEvent<T> = T & Cancelable;

/**
 * Wrap a payload so plugin handlers can cancel the pending operation.
 * Mirrors the double-click pattern in useItemOperations.ts.
 */
export function createCancelableEvent<T extends object>(payload: T): CancelableEvent<T> {
  return {
    ...payload,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
  };
}

/**
 * Typed lifecycle hook map. `before*` hooks are cancelable; `after*` hooks
 * fire on success. Plugins subscribe via `ctx.hooks.on`; the UI/operations
 * dispatch via the hook bus.
 */
export interface VfHooks {
  beforeDelete: CancelableEvent<{ items: DirEntry[] }>;
  afterDelete: { items: DirEntry[] };
  beforeUpload: CancelableEvent<{ files: File[]; target: string }>;
  /** `files` are the uploaded file names (mirrors vf-upload-complete). */
  afterUpload: { files: string[] };
  beforeArchive: CancelableEvent<{ items: DirEntry[] }>;
  afterArchive: { result: FileOperationResult };
  beforeUnarchive: CancelableEvent<{ items: DirEntry[] }>;
  afterUnarchive: { result: FileOperationResult };
  beforeRename: CancelableEvent<{ item: DirEntry; name: string }>;
  afterRename: { result: FileOperationResult };
  beforeCreate: CancelableEvent<{ name: string; kind: 'file' | 'folder' }>;
  afterCreate: { result: FileOperationResult; kind: 'file' | 'folder' };
  beforeCopy: CancelableEvent<{ items: DirEntry[]; to: DirEntry }>;
  afterCopy: { result: FileOperationResult };
  beforeMove: CancelableEvent<{ items: DirEntry[]; to: DirEntry }>;
  afterMove: { result: FileOperationResult };
  modalOpen: { key: string | null };
  modalClose: { key: string | null };
}

/** Prefix used so hook events don't collide with the existing vf-* events. */
const NS = 'vf-hook:';

/**
 * Emit a hook directly on the emitter, for callers that have the emitter but
 * not the bus instance (e.g. useModal, created before the PluginManager).
 */
export function emitHook<K extends keyof VfHooks>(
  emitter: Emitter<Record<string, unknown>>,
  event: K,
  payload: VfHooks[K]
): VfHooks[K] {
  emitter.emit(NS + event, payload as unknown);
  return payload;
}

export type HookBus = ReturnType<typeof createHookBus>;

/**
 * Typed wrapper over the existing mitt emitter. Composes with the rest of the
 * event bus; subscriptions return an unsubscribe fn for cleanup.
 */
export function createHookBus(emitter: Emitter<Record<string, unknown>>) {
  const on = <K extends keyof VfHooks>(
    event: K,
    handler: (payload: VfHooks[K]) => void
  ): (() => void) => {
    const wrapped = handler as (payload: unknown) => void;
    emitter.on(NS + event, wrapped);
    return () => emitter.off(NS + event, wrapped);
  };

  /** Emit a hook and return the (possibly mutated) payload. */
  const dispatch = <K extends keyof VfHooks>(event: K, payload: VfHooks[K]): VfHooks[K] => {
    emitter.emit(NS + event, payload as unknown);
    return payload;
  };

  return { on, dispatch };
}
