<template>
  <div>
    The current selection, ranging from
    <span class="ph1 bg-primary-accent white--text font-mono">{{
      computed.selectedYearRange[0]
    }}</span>
    to
    <span class="ph1 bg-primary-accent white--text font-mono">{{
      computed.selectedYearRange[1]
    }}</span
    >,
    <span
      v-if="
        state.activeFilters['locations'].length ||
          state.activeFilters['subjects'].length
      "
    >
      <br />
      <span>filtered for</span>
      <span v-if="state.activeFilters['locations'].length">
        <v-chip
          v-for="locationFilter in state.activeFilters['locations']"
          :key="locationFilter"
          :value="locationFilter"
          label
          small
          class="ml1 teal white--text font-mono"
          @click="$emit('toggle-active-filter', 'locations', locationFilter)"
        >
          <v-icon small left>room</v-icon>
          <strong>{{ locationFilter }}</strong>
          <v-icon small right>cancel</v-icon>
        </v-chip>
      </span>
      <span v-if="state.activeFilters['subjects'].length">
        <v-chip
          v-for="subjectFilter in state.activeFilters['subjects']"
          :key="subjectFilter"
          :value="subjectFilter"
          label
          small
          class="ml1 teal white--text font-mono"
          @click="$emit('toggle-active-filter', 'subjects', subjectFilter)"
        >
          <v-icon small left>local_offer</v-icon>
          <strong>{{ subjectFilter }}</strong>
          <v-icon small right>cancel</v-icon>
        </v-chip>
      </span>
      <span>,</span>
    </span>
    <br />
    contains
    <span class="ph1 white black--text f3 fw5 font-mono">{{
      computed.activeLength
    }}</span>
    out of
    <span class="ph1 white black--text font-mono">{{
      computed.totalLength
    }}</span>
    videos,
    <br />
    sorted by <span class="ph1 indigo font-mono">{{ state.sortBy }}</span> in
    <span class="ph1 indigo font-mono">{{
      state.sortAscending ? "ascending" : "descending"
    }}</span>
    order.
  </div>
</template>

<script>
export default {
  name: "StateStory",
  data: function() {
    return {};
  },
  props: {
    state: {
      type: Object,
    },
    computed: {
      type: Object,
    },
  },
};
</script>
