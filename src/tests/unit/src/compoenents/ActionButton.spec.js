import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ActionButton from "@/components/Common/ActionButton.vue";

describe("ActionButton.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ActionButton, {
      props: {
        disabled: false,
      },
      slots: {
        default: "Button",
      },
    });
  });

  test("is correctly rendered", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should renders is page content is correct", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("renders props.disabled when passed", () => {
    expect(wrapper.html()).toContain("Button");
  });

  test("is class name set if disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    const input = wrapper.find("div.action-button");
    expect(input.classes()).toContain("px-disabled");
  });

  test("is class name set if disabled is true", async () => {
    await wrapper.setProps({ color: "secondary" });
    const input = wrapper.find("div.action-button");
    expect(input.classes()).toContain("bg-premium-navy");
    expect(input.classes()).toContain("text-gray-100");
  });

  test("renders props.disabled when passed", () => {
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });
});
