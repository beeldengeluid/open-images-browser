<template>
  <div class="flex expansion-container">
    <div class="expansion-left tc bg-black ba b--grey--darken-3">
      <video
        ref="gridVideo"
        :src="item.videoSrc"
        :poster="item.thumbSrc"
        :style="{ 'max-width': videoMaxWidth + 'px' }"
        controls
        width="100%"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        class="outline-0 bg-black"
        @playing="onVideoPlayChange"
        @pause="onVideoPlayChange"
      ></video>
    </div>
    <div class="expansion-right pa3 relative grey darken-3">
      <h2 class="mt0 f4 mr4">
        {{ item.title }} <span class="fw1">({{ year }})</span>
      </h2>
      <div v-if="item.subjects.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-tag</v-icon>
          <span class="v-mid">
            {{ item.subjects.length }} Subject<span
              v-if="item.subjects.length > 1"
              >s</span
            ></span
          >
        </span>
        <v-chip-group multiple column class="font-mono">
          <v-chip
            v-for="subject in item.subjects"
            :key="subject"
            :value="subject"
            label
            :class="
              activeFilters['subjects'].includes(subject)
                ? 'teal white--text'
                : ''
            "
            @click="
              $emit('toggle-active-filter', {
                type: 'subjects',
                value: subject,
              })
            "
          >
            <strong class="mr1">{{ subject }}</strong>
            <span>{{ filterCountsForSelection['subjects'][subject] }}</span>
            <v-icon right
              >{{
                activeFilters['subjects'].includes(subject)
                  ? 'mdi-close-circle'
                  : 'mdi-filter-variant'
              }}
            </v-icon>
          </v-chip>
        </v-chip-group>
      </div>
      <div v-if="item.locations.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-map-marker</v-icon>
          <span class="v-mid">
            {{ item.locations.length }} Location<span
              v-if="item.locations.length > 1"
              >s</span
            ></span
          >
        </span>
        <v-chip-group multiple column class="font-mono">
          <v-chip
            v-for="location in item.locations"
            :key="location"
            :value="location"
            label
            :class="
              activeFilters['locations'].includes(location)
                ? 'teal white--text'
                : ''
            "
            @click="
              $emit('toggle-active-filter', {
                type: 'locations',
                value: location,
              })
            "
          >
            <strong class="mr1">{{ location }}</strong>
            <span>{{ filterCountsForSelection['locations'][location] }}</span>
            <v-icon right
              >{{
                activeFilters['locations'].includes(location)
                  ? 'mdi-close-circle'
                  : 'mdi-filter-variant'
              }}
            </v-icon>
          </v-chip>
        </v-chip-group>
      </div>
      <div v-if="item.creators.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-video</v-icon>
          <span class="v-mid"> {{ item.creators.length }} Creator</span
          ><span v-if="item.creators.length > 1">s</span>
        </span>
        <div v-for="creator in item.creators" :key="creator">
          {{ creator }}
        </div>
      </div>
      <div class="flex justify-between flex-wrap">
        <div v-if="!touchMode" class="mr2 mb2">
          <a :href="item.url" target="_blank">See item on Open Images ↗︎</a>
        </div>

        <v-btn
          v-if="item.layer__asr"
          color="orange darken-2 mr2 mb2"
          @click="onTranscriptClick"
        >
          <v-icon left>mdi-subtitles</v-icon>Play Transcript
        </v-btn>

        <v-btn color="orange darken-2" @click="onPlaylistClick">
          <v-icon left>mdi-playlist-play</v-icon>Start Playlist
        </v-btn>
      </div>

      <div class="absolute ma3 top-0 right-0">
        <v-icon @click="$emit('toggle-expanded')"> mdi-close </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionItemCard',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    year: {
      type: String,
      default: 'unknown year',
    },
    videoMaxWidth: {
      type: Number,
      default: 320,
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
      isPlaying: false,
      videoElement: null,
    }
  },
  mounted() {
    this.videoElement = this.$refs.gridVideo
  },
  methods: {
    onVideoPlayChange(event) {
      this.isPlaying = !event.target.paused
    },
    onPlaylistClick() {
      this.$emit('open-playlist')
      if (this.isPlaying) {
        this.videoElement.pause()
      }
    },
    onTranscriptClick() {
      this.$emit('open-transcript')
      if (this.isPlaying) {
        this.videoElement.pause()
      }
    },
  },
}
</script>

<style scoped>
.expansion-container {
  flex-wrap: wrap;
}
.expansion-container .expansion-left {
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.expansion-container .expansion-right {
  width: 100%;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

@media screen and (min-width: 1140px) {
  .expansion-container {
    flex-wrap: nowrap;
  }
  .expansion-container .expansion-left {
    width: 320px;
    flex-shrink: 0;
    /* vertically center video */
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-right-radius: 0;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .expansion-container .expansion-right {
    flex-grow: 1;
    max-width: 64rem;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow-1 {
    flex-grow: 1;
  }
}
</style>
