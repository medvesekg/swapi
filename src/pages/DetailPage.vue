<script setup lang="ts">
import { useApiStore } from '@/stores/api'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { lowerCase, upperFirst } from 'lodash-es'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const props = defineProps({
  apiPath: { type: String, required: true },
})

const route = useRoute()
const id = route.params.id as string
const apiStore = useApiStore()

const data = ref<{ [key: string]: unknown }>({})
apiStore.getResource(props.apiPath, id).then((resource) => (data.value = resource))

const shownFields = computed(() => {
  const exclude = ['created', 'edited', 'url']

  return Object.keys(data.value).filter((key) => {
    const value = data.value[key]
    return (
      !exclude.includes(key) &&
      !Array.isArray(data.value[key]) &&
      typeof value === 'string' &&
      !value.startsWith('https')
    )
  })
})
</script>
<template>
  <DefaultLayout>
    <template #title>{{ data.name }}</template>
    <div class="d-flex justify-content-center">
      <table class="table table-striped w-auto">
        <tbody>
          <tr v-for="field in shownFields" :key="field">
            <td class="text-end">
              <strong>{{ upperFirst(lowerCase(field)) }}</strong>
            </td>
            <td>{{ data[field] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DefaultLayout>
</template>
