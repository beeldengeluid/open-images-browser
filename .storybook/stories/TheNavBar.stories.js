// Utilities
import { storyFactory } from "../util/helpers";

// Components
import { TheNavBar } from "../../src/components/TheNavBar";

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
  TheNavBar: () => import("../../src/components/TheNavBar"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheNavBar />
  `,
  });
