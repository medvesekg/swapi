import { describe, it, expect, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import FavoriteStar from '../FavoriteStar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoriteStore } from '@/stores/favorite'

describe('FavoriteStar', () => {
  it('toggles the favorite in the store when clicked', async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    const wrapper = mount(FavoriteStar, {
      props: {
        url: 'abc',
      },
      global: {
        plugins: [pinia],
      },
    })
    wrapper.trigger('click')

    await flushPromises()

    const store = useFavoriteStore()
    expect(store.toggleFavorite).toHaveBeenCalledWith('abc')
  })
})
