// Utilities
import { storyFactory } from "../util/helpers";

// Components
import { TheCTA } from "../../src/components/TheCTA";

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
  TheCTA: () => import("../../src/components/TheCTA"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheCTA />
  `,
  });
