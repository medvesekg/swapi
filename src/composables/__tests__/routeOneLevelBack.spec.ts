import { it } from 'vitest'
import { describe } from 'vitest'
import { useRouteOneLevelBack } from '../routeOneLevelBack'

describe('routeOneLevelBack', () => {
  it('works', () => {
    const a = useRouteOneLevelBack()
    console.log(a)
  })
})
