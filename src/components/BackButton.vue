<script setup lang="ts">
import { useRouteOneLevelBack } from '@/composables/routeOneLevelBack'

const { routeOneLevelBack } = useRouteOneLevelBack()
</script>
<template>
  <RouterLink v-if="routeOneLevelBack" :to="routeOneLevelBack" style="font-size: 1.5rem"
    ><i class="bi bi-arrow-left"
  /></RouterLink>
</template>
