import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import TableCard from "@/components/Common/TableCard.vue";

describe("TableCard.vue", () => {
  let wrapper;
  test("renders the correct title", () => {
    wrapper = mount(TableCard, {
      props: {
        title: "Test Title",
      },
    });

    const titleSpan = wrapper.find(".horse-list__card__header span");
    expect(titleSpan.text()).toBe("Test Title");
  });

  test("is correctly rendered", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("has correct structure and classes", () => {
    const wrapper = mount(TableCard);

    expect(wrapper.classes()).toContain("table-card__card");
    expect(wrapper.find("div.horse-list__card__header").exists()).toBe(true);
    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.find("table").classes()).toContain("table-card__table");
  });
});

describe("TableCard.vue Slot Test", () => {
  test("renders thead and tbody slots correctly", () => {
    const wrapper = mount(TableCard, {
      slots: {
        thead: "<tr><th>Header</th></tr>",
        tbody: "<tr><td>Body</td></tr>",
      },
    });

    const theadContent = wrapper.find("thead");
    const tbodyContent = wrapper.find("tbody");

    expect(theadContent.html()).toContain("Header");
    expect(tbodyContent.html()).toContain("Body");
  });

  test("renders no content when slots are empty", () => {
    const wrapper = mount(TableCard);

    const theadContent = wrapper.find("thead");
    const tbodyContent = wrapper.find("tbody");

    expect(theadContent.html()).toBe("<thead></thead>");
    expect(tbodyContent.html()).toBe("<tbody></tbody>");
  });
});
