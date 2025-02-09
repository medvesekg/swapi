<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<template>
  <div style="position: relative">
    <div v-if="loading" class="overlay" data-test="overlay">
      <div class="center-absolute center-absolute-x">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<style scoped>
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0 0 0 / 0.05);
}
</style>
