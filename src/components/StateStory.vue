<template>
<div class="mv3">
  <p>
    The current selection, ranging
    from <span class="ph1 bg-primary-accent white--text font-mono">{{computed.selectedYearRange[0]}}</span>
    to <span class="ph1 bg-primary-accent white--text font-mono">{{computed.selectedYearRange[1]}}</span>,
    <span v-if="state.activeLocationFilters.length || state.activeSubjectFilters.length">
      <br>
      <span>filtered for</span>
      <span v-if="state.activeLocationFilters.length">
        <v-chip  
          v-for="locationFilter in state.activeLocationFilters" :key="locationFilter"
          :value="locationFilter"
          label small class="ml1 teal white--text font-mono"
          @click="toggleLocationFilter(locationFilter)"
        >
          <v-icon small left>room</v-icon>
          <strong>{{ locationFilter }}</strong>
          <v-icon small right>cancel</v-icon>
        </v-chip>
      </span>
      <span v-if="state.activeSubjectFilters.length">
          <v-chip  
            v-for="subjectFilter in state.activeSubjectFilters" :key="subjectFilter"
            :value="subjectFilter"
            label small class="ml1 teal white--text font-mono"
            @click="toggleSubjectFilter(subjectFilter)"
          >
            <v-icon small left>local_offer</v-icon>
            <strong>{{ subjectFilter }}</strong>
            <v-icon small right>cancel</v-icon>
          </v-chip>
      </span>
      <span>,</span>
    </span>
    <br>
    contains <span class="ph1 white black--text f3 fw5 font-mono">{{computed.activeLength}}</span> out of <span class="ph1 white black--text font-mono">{{computed.totalLength}}</span> videos,
    <br>
    sorted by <span class="ph1 indigo font-mono">{{state.sortBy}}</span>
    in <span class="ph1 indigo font-mono">{{state.sortAscending ? 'ascending' : 'descending'}}</span> order.
  </p>
</div>
</template>

<script>
export default {
  name: 'StateStory',
  data: function () {
    return {
    }
  },
  props: {
    state: {
      type: Object,
    },
    computed: {
      type: Object,
    },
  },
  methods: {
    toggleSubjectFilter (subjectFilter) {
      this.$emit('toggle-subject-filter', subjectFilter)
    },
    toggleLocationFilter (locationFilter) {
      this.$emit('toggle-location-filter', locationFilter)
    },
  },
}
</script>