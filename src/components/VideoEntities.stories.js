// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { VideoEntities } from "./VideoEntities";
import metadata from "../assets/data/openbeelden-item-asr-ner.json";

export default {
  title: "VideoEntities",
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
  VideoEntities: () => import("./VideoEntities"),
});

const actionsData = {
  onJumpToTimecode: action("onJumpToTimecode"),
};

const videoEntities = `
  <VideoEntities
    :nerSequences="nerSequences"
    @jumpToTimecode="onJumpToTimecode"
  />
`;

export const Default = () =>
  story({
    props: {
      nerSequences: { default: object("nerSequences", metadata._source.layer__ner) },
    },
    methods: actionsData,
    template: videoEntities,
  });
