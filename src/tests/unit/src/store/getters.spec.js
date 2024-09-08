import { describe, test, expect } from "vitest";
import store from "@/stores/Store";

describe("Vuex Store Getters Test", () => {
  test("returns correct lane length", () => {
    store.state.laneLength = 500;

    const laneLength = store.getters.getLaneLength;
    expect(laneLength).toBe(500);
  });

  test("returns correct horses", () => {
    const horses = [{ id: 1, name: "Horse 1" }];
    store.state.horses = horses;

    const result = store.getters.getHorses;
    expect(result).toEqual(horses);
  });

  test("returns correct countdown value", () => {
    store.state.countdown = 10;

    const countdown = store.getters.getCountdown;
    expect(countdown).toBe(10);
  });
});
