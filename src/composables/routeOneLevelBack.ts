import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteOneLevelBack() {
  const route = useRoute()

  const routeOneLevelBack = computed(() => {
    const splitRoute = route.fullPath.split('/').filter((part) => part)
    if (!splitRoute.length) {
      return null
    }
    const back = splitRoute.slice(0, -1).join('/')
    return '/' + back
  })

  return {
    routeOneLevelBack,
  }
}
