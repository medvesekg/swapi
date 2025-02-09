<script setup lang="ts">
import type { ApiResource } from '@/types/api'
import { upperFirst } from 'lodash-es'
import { computed, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import FavoriteStar from './FavoriteStar.vue'

const route = useRoute()

const props = defineProps({
  columns: {
    type: Array as PropType<string[] | null>,
    required: false,
    default: null,
  },
  rows: {
    type: Array as PropType<ApiResource[]>,
    required: true,
  },
})

const tableColumns = computed(() => {
  return props.columns || (props.rows[0] ? Object.keys(props.rows[0]) : [])
})

function prettifyColumnName(name: string) {
  return upperFirst(name.replace(/_/, ' '))
}

function extractId(url: string) {
  const splitUrl = url.split('/').filter((p) => p)
  return splitUrl[splitUrl.length - 1]
}
</script>
<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="column in tableColumns" :key="column">{{ prettifyColumnName(column) }}</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(column, j) in columns" :key="column">
            <RouterLink v-if="j === 0" :to="`${route.fullPath}/${extractId(row.url)}`">
              {{ row[column] }}
            </RouterLink>
            <span v-else>
              {{ row[column] }}
            </span>
          </td>
          <td>
            <FavoriteStar :url="row.url" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
