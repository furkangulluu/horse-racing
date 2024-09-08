import { createStore } from "vuex";
import { v4 as uuid } from "uuid";
import { IHorse } from "@/models/Horse";
import { IProgram } from "@/models/Program";
import { IRaceResults } from "@/models/Race";
import { deepCopy } from "@/helper/deepCopy";
import { horseColors } from "@/constant/colors";
import { distances } from "@/constant/program";
import { RACE_STATUS } from "@/constant/race";

interface IState {
  horses: IHorse[];
  raceProgram: IProgram[];
  raceResults: IRaceResults[];
  laneLength: number;
  raceStatus: RACE_STATUS;
  actualRaceProgram: IProgram;
  countdown: number;
}

const store = createStore({
  state: {
    horses: [],
    raceProgram: [],
    raceResults: [],
    laneLength: 0,
    raceStatus: RACE_STATUS.READY,
    actualRaceProgram: {} as IProgram,
    countdown: 0,
  } as IState,
  getters: {
    getLaneLength: (state: IState) => state.laneLength,
    getHorses: (state: IState) => state.horses,
    getCountdown: (state: IState) => state.countdown,
    getActualRaceProgram: (state: IState) => state.actualRaceProgram,
  },
  mutations: {
    setHorses(state: IState, horses: IHorse[]) {
      state.horses = horses;
    },
    setRaceProgram(state: IState, programs: IProgram[]) {
      state.raceProgram = programs;
    },
    setActualRaceProgram(state: IState, program: IProgram) {
      state.actualRaceProgram = program;
    },
    setRaceStatus(state: IState, status: RACE_STATUS) {
      state.raceStatus = status;
    },
    setRaceResults(state: IState, results: IRaceResults[]) {
      state.raceResults = results;
    },
    setCountdown(state: IState, countdown: number) {
      state.countdown = countdown;
    },
    clearCountdown(state: IState) {
      state.countdown = 0;
    },
    setLaneLength(state: IState, length: number) {
      state.laneLength = length;
    },
    updateRaceResults(state: IState, results: IRaceResults[]) {
      state.raceResults = results;
    },
    updateHorseCondition(state: IState, { horseId, conditionLoss }) {
      const horse = state.horses.find((horse) => horse.id === horseId);
      if (!horse) throw new Error("horse not found");

      horse.condition -= conditionLoss;
    },
  },
  actions: {
    generateHorses({ commit }) {
      const horses = [];
      for (let i = 0; i < 20; i++) {
        const horse: IHorse = {
          id: uuid(),
          name: `Horse ${i + 1}`,
          condition: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
          color: horseColors[i % horseColors.length],
          travelledDistance: 0,
          speed: 0,
          finish: false,
          run: false,
          lane: 0,
        };
        horses.push(horse);
      }
      commit("setHorses", horses);
    },
    generateRaceProgram({ commit, state }) {
      const programs = distances.map((distance, index) => {
        const copiedHorses = deepCopy(state.horses);
        const selectedHorses = copiedHorses
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        const program: IProgram = {
          id: uuid(),
          lap: index + 1,
          distance: distance,
          horses: selectedHorses.map((horse: IHorse, horseIndex: number) => {
            return { ...horse, lane: horseIndex + 1 };
          }),
        };
        return program;
      });
      commit("setRaceProgram", programs);
      commit("setActualRaceProgram", programs[0]);
    },
    setRaceResult({ commit, state }) {
      const horses = state.actualRaceProgram.horses
        .map((horse: IHorse) => {
          const conditionLoss = Math.floor(Math.random() * 10) + 1;
          commit("updateHorseCondition", {
            horseId: horse.id,
            conditionLoss,
          });
          return { ...horse, conditionLoss };
        })
        .sort((a, b) => b.condition - a.condition);

      const raceResult = {
        id: state.actualRaceProgram.id,
        lap: state.actualRaceProgram.lap,
        distance: state.actualRaceProgram.distance,
        horses: horses,
      } as IRaceResults;

      state.raceResults.push(raceResult);
    },
    setNextProgram({ commit, state }, nextLap: number) {
      let nextProgram = state.raceProgram.find(
        (program) => program.lap === nextLap
      );

      nextProgram.horses.forEach((programHorse: IHorse) => {
        const horse = state.horses.find(
          (horse) => horse.id === programHorse.id
        );
        if (!horse) throw new Error("horse not found");

        programHorse.condition = horse.condition;
      });

      if (!nextProgram) throw new Error("next program not found");
      commit("setActualRaceProgram", nextProgram);
    },
    clearTheRace({ commit, state }) {
      commit("setRaceStatus", RACE_STATUS.READY);
      commit("setRaceProgram", []);
      commit("setRaceResults", []);
      commit("setActualRaceProgram", []);
    },
  },
});

export default store;
