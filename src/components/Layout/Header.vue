<template>
  <div
    class="header-wrapper flex items-center justify-between bg-premium-navy h-20 px-5"
  >
    <div class="text-gray-200 text-xl">{{ $t("layout.header.title") }}</div>
    <div class="flex">
      <ActionButton v-if="allRacesFinished" @click="clearTheRace">{{
        $t("layout.header.buttons.restart")
      }}</ActionButton>
      <ActionButton v-if="!isProgramPrepared" @click="generateProgram">{{
        $t("layout.header.buttons.generateProgram")
      }}</ActionButton>
      <ActionButton
        v-if="isStartRaceButtonVisible"
        @click="handleStartRace"
        class="bg-green-500 hover:bg-green-300"
      >
        {{ $t("layout.header.buttons.startRace") }}
      </ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import ActionButton from "@/components/Common/ActionButton.vue";
import { RACE_STATUS } from "@/constant/race";

const emits = defineEmits(["startFirstProgram"]);

const store = useStore();

const isProgramPrepared = computed(() => store.state.raceProgram.length);
const allRacesFinished = computed(
  () => store.state.raceStatus === RACE_STATUS.FINISHED
);
const isStartRaceButtonVisible = computed(
  () =>
    store.state.raceStatus !== RACE_STATUS.STARTED &&
    store.state.raceStatus !== RACE_STATUS.FINISHED &&
    isProgramPrepared.value
);

function generateProgram() {
  store.dispatch("generateRaceProgram");
}

function handleStartRace() {
  emits("startFirstProgram");
}

function clearTheRace() {
  store.dispatch("clearTheRace");
  store.dispatch("generateHorses");
}
</script>
