<template>
  <div
    class="filter-list"
  >
    <div v-for="filter in filtersShown" :key="filter.name">
      <v-chip
        @click="$emit('toggle-filter', filter.name)"
        :value="filter.name"
        :class="activeFilters.includes(filter.name) ? 'cyan white--text' : ''"
        label small
        class="font-mono"
      >
        <strong class="mr1">{{ filter.name }}</strong><span>{{filter.count}}</span>
        <v-icon right small>{{activeFilters.includes(filter.name) ? 'cancel' : 'filter_list'}} </v-icon>
      </v-chip>
    </div>
    <div>
      <div v-if="thresholdReached && isTailHidden" class="mt2 w4 f6">
        ... long tail of single occurences hidden
      </div>
      <v-btn 
        v-if="thresholdReached" 
        @click="toggleTailHidden"
        class="mt2" outlined 
      >
        {{isTailHidden ? 'Show all' : 'Hide long tail'}}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  data: function () {
    return {
      threshold: 50,
      isTailHidden: true
    }
  },
  props: {
    filters: {
      type: Array,
    },
    activeFilters: {
      type: Array,
    },
  },
  computed: {
    thresholdReached () {
      return this.filters.length > this.threshold
    },
    filtersHead () {
      return this.filters
        .filter(filter => this.filterFilterLongtail(filter, this.thresholdReached, this.isTailHidden))
    },
    filtersShown () {
      return this.isTailHidden ? this.filtersHead : this.filters
    },
  },
  methods: {
    toggleTailHidden () {
      this.isTailHidden = !this.isTailHidden
    },
    filterFilterLongtail (filter, thresholdReached, limitFilterList) {
      return (!thresholdReached) 
              ? true
              : limitFilterList
              ? filter.count > 1
              : true
    },
  },
}
</script>

<style scoped>

</style>
