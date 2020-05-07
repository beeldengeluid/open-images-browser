<template>
  <div class="filter-list">
    <v-chip-group
      class="font-mono mb3"
      multiple
      :column="$vuetify.breakpoint.lgAndUp"
      next-icon="mdi-chevron-right"
      prev-icon="mdi-chevron-left"
      show-arrows
    >
      <v-chip
        v-for="filter in filtersToDisplay"
        :key="filter.name"
        @click="$emit('toggle-active-filter', filter.name)"
        :value="filter.name"
        :class="
          activeFilters.includes(filter.name)
            ? activeClass + ' white--text'
            : ''
        "
        label
        small
        class="font-mono ma0"
        :title="`${filter.name} (${filter.count})`"
      >
        <strong class="mr1">{{ filter.name }}</strong
        ><span>{{ filter.count }}</span>
        <v-icon right small
          >{{
            activeFilters.includes(filter.name)
              ? "mdi-close-circle"
              : "mdi-filter-variant"
          }}
        </v-icon>
      </v-chip>
    </v-chip-group>
    <div class="d-none d-lg-flex flex-column">
      <div v-show="isTailHidden" class="w4-5 f6 mb2">
        ... long tail of {{ tail.length }} single occurrences hidden
      </div>
      <v-btn v-if="hasLongTail" @click="toggleTail" outlined>
        {{ isTailHidden ? "Show all" : "Hide long tail" }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterList",
  data: function() {
    return {
      threshold: 30,
      isTailDesired: false,
    };
  },
  props: {
    filters: { type: Array },
    activeFilters: { type: Array },
    activeClass: { type: String, default: "" },
  },
  computed: {
    head() {
      return this.filters.filter((filter) => filter.count > 1);
    },
    tail() {
      return this.filters.filter((filter) => filter.count == 1);
    },
    hasLongTail() {
      return this.tail.length > this.threshold;
    },
    isTailHidden() {
      return this.hasLongTail && !this.isTailDesired;
    },
    filtersToDisplay() {
      return this.isTailHidden ? this.head : this.filters;
    },
  },
  methods: {
    toggleTail() {
      this.isTailDesired = !this.isTailDesired;
      this.$emit("toggle-tail", this.isTailDesired);
    },
  },
};
</script>
<style scoped>
.w4-5 {
  width: 10rem;
}
</style>
