// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { VideoTranscript } from "./VideoTranscript";
import metadata from "../assets/data/openbeelden-item-asr-ner.json";

export default {
  title: "VideoTranscript",
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
  VideoTranscript: () => import("./VideoTranscript"),
});

const actionsData = {
  onJumpToTimecode: action("onJumpToTimecode"),
};

const videoTranscript = `
  <VideoTranscript
    @jumpToTimecode="onJumpToTimecode"
    :asrSequences="asrSequences"
    :nerSequences="nerSequences"
  />
`;

export const Default = () =>
  story({
    props: {
      asrSequences: { default: object("asrSequences", metadata._source.layer__asr) },
      nerSequences: { default: object("nerSequences", metadata._source.layer__ner) },
    },
    methods: actionsData,
    template: videoTranscript,
  });
