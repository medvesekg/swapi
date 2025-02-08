import { describe, expect, it, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import ListTable from '../ListTable.vue'
import router from '@/router'
import { createTestingPinia } from '@pinia/testing'

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
})
