import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { useApiStore } from '../api'

describe('api store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('getResources', async () => {
    global.fetch = vi.fn(async () => ({
      json: async () => ({
        results: [{ url: 'bar' }],
      }),
    })) as Mock

    const store = useApiStore()
    const response = await store.getResources('starships', 1)
    expect(Array.isArray(response.results)).toBe(true)
  })

  it('getResource', async () => {
    const resource = { url: 'bar' }
    global.fetch = vi.fn(async () => ({
      json: async () => resource,
    })) as Mock

    const store = useApiStore()
    const response = await store.getResource('starships', 1)
    expect(response).toBe(resource)
  })

  it('caches api calls', async () => {
    global.fetch = vi.fn(async () => ({
      json: async () => ({
        results: [{ url: 'bar' }],
      }),
    })) as Mock

    const store = useApiStore()

    await store.getResources('starships', 1)

    expect(global.fetch).toBeCalledTimes(1)

    await store.getResources('starships', 1)

    expect(global.fetch).toBeCalledTimes(1)
  })
})
