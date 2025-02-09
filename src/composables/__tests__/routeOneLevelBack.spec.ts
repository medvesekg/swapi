import { expect, it, vi } from 'vitest'
import { describe } from 'vitest'
import { useRouteOneLevelBack } from '../routeOneLevelBack'

describe('routeOneLevelBack', () => {
  vi.mock('vue-router', () => ({
    useRoute: () => ({
      fullPath: '/first/second',
    }),
  }))

  it('returns route one level back', async () => {
    const { routeOneLevelBack } = useRouteOneLevelBack()
    expect(routeOneLevelBack.value).toBe('/first')

    vi.clearAllMocks()
  })
})
