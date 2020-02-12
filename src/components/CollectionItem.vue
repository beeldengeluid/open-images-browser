<template>
  <div
    :style="{ width: width, height: height }"
    :class="{ 'is-expanded': isExpanded }"
    class="collection-item relative grow-nonexpanded mr1 mb1"
  >
    <div @click="toggleExpanded" v-if="!isExpanded" class="h-100 bg-black pointer"> <!-- the collapsed version -->
      <v-lazy :options="{ threshold: .1 }" transition="fade-transition" class="h-100">
        <div>
          <img
            v-if="displayThumb"
            :src="thumbSrc"
            :title="title"
            class="absolute top-0 bottom-0 m-auto"
          >
          <div v-if="displayTitle || displayYear" class="absolute left-0 top-0 pa1 bg-black-50 pevents-none">
            <div v-if="displayTitle">{{title}}</div>
            <div v-if="displayYear">{{year}}</div>
          </div>
        </div>
      </v-lazy>
    </div>

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
      <div class="expansion-right pa3 pr4 relative grey darken-3">
        <h2 class="mt0 f4">{{title}} <span class="fw1">({{year}})</span></h2>
        <div v-if="subjects.length" class="mv2">
          <span class="fw6">
            <v-icon small>room</v-icon>
            <span class="v-mid"> {{subjects.length}} Subject<span v-if="subjects.length > 1">s</span></span>
          </span>
          <v-chip-group
            multiple
            column 
            class="font-mono"
          >
            <v-chip  
              v-for="subject in subjects" :key="subject" 
              :value="subject"
              @click="toggleSubjectFilter(subject)"
              label
              :class="subjectFilters.includes(subject) ? 'teal white--text' : ''"
            >
              <strong class="mr1">{{ subject }}</strong>
              <span>({{subjectCountsForSelection[subject]}})</span>
              <v-icon right>{{subjectFilters.includes(subject) ? 'cancel' : 'filter_list'}} </v-icon>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="locations.length" class="mv2">
          <span class="fw6">
            <v-icon small>room</v-icon>
            <span class="v-mid"> {{locations.length}} Location<span v-if="locations.length > 1">s</span></span>
          </span>
          <v-chip-group
            multiple
            column 
            class="font-mono"
          >
            <v-chip  
              v-for="location in locations" :key="location" 
              :value="location"
              @click="toggleLocationFilter(location)"
              label
              :class="locationFilters.includes(location) ? 'teal white--text' : ''"
            >
              <strong class="mr1">{{ location }}</strong>
              <span>({{locationCountsForSelection[location]}})</span>
              <v-icon right>{{locationFilters.includes(location) ? 'cancel' : 'filter_list'}} </v-icon>
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="creators.length" class="mv2">
          <span class="fw6">
            <v-icon small>videocam</v-icon>
            <span class="v-mid"> {{creators.length}} Creator</span><span v-if="creators.length > 1">s</span>
          </span>
          <div v-for="creator in creators" :key="creator">
            {{ creator }}
          </div>
        </div>
        <div class="mt3">
          <a :href="url" target="_blank">See item on Open Images ↗︎</a>
        </div>
        <v-icon @click="toggleExpanded" class="absolute ma3 top-0 right-0 pointer">close</v-icon>
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
      videoMaxWidth: 320,
    }
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
      default: false
    },
    displayYear: {
      type: Boolean,
      default: false
    },
    displayThumb: {
      type: Boolean,
      default: true
    },
    locationFilters: Array,
    subjectFilters: Array,
    locationCountsForSelection: Object,
    subjectCountsForSelection: Object,
  },
  computed: {
    year: function () {
      return this.date.slice(0,4)
    },
  },
  methods: {
    toggleExpanded: function () {
      this.isExpanded = !this.isExpanded
    },
    toggleLocationFilter (locationFilter) {
      this.$emit('toggle-location-filter', locationFilter)
      this.$forceUpdate()
    },
    toggleSubjectFilter (subjectFilter) {
      this.$emit('toggle-subject-filter', subjectFilter)
      this.$forceUpdate()
    },
  },
}
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

.m-auto{
  margin: auto;
}
</style>
