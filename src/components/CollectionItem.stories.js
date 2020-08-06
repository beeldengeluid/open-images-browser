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

export const itemData = {
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

export const stateData = {
  decadeIndex: 6,
  sortBy: "date",
  sortAscending: true,
  displayFieldsSelected: ["thumb", "title", "year"],
  activeFilters: {
    locations: ["Arnhem"],
    subjects: ["machines"],
  },
};

const stateThumbOnlyData = {
  decadeIndex: 6,
  sortBy: "date",
  sortAscending: true,
  displayFieldsSelected: ["thumb"],
  activeFilters: {
    locations: ["Arnhem"],
    subjects: [],
  },
};

export const filterCountsForSelectionData = {
  locations: {
    "Nederland": 28,
    "Arnhem": 9,
    "Westervoort": 5,
    "Amsterdam": 3,
  },
  subjects: {
    "Dolle Mina": 5,
    "cameralieden": 3,
    "conferenties": 3,
    "machines": 2,
    "schrijfwaren": 1,
  },
};

export const dimensionsData = {
  width: 352,
  height: 288,
};

const collectionItemTemplate = `
    <CollectionItem
      :width="itemWidth + 'px'"
      :height="itemHeight + 'px'"
      :item="item"
      :displayTitle="state.displayFieldsSelected.includes('title')"
      :displayYear="state.displayFieldsSelected.includes('year')"
      :displayThumb="state.displayFieldsSelected.includes('thumb')"
      :activeFilters="state.activeFilters"
      :filterCountsForSelection="filterCountsForSelection"
      v-on:toggle-active-filter="onToggleActiveFilter"
    />
  `;

export const Default = () =>
  story({
    props: {
      item: { default: object("item", { ...itemData }) },
      state: { default: object("state", { ...stateData }) },
      itemWidth: { default: number("itemWidth", dimensionsData.width) },
      itemHeight: { default: number("itemHeight", dimensionsData.height) },
      filterCountsForSelection: {
        default: object("filterCountsForSelection", {
          ...filterCountsForSelectionData,
        }),
      },
    },
    methods: actionsData,
    template: collectionItemTemplate,
  });
