import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoadingOverlay from '../LoadingOverlay.vue'

describe('LoadingOverlay', () => {
  it('renders its slot', async () => {
    const wrapper = mount(LoadingOverlay, {
      props: {
        loading: true,
      },
      slots: {
        default: '<div>content</div>',
      },
    })
    expect(wrapper.text()).toContain('content')
  })

  it('renders loading overlay if loading is true', async () => {
    const wrapper = mount(LoadingOverlay, {
      props: {
        loading: true,
      },
      slots: {
        default: '<div>content</div>',
      },
    })
    console.log(wrapper.find('.overlay'))
    expect(wrapper.find('.overlay').exists()).toBe(true)
  })

  it('does not render loading overlay if loading is false', async () => {
    const wrapper = mount(LoadingOverlay, {
      props: {
        loading: false,
      },
      slots: {
        default: '<div>content</div>',
      },
    })
    console.log(wrapper.find('.overlay'))
    expect(wrapper.find('.overlay').exists()).toBe(false)
  })
})
