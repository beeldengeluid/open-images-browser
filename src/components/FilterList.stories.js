// Utilities
import { storyFactory } from "../../.storybook/util/helpers";
import { action } from "@storybook/addon-actions";
import { withKnobs, array, object } from "@storybook/addon-knobs";

// Components
import { FilterList } from "./FilterList";

export default {
  title: "FilterList",
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
  FilterList: () => import("./FilterList"),
});

const actionsData = {
  onToggleActiveFilter: action("onToggleActiveFilter"),
  onToggleTail: action("onToggleTail"),
};

const filtersData = [
  { name: "wedstrijden", count: 4 },
  { name: "NK", count: 2 },
  { name: "computer", count: 2 },
];

const filtersLongData = [
  { name: "wedstrijden", count: 4 },
  { name: "NK", count: 2 },
  { name: "computer", count: 2 },
  { name: "fietsen", count: 2 },
  { name: "jaren 80", count: 2 },
  { name: "ovens", count: 2 },
  { name: "rolschaatsen", count: 2 },
  { name: "skateboarden", count: 2 },
  { name: "tentoonstellingen", count: 2 },
  { name: "tests", count: 2 },
  { name: "vliegtuigen", count: 2 },
  { name: "vrouwen", count: 2 },
  { name: "Amerigo Vespucci", count: 1 },
  { name: "Arcade", count: 1 },
  { name: "Centraal Boekhuis", count: 1 },
  { name: "Ehrens, Rob", count: 1 },
  { name: "Energie Anders", count: 1 },
  { name: "Fietsvierdaagse", count: 1 },
  { name: "Film- en Foto-archief", count: 1 },
  { name: "Flevohof", count: 1 },
  { name: "Hoogovens", count: 1 },
  { name: "KEMA", count: 1 },
  { name: "Krusensjtern", count: 1 },
  { name: "Landbouwhogeschool Wageningen", count: 1 },
  { name: "PTT", count: 1 },
  { name: "Polygoon", count: 1 },
  { name: "RAI (tentoonstellingsgebouw)", count: 1 },
  { name: "Sail", count: 1 },
  { name: "Sea Cloud", count: 1 },
  { name: "Smit-Kroes, Neelie", count: 1 },
  { name: "TNO", count: 1 },
  { name: "WK", count: 1 },
  { name: "amateurs", count: 1 },
  { name: "arbeid", count: 1 },
  { name: "audiovisuele archieven", count: 1 },
  { name: "auto's", count: 1 },
  { name: "automatisering", count: 1 },
  { name: "aërodynamica", count: 1 },
  { name: "balsporten", count: 1 },
  { name: "beeldende kunst", count: 1 },
  { name: "beurzen", count: 1 },
  { name: "bier", count: 1 },
  { name: "bierbrouwerijen", count: 1 },
];

const filterListTemplate = `
    <FilterList
      :filters="filters"
      :activeFilters="activeFilters"
      v-on:toggle-active-filter="onToggleActiveFilter('subjects', $event)"
      v-on:toggle-tail="onToggleTail"
      activeClass="teal"
    />
  `;

export const Default = () =>
  story({
    props: {
      filters: { default: object("filters", [...filtersData]) },
      activeFilters: {
        default: array("activeFilters", []),
      },
      activeClass: { default: "teal" },
    },
    methods: actionsData,
    template: filterListTemplate,
  });

export const WithActiveFilters = () =>
  story({
    props: {
      filters: { default: object("filters", [...filtersData]) },
      activeFilters: {
        default: array("activeFilters", ["wedstrijden", "NK"]),
      },
      activeClass: { default: "teal" },
    },
    methods: actionsData,
    template: filterListTemplate,
  });

export const WithLongTail = () =>
  story({
    props: {
      filters: { default: object("filters", [...filtersLongData]) },
      activeFilters: {
        default: array("activeFilters", []),
      },
      activeClass: { default: "teal" },
    },
    methods: actionsData,
    template: filterListTemplate,
  });
