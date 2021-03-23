<template>
  <div class="relative flex flex-wrap">
    <CollectionItem
      v-for="(item, index) in items"
      :key="item['id']"
      :width="100 / noThumbsPerRow + '%'"
      :item="item"
      :display-title="displayTitle"
      :display-year="displayYear"
      :display-thumb="displayThumb"
      :active-filters="activeFilters"
      :filter-counts-for-selection="filterCountsForSelection"
      :touch-mode="touchMode"
      @toggle-active-filter="$emit('toggle-active-filter', $event)"
      @open-playlist="$emit('open-playlist-at', index)"
      @open-transcript="$emit('open-transcript-at', index)"
    />
  </div>
</template>

<script>
import CollectionItem from './CollectionItem'
export default {
  name: 'CollectionItemGrid',
  components: {
    CollectionItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    noThumbsPerRow: {
      type: Number,
      default: 8,
    },
    displayFieldsSelected: {
      type: Array,
      default: () => [],
    },
    activeFilters: {
      type: Object,
      default: () => ({}),
    },
    filterCountsForSelection: {
      type: Object,
      default: () => ({}),
    },
    touchMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayTitle() {
      return this.displayFieldsSelected.includes('title')
    },
    displayYear() {
      return this.displayFieldsSelected.includes('year')
    },
    displayThumb() {
      return this.displayFieldsSelected.includes('thumb')
    },
  },
}
</script>
