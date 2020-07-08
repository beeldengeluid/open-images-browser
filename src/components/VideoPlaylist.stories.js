// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

// Components
import { VideoPlaylist } from "./VideoPlaylist";

export default {
  title: "VideoPlaylist",
  decorators: [
    withKnobs({escapeHTML: false})
  ],
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

const actionsData = {
  onClosePlaylist: action("onClosePlaylist"),
};

const itemsData = [
  {
    "id": "oai:openimages.eu:84919",
    "date": "1970-04-04",
    "url": "https://www.openbeelden.nl/media/84919",
    "title": "Congres van Dolle Mina's ",
    "thumbSrc": "https://www.openbeelden.nl/images/604034/Congres_van_Dolle_Mina%27s_%280_33%29.png",
    "videoSrc": "https://www.openbeelden.nl/files/84/84931.84918.BG_32213.mp4",
    "subjects": ["cameralieden","conferenties","betogingen","Duijn, Roel van","Dolle Mina","spandoeken","vrouwenemancipatie"],
    "creators": ["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],
    "locations": ["Nederland","Arnhem"]
  },
  {"id":"oai:openimages.eu:1465","date":"1971-04-01","url":"https://www.openbeelden.nl/media/1465","title":"Zwemles voor baby's van 4 maanden","thumbSrc":"https://www.openbeelden.nl/images/602884/Zwemles_voor_baby%27s_van_4_maanden_%280_31%29.png","videoSrc":"https://www.openbeelden.nl/files/BG/WEEKNUMMER711-HRE0000D0C2.mp4","subjects":["zwemlessen","zwemmen","baby's","kinderen"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Arnhem","Nederland"]},{"id":"oai:openimages.eu:648624","date":"1974-02-01","url":"https://www.openbeelden.nl/media/648624","title":"Orang oetans na logeerpartij weer terug in Artis de voedselvoorziening in de hoofdstedelijke diergaarde","thumbSrc":"https://www.openbeelden.nl/images/648689/Orang_oetans_na_logeerpartij_weer_terug_in_Artis_de_voedselvoorziening_in_de_hoofdstedelijke_diergaarde_%281_33%29.png","videoSrc":"https://www.openbeelden.nl/files/06/48/648649.648623.WEEKNUMMER740-HRE0001354E.mp4","subjects":["dieren","orang-oetans","dierentuinen","voedsel","dierentransport","Burgers' Zoo","Artis"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Arnhem","Amsterdam","Nederland"]},{"id":"oai:openimages.eu:662692","date":"1978-01-01","url":"https://www.openbeelden.nl/media/662692","title":"Robotcollecties in Gemeente Museum Arnhem","thumbSrc":"https://www.openbeelden.nl/images/671915/Robotcollecties_in_Gemeente_Museum_Arnhem_%280_54%29.png","videoSrc":"https://www.openbeelden.nl/files/06/62/662691.WEEKNUMMER782-HRE00004A87_2699800_2807960.mp4","subjects":["collecties","speelgoed","robots"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Arnhem","Nederland"]},{"id":"oai:openimages.eu:621064","date":"1970-12-01","url":"https://www.openbeelden.nl/media/621064","title":"Titelstrijd driebanden biljarten","thumbSrc":"https://www.openbeelden.nl/images/621225/Titelstrijd_driebanden_biljarten_%280_48%29.png","videoSrc":"https://www.openbeelden.nl/files/06/21/621088.621063.WEEKNUMMER705-HRE00015CD1.mp4","subjects":["NK","biljarten","Doggen, Jan","Bracht, Rini van"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Nederland","Arnhem"]},{"id":"oai:openimages.eu:663968","date":"1971-12-01","url":"https://www.openbeelden.nl/media/663968","title":"Transport van brugoverspanning","thumbSrc":"https://www.openbeelden.nl/images/679791/Transport_van_brugoverspanning_%280_23%29.png","videoSrc":"https://www.openbeelden.nl/files/06/63/664508.663967.WEEKNUMMER714-HRE0000CAE1_3147000_3195000.mp4","subjects":["sleepboten","bijzondere transporten","spoorbruggen"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Westervoort","Rijn","Arnhem","Nederland","IJssel"]},{"id":"oai:openimages.eu:677270","date":"1970-05-01","url":"https://www.openbeelden.nl/media/677270","title":"Zebrazoemer voor blinden","thumbSrc":"https://www.openbeelden.nl/images/678373/Zebrazoemer_voor_blinden_%280_19%29.png","videoSrc":"https://www.openbeelden.nl/files/06/77/678224.677269.WEEKNUMMER702-HRE0001B626_1584240_1623000.mp4","subjects":["voetgangers","blinden","verkeerslichten"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Arnhem","Nederland"]},{"id":"oai:openimages.eu:676307","date":"1975-01-01","url":"https://www.openbeelden.nl/media/676307","title":"Uniek veterinair centrum in Burgers Dierenpark","thumbSrc":"https://www.openbeelden.nl/images/677675/Uniek_veterinair_centrum_in_Burgers_Dierenpark_%281_08%29.png","videoSrc":"https://www.openbeelden.nl/files/06/76/677105.676306.WEEKNUMMER753-HRE0001AFEF_734840_872000.mp4","subjects":["gnoes","Burger's Zoo","chimpansees","dierentuinen","wolven","dierenverzorging","leeuwen"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Nederland","Arnhem"]},{"id":"oai:openimages.eu:2583","date":"1976-01-01","url":"https://www.openbeelden.nl/media/2583","title":"Branden vernielen honderden hectare natuurgebied","thumbSrc":"https://www.openbeelden.nl/images/602645/Branden_vernielen_honderden_hectare_natuurgebied_%280_49%29.png","videoSrc":"https://www.openbeelden.nl/files/BG/BG_9775.mp4","subjects":["natuurgebieden","brandweer","bosbranden","droogte"],"creators":["Polygoon-Profilti (producent) / Nederlands Instituut voor Beeld en Geluid (beheerder)"],"locations":["Nederland","Arnhem","Veluwe"]}
];

const videoPlaylistTemplate = `
  <VideoPlaylist
    :items="items"
    :stretchVideo="false"
    v-on:close-playlist="onClosePlaylist"
    color="orange darken-2"
    class="h-100 justify-center"
  />
`;

export const Default = () =>
  story({
    props: {
      stretchVideo: { default: boolean("stretchVideo", false) },
      items: { default: object("activeLocationFilters", [...itemsData]) },
    },
    template: videoPlaylistTemplate,
  });

export const Short = () =>
  story({
    props: {
      stretchVideo: { default: boolean("stretchVideo", false) },
      items: {
        default: object("activeLocationFilters", [...itemsData.slice(0,4)]),
      },
    },
    template: videoPlaylistTemplate,
  });
