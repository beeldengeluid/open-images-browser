// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

// Components
import { VideoPlaylist } from "./VideoPlaylist";

export default {
  title: "VideoPlaylist",
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
  VideoPlaylist: () => import("./VideoPlaylist"),
});

const videosData = [
  {
    videoSrc:
      "https://www.openbeelden.nl/files/01/39/139374.139359.WEEKNUMMER731-HRE0001670A.mp4",
    thumbSrc:
      "https://www.openbeelden.nl/images/602810/%22Varen_op_schaal%22_in_het_Scheepsbouwkundig_Proefstation_%281_31%29.png",
  },
  {
    videoSrc:
      "https://www.openbeelden.nl/files/06/37/637833.637818.WEEKNUMMER794-HRE00004D33_1296000_1460000.mp4",
    thumbSrc:
      "https://www.openbeelden.nl/images/637965/St._Nicolaas_nadert_Keuringsdienst_van_Waren_keurt_speelgoed_op_veiligheid_en_kwaliteit_%281_21%29.png",
  },
  {
    videoSrc:
      "https://www.openbeelden.nl/files/12/12708.12696.WEEKNUMMER711-HRE0001DC71.mp4",
    thumbSrc:
      "https://www.openbeelden.nl/images/603669/Open_dag_in_natuurkundig_laboratorium_%280_44%29.png",
  },
  {
    videoSrc: "https://www.openbeelden.nl/files/BG/BG_10557.mp4",
    thumbSrc:
      "https://www.openbeelden.nl/images/602699/Voorbereidingen_voor_de_eerste_vlucht_van_ruimte-vliegtuig_%27Enterprise%27_%281_06%29.png",
  },
];

const videoPlaylistTemplate = `
    <VideoPlaylist
      :videos="videos"
      :autoplayEnabled="autoplayEnabled"
      :stretchVideo="stretchVideo"
    />
  `;

export const Default = () =>
  story({
    props: {
      autoplayEnabled: { default: boolean("autoplayEnabled", true) },
      stretchVideo: { default: boolean("stretchVideo", false) },
      videos: { default: object("activeLocationFilters", [...videosData]) },
    },
    template: videoPlaylistTemplate,
  });

export const Short = () =>
  story({
    props: {
      autoplayEnabled: { default: boolean("autoplayEnabled", true) },
      stretchVideo: { default: boolean("stretchVideo", false) },
      videos: {
        default: object("activeLocationFilters", [...videosData.slice(2)]),
      },
    },
    template: videoPlaylistTemplate,
  });

export const Long = () =>
  story({
    props: {
      autoplayEnabled: { default: boolean("autoplayEnabled", true) },
      stretchVideo: { default: boolean("stretchVideo", false) },
      videos: {
        default: object("activeLocationFilters", [
          ...videosData,
          ...videosData,
        ]),
      },
    },
    template: videoPlaylistTemplate,
  });
