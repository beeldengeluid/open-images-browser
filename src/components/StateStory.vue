<template>
<div class="mv3">
  <p>
    <span>The current selection, ranging from </span><span class="ph1 blue white--text">{{computed.selectedYearRange[0]}}</span> to <span class="ph1 blue white--text">{{computed.selectedYearRange[1]}}</span>
    <span v-if="state.activeLocationFilters.length || state.activeSubjectFilters.length">, filtered for</span>
    <span v-if="state.activeLocationFilters.length">
      <v-chip  
        v-for="locationFilter in state.activeLocationFilters" :key="locationFilter"
        :value="locationFilter"
        label small class="ml1 white--text font-mono teal"
        @click="toggleLocationFilter(locationFilter)"
      >
        <strong class="mr1">{{ locationFilter }}</strong>
        <v-icon small right>cancel</v-icon>
      </v-chip>
    </span>
    <span v-if="state.activeSubjectFilters.length">
        <v-chip  
          v-for="subjectFilter in state.activeSubjectFilters" :key="subjectFilter"
          :value="subjectFilter"
          label small class="ml1 white--text font-mono cyan"
          @click="toggleSubjectFilter(subjectFilter)"
        >
          <strong class="mr1">{{ subjectFilter }}</strong>
          <v-icon small right>cancel</v-icon>
        </v-chip>
    </span>
    <span v-if="state.activeLocationFilters.length || state.activeSubjectFilters.length">,</span>
    <span> contains </span><span class="ph1 indigo white--text">{{computed.activeLength}}</span><span> out of {{computed.totalLength}} videos.</span>
    <br>
    <span>Videos are sorted by </span><span class="ph1 deep-purple font-mono">{{state.sortBy}}</span><span> in </span>
    <span class="ph1 deep-purple">
      {{state.sortAscending ? 'ascending' : 'descending'}} 
    </span> order.
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

<style scoped>

</style>
