<template>
  <div class="flex flex-column justify-between">
    <div class="absolute ma3 top-0 right-0 z-1">
      <v-icon @click="$emit('close-playlist')">mdi-close</v-icon>
    </div>
    <h2 class="f4 tc mv3">
      {{ currentItem.title }}
      <span class="fw1">({{ this.dateToYear(currentItem.date) }})</span>
    </h2>
    <div class="relative tc">
      <video
        :src="currentItem.videoSrc"
        :poster="currentItem.thumbSrc"
        :autoplay="autoplayEnabled"
        @playing="onVideoPlayChange"
        @pause="onVideoPlayChange"
        @ended="onVideoEnded"
        ref="video"
        controls
        :class="stretchVideo ? 'w-100' : ''"
        class="outline-0 mw-100 mh-50vh"
      ></video>

      <!-- playback controls -->
      <div
        :class="isPaused ? 'opaque' : ''"
        class="absolute absolute-v-center w-100 flex items-center justify-between justify-around-ns hover-opacity z-999"
      >
        <v-btn class="mh2 pe-all" fab @click="prevVideo()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn class="mh2 pe-all" fab @click="toggleVideoPlay()">
          <v-icon>
            {{ isPaused ? "mdi-play" : "mdi-pause" }}
          </v-icon>
        </v-btn>
        <v-btn class="mh2 pe-all" fab @click="nextVideo()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- video Thumbnails -->
    <div
      :class="isPaused ? 'opaque' : ''"
      class="flex w-100 pa3 flex-grow-0 hover-opacity-semi bg-black"
    >
      <div class="absolute right-0 flex mr3">
        <span class="mr2">autoplay</span>
        <v-switch
          v-model="autoplayEnabled"
          class="mt0 pt0"
          :color="color"
          hide-details
        ></v-switch>
      </div>
      <div v-show="listWindowStart" class="flex">
        <span class="self-center tc grey--text">{{
          `${listWindowStart} more`
        }}</span>
      </div>
      <div
        v-for="(item, index) in itemsWindowed"
        :key="index"
        class="flex flex-column mh1"
      >
        <div class="h2">
          <span
            v-show="
              index - 1 == currentItemIndexWindowed &&
                currentItemIndex < items.length - 3
            "
            class="absolute"
          >
            Up next
          </span>
        </div>
        <img
          @click="setCurrentItemIndex(index + listWindowStart)"
          :src="item.thumbSrc"
          :alt="item.title"
          :title="item.title"
          :class="
            index == currentItemIndexWindowed ? 'active-border-color' : ''
          "
          class="contain-height pointer hover-border-color mh-30vh"
        />
        <div v-show="index == currentItemIndexWindowed" class="tc pv2">
          {{ `${currentItemIndex + 1} of ${items.length}` }}
        </div>
      </div>
      <div v-show="listWindowEnd < items.length" class="flex">
        <span class="self-center tc grey--text">{{
          `${items.length - listWindowEnd} more`
        }}</span>
      </div>
    </div>

    <!-- related playlists -->
    <VideoPlaylistPreview 
      v-if="currentItem.locations.length"
      :thumbItem="currentItem"
      v-on:load-related-playlist="$emit('load-related-playlist', {
        type: 'locations',
        value: currentItem.locations[0],
      })"
      :title="`More ${currentItem.locations[0]}`" 
      :class="isPaused ? 'opaque' : ''"
      class="absolute left-0 top-0 ma3 mt6 w-20 mw5 hover-opacity-semi"
    >
      <h4 class="mb2 grey--text">
        More
        <v-chip label small class="ml1 teal white--text font-mono">
          <v-icon small left>mdi-map-marker</v-icon>
          <strong>{{currentItem.locations[0]}}</strong>
        </v-chip>
      </h4>
    </VideoPlaylistPreview>

    <VideoPlaylistPreview 
      v-if="currentItem.subjects.length"
      :thumbItem="currentItem"
      v-on:load-related-playlist="$emit('load-related-playlist', {
        type: 'subjects',
        value: currentItem.subjects[0],
      })"
      :title="`More ${currentItem.subjects[0]}`" 
      class="absolute right-0 top-0 ma3 mt6 w-20 mw5"
    >
      <h4 class="mb2 grey--text">
        More
        <v-chip label small class="ml1 teal white--text font-mono">
          <v-icon small left>mdi-tag</v-icon>
          <strong>{{currentItem.subjects[0]}}</strong>
        </v-chip>
      </h4>
    </VideoPlaylistPreview>

  </div>
</template>

<script>
import VideoPlaylistPreview from "./VideoPlaylistPreview";
export default {
  name: "VideoPlaylist",
  components: {
    VideoPlaylistPreview,
  },
  data: function() {
    return {
      videoElement: null,
      currentItemIndex: 0,
      isPaused: true,
      listWindowLength: 7,
      autoplayEnabled: false,
    };
  },
  props: {
    items: Array,
    stretchVideo: { type: Boolean, default: false },
    color: { type: String, default: "orange" },
  },
  computed: {
    currentItem() {
      return this.items[this.currentItemIndex];
    },
    windowOffset() {
      return Math.floor((this.listWindowLength - 1) / 2);
    },
    listWindowStart() {
      return Math.min(
        Math.max(0, this.currentItemIndex - this.windowOffset),
        Math.max(0, this.items.length - this.listWindowLength)
      );
    },
    listWindowEnd() {
      return this.listWindowStart + this.listWindowLength;
    },
    itemsWindowed() {
      return this.items.slice(this.listWindowStart, this.listWindowEnd);
    },
    currentItemIndexWindowed() {
      return this.currentItemIndex - this.listWindowStart;
    },
  },
  methods: {
    onVideoPlayChange(event) {
      this.isPaused = event.target.paused;
    },
    onVideoEnded() {
      this.nextVideo();
    },
    prevVideo() {
      this.advanceVideo(-1);
    },
    nextVideo() {
      this.advanceVideo(1);
    },
    advanceVideo(amount) {
      let newIndex = this.currentItemIndex + amount;
      if (newIndex >= this.items.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = this.items.length - 1;
      }
      this.currentItemIndex = newIndex;
      this.isPaused = true;
    },
    toggleVideoPlay() {
      if (this.videoElement.paused) {
        this.videoElement.play();
      } else {
        this.videoElement.pause();
      }
    },
    setCurrentItemIndex(index) {
      this.currentItemIndex = index;
    },
    dateToYear(date) {
      return date.slice(0, 4);
    },
  },
  mounted() {
    this.videoElement = this.$refs.video;

    this._keyListener = function(e) {
      if (e.key === "ArrowLeft") {
        this.prevVideo();
      }
      if (e.key === "ArrowRight") {
        this.nextVideo();
      }
      if (e.key === "Escape") {
        this.$emit("close-playlist");
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>

<style scoped>
.active-border-color {
  border-width: 4px;
  border-color: #fff;
}
.contain-height {
  max-height: 100%;
  object-fit: contain;
}
.absolute-v-center {
  top: 50%;
  transform: translateY(-50%);
}
.flex-grow-0 {
  flex-grow: 0;
}
.mh-50vh {
  max-height: 50vh;
}
.mh-30vh {
  max-height: 30vh;
}
</style>
