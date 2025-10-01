import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VueFinder from '../components/VueFinder.vue'

describe('VueFinder', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(VueFinder)
    expect(wrapper.exists()).toBe(true)
  })
})
