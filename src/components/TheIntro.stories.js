// Utilities
import { storyFactory } from "../../.storybook/util/helpers";

// Components
import { TheIntro } from "./TheIntro";

export default { title: "TheIntro" };

function genComponent(name) {
  return {
    name,

    render(h) {
      return h("div", this.$slots.default);
    },
  };
}

const story = storyFactory({
  TheIntro: () => import("./TheIntro"),
});

export const Default = () =>
  story({
    props: {},
    template: `
    <TheIntro />
  `,
  });
