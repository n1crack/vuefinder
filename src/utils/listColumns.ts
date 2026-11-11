import type { DirEntry, ListColumn, ListColumnDef } from '../types';

export interface ResolvedListColumn {
  key: string;
  label: string;
  width: string;
  align: 'left' | 'center' | 'right';
  /** Sort column id passed to `fs.toggleSort`, or `null` when the column is not sortable. */
  sortKey: string | null;
  /** Value getter for custom sort columns. Built-in columns sort by the DirEntry field in `sortKey`. */
  sortValue?: (item: DirEntry) => unknown;
  /** Cell text for an entry. */
  format: (item: DirEntry) => string;
}

export interface ResolvedListColumns {
  columns: ResolvedListColumn[];
  /** Value for the CSS `grid-template-columns` shared by the header and every row (Name column included). */
  gridTemplate: string;
}

export const DEFAULT_LIST_COLUMN_WIDTH = '8rem';

const toText = (value: unknown): string =>
  value === null || value === undefined ? '' : String(value);

const builtinColumn = (
  name: 'size' | 'date',
  filesize: (bytes: number) => string
): ResolvedListColumn =>
  name === 'size'
    ? {
        key: 'size',
        label: 'Size',
        width: '6rem',
        align: 'center',
        sortKey: 'file_size',
        format: (item) => (item.file_size ? filesize(item.file_size) : ''),
      }
    : {
        key: 'date',
        label: 'Date',
        width: '12rem',
        align: 'left',
        sortKey: 'last_modified',
        format: (item) =>
          item.last_modified ? new Date(item.last_modified * 1000).toLocaleString() : '',
      };

const customColumn = (column: ListColumn): ResolvedListColumn => ({
  key: column.key,
  label: column.label,
  width: column.width ?? DEFAULT_LIST_COLUMN_WIDTH,
  align: column.align ?? 'left',
  sortKey: column.sortable ? `column:${column.key}` : null,
  sortValue: column.sortable ? (column.sortValue ?? column.value) : undefined,
  format: (item) => toText(column.value(item)),
});

/**
 * Normalizes the `listColumns` prop: expands built-in column names, applies
 * defaults to custom columns and builds the shared grid template.
 * Unknown names, entries without a key and repeated keys (first one wins) are ignored.
 */
export function resolveListColumns(
  defs: ListColumnDef[],
  filesize: (bytes: number) => string
): ResolvedListColumns {
  const seen = new Set<string>();
  const columns: ResolvedListColumn[] = [];

  for (const def of defs) {
    let column: ResolvedListColumn | null = null;
    if (def === 'size' || def === 'date') {
      column = builtinColumn(def, filesize);
    } else if (def && typeof def === 'object' && def.key) {
      column = customColumn(def);
    }
    if (!column || seen.has(column.key)) continue;
    seen.add(column.key);
    columns.push(column);
  }

  return {
    columns,
    gridTemplate: ['minmax(0, 1fr)', ...columns.map((c) => c.width)].join(' '),
  };
}

/** Maps custom sort column ids to their value getters (see `fs.setSortAccessors`). */
export function sortAccessorsOf({
  columns,
}: ResolvedListColumns): Record<string, (item: DirEntry) => unknown> {
  const accessors: Record<string, (item: DirEntry) => unknown> = {};
  for (const column of columns) {
    if (column.sortKey && column.sortValue) accessors[column.sortKey] = column.sortValue;
  }
  return accessors;
}
