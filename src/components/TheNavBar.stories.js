// Utilities
import { storyFactory } from "../../.storybook/util/helpers";

// Components
import { TheNavBar } from "./TheNavBar";

export default { title: "TheNavBar" };

function genComponent(name) {
  return {
    name,

    render(h) {
      return h("div", this.$slots.default);
    },
  };
}

const story = storyFactory({
  TheNavBar: () => import("./TheNavBar"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheNavBar />
  `,
  });
