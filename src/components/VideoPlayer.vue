<template>
  <div>
    <video
      ref="video"
      width="100%"
      :poster="thumbSrc"
      controls
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      class="outline-0 bg-black"
      @timeupdate="onTimeUpdate"
    >
      <source :src="videoSrc" type="video/mp4" />
      Your browser doesn't support the video element.
    </video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    videoSrc: {
      type: String,
      default: '',
    },
    thumbSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentTime: 0,
    }
  },
  methods: {
    onTimeUpdate() {
      this.currentTime = this.$refs.video.currentTime
      this.$emit('timeUpdate', this.$refs.video.currentTime)
    },
    getCurrentTime() {
      this.currentTime = this.$refs.video.currentTime
    },
    setCurrentTime(tc) {
      this.$refs.video.currentTime = tc
    },
    pauseVideo() {
      if (!this.$refs.video.paused) {
        this.$refs.video.pause()
      }
    },
  },
}
</script>
