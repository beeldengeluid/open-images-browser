// Utilities
import { storyFactory } from "../../.storybook/util/helpers";

// Components
import { TheHeader } from "./TheHeader";

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
  TheHeader: () => import("./TheHeader"),
});

export const Regular = () =>
  story({
    props: {},
    template: `
    <TheHeader />
  `,
  });
