import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Lane from "@/components/RaceTrack/Lane.vue";

describe("Lane.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Lane, {
      props: {
        horse: {
          id: "adb367f2-73be-4699-a9c2-200ce3006a08",
          name: "Horse 1",
          condition: 70,
          color: "#000000",
          travelledDistance: 0,
          speed: 0,
          finish: false,
          run: false,
        },
        laneNo: 1,
      },
    });
  });

  test("is correctly rendered", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("renders props.laneNo when passed", () => {
    expect(wrapper.vm.laneNo).toEqual(1);
    expect(wrapper.attributes("data-lane")).toEqual("1");
  });

  test("adds running class when horse is running", () => {
    const horse = { color: "green", travelledDistance: 150, run: true };
    const wrapper = mount(Lane, {
      props: { horse, laneNo: 2 },
    });

    const horseDiv = wrapper.find(".horse");
    expect(horseDiv.classes()).toContain("running");
  });
});
