import { describe, expect, it, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'

import ListTable from '../ListTable.vue'
import router from '@/router'
import { createTestingPinia } from '@pinia/testing'
import { RouterLink } from 'vue-router'

describe('ListTable', () => {
  it('Lists all rows', async () => {
    const wrapper = mount(ListTable, {
      props: {
        columns: ['a', 'b'],
        rows: [
          {
            url: '1',
            a: 'one',
            b: 'two',
          },
          {
            url: '2',
            a: 'three',
            b: 'four',
          },
        ],
      },
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.findAll('tbody>tr')).toHaveLength(2)
  })

  it('Pretty formats column names', async () => {
    const wrapper = mount(ListTable, {
      props: {
        columns: ['abc_def'],
        rows: [],
      },
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.text()).toContain('Abc def')
  })

  it('Creates a link to the details page', async () => {
    await router.isReady()
    router.push('test')
    await flushPromises()
    const wrapper = mount(ListTable, {
      props: {
        columns: ['a'],
        rows: [
          {
            a: 'a',
            url: 'http://api.com/1',
          },
        ],
      },
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.findComponent(RouterLink).props('to')).toBe('/test/1')
  })
})
