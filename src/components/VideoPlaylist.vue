<template>
  <div class="relative" :style="{ 'max-width': videoWidth + 'px' }">
    <video
      :src="currentVideo.videoSrc"
      :poster="currentVideo.thumbSrc"
      :autoplay="autoplayEnabled"
      @playing="onVideoPlayChange"
      @pause="onVideoPlayChange"
      @ended="onVideoEnded"
      muted
      controls
      :style="{
        width: videoWidth + 'px',
        height: videoHeight + 'px',
      }"
      class="w-100"
    ></video>
    <div class="flex w-100 mb2">
      <div
        v-for="(video, index) in videos"
        :key="index"
        @click="setCurrentVideoIndex(index)"
        :class="currentVideoIndex == index ? 'active' : ''"
        class="videoThumb pointer border-color-hover flex items-center"
      >
        <img :src="video.thumbSrc" :alt="`playlist video ${index}`" />
      </div>
    </div>
    <div class="flex w-100 justify-between">
      <v-btn @click="prevVideo()">
        <v-icon left>mdi-arrow-left</v-icon>Prev
      </v-btn>
      <v-btn @click="pauseVideo()" v-show="!paused">
        <v-icon left>mdi-pause</v-icon>Pause
      </v-btn>
      <v-btn @click="playVideo()" v-show="paused">
        <v-icon left>mdi-play</v-icon>Play
      </v-btn>
      <v-btn @click="nextVideo()">
        <v-icon left>mdi-arrow-right</v-icon>Next
      </v-btn>
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
      paused: null,
      videoWidth: 320,
      videoHeight: 240,
    };
  },
  props: {
    videos: Array,
    autoplayEnabled: { type: Boolean, default: true },
  },
  computed: {
    currentVideo() {
      return this.videos[this.currentVideoIndex];
    },
  },
  methods: {
    onVideoPlayChange(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    onVideoEnded(event) {
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
};
</script>

<style scoped>
.border-color-hover {
  border: 1px solid #333;
  transition: border-color 0.15s;
}
.border-color-hover:hover {
  border-color: hsla(0, 0%, 100%, 0.55);
}

.videoThumb.active {
  border-color: #fff;
}
</style>
