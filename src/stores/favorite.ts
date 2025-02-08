import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<{ [key: string]: boolean }>(getSaved())

  function toggleFavorite(url: string) {
    favorites.value[url] = !favorites.value[url]
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function isFavorited(url: string) {
    return favorites.value[url]
  }

  return { toggleFavorite, favorites, isFavorited }
})

function getSaved() {
  const saved = localStorage.getItem('favorites')
  if (!saved) {
    return {}
  }
  let parsed
  try {
    parsed = JSON.parse(saved)
  } catch (e) {
    console.error(e)
    return {}
  }

  if (!parsed) {
    return {}
  }

  return parsed as { [key: string]: boolean }
}
