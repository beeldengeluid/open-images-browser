<template>
  <div v-if="asrSequences.length" class="overflow-auto">
    <div
      class="sequence flex font-mono"
      v-for="seq in asrSequences"
      :id="seq.sequenceNr"
      :key="seq.sequenceNr"
      :data-start="seq.start"
      :class="currentSequence === seq.sequenceNr ? 'active' : ''"
      @click="$emit('jumpToTimecode', seq.start/1000)"
    >
      <div class="start">{{ convertTimecodeToClockString(seq.start/1000)}}</div>
      <div class="words i measure">{{ seq.words }}</div>
      <div v-if="nerSequences.length" class="ner w4">
        <span
          class="dib"
          v-for="(concept, index) in nerSequences[seq.sequenceNr].concepts"
          :key="index"
        >{{concept}}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="i mt3">Sorry, no Automatic Speech Recognition transcript available ¯\_(ツ)_/¯</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentTime: 0
    };
  },
  props: {
    asrSequences: {
      type: Array,
      default: () => [],
    },
    nerSequences: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentSequence: function() {
      return this.asrSequences.reduce(
        (accumulator, currentValue, currentIndex) => {
          return this.currentTime >= currentValue.start / 1000
            ? currentIndex
            : accumulator;
        },
        0
      );
    }
  },
  watch: {
    currentSequence: function(newIndex) {
      this.scrollTo(newIndex);
    }
  },
  methods: {
    setCurrentTime(tc) {
      this.currentTime = tc;
    },
    convertTimecodeToClockString(tc) {
      return this.padDigit(Math.floor(tc / 60)) + ":" + this.padDigit(tc % 60);
    },
    padDigit(digit) {
      return ("0" + digit).slice(-2);
    },
    scrollTo(seqIndex) {
      document.getElementById(seqIndex).scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    },
  }
};
</script>

<style scoped>
.sequence * {
  margin-right: 1rem;
}
.sequence .start {
  flex-grow: 0;
}
.sequence .words {
  flex-grow: 1;
}
.sequence .ner {
  flex-shrink: 0;
}

.sequence:hover {
  background-color: var(--highlight-bg-color);
  cursor: pointer;
}
.sequence.active {
  background-color: var(--active-bg-color);
  color: var(--active-text-color);
}

/* Measure is limited to ~80 characters */
.measure {
  max-width: 34em;
}
</style>
