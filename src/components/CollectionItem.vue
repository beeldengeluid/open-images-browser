<template>
  <div
    :style="{ width: width }"
    :class="{ expanded: isExpanded }"
    class="collection-item dib relative overflow-hidden v-top"
  >
    <img
      :src="thumbSrc"
      :title="title"
      @click="toggleExpanded"
      class="thumb mb-1 pointer"
    >
    <div 
      v-if="(showTitle || showYear) && !isExpanded" 
      class="absolute left-0 top-0 pa1 bg-black-50 pevents-none"
    >
      <div v-if="showTitle">{{title}}</div>
      <div v-if="showYear">{{year}}</div>
    </div>
    
    <div v-if="isExpanded" class="metadata-containter pa3 pr4">
      <h2 class="mt0 f4">{{title}}</h2>
      <div>{{year}}</div>
      <font-awesome-icon 
        icon="times"
        @click="toggleExpanded"
        class="absolute ma3 top-0 right-0 pointer"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  props: {
    width: String,
    thumbSrc: String,
    title: String,
    date: String,
    showTitle: {
      type: Boolean,
      default: false
    },
    showYear: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    year: function () {
      return this.date.slice(0,4)
    }
  },
  methods: {
    toggleExpanded: function () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style scoped>
.collection-item {
  --itemWidth: 352px;
  --itemWidthD: 704px;
  --cardBgColor: #444;
}
.expanded {
  display: flex;
  flex-wrap: wrap;
  width: 100% !important;
  max-width: var(--itemWidth);
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--cardBgColor);
}

.expanded .metadata-containter {
  position: relative;
  width: 100%;
}

.pevents-none {
  pointer-events: none;
}

@media screen and ( min-width: calc(2 * 352px + 32px)) {
  .expanded {
    max-width: 64rem;
  }
  .expanded .metadata-containter {
    position: initial;
    width: 50%;
  }
  .expanded .thumb {
    max-width: 352px;
  }
}

</style>
