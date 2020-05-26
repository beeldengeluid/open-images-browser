// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, array, number, object, text } from "@storybook/addon-knobs";

// Components
import { CollectionItemCard } from "./CollectionItemCard";
import {
  itemData,
  stateData,
  filterCountsForSelectionData,
} from "./CollectionItem.stories";

export default {
  title: "CollectionItemCard",
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
  CollectionItemCard: () => import("./CollectionItemCard"),
});

const actionsData = {
  onToggleExpanded: action("toggleExpanded"),
  onToggleActiveFilter: action("ToggleActiveFilter"),
};

const filtersData = [
  { name: "wedstrijden", count: 4 },
  { name: "NK", count: 2 },
  { name: "computer", count: 2 },
];

const collectionItemCardTemplate = `
    <CollectionItemCard
      v-on:toggle-expanded="onToggleExpanded"
      v-on:toggle-active-filter="onToggleActiveFilter"
      :item="item"
      :year="year"
      :videoMaxWidth="videoMaxWidth"
      :activeFilters="activeFilters"
      :filterCountsForSelection="filterCountsForSelection"
    />
  `;

export const Default = () =>
  story({
    props: {
      title: { default: text("title", "Fabricageproces van kleurpotloden") },
      item: { default: object("item", { ...itemData }) },
      year: { default: text("year", "1972") },
      videoMaxWidth: { default: number("videoMaxWidth", 320) },
      activeFilters: {
        default: object("activeFilters", stateData.activeFilters),
      },
      filterCountsForSelection: {
        default: object(
          "filterCountsForSelection",
          filterCountsForSelectionData
        ),
      },
    },
    methods: actionsData,
    template: collectionItemCardTemplate,
  });
