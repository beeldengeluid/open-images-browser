// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { ASRTranscript } from "./ASRTranscript";
import metadata from "../assets/data/openbeelden-item-asr-ner.json";

export default {
  title: "ASRTranscript",
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
  ASRTranscript: () => import("./ASRTranscript"),
});

const actionsData = {
  onJumpToTimecode: action("onJumpToTimecode"),
};

const videoTranscript = `
  <ASRTranscript
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
