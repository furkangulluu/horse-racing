<template>
  <div class="table-card__card border-2">
    <div class="horse-list__card__header border-b p-2 bg-gray-100">
      <span>{{ title }}</span>
    </div>
    <table class="table-card__table w-full">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
