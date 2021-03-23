// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { RatioBars } from "./RatioBars";

export default {
  title: "RatioBars",
  decorators: [withKnobs],
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
  RatioBars: () => import("./RatioBars"),
});

const barsData = [
  {
    amount: 3489,
    total: 3489,
    label: "3489 videos in total",
    innerLabel: true,
    color: "#555",
  },
  {
    amount: 511,
    total: 3489,
    label: "in decade",
    labelClasses: "grey--text",
    color: "#5E35B1",
  },
  {
    amount: 401,
    total: 3489,
    label: "in selection",
    labelClasses: "grey--text",
    color: "#009688",
  },
];

const ratioBarsTemplate = `
  <RatioBars class="w-100 z-2 f6"
    :bars="bars"
  />
`;

export const Default = () =>
  story({
    props: {
      bars: { default: object("bars", { ...barsData }) },
    },
    template: ratioBarsTemplate,
  });
