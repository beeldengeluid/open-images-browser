<template>
  <div
    :style="{ width: width, height: height }"
    :class="{ 'is-expanded': isExpanded }"
    class="collection-item relative grow-nonexpanded mr1 mb1 shadow-2 overflow-hidden"
  >
    <div
      v-if="!isExpanded"
      @click="toggleExpanded"
      class="h-100 bg-black pointer"
    >
      <v-lazy
        :options="{ threshold: 0.1 }"
        transition="fade-transition"
        class="h-100"
      >
        <v-hover>
          <div slot-scope="{ hover }">
            <img
              v-if="displayThumb"
              :src="thumbSrc"
              :title="title"
              class="absolute top-0 bottom-0 m-auto"
            />
            <div
              v-if="displayTitle"
              class="absolute top-0 left-0 pa1 bg-black-50 pevents-none f6 lh-solid"
            >
              {{ title }}
            </div>
            <div
              v-if="displayYear"
              class="absolute bottom-0 left-0 pa1 bg-black-50 pevents-none f6 lh-solid"
            >
              {{ year }}
            </div>
            <transition name="fade">
              <div v-if="hover" class="absolute right-0 bottom-0">
                <v-icon>mdi-fullscreen</v-icon>
              </div>
            </transition>
          </div>
        </v-hover>
      </v-lazy>
    </div>

    <div v-if="isExpanded" class="flex expansion-container">
      <div class="expansion-left tc bg-black ba b--grey--darken-3">
        <video
          :src="videoSrc"
          :poster="thumbSrc"
          :style="{ 'max-width': videoMaxWidth + 'px' }"
          controls
          width="100%"
          class="outline-0 bg-black"
        ></video>
      </div>
      <div class="expansion-right pa3 pr4 relative grey darken-3">
        <h2 class="mt0 f4">
          {{ title }} <span class="fw1">({{ year }})</span>
        </h2>
        <div v-if="subjects.length" class="mv2">
          <span class="fw6">
            <v-icon small>mdi-tag</v-icon>
            <span class="v-mid">
              {{ subjects.length }} Subject<span v-if="subjects.length > 1"
                >s</span
              ></span
            >
          </span>
          <v-chip-group multiple column class="font-mono">
            <v-chip
              v-for="subject in subjects"
              :key="subject"
              :value="subject"
              @click="$emit('toggle-active-filter', 'subjects', subject)"
              label
              :class="
                activeSubjectFilters.includes(subject) ? 'teal white--text' : ''
              "
            >
              <strong class="mr1">{{ subject }}</strong>
              <span>{{ subjectCountsForSelection[subject] }}</span>
              <v-icon right
                >{{
                  activeSubjectFilters.includes(subject)
                    ? "mdi-close-circle"
                    : "mdi-filter-variant"
                }}
              </v-icon>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="locations.length" class="mv2">
          <span class="fw6">
            <v-icon small>mdi-map-marker</v-icon>
            <span class="v-mid">
              {{ locations.length }} Location<span v-if="locations.length > 1"
                >s</span
              ></span
            >
          </span>
          <v-chip-group multiple column class="font-mono">
            <v-chip
              v-for="location in locations"
              :key="location"
              :value="location"
              @click="$emit('toggle-active-filter', 'locations', location)"
              label
              :class="
                activeLocationFilters.includes(location)
                  ? 'teal white--text'
                  : ''
              "
            >
              <strong class="mr1">{{ location }}</strong>
              <span>{{ locationCountsForSelection[location] }}</span>
              <v-icon right
                >{{
                  activeLocationFilters.includes(location)
                    ? "mdi-close-circle"
                    : "mdi-filter-variant"
                }}
              </v-icon>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="creators.length" class="mv2">
          <span class="fw6">
            <v-icon small>mdi-video</v-icon>
            <span class="v-mid"> {{ creators.length }} Creator</span
            ><span v-if="creators.length > 1">s</span>
          </span>
          <div v-for="creator in creators" :key="creator">
            {{ creator }}
          </div>
        </div>
        <div class="mt3">
          <a :href="url" target="_blank">See item on Open Images ↗︎</a>
        </div>
        <v-icon
          @click="toggleExpanded"
          class="absolute ma3 top-0 right-0 pointer"
          >mdi-close</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectionItem",
  data: function() {
    return {
      isExpanded: false,
      videoMaxWidth: 320,
    };
  },
  props: {
    width: String,
    height: String,
    thumbSrc: String,
    videoSrc: String,
    title: String,
    date: String,
    url: String,
    subjects: Array,
    creators: Array,
    locations: Array,
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
    activeLocationFilters: Array,
    activeSubjectFilters: Array,
    locationCountsForSelection: Object,
    subjectCountsForSelection: Object,
  },
  computed: {
    year: function() {
      return this.date.slice(0, 4);
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

.grow-nonexpanded:not(.is-expanded) {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.grow-nonexpanded:not(.is-expanded):hover,
.grow-nonexpanded:not(.is-expanded):focus {
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
  width: 100%;
}

@media screen and (min-width: 1140px) {
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

.m-auto {
  margin: auto;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}

.b--grey--darken-3 {
  border-color: #424242;
}
</style>
