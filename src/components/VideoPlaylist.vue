<template>
  <div class="flex flex-column">
    <div class="tr">
      <v-icon @click="$emit('toggle-playlist')" class="pa2 pointer">mdi-close</v-icon>
    </div>
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
        class="outline-0 mw-100"
      ></video>
      <div
        class="absolute absolute-v-center w-100 flex items-center justify-between hover-opacity"
      >
        <v-btn class="mh2 pe-all" fab @click="prevVideo()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn class="mh2 pe-all" fab @click="pauseVideo()" v-show="!isPaused">
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn class="mh2 pe-all" fab @click="playVideo()" v-show="isPaused">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn class="mh2 pe-all" fab @click="nextVideo()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="flex w-100 pa2 mh-tilcontrols flex-grow">
      <div
        v-for="(video, index) in videos"
        :key="index"
        @click="setCurrentVideoIndex(index)"
        :class="currentVideoIndex == index ? 'active' : ''"
        class="videoThumb pointer hover-border-color flex justify-center items-center bg-black mh1"
      >
        <img
          :src="video.thumbSrc"
          :alt="`playlist video ${index}`"
          class="contain-height"
        />
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
    };
  },
  props: {
    videos: Array,
    autoplayEnabled: { type: Boolean, default: true },
    stretchVideo: { type: Boolean, default: false },
  },
  computed: {
    currentVideo() {
      return this.videos[this.currentVideoIndex];
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
      let newIndex = this.currentVideoIndex - 1;
      if (newIndex < 0) {
        newIndex = this.videos.length - 1;
      }
      this.currentVideoIndex = newIndex;
    },
    nextVideo() {
      let newIndex = this.currentVideoIndex + 1;
      if (newIndex >= this.videos.length) {
        newIndex = 0;
      }
      this.currentVideoIndex = newIndex;
    },
    pauseVideo() {
      this.videoElement.pause();
    },
    playVideo() {
      this.videoElement.play();
    },
    setCurrentVideoIndex(index) {
      this.currentVideoIndex = index;
    },
  },
  mounted() {
    this.videoElement = this.$refs.video;
  }
};
</script>

<style scoped>
.hover-border-color {
  border: 1px solid #333;
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

.mh-tilcontrols {
  max-height: calc(50% - 28px);
}

.videoThumb.active {
  border-width: 2px;
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
.flex-grow {
  flex-grow: 0;
}
</style>
