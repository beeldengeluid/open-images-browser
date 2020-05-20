// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { StateStory } from "./StateStory";

export default {
  title: "StateStory",
  decorators: [withKnobs],
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

export const stateBothData = {
  activeFilters: {
    locations: ["Hilversum"],
    subjects: ["wedstrijden"],
  },
};

export const stateLocationsData = {
  activeFilters: {
    locations: ["Hilversum"],
    subjects: [],
  },
};

export const stateSubjectsData = {
  activeFilters: {
    locations: [],
    subjects: ["wedstrijden"],
  },
};

export const stateManyData = {
  activeFilters: {
    locations: ["Nederland", "Amsterdam", "Alkmaar", "Amstelveen"],
    subjects: [
      "wedstrijden",
      "nationaal team Nederland",
      "prijsuitreikingen",
      "sport",
    ],
  },
};

export const stateEmptyData = {
  activeFilters: {
    locations: [],
    subjects: [],
  },
};

export const computedData = {
  selectedYearRange: [1980, 1989],
  activeLength: 10,
  totalLength: 1000,
};

const stateStoryTemplate = `
    <StateStory
      :state="state"
      :computed="computed"
      v-on:toggle-active-filter="onToggleActiveFilter"
    />
  `;

export const NoFilters = () =>
  story({
    props: {
      state: {
        default: object("state", { ...stateEmptyData }),
      },
      computed: {
        default: object("computed", { ...computedData }),
      },
    },
    methods: actionsData,
    template: stateStoryTemplate,
  });

export const BothFilters = () =>
  story({
    props: {
      state: {
        default: object("state", { ...stateBothData }),
      },
      computed: {
        default: object("computed", { ...computedData }),
      },
    },
    methods: actionsData,
    template: stateStoryTemplate,
  });

export const LocationFilter = () =>
  story({
    props: {
      state: {
        default: object("state", { ...stateLocationsData }),
      },
      computed: {
        default: object("computed", { ...computedData }),
      },
    },
    methods: actionsData,
    template: stateStoryTemplate,
  });

export const SubjectFilter = () =>
  story({
    props: {
      state: {
        default: object("state", { ...stateSubjectsData }),
      },
      computed: {
        default: object("computed", { ...computedData }),
      },
    },
    methods: actionsData,
    template: stateStoryTemplate,
  });

export const ManyFilters = () =>
  story({
    props: {
      state: {
        default: object("state", { ...stateManyData }),
      },
      computed: {
        default: object("computed", { ...computedData }),
      },
    },
    methods: actionsData,
    template: stateStoryTemplate,
  });
