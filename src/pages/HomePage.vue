<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { RouteConfig } from '@/router/config'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  routes: {
    type: Array as PropType<RouteConfig[]>,
    required: true,
  },
})
</script>
<template>
  <DefaultLayout>
    <template #title>Star Wars</template>
    <div class="d-flex align-items-center flex-column">
      <div class="d-flex flex-wrap gap-2 justify-content-center">
        <div class="card" v-for="(route, i) in routes" :key="i" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">
              {{ route.title }}
            </h5>
            <p class="card-text">
              {{ route.description }}
            </p>
            <RouterLink :to="route.path" class="btn btn-primary">Explore</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
