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
          v-for="location in state.activeFilters['locations']"
          :key="location"
          :value="location"
          label
          small
          class="ml1 teal white--text font-mono"
          @click="
            $emit('toggle-active-filter', {
              type: 'locations',
              value: location,
            })
          "
        >
          <v-icon small left>mdi-map-marker</v-icon>
          <strong>{{ location }}</strong>
          <v-icon small right>mdi-close-circle</v-icon>
        </v-chip>
      </span>
      <span v-if="state.activeFilters['subjects'].length">
        <v-chip
          v-for="subject in state.activeFilters['subjects']"
          :key="subject"
          :value="subject"
          label
          small
          class="ml1 teal white--text font-mono"
          @click="
            $emit('toggle-active-filter', {
              type: 'subjects',
              value: subject,
            })
          "
        >
          <v-icon small left>mdi-tag</v-icon>
          <strong>{{ subject }}</strong>
          <v-icon small right>mdi-close-circle</v-icon>
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
    videos.
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
