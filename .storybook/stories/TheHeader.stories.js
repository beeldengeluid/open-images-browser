// Utilities
import { storyFactory } from "../util/helpers";

// Components
import { TheHeader } from "../../src/components/TheHeader";

export default { title: "TheHeader" };

function genComponent(name) {
  return {
    name,

    render(h) {
      return h("div", this.$slots.default);
    },
  };
}

const story = storyFactory({
  TheHeader: () => import("../../src/components/TheHeader"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheHeader />
  `,
  });
