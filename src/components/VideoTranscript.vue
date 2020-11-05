<template>
  <div class="overflow-scroll">
    <div
      class="sequence flex font-mono"
      v-for="seq in asrSequences"
      v-bind:id="seq.sequenceNr"
      v-bind:key="seq.sequenceNr"
      v-bind:data-start="seq.start"
      v-bind:class="currentSequence === seq.sequenceNr ? 'active' : ''"
      v-on:click="$emit('jumpToTimecode', seq.start/1000)"
    >
      <div class="start">{{ convertTimecodeToClockString(seq.start/1000)}}</div>
      <div class="words i measure">{{ seq.words }}</div>
      <div v-if="nerSequences.length" class="ner w4">
        <span
          class="entity concept"
          v-for="(concept, index) in nerSequences[seq.sequenceNr].concepts"
          v-bind:key="index"
        >{{concept}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoTranscript",
  data: function() {
    return {
      currentTime: 0
    };
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
