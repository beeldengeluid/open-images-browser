<template>
  <div
    :style="{ width: width }"
    :class="{ 'state-expanded': isExpanded }"
    class="collection-item dib relative v-top"
  >
    <img
      v-if="!isExpanded"
      :src="thumbSrc"
      :title="title"
      @click="toggleExpanded"
      class="pointer"
    >
    <div 
      v-if="!isExpanded && (showTitle || showYear)" 
      class="absolute left-0 top-0 pa1 bg-black-50 pevents-none"
    >
      <div v-if="showTitle">{{title}}</div>
      <div v-if="showYear">{{year}}</div>
    </div>
    <video 
      v-if="isExpanded"
      :src="videoSrc"
      :poster="thumbSrc"
      controls
      width="100%"
      class="mwItemThumbWidth outline-0 bg-black">
    </video>
    <div v-if="isExpanded" class="relative static-notsmall w-100 w-50-notsmall pa3 pr4">
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
  data: function () {
    return {
      isExpanded: false,
    }
  },
  props: {
    width: String,
    thumbSrc: String,
    videoSrc: String,
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
  --itemThumbWidth: 352px;
  --cardBgColor: #444;
}

.state-expanded {
  display: flex;
  flex-wrap: wrap;
  width: 100% !important;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--cardBgColor);
  max-width: var(--itemThumbWidth);
}

.pevents-none {
  pointer-events: none;
}

.mwItemThumbWidth {
  max-width: var(--itemThumbWidth);
}

@media screen and ( min-width: calc(2 * 352px + 32px)) {
  .state-expanded {
    max-width: 64rem;
  }
  .static-notsmall {
    position: static;
  }
  .w-50-notsmall {
    width: 50%;
  }
}

</style>
