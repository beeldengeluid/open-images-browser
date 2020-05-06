// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import {
  withKnobs,
  number,
  text,
  color,
  boolean,
} from "@storybook/addon-knobs";

// Components
import { RatioBar } from "./RatioBar";

export default {
  title: "RatioBar",
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
  RatioBar: () => import("./RatioBar"),
});

const actionsData = {
  onDecadeClick: action("onDecadeClick"),
};

const ratioBarTemplate = `
    <RatioBar
      :amount="amount"
      :total="total"
      :label="label"
      :color="color"
      :innerLabel="innerLabel"
    />
  `;

export const PartlyRatio = () =>
  story({
    props: {
      amount: { default: number("amount", 1000) },
      total: { default: number("total", 3489) },
      label: { default: text("label", "in selection") },
      color: { default: color("color", "#5E35B1") },
      innerLabel: { default: boolean("innerLabel", false) },
    },
    methods: actionsData,
    template: ratioBarTemplate,
  });

export const TotalRatio = () =>
  story({
    props: {
      amount: { default: number("amount", 3489) },
      total: { default: number("total", 3489) },
      label: { default: text("label", "in selection") },
      color: { default: color("color", "#555") },
      innerLabel: { default: boolean("innerLabel", true) },
    },
    methods: actionsData,
    template: ratioBarTemplate,
  });
