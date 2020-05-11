// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

// Components
import { CollectionItemThumbnail } from "./CollectionItemThumbnail";

// Shared Data
import { dimensionsData } from "./CollectionItem.stories";

const itemContainer = () => {
  return {
    template: `<div class="relative" style="width: ${dimensionsData.width +
      "px"}; height: ${dimensionsData.height + "px"}"><story/></div>`,
  };
};

export default {
  title: "CollectionItemThumbnail",
  decorators: [withKnobs, itemContainer],
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
  CollectionItemThumbnail: () => import("./CollectionItemThumbnail"),
});

const actionsData = {
  toggleExpanded: action("toggleExpanded"),
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

const collectionItemThumbnailTemplate = `
    <CollectionItemThumbnail
      v-on:toggle-expanded="toggleExpanded"
      :thumbSrc="thumbSrc"
      :title="title"
      :year="year"
      :displayTitle="displayTitle"
      :displayYear="displayYear"
      :displayThumb="displayThumb"
    />
  `;

export const Default = () =>
  story({
    props: {
      thumbSrc: {
        default: text(
          "thumbSrc",
          "https://www.openbeelden.nl/images/604108/Fabricageproces_van_kleurpotloden_%280_40%29.png"
        ),
      },
      title: { default: text("title", "Fabricageproces van kleurpotloden") },
      year: { default: text("year", "1976") },
      displayTitle: { default: boolean("displayTitle", true) },
      displayYear: { default: boolean("displayYear", true) },
      displayThumb: { default: boolean("displayThumb", true) },
    },
    methods: actionsData,
    template: collectionItemThumbnailTemplate,
  });

export const ThumbOnly = () =>
  story({
    props: {
      thumbSrc: {
        default: text(
          "thumbSrc",
          "https://www.openbeelden.nl/images/604108/Fabricageproces_van_kleurpotloden_%280_40%29.png"
        ),
      },
      title: { default: text("title", "Fabricageproces van kleurpotloden") },
      year: { default: text("year", "1976") },
      displayTitle: { default: boolean("displayTitle", false) },
      displayYear: { default: boolean("displayYear", false) },
      displayThumb: { default: boolean("displayThumb", true) },
    },
    methods: actionsData,
    template: collectionItemThumbnailTemplate,
  });
