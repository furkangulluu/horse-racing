<template>
  <div class="header">
    <Header @startFirstProgram="startFirstProgram" />
  </div>
  <div class="content flex justify-center w-full p-5 gap-5">
    <div class="w-72">
      <HorseList />
    </div>
    <div class="w-6/12" ref="raceTrackAreaRef">
      <RaceTrack />
    </div>
    <div class="h-[750px] flex gap-5 overflow-y-scroll">
      <div class="w-72">
        <RaceProgram />
      </div>
      <div class="w-72">
        <RaceResult />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Header from "@/components/Layout/Header.vue";
import HorseList from "@/components/Layout/HorseList.vue";
import RaceTrack from "@/components/Layout/RaceTrack.vue";
import RaceProgram from "@/components/Layout/RaceProgram.vue";
import RaceResult from "@/components/Layout/RaceResult.vue";
import { RACE_STATUS } from "@/constant/race";
import { IHorse } from "@/models/Horse";

const store = useStore();

const raceTrackAreaRef = ref(null);

const handleStartRace = () => {
  store.commit("setRaceStatus", RACE_STATUS.STARTED);
  actionSpeedInterval();
  actionTravelledDistanceInterval();
};

function startFirstProgram() {
  store.commit("setCountdown", 3);
  countdown(() => handleStartRace(), store.getters.getCountdown);
}

function startNextProgram(nextLap: number) {
  store.dispatch("setNextProgram", nextLap);
  store.commit("setCountdown", 3);
  countdown(() => handleStartRace(), store.getters.getCountdown);
}

function countdown(callback: Function, seconds: number) {
  store.commit("setCountdown", seconds--);

  let interval = setInterval(() => {
    store.commit("setCountdown", seconds--);

    if (seconds < 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

function actionSpeedInterval() {
  const speedInterval = setInterval(() => {
    store.state.actualRaceProgram.horses.map((horse: IHorse) => {
      horse.speed = horse.condition - 20; // the speeds of the horses are contidionally assigned
      if (!horse.finish) horse.run = true;
    });

    const allFinished = store.state.actualRaceProgram.horses.every(
      (horse: IHorse) => horse.finish
    ); // check if all horses are finished
    if (allFinished) {
      // if all horses finished
      store.commit("setRaceStatus", RACE_STATUS.FINISHED);
      store.dispatch("setRaceResult"); // setting race status to finished
      clearInterval(speedInterval); // clearing the interval
      if (store.state.actualRaceProgram.lap < store.state.raceProgram.length)
        startNextProgram(store.state.actualRaceProgram.lap + 1);
    }
  }, 1000);
}

function actionTravelledDistanceInterval() {
  const travelledDistanceInterval = setInterval(() => {
    store.state.actualRaceProgram.horses.map((horse: IHorse) => {
      if (horse.travelledDistance < store.getters.getLaneLength) {
        // if the travelled distance is less than the lane length
        horse.travelledDistance += horse.speed / 4; // add one-fourth of the speed to the path traveled
      } else {
        // if the travelled distance is more than the lane length, set the finish to true
        horse.finish = true;
        horse.run = false;
      }
    });

    const allFinished = store.state.actualRaceProgram.horses.every(
      (horse: IHorse) => horse.finish
    ); // check if all horses are finished
    if (allFinished) clearInterval(travelledDistanceInterval); // if all horses finished, clear the interval
  }, 100);
}

onMounted(() => {
  const raceTrackAreaWidth = raceTrackAreaRef.value.offsetWidth - 80; //finish line approximate right gap;
  store.commit("setLaneLength", raceTrackAreaWidth); // calculating the width of the race area for lane length
});
</script>
