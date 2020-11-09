<template>
  <div>
    <div>
      <VideoEntities
        v-if="nerSequences.length"
        class="ma2"
        ref="videoEntities"
        :nerSequences="this.nerSequences"
        @jumpToTimecode="onJumpToTimecode"
      />
    </div>
    <div class="flex flex-column flex-md-row">
      <div class="ma2">
        <h2>Video Player</h2>
        <VideoPlayer
          ref="videoPlayer"
          :videoSrc="this.videoSrc"
          :thumbSrc="this.thumbSrc"
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
        <VideoTranscript
          class="vh-50"
          ref="videoTranscript"
          @jumpToTimecode="onJumpToTimecode"
          :asrSequences="this.asrSequences"
          :nerSequences="this.nerSequences"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import VideoTranscript from "./VideoTranscript";
import VideoEntities from "./VideoEntities";

export default {
  name: "VideoComposition",
  components: { VideoPlayer, VideoTranscript, VideoEntities },
  data: function() {
    return {
      currentTime: 0,
    };
  },
  props: {
    videoSrc: {
      type: String,
    },
    thumbSrc: {
      type: String,
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
  },
};
</script>
