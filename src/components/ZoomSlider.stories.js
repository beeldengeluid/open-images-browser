// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";

// Components
import { ZoomSlider } from "./ZoomSlider";

export default {
  title: "ZoomSlider",
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
  ZoomSlider: () => import("./ZoomSlider"),
});

const zoomData = { value: 2, min: 0, max: 6, step: 1 };
const zoomLabelsData = [1, 2, 4, 8, 16, 32, 64];

const zoomSliderTemplate = `
    <ZoomSlider
      v-model="zoom.value"
      :min="zoom.min"
      :max="zoom.max"
      :step="zoom.step"
      :tickLabels="zoomLabels"
    ></ZoomSlider>
  `;

export const Default = () =>
  story({
    props: {
      zoom: { default: object("zoom", { ...zoomData }) },
      zoomLabels: { default: object("zoomLabels", { ...zoomLabelsData }) },
    },
    template: zoomSliderTemplate,
  });
