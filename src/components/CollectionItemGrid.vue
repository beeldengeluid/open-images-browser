<template>
  <div class="relative dflex flex-wrap">
    <CollectionItem
      v-for="item in items"
      :key="item['id']"
      :width="itemWidth + 'px'"
      :height="itemHeight + 'px'"
      :item="item"
      :displayTitle="displayTitle"
      :displayYear="displayYear"
      :displayThumb="displayThumb"
      :activeFilters="activeFilters"
      :filterCountsForSelection="filterCountsForSelection"
      v-on:toggle-active-filter="$emit('toggle-active-filter', $event)"
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
    width: String,
    items: Array,
    itemWidth: Number,
    itemHeight: Number,
    displayFieldsSelected: Array,
    activeFilters: Object,
    filterCountsForSelection: Object,
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
