<template>
  <div class="rounded-full w-4 h-4" :style="{ backgroundColor: color }"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});
</script>
