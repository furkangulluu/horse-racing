import { describe, test, expect } from "vitest";
import store from "@/stores/Store";

describe("Vuex Store Mutation Tests", () => {
  test("sets horses correctly", () => {
    const horses = [{ id: 1, name: "Horse 1" }];
    store.commit("setHorses", horses);

    expect(store.state.horses).toEqual(horses);
  });

  test("updates race results correctly", () => {
    const raceResults = [{ id: 1, lap: 1, horses: [] }];
    store.commit("setRaceResults", raceResults);

    expect(store.state.raceResults).toEqual(raceResults);
  });

  test("updates horse condition correctly", () => {
    const horse = { id: 1, condition: 100 };
    store.commit("setHorses", [horse]);

    store.commit("updateHorseCondition", { horseId: 1, conditionLoss: 10 });
    expect(store.state.horses[0].condition).toBe(90);
  });
});
