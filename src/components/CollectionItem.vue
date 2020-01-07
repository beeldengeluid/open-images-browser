<template>
  <div
    :style="{ width: width, height: height }"
    :class="{ 'state-expanded': isExpanded }"
    class="collection-item dib relative v-top grow-nonexpanded mr1 mb1"
  >
    <v-lazy
      :options="{
        threshold: .5
      }"
      transition="fade-transition"
      class="dib"
    >
      <div>
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
          <h2 class="mt0 f4">{{title}} <span class="fw1">({{year}})</span></h2>
          <div>
            <span v-if="subjects.length">Subjects:</span>
            <v-chip-group
              column
            >
              <v-chip 
                v-for="subject in subjects" 
                :key="subject"
                label
                outlined
                small
                class="ma1"
              >
                <span>{{ subject }}</span>
              </v-chip>
            </v-chip-group>
          </div>
          <div>
            <span v-if="locations.length">Locations:</span>
            <v-chip-group
              column
            >
              <v-chip 
                v-for="location in locations" 
                :key="location"
                label
                outlined
                small
                class="ma1"
              >
                <span>{{ location }}</span>
              </v-chip>
            </v-chip-group>
          </div>
          <div>
            <span v-if="creators.length">Creators:</span>
            <v-chip-group
              column
            >
              <v-chip 
                v-for="creator in creators" 
                :key="creator"
                label
                outlined
                small
                class="ma1"
              >
                <span>{{ creator }}</span>
              </v-chip>
            </v-chip-group>
          </div>
          <font-awesome-icon 
            icon="times"
            @click="toggleExpanded"
            class="absolute ma3 top-0 right-0 pointer"
          />
          <a 
            :href="url" 
            target="_blank"
          >
            See item on Open Images ↗︎
          </a>
        </div>
      </div>
    </v-lazy>
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
  --itemThumbWidth: 352px;
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

.state-expanded {
  display: flex;
  flex-wrap: wrap;
  width: 100% !important;
  height: auto !important;
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
