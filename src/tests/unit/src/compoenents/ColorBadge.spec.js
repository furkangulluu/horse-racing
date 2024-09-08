import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ColorBadge from "@/components/Common/ColorBadge.vue";

describe("ColorBadge.vue", () => {
  test("applies the correct background color based on prop", () => {
    const color = "red";
    const wrapper = mount(ColorBadge, {
      props: {
        color,
      },
    });

    const div = wrapper.find("div");
    expect(div.attributes("style")).toContain(`background-color: ${color}`);
  });
});
