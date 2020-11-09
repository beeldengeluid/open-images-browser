// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

// Components
import { VideoPlayer } from "./VideoPlayer";
import { itemData } from "./CollectionItem.stories";

export default {
  title: "VideoPlayer",
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
  VideoPlayer: () => import("./VideoPlayer"),
});

const actionsData = {
  onTimeUpdate: action("onTimeUpdate"),
};

const videoPlayerTemplate = `
  <VideoPlayer
    class="mw6"
    :videoSrc="videoSrc"
    :thumbSrc="thumbSrc"
    v-on:timeUpdate="onTimeUpdate"
  />
`;

export const Default = () =>
  story({
    props: {
      videoSrc: { default: text("videoSrc", itemData.videoSrc) },
      thumbSrc: { default: text("thumbSrc", itemData.thumbSrc) },
    },
    methods: actionsData,
    template: videoPlayerTemplate,
  });
