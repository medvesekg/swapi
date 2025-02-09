import { describe, expect, it } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'

import PaginationButtons from '../PaginationButtons.vue'

describe('PaginationButtons', () => {
  it('disables next button if next page does not exist', async () => {
    const wrapper = mount(PaginationButtons, {
      props: {
        currentPage: 2,
        nextPageExists: false,
        prevPageExists: true,
      },
    })
    expect(wrapper.find('[data-testid="next"]').classes().includes('disabled')).toBe(true)
  })

  it('disables prev button if next page does not exist', async () => {
    const wrapper = mount(PaginationButtons, {
      props: {
        currentPage: 2,
        nextPageExists: true,
        prevPageExists: false,
      },
    })
    expect(wrapper.find('[data-testid="prev"]').classes().includes('disabled')).toBe(true)
  })

  it('emits new page on prev', async () => {
    const wrapper = mount(PaginationButtons, {
      props: {
        currentPage: 2,
        nextPageExists: true,
        prevPageExists: true,
      },
    })
    wrapper.find('[data-testid="prev"]').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('pageChanged')?.[0]?.[0]).toBe(1)
  })

  it('emits new page on next', async () => {
    const wrapper = mount(PaginationButtons, {
      props: {
        currentPage: 2,
        nextPageExists: true,
        prevPageExists: true,
      },
    })
    wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('pageChanged')?.[0]?.[0]).toBe(3)
  })
})
