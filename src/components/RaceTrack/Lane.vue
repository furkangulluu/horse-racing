<template>
  <div class="lane flex items-center" ref="laneRef" :data-lane="props.laneNo">
    <div
      class="horse overflow-hidden"
      :class="{ running: props.horse.run }"
      :style="{
        color: horse.color,
        'margin-left': props.horse.travelledDistance + 'px',
      }"
    >
      🐎
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { IHorse } from "@/models/Horse";

const props = defineProps({
  horse: {
    type: Object as PropType<IHorse>,
    required: true,
  },
  laneNo: {
    type: Number,
    default: 0,
  },
});

const color = ref(props.horse.color);
</script>

<style lang="scss">
.lane {
  position: relative;
  height: 50px;
  max-width: 100vw;

  & .horse {
    position: relative;
    transition: all 0.15s ease-in-out;
    font: 50px Muybridge;

    &.running {
      animation: 1s linear infinite Gallop;
    }
  }

  &::before {
    position: absolute;
    content: attr(data-lane);
    top: 50%;
    transform: translateY(-50%);
    height: 43px;
    width: 15px;
    margin-left: -20px;
    background-color: rgb(26, 230, 43);
    color: var(--color-white);
    font-size: small;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    right: 20px;
    height: 90%;
    width: 10px;
    transform: translateY(-50%);
    z-index: 0;
    background-color: var(--color-white);
    background-size: 5px 5px;
    background-image: repeating-linear-gradient(
      45deg,
      #222226 0,
      #222226 0.5px,
      #ffffff 0,
      #ffffff 50%
    );
  }
}

@keyframes Gallop {
  from {
    font-variation-settings: "TIME" 0;
  }
  to {
    font-variation-settings: "TIME" 15;
  }
}
</style>
