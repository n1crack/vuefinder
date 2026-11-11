import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { atom } from 'nanostores';
import { reactive, computed } from 'vue';
import ExplorerHeader from '../components/ExplorerHeader.vue';
import FileItem from '../components/FileItem.vue';
import { registerApp, unregisterApp, ServiceContainerIdKey } from '../composables/useApp';
import { createFilesStore } from '../stores/files';
import { resolveListColumns, sortAccessorsOf } from '../utils/listColumns';
import type { App, DirEntry, ListColumnDef } from '../types';

const filesize = (bytes: number) => `${bytes} B`;

const entry = (basename: string, extra: Record<string, unknown> = {}): DirEntry =>
  ({
    dir: 'local://',
    basename,
    extension: '',
    path: `local://${basename}`,
    storage: 'local',
    type: 'file',
    file_size: null,
    last_modified: null,
    mime_type: null,
    visibility: 'public',
    ...extra,
  }) as DirEntry;

describe('resolveListColumns', () => {
  it('expands built-in column names', () => {
    const { columns, gridTemplate } = resolveListColumns(['size', 'date'], filesize);
    expect(columns.map((c) => [c.key, c.sortKey])).toEqual([
      ['size', 'file_size'],
      ['date', 'last_modified'],
    ]);
    expect(gridTemplate).toBe('minmax(0, 1fr) 6rem 12rem');
    expect(columns[0]!.format(entry('a', { file_size: 2048 }))).toBe('2048 B');
    expect(columns[0]!.format(entry('a'))).toBe('');
    expect(columns[1]!.format(entry('a', { last_modified: 0 }))).toBe('');
    expect(columns[1]!.format(entry('a', { last_modified: 1700000000 }))).toBe(
      new Date(1700000000 * 1000).toLocaleString()
    );
  });

  it('applies defaults to custom columns', () => {
    const { columns, gridTemplate } = resolveListColumns(
      [{ key: 'owner', label: 'Owner', value: (i) => (i as any).owner }],
      filesize
    );
    expect(columns[0]).toMatchObject({
      key: 'owner',
      label: 'Owner',
      width: '8rem',
      align: 'left',
      sortKey: null,
    });
    expect(gridTemplate).toBe('minmax(0, 1fr) 8rem');
    expect(columns[0]!.format(entry('a', { owner: 'root' }))).toBe('root');
    expect(columns[0]!.format(entry('a'))).toBe('');
  });

  it('renders falsy but defined values', () => {
    const { columns } = resolveListColumns(
      [{ key: 'n', label: 'N', value: (i) => (i as any).n }],
      filesize
    );
    expect(columns[0]!.format(entry('a', { n: 0 }))).toBe('0');
    expect(columns[0]!.format(entry('a', { n: false }))).toBe('false');
  });

  it('ignores unknown names, keyless entries and repeated keys', () => {
    const defs = [
      'size',
      'nope',
      { label: 'No key', value: () => '' },
      { key: 'size', label: 'Duplicate', value: () => 'x' },
      { key: 'a', label: 'A', value: () => 'first' },
      { key: 'a', label: 'A2', value: () => 'second' },
    ] as unknown as ListColumnDef[];
    const { columns } = resolveListColumns(defs, filesize);
    expect(columns.map((c) => c.key)).toEqual(['size', 'a']);
    expect(columns[1]!.label).toBe('A');
  });

  it('honours custom width and sortable columns', () => {
    const resolved = resolveListColumns(
      [
        { key: 'mode', label: 'Mode', value: () => '', width: '90px', sortable: true },
        {
          key: 'owner',
          label: 'Owner',
          value: () => 'display',
          sortable: true,
          sortValue: () => 'sort',
        },
      ],
      filesize
    );
    expect(resolved.gridTemplate).toBe('minmax(0, 1fr) 90px 8rem');
    expect(resolved.columns.map((c) => c.sortKey)).toEqual(['column:mode', 'column:owner']);
    const accessors = sortAccessorsOf(resolved);
    expect(Object.keys(accessors)).toEqual(['column:mode', 'column:owner']);
    expect(accessors['column:owner']!(entry('a'))).toBe('sort');
  });
});

describe('files store custom sort columns', () => {
  const names = (fs: ReturnType<typeof createFilesStore>) =>
    fs.sortedFiles.get().map((f) => f.basename);

  it('sorts by a registered accessor in both directions', () => {
    const fs = createFilesStore();
    fs.setFiles([
      entry('a', { rank: 10 }),
      entry('b', { rank: 2 }),
      entry('c', { rank: 33 }),
    ]);
    fs.setSortAccessors({ 'column:rank': (i) => (i as any).rank });

    fs.toggleSort('column:rank');
    expect(names(fs)).toEqual(['b', 'a', 'c']);
    fs.toggleSort('column:rank');
    expect(names(fs)).toEqual(['c', 'a', 'b']);
  });

  it('re-sorts when the accessors change', () => {
    const fs = createFilesStore();
    fs.setFiles([entry('a', { x: 2, y: 1 }), entry('b', { x: 1, y: 2 })]);
    fs.setSort('column:v', 'asc');
    fs.setSortAccessors({ 'column:v': (i) => (i as any).x });
    expect(names(fs)).toEqual(['b', 'a']);
    fs.setSortAccessors({ 'column:v': (i) => (i as any).y });
    expect(names(fs)).toEqual(['a', 'b']);
  });

  it('still sorts built-in columns by DirEntry field', () => {
    const fs = createFilesStore();
    fs.setFiles([entry('a', { file_size: 5 }), entry('b', { file_size: 1 })]);
    fs.setSort('file_size', 'asc');
    expect(names(fs)).toEqual(['b', 'a']);
  });
});

describe('list column components', () => {
  const APP_ID = 'list-columns-test';

  afterEach(() => unregisterApp(APP_ID));

  function setup(listColumns: ListColumnDef[] | undefined) {
    const fs = createFilesStore();
    const app = reactive({
      fs,
      i18n: { t: (key: string) => (key === 'Owner' ? 'Besitzer' : key) },
      config: {
        state: atom({ listIconSize: 16, pinnedFolders: [] }),
        get: () => [],
      },
      features: {},
      filesize,
      selectionFilterType: 'both',
      selectionFilterMimeIncludes: [],
      listColumns: computed(() => (listColumns ? resolveListColumns(listColumns, filesize) : null)),
    }) as unknown as App;
    registerApp(APP_ID, app);
    return { app, fs, global: { provide: { [ServiceContainerIdKey as symbol]: APP_ID } } };
  }

  const owner: ListColumnDef = {
    key: 'owner',
    label: 'Owner',
    value: (i) => (i as any).owner,
    sortable: true,
    width: '100px',
    align: 'right',
  };
  const plain: ListColumnDef = { key: 'mode', label: 'Mode', value: (i) => (i as any).mode };

  it('header keeps the default Name / Size / Date layout without listColumns', () => {
    const { global } = setup(undefined);
    const wrapper = mount(ExplorerHeader, { global });
    expect(wrapper.attributes('style')).toBeUndefined();
    expect(wrapper.text()).toMatch(/Name\s*Size\s*Date/);
  });

  it('header renders the configured columns with translated labels', () => {
    const { global } = setup(['size', owner, plain]);
    const wrapper = mount(ExplorerHeader, { global });
    expect(wrapper.attributes('style')).toContain('grid-template-columns: minmax(0, 1fr) 6rem 100px 8rem');
    expect(wrapper.text()).toMatch(/Name\s*Size\s*Besitzer\s*Mode/);
    expect(wrapper.text()).not.toContain('Date');
  });

  it('clicking a sortable header sorts by it, a non-sortable one does nothing', async () => {
    const { fs, global } = setup([owner, plain]);
    fs.setFiles([entry('a', { owner: 'zed' }), entry('b', { owner: 'amy' })]);
    fs.setSortAccessors(sortAccessorsOf(resolveListColumns([owner, plain], filesize)));
    const wrapper = mount(ExplorerHeader, { global });

    await wrapper.find('[data-column="mode"]').trigger('click');
    expect(fs.sort.get().active).toBe(false);

    await wrapper.find('[data-column="owner"]').trigger('click');
    expect(fs.sort.get()).toMatchObject({ active: true, column: 'column:owner', order: 'asc' });
    expect(fs.sortedFiles.get().map((f) => f.basename)).toEqual(['b', 'a']);
  });

  const mountItem = (global: object, slots = {}) =>
    mount(FileItem, {
      props: { item: entry('a.txt', { file_size: 12, owner: 'root', mode: 0 }), view: 'list', explorerId: 'x' },
      global: { ...global, stubs: { ItemIcon: true } },
      slots,
    });

  it('row renders one cell per configured column', () => {
    const { global } = setup(['size', owner, plain]);
    const wrapper = mountItem(global);
    expect(wrapper.find('.vuefinder__explorer__item-list-content').attributes('style')).toContain(
      'grid-template-columns: minmax(0, 1fr) 6rem 100px 8rem'
    );
    const cells = wrapper.findAll('.vuefinder__explorer__item-cell');
    expect(cells.map((c) => c.attributes('data-column'))).toEqual(['size', 'owner', 'mode']);
    expect(cells.map((c) => c.text())).toEqual(['12 B', 'root', '0']);
    expect(cells[1]!.classes()).toContain('vuefinder__explorer__cell--right');
    expect(wrapper.find('.vuefinder__explorer__item-date').exists()).toBe(false);
  });

  it('row exposes the list-cell slot', () => {
    const { global } = setup([owner]);
    const wrapper = mountItem(global, {
      'list-cell': `<template #list-cell="{ item, column, value }"><b>{{ column }}:{{ value }}:{{ item.basename }}</b></template>`,
    });
    expect(wrapper.find('[data-column="owner"]').html()).toContain('<b>owner:root:a.txt</b>');
  });

  it('row keeps the default Size / Date cells without listColumns', () => {
    const { global } = setup(undefined);
    const wrapper = mount(FileItem, {
      props: {
        item: entry('a.txt', { file_size: 12, last_modified: 1700000000 }),
        view: 'list',
        explorerId: 'x',
      },
      global: { ...global, stubs: { ItemIcon: true } },
    });
    expect(wrapper.find('.vuefinder__explorer__item-size').text()).toBe('12 B');
    expect(wrapper.find('.vuefinder__explorer__item-date').exists()).toBe(true);
    expect(wrapper.find('.vuefinder__explorer__item-cell').exists()).toBe(false);
  });
});
