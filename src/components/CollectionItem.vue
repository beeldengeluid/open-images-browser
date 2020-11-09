<template>
  <div
    :style="[!isExpanded ? { width: width } : {}]"
    :class="{ 'is-expanded': isExpanded }"
    class="collection-item relative pa1 shadow-2 overflow-hidden"
  >
    <CollectionItemThumbnail
      v-if="!isExpanded"
      @toggle-expanded="toggleExpanded"
      :thumbSrc="item.thumbSrc"
      :title="item.title"
      :year="year"
      :displayTitle="displayTitle"
      :displayYear="displayYear"
      :displayThumb="displayThumb"
    />
    <CollectionItemCard
      v-else
      @toggle-expanded="toggleExpanded"
      @toggle-active-filter="$emit('toggle-active-filter', $event)"
      @open-playlist="$emit('open-playlist')"
      :item="item"
      :year="year"
      :videoMaxWidth="videoMaxWidth"
      :activeFilters="activeFilters"
      :filterCountsForSelection="filterCountsForSelection"
      :touchMode="touchMode"
    />
  </div>
</template>

<script>
import CollectionItemThumbnail from "./CollectionItemThumbnail";
import CollectionItemCard from "./CollectionItemCard";
export default {
  name: "CollectionItem",
  components: {
    CollectionItemThumbnail,
    CollectionItemCard,
  },
  data: function() {
    return {
      isExpanded: false,
      videoMaxWidth: 320,
    };
  },
  props: {
    width: String,
    item: Object,
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
    activeFilters: Object,
    filterCountsForSelection: Object,
    touchMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    year() {
      return this.item.date.slice(0, 4);
    },
  },
  methods: {
    toggleExpanded: function() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
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
