<template>
  <div
    :style="{ width: width, height: height }"
    :class="{ 'is-expanded': isExpanded }"
    class="collection-item mr1 mb1"
  >
    <v-lazy
      :options="{ threshold: .1 }"
      transition="fade-transition"
    >
      <div>
        <div v-if="!isExpanded" class="relative"> <!-- the collapsed version -->
          <img
            :src="thumbSrc"
            :title="title"
            @click="toggleExpanded"
            class="pointer"
          >
          <div 
            v-if="showTitle || showYear" 
            class="absolute left-0 top-0 pa1 bg-black-50 pevents-none"
          >
            <div v-if="showTitle">{{title}}</div>
            <div v-if="showYear">{{year}}</div>
          </div>
        </div>
      </div>
    </v-lazy>

    <div v-if="isExpanded" class="flex expansion-container"> <!-- the expanded version -->
      <div class="expansion-left tc bg-black">
        <video 
          :src="videoSrc"
          :poster="thumbSrc"
          :style="{ 'max-width': videoMaxWidth+'px' }"
          controls
          width="100%"
          class="outline-0 bg-black">
        </video>
      </div>
      <div class="expansion-right pa3 pr4 relative">
        <h2 class="mt0 f4">{{title}} <span class="fw1">({{year}})</span></h2>
        <div v-if="subjects.length" class="mv2">
          <span class="fw6"><v-icon small>local_offer</v-icon><span class="v-mid"> {{subjects.length}} Subject<span v-if="subjects.length > 1">s</span></span></span>
          <v-chip-group column>
            <v-chip 
              v-for="subject in subjects" 
              :key="subject"
              label
              outlined
            >
              <span>{{ subject }}</span>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="locations.length" class="mv2">
          <span class="fw6"><v-icon small>room</v-icon><span class="v-mid"> {{locations.length}} Location<span v-if="locations.length > 1">s</span></span></span>
          <v-chip-group column>
            <v-chip 
              v-for="location in locations" 
              :key="location"
              label
              outlined
            >
              <span>{{ location }}</span>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="creators.length" class="mv2">
          <span class="fw6"><v-icon small>videocam</v-icon><span class="v-mid"> {{creators.length}} Creator</span><span v-if="creators.length > 1">s</span></span>
            <div 
              v-for="creator in creators" 
              :key="creator"
            >
              {{ creator }}
            </div>
        </div>
        <div class="mt3">
          <a :href="url" target="_blank">
            See item on Open Images ↗︎
          </a>
        </div>
        <font-awesome-icon 
          icon="times"
          @click="toggleExpanded"
          class="absolute ma3 top-0 right-0 pointer"
        />
      </div>
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
    height: String,
    videoMaxWidth: Number,
    thumbSrc: String,
    videoSrc: String,
    title: String,
    date: String,
    url: String,
    subjects: Array,
    creators: Array,
    locations: Array,
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
  --itemThumbWidth: 320px;
  --cardBgColor: #444;
}

.grow-nonexpanded:not(.state-expanded) {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.grow-nonexpanded:not(.state-expanded):hover,
.grow-nonexpanded:not(.state-expanded):focus {
  transform: scale(1.05);
  z-index: 1;
}

.pevents-none {
  pointer-events: none;
}

.is-expanded {
  flex: 0 1 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  height: auto !important;
}
.is-expanded .expansion-container {
  flex-wrap: wrap;
}
.is-expanded .expansion-container .expansion-left {
  width: 100%;
}
.is-expanded .expansion-container .expansion-right {
  background-color: var(--cardBgColor);
  width: 100%;
}

@media screen and ( min-width: calc(2 * 352px + 32px)) {
  .is-expanded .expansion-container {
    flex-wrap: nowrap;
  }
  .is-expanded .expansion-container .expansion-left {
    width: 320px;
    flex-shrink: 0;
    /* vertically center video */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .is-expanded .expansion-container .expansion-right {
    flex-grow: 1;
    max-width: 64rem;
  }
}

</style>
