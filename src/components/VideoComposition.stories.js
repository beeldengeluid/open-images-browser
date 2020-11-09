// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, object } from "@storybook/addon-knobs";

// Components
import { VideoComposition } from "./VideoComposition";
import metadata from "../assets/data/openbeelden-item-asr-ner.json";

export default {
  title: "VideoComposition",
  decorators: [withKnobs({ escapeHTML: false })],
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
  VideoComposition: () => import("./VideoComposition"),
});

const actionsData = {
  onJumpToTimecode: action("onJumpToTimecode"),
};

const videoComposition = `
  <VideoComposition
    :videoSrc="videoSrc"
    :thumbSrc="thumbSrc"
    :nerSequences="nerSequences"
    :asrSequences="asrSequences"
  />
`;

export const Default = () =>
  story({
    props: {
      videoSrc: {
        default: text(
          "videoSrc",
          metadata._source["@graph"]["dcterms:hasFormat"].filter((format) =>
            format.endsWith("mp4")
          )[0]
        ),
      },
      thumbSrc: {
        default: text(
          "thumbSrc",
          metadata._source["@graph"]["dcterms:hasFormat"].filter((format) =>
            format.endsWith("png")
          )[0]
        ),
      },
      asrSequences: {
        default: object("asrSequences", metadata._source.layer__asr),
      },
      nerSequences: {
        default: object("nerSequences", metadata._source.layer__ner),
      },
    },
    methods: actionsData,
    template: videoComposition,
  });
