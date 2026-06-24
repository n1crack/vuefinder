import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import { createModalRegistry } from '../plugins/modalRegistry';

const Dummy = defineComponent({ name: 'Dummy', render: () => null });

describe('modalRegistry', () => {
  it('recognizes built-in modal keys', () => {
    const reg = createModalRegistry();
    expect(reg.isModalKey('upload')).toBe(true);
    expect(reg.isModalKey('delete')).toBe(true);
    expect(reg.isModalKey('not-a-key')).toBe(false);
    expect(reg.isModalKey(Dummy)).toBe(false);
  });

  it('resolves built-in modals to a component', () => {
    const reg = createModalRegistry();
    expect(reg.resolve('upload')).toBeTruthy();
    expect(reg.resolve('delete')).toBeTruthy();
  });

  it('lets a plugin replace a modal component', () => {
    const reg = createModalRegistry();
    const original = reg.resolve('upload');
    reg.replace('upload', Dummy);
    expect(reg.resolve('upload')).toBe(Dummy);
    expect(reg.resolve('upload')).not.toBe(original);
    // Other modals are unaffected.
    expect(reg.resolve('delete')).not.toBe(Dummy);
  });

  it('collects region extensions in order', () => {
    const reg = createModalRegistry();
    expect(reg.getExtensions('archive', 'body-bottom')).toEqual([]);

    reg.addExtension('archive', 'body-bottom', { component: Dummy, order: 2 });
    reg.addExtension('archive', 'body-bottom', { component: Dummy, order: 1 });

    const exts = reg.getExtensions('archive', 'body-bottom');
    expect(exts).toHaveLength(2);
    expect(exts[0].order).toBe(1);
    expect(exts[1].order).toBe(2);
    expect(exts[0]._id).toBeTruthy();
    expect(exts[0]._id).not.toBe(exts[1]._id);
  });

  it('keeps regions and modals isolated', () => {
    const reg = createModalRegistry();
    reg.addExtension('archive', 'body-top', { component: Dummy });
    expect(reg.getExtensions('archive', 'body-bottom')).toEqual([]);
    expect(reg.getExtensions('delete', 'body-top')).toEqual([]);
  });
});
