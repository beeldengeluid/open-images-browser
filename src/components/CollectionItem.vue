<template>
  <div
    :style="[!isExpanded ? { width: width } : {}]"
    :class="{ 'is-expanded': isExpanded }"
    class="collection-item relative pa1 shadow-2 overflow-hidden"
  >
    <CollectionItemThumbnail
      v-if="!isExpanded"
      :thumb-src="item.thumbSrc"
      :title="item.title"
      :year="year"
      :display-title="displayTitle"
      :display-year="displayYear"
      :display-thumb="displayThumb"
      @toggle-expanded="toggleExpanded"
    />
    <CollectionItemCard
      v-else
      :item="item"
      :year="year"
      :video-max-width="videoMaxWidth"
      :active-filters="activeFilters"
      :filter-counts-for-selection="filterCountsForSelection"
      :touch-mode="touchMode"
      @toggle-expanded="toggleExpanded"
      @toggle-active-filter="$emit('toggle-active-filter', $event)"
      @open-playlist="$emit('open-playlist')"
      @open-transcript="$emit('open-transcript')"
    />
  </div>
</template>

<script>
import CollectionItemThumbnail from './CollectionItemThumbnail'
import CollectionItemCard from './CollectionItemCard'
export default {
  name: 'CollectionItem',
  components: {
    CollectionItemThumbnail,
    CollectionItemCard,
  },
  props: {
    width: {
      type: String,
      default: '50%',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    displayTitle: {
      type: Boolean,
      default: false,
    },
    displayYear: {
      type: Boolean,
      default: false,
    },
    displayThumb: {
      type: Boolean,
      default: true,
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
  data() {
    return {
      isExpanded: false,
      videoMaxWidth: 320,
    }
  },
  computed: {
    year() {
      return this.item.date.slice(0, 4)
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style scoped>
.collection-item {
  --itemThumbWidth: 320px;
  --cardBgColor: #444;
}

.is-expanded {
  flex: 0 1 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  height: auto !important;
}
</style>
