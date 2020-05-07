// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, number } from "@storybook/addon-knobs";

// Components
import { PeriodChart } from "./PeriodChart";

export default {
  title: "PeriodChart",
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
  PeriodChart: () => import("./PeriodChart"),
});

const actionsData = {
  onDecadeClick: action("onDecadeClick"),
};

const barSeriesData = {
  "1910s": 17,
  "1920s": 538,
  "1930s": 515,
  "1940s": 573,
  "1950s": 735,
  "1960s": 514,
  "1970s": 511,
  "1980s": 37,
  "1990s": 0,
  "2000s": 22,
  "2010s": 27,
};

const lineSeriesData = {
  "1910s": 1,
  "1920s": 128,
  "1930s": 122,
  "1940s": 85,
  "1950s": 134,
  "1960s": 100,
  "1970s": 71,
  "1980s": 5,
  "1990s": 0,
  "2000s": 0,
  "2010s": 0,
};

const colorsData = { bar: "#555", line: "#009688", background: "#303030" };

const periodChartTemplate = `
    <PeriodChart
      :barSeries="barSeries"
      :lineSeries="lineSeries"
      v-on:decade-click="onDecadeClick"
      :decadeIndex="decadeIndex"
      :colors="colors"
    />
  `;

export const Default = () =>
  story({
    props: {
      decadeIndex: { default: number("decadeIndex", 5) },
      barSeries: { default: object("barSeries", { ...barSeriesData }) },
      lineSeries: { default: object("lineSeries", { ...lineSeriesData }) },
      colors: { default: object("colors", { ...colorsData }) },
    },
    methods: actionsData,
    template: periodChartTemplate,
  });
