<template>
  <div>
    <div>
      <ASREntities
        v-if="nerSequences.length"
        class="ma2"
        ref="videoEntities"
        :nerSequences="nerSequences"
        @jumpToTimecode="onJumpToTimecode"
      />
    </div>
    <div class="flex flex-column flex-md-row">
      <div class="ma2">
        <h2>Video Player</h2>
        <VideoPlayer
          ref="videoPlayer"
          :videoSrc="videoSrc"
          :thumbSrc="thumbSrc"
          @timeUpdate="onTimeUpdate"
        />
      </div>
      <div class="ma2">
        <h2>
          Video Transcript
          <span class="f5 fw1">
            (
            <span class="font-mono i">recognised from video</span> 🤖)
          </span>
        </h2>
        <ASRTranscript
          class="vh-50"
          ref="videoTranscript"
          @jumpToTimecode="onJumpToTimecode"
          :asrSequences="asrSequences"
          :nerSequences="nerSequences"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import ASRTranscript from "./ASRTranscript";
import ASREntities from "./ASREntities";

export default {
  components: { VideoPlayer, ASRTranscript, ASREntities },
  data: function() {
    return {
      currentTime: 0,
    };
  },
  props: {
    videoSrc: {
      type: String,
      default: "",
    },
    thumbSrc: {
      type: String,
      default: "",
    },
    asrSequences: {
      type: Array,
      default: () => [],
    },
    nerSequences: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onJumpToTimecode(tc) {
      // set videoPlayer CurrentTime to Timecode tc in seconds
      this.$refs.videoPlayer.setCurrentTime(tc);
    },
    onTimeUpdate(tc) {
      this.$refs.videoTranscript.setCurrentTime(tc);
      if (this.nerSequences.length) {
        this.$refs.videoEntities.setCurrentTime(tc);
      }
    },
    pauseVideo() {
      this.$refs.videoPlayer.pauseVideo();
    },
  },
};
</script>
