<template>
  <div class="relative flex flex-wrap">
    <CollectionItem
      v-for="(item, index) in items"
      :key="item['id']"
      :width="100 / noThumbsPerRow + '%'"
      :item="item"
      :displayTitle="displayTitle"
      :displayYear="displayYear"
      :displayThumb="displayThumb"
      :activeFilters="activeFilters"
      :filterCountsForSelection="filterCountsForSelection"
      :touchMode="touchMode"
      v-on:toggle-active-filter="$emit('toggle-active-filter', $event)"
      v-on:open-playlist="$emit('open-playlist-at', index)"
    />
  </div>
</template>

<script>
import CollectionItem from "./CollectionItem";
export default {
  name: "CollectionItemGrid",
  components: {
    CollectionItem,
  },
  props: {
    items: Array,
    noThumbsPerRow: Number,
    displayFieldsSelected: Array,
    activeFilters: Object,
    filterCountsForSelection: Object,
    touchMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayTitle() {
      return this.displayFieldsSelected.includes("title");
    },
    displayYear() {
      return this.displayFieldsSelected.includes("year");
    },
    displayThumb() {
      return this.displayFieldsSelected.includes("thumb");
    },
  },
};
</script>
