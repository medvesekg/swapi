<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="py-3 position-relative">
          <BackButton class="position-absolute center-absolute-y" />
          <h1 class="text-center"><slot name="title"></slot></h1>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
