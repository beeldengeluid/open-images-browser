// Utilities
import { storyFactory } from "../../.storybook/util/helpers";

// Components
import { TheCTA } from "./TheCTA";

export default { title: "TheCTA" };

function genComponent(name) {
  return {
    name,

    render(h) {
      return h("div", this.$slots.default);
    },
  };
}

const story = storyFactory({
  TheCTA: () => import("./TheCTA"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheCTA />
  `,
  });
