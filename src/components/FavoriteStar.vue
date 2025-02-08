<script setup lang="ts">
import { useFavoriteStore } from '@/stores/favorite'

defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { toggleFavorite, isFavorited } = useFavoriteStore()
</script>
<template>
  <i
    v-if="isFavorited(url)"
    class="bi bi-star-fill text-warning cursor-pointer"
    @click="toggleFavorite(url)"
  />
  <i v-else class="bi bi-star text-warning cursor-pointer" @click="toggleFavorite(url)" />
</template>
