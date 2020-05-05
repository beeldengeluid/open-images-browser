// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";

// Components
import { StateStory } from "./StateStory";

export default {
  title: "StateStory",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

function genComponent(name) {
  return {
    name,
    render(h) {
      return h("div", this.$slots.default);
    },
  };
}

const story = storyFactory({
  StateStory: () => import("./StateStory"),
});

export const actionsData = {
  onToggleActiveFilter: action("onToggleActiveFilter"),
};

export const stateData = {
  activeFilters: {
    locations: ["Hilversum"],
    subjects: [],
  },
};

export const computedData = {
  selectedYearRange: [1980, 1989],
  activeLength: 10,
  totalLength: 1000,
};

export const Default = () =>
  story({
    props: {
      state: {
        default: () => stateData,
      },
      computed: {
        default: () => computedData,
      },
    },
    methods: actionsData,
    template: `
    <StateStory
      :state="state"
      :computed="computed"
      v-on:toggle-active-filter="onToggleActiveFilter"
    />
  `,
  });
