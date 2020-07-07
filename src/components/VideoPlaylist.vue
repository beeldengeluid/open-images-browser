<template>
  <div class="flex flex-column">
    <div class="absolute ma3 top-0 right-0">
      <v-icon @click="$emit('close-playlist')">mdi-close</v-icon>
    </div>
    <h2 class="f4 tc mv3">
      {{ currentVideo.title }}
      <span class="fw1">({{ this.dateToYear(currentVideo.date) }})</span>
    </h2>
    <div class="relative tc">
      <video
        :src="currentVideo.videoSrc"
        :poster="currentVideo.thumbSrc"
        :autoplay="autoplayEnabled"
        @playing="onVideoPlayChange"
        @pause="onVideoPlayChange"
        @ended="onVideoEnded"
        ref="video"
        muted
        controls
        :class="stretchVideo ? 'w-100' : ''"
        class="outline-0 mw-100 mh-50vh"
      ></video>
      <div
        :class="isPaused ? 'opaque' : ''"
        class="absolute absolute-v-center w-100 flex items-center justify-between justify-around-ns hover-opacity"
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
    <div 
      :class="isPaused ? 'opaque' : ''"
      class="flex w-100 pa3 flex-grow-0 hover-opacity-semi"
    >
      <div class="absolute right-0 flex mr3">
        <span class="mr2">autoplay</span> 
        <v-switch v-model="autoplayEnabled" class="mt0 pt0"></v-switch>
      </div>
      <div v-show="listWindowStart" class="flex">
        <span class="self-center tc grey--text">{{
          `${listWindowStart} more`
        }}</span>
      </div>
      <div
        v-for="(video, index) in videosWindowed"
        :key="index"
        class="videoThumb flex flex-column bg-black mh1"
      >
        <div class="h2">
          <span v-show="index - 1 == currentVideoIndexWindowed && currentVideoIndex < videos.length - 3" class="absolute">
            Up next
          </span>
        </div>
        <img
          @click="setCurrentVideoIndex(index + listWindowStart)"
          :src="video.thumbSrc"
          :alt="video.title"
          :title="video.title"
          :class="
            index == currentVideoIndexWindowed ? 'active-border-color' : ''
          "
          class="contain-height pointer hover-border-color mh-30vh"
        />
        <div v-show="index == currentVideoIndexWindowed" class="tc pv2">
          {{ `${currentVideoIndex + 1} of ${videos.length}` }}
        </div>
      </div>
      <div v-show="listWindowEnd < videos.length" class="flex">
        <span class="self-center tc grey--text">{{
          `${videos.length - listWindowEnd} more`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlaylist",
  data: function() {
    return {
      videoElement: null,
      currentVideoIndex: 0,
      isPaused: true,
      listWindowLength: 7,
      autoplayEnabled: true,
    };
  },
  props: {
    videos: Array,
    stretchVideo: { type: Boolean, default: false },
  },
  computed: {
    currentVideo() {
      return this.videos[this.currentVideoIndex];
    },
    windowOffset() {
      return Math.floor((this.listWindowLength - 1) / 2);
    },
    listWindowStart() {
      return Math.min(
        Math.max(0, this.currentVideoIndex - this.windowOffset),
        Math.max(0, this.videos.length - this.listWindowLength)
      );
    },
    listWindowEnd() {
      return this.listWindowStart + this.listWindowLength;
    },
    videosWindowed() {
      return this.videos.slice(this.listWindowStart, this.listWindowEnd);
    },
    currentVideoIndexWindowed() {
      return this.currentVideoIndex - this.listWindowStart;
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
      let newIndex = this.currentVideoIndex + amount;
      if (newIndex >= this.videos.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = this.videos.length - 1;
      }
      this.currentVideoIndex = newIndex;
      this.isPaused = true;
    },
    toggleVideoPlay() {
      if (this.videoElement.paused) {
        this.videoElement.play();
      } else {
        this.videoElement.pause();
      }
    },
    setCurrentVideoIndex(index) {
      this.currentVideoIndex = index;
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
        this.$emit('close-playlist');
      }
    };
    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener);
  }
};
</script>

<style scoped>
.hover-border-color {
  border: 4px solid hsla(0, 0%, 100%, 0);
  transition: border-color 0.15s;
}
.hover-border-color:hover {
  border-color: hsla(0, 0%, 100%, 0.75);
}
.hover-opacity {
  opacity: 0;
  transition: opacity 1s;
}
.hover-opacity:hover {
  opacity: 1;
  transition: opacity 0.15s;
}
.hover-opacity-semi {
  opacity: 0.5;
  transition: opacity 1s;
}
.hover-opacity-semi:hover {
  opacity: 1;
  transition: opacity 0.15s;
}
.opaque {
  opacity: 1;
}
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
