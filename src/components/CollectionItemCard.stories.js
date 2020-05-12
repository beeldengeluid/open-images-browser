// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, array, number, object, text } from "@storybook/addon-knobs";

// Components
import { CollectionItemCard } from "./CollectionItemCard";
import {
  itemData,
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

// const itemData = {
//   id: "oai:openimages.eu:74462",
//   date: "1976-01-01",
//   url: "https://www.openbeelden.nl/media/74462",
//   title: "Fabricageproces van kleurpotloden",
//   thumbSrc:
//     "https://www.openbeelden.nl/images/604108/Fabricageproces_van_kleurpotloden_%280_40%29.png",
//   videoSrc: "https://www.openbeelden.nl/files/74/74474.74461.BG_9804.mp4",
//   subjects: ["schrijfwaren", "machines"],
//   creators: [
//     "Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)",
//   ],
//   locations: ["Nederland"],
// };

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
      :activeLocationFilters="activeLocationFilters"
      :activeSubjectFilters="activeSubjectFilters"
      :locationCountsForSelection="locationCountsForSelection"
      :subjectCountsForSelection="subjectCountsForSelection"
    />
  `;

export const Default = () =>
  story({
    props: {
      title: { default: text("title", "Fabricageproces van kleurpotloden") },
      item: { default: object("item", { ...itemData }) },
      year: { default: text("year", "1972") },
      videoMaxWidth: { default: number("videoMaxWidth", 320) },
      activeLocationFilters: { default: array("activeLocationFilters", []) },
      activeSubjectFilters: { default: array("activeSubjectFilters", []) },
      locationCountsForSelection: {
        default: object(
          "locationCounts",
          filterCountsForSelectionData.locations
        ),
      },
      subjectCountsForSelection: {
        default: object("subjectCounts", filterCountsForSelectionData.subjects),
      },
    },
    methods: actionsData,
    template: collectionItemCardTemplate,
  });
