import { describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import BackButton from '@/components/BackButton.vue'
import router from '@/router'

describe('BackButton', () => {
  it('navigates one level back', async () => {
    router.push('/a/b/c')
    await router.isReady()
    const wrapper = mount(BackButton, {
      global: {
        plugins: [router],
      },
    })
    wrapper.trigger('click')

    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/a/b')
  })
})

function wait(timeout: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
