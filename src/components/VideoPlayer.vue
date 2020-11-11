<template>
  <div>
    <video 
      width="100%" 
      ref="video" 
      @timeupdate="onTimeUpdate"
      :poster="thumbSrc"
      controls 
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      class="outline-0 bg-black"
    >
      <source :src="videoSrc" type="video/mp4" />
      Your browser doesn't support the video element.
    </video>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  data: function() {
    return {
      currentTime: 0,
    };
  },
  props: {
    videoSrc: { type: String },
    thumbSrc: { type: String },
  },
  methods: {
    onTimeUpdate() {
      this.currentTime = this.$refs.video.currentTime;
      this.$emit("timeUpdate", this.$refs.video.currentTime);
    },
    getCurrentTime() {
      this.currentTime = this.$refs.video.currentTime;
    },
    setCurrentTime(tc) {
      this.$refs.video.currentTime = tc;
    },
    pauseVideo() {
      if (!this.$refs.video.paused) {
        this.$refs.video.pause();
      } 
    },
  },
};
</script>
