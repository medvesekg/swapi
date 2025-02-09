<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  nextPageExists: {
    type: Boolean,
    required: false,
    default: false,
  },
  prevPageExists: {
    type: Boolean,
    required: false,
    default: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const nextDisabled = computed(() => {
  return !props.nextPageExists || props.loading
})

const prevDisabled = computed(() => {
  return !props.prevPageExists || props.loading
})

const emit = defineEmits(['pageChanged'])
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        @click="!prevDisabled && emit('pageChanged', currentPage - 1)"
        class="page-item cursor-not-allowed"
        data-testid="prev"
        :class="{ disabled: prevDisabled }"
      >
        <a class="page-link" href="#">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" data-testid="current-page">{{ currentPage }}</a>
      </li>
      <li
        @click="!nextDisabled && emit('pageChanged', currentPage + 1)"
        class="page-item"
        data-testid="next"
        :class="{ disabled: nextDisabled }"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>
