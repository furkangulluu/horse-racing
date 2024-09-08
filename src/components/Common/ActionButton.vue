<template>
  <div
    class="action-button flex justify-center items-center py-2 px-6 h-10 rounded-lg cursor-pointer ml-3 transition-all"
    :class="{
      'px-disabled': disabled || readonly,
      '!rounded-full': rounded,
      'bg-off-white hover:bg-gray-200 text-black': color === 'primary',
      'bg-premium-navy hover:opacity-80 text-gray-100': color === 'secondary',
    }"
    @click="emits('click')"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["click"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "primary",
  },
});
</script>
