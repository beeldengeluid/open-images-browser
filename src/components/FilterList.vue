<template>
  <div
    class="filter-list"
  >
    <div v-for="filter in filtersToDisplay" :key="filter.name">
      <v-chip
        @click="$emit('toggle-filter', filter.name)"
        :value="filter.name"
        :class="activeFilters.includes(filter.name) ? activeClass +' white--text' : ''"
        label small
        class="font-mono"
        :title="`${filter.name} (${filter.count})`"
      >
        <strong class="mr1">{{ filter.name }}</strong><span>{{filter.count}}</span>
        <v-icon right small>{{activeFilters.includes(filter.name) ? 'cancel' : 'filter_list'}} </v-icon>
      </v-chip>
    </div>
    <div>
      <div v-if="isTailHidden" class="mt2 w4-5 f6">
        ... long tail of {{tail.length}} single occurrences hidden
      </div>
      <v-btn 
        v-if="hasLongTail" 
        @click="toggleTail"
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
      threshold: 30,
      isTailDesired: false,
    }
  },
  props: {
    filters: { type: Array },
    activeFilters: { type: Array },
    activeClass: { type: String, default: '' },
  },
  computed: {
    head () {
      return this.filters.filter(filter => filter.count > 1)
    },
    tail () {
      return this.filters.filter(filter => filter.count == 1)
    },
    hasLongTail () {
      return this.tail.length > this.threshold
    },
    isTailHidden () {
      return this.hasLongTail && !this.isTailDesired
    },
    filtersToDisplay () {
      return this.isTailHidden ? this.head : this.filters
    },
  },
  methods: {
    toggleTail () {
      this.isTailDesired = !this.isTailDesired
      this.$emit('toggle-tail', this.isTailDesired)
    },
  },
}
</script>
<style scoped>
.w4-5 {
  width: 10rem;
}
</style>