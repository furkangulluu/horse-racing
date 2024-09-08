<template>
  <div v-if="actualRaceProgram.horses">
    <div
      class="bg-premium-navy flex justify-between text-gray-100 border rounded py-2 px-5"
    >
      <div>
        {{ `${actualRaceProgram.lap}. Lap (${actualRaceProgram.distance}m)` }}
      </div>
    </div>
    <div class="race-track relative border-2 p-4 pl-7 mt-2 divide-y-2">
      <template v-if="countdown > 0">
        <div
          class="overlay absolute flex flex-col justify-center items-center w-full h-full left-0 top-0 bg-white z-10"
          :class="{ 'bg-white pointer-events-none': countdown > 0 }"
        >
          <span class="text-xl font-bold">
            {{
              `${actualRaceProgram.lap}. Lap (${actualRaceProgram.distance}m)`
            }}
          </span>
          <div v-if="countdown > 0" class="space-x-1">
            <span>{{ $t("layout.raceTrack.countdown.startingIn") }}</span>
            <span>{{ countdown }} </span>
            <span>{{ $t("layout.raceTrack.countdown.sec") }}</span>
          </div>
        </div>
      </template>
      <template v-for="horse in actualRaceProgram.horses" :key="horse.lane">
        <Lane :horse="horse" :lane-no="horse.lane" class="z-0"></Lane>
      </template>
    </div>
  </div>
  <div v-else>
    <TitleHeader>{{ $t("layout.raceTrack.title") }}</TitleHeader>
    <NoContent>{{ $t("layout.raceTrack.noContent") }}</NoContent>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Lane from "@/components/RaceTrack/Lane.vue";
import TitleHeader from "@/components/Common/TitleHeader.vue";
import NoContent from "@/components/Common/NoContent.vue";

const store = useStore();

const actualRaceProgram = computed(() => store.getters.getActualRaceProgram);
const countdown = computed(() => store.getters.getCountdown);
</script>

<style lang="scss"></style>
