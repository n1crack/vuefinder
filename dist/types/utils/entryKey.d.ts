import type { DirEntry, DirEntryType } from '../types';
/**
 * Unique identity for a directory entry used as the selection / clipboard /
 * drag key throughout the explorer.
 *
 * `path` alone is NOT unique: storage backends with virtual directories
 * (e.g. S3/R2) can expose a file and a folder that share the same path, so
 * keying on the bare path makes both entries collide — selecting one selects
 * both, and double-clicking the file navigates into the folder (issue #185).
 *
 * Combining the type with the path disambiguates them. The result is an opaque
 * key: it is only ever compared against other `entryKey()` values, never parsed
 * back into a path.
 */
export declare const entryKey: (entry: {
    type: DirEntryType;
    path: string;
} | DirEntry) => string;
