<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { debounce } from 'lodash-es'
import { useApiStore } from '@/stores/api'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PaginationButtons from '@/components/PaginationButtons.vue'
import ListTable from '@/components/ListTable.vue'
import type { ApiResource } from '@/types/api'

const props = defineProps({
  apiPath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
})
const api = useApiStore()

const perPage = 10

const rows = ref<ApiResource[]>([])
const search = ref('')
const page = ref(1)
const lastRequest = ref<Promise<unknown> | null>(null)
const loading = ref(true)
const total = ref(0)

const prevPageExists = computed(() => page.value > 1)
const nextPageExists = computed(() => page.value < total.value / perPage)

watch(search, () => {
  page.value = 1
  fetchDataDebounced(page.value, search.value)
})

async function fetchData(page: number, search: string = '') {
  loading.value = true
  try {
    const request = api.getResources(props.apiPath, page, search)
    lastRequest.value = request
    const response = await request
    if (lastRequest.value === request) {
      rows.value = response.results
      total.value = response.count
    }
  } finally {
    loading.value = false
  }
}
const fetchDataDebounced = debounce(fetchData, 500)

function changePage(newPage: number) {
  page.value = newPage
  fetchData(newPage, search.value)
}

fetchData(page.value, search.value)
</script>
<template>
  <DefaultLayout>
    <template #title>{{ title }}</template>
    <div class="mb-1">
      <input v-model="search" type="text" class="form-control" placeholder="Search..." />
    </div>

    <LoadingOverlay :loading="loading">
      <ListTable :columns="fields" :rows="rows" />
    </LoadingOverlay>
    <PaginationButtons
      :current-page="page"
      :next-page-exists="nextPageExists"
      :prev-page-exists="prevPageExists"
      @page-changed="changePage"
    />
  </DefaultLayout>
</template>
