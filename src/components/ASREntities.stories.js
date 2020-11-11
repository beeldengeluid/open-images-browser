// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { ASREntities } from "./ASREntities";
import metadata from "../assets/data/openbeelden-item-asr-ner.json";

export default {
  title: "ASREntities",
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
  ASREntities: () => import("./ASREntities"),
});

const actionsData = {
  onJumpToTimecode: action("onJumpToTimecode"),
};

const videoEntities = `
  <ASREntities
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
