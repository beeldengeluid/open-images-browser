// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, number } from "@storybook/addon-knobs";

// Components
import { CollectionItem } from "./CollectionItem";

export default {
  title: "CollectionItem",
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
  CollectionItem: () => import("./CollectionItem"),
});

const actionsData = {
  onToggleActiveFilter: action("onToggleActiveFilter"),
};

const itemData = {
  id: "oai:openimages.eu:74462",
  date: "1976-01-01",
  url: "https://www.openbeelden.nl/media/74462",
  title: "Fabricageproces van kleurpotloden",
  thumbSrc:
    "https://www.openbeelden.nl/images/604108/Fabricageproces_van_kleurpotloden_%280_40%29.png",
  videoSrc: "https://www.openbeelden.nl/files/74/74474.74461.BG_9804.mp4",
  subjects: ["schrijfwaren", "machines"],
  creators: [
    "Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)",
  ],
  locations: ["Nederland"],
};

const stateData = {
  decadeIndex: 7,
  sortBy: "date",
  sortAscending: true,
  displayFieldsSelected: ["thumb", "title", "year"],
  activeFilters: {
    locations: [],
    subjects: [],
  },
};

const stateThumbOnlyData = {
  decadeIndex: 7,
  sortBy: "date",
  sortAscending: true,
  displayFieldsSelected: ["thumb"],
  activeFilters: {
    locations: [],
    subjects: [],
  },
};

const filterCountsForSelectionData = {
  locations: {
    Nederland: 28,
  },
  subjects: {
    machines: 2,
    schrijfwaren: 1,
  },
};

const collectionItemTemplate = `
    <CollectionItem
      :width="itemWidth + 'px'"
      :height="itemHeight + 'px'"
      :item="item"
      :displayTitle="state.displayFieldsSelected.includes('title')"
      :displayYear="state.displayFieldsSelected.includes('year')"
      :displayThumb="state.displayFieldsSelected.includes('thumb')"
      :activeLocationFilters="state.activeFilters['locations']"
      :activeSubjectFilters="state.activeFilters['subjects']"
      :locationCountsForSelection="
        filterCountsForSelection['locations']
      "
      :subjectCountsForSelection="
        filterCountsForSelection['subjects']
      "
      v-on:toggle-active-filter="onToggleActiveFilter"
    />
  `;

export const Default = () =>
  story({
    props: {
      item: { default: object("item", { ...itemData }) },
      state: { default: object("state", { ...stateData }) },
      itemWidth: { default: number("itemWidth", 352) },
      itemHeight: { default: number("itemHeight", 288) },
      filterCountsForSelection: {
        default: object("filterCountsForSelection", {
          ...filterCountsForSelectionData,
        }),
      },
    },
    methods: actionsData,
    template: collectionItemTemplate,
  });

export const ThumbOnly = () =>
  story({
    props: {
      item: { default: object("item", { ...itemData }) },
      state: { default: object("state", { ...stateThumbOnlyData }) },
      itemWidth: { default: number("itemWidth", 352) },
      itemHeight: { default: number("itemHeight", 288) },
      filterCountsForSelection: {
        default: object("filterCountsForSelection", {
          ...filterCountsForSelectionData,
        }),
      },
    },
    methods: actionsData,
    template: collectionItemTemplate,
  });
