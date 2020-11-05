<template>
  <div>
    <h2>
      Named Entities
      <span class="f5 fw1">
        (
        <span class="font-mono i">detected in transcript</span> 🤖)
      </span>
    </h2>
    <div class="flex flex-wrap">
      <div
        class="flex flex-column font-mono"
        v-for="concept in concepts"
        v-bind:id="'ner-'+concept.name"
        v-bind:key="concept.name"
      >
        <div
          class="entity concept dib"
          v-for="(start, index) in concept.starts"
          v-bind:key="concept.name + '-' + index"
          v-bind:data-start="start"
          v-on:click="$emit('jumpToTimecode', start/1000)"
          v-bind:class="currentSequence === concept.sequenceNrs[index] ? 'active' : ''"
        >{{concept.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoEntities",
  data: function() {
    return {
      currentTime: 0
    };
  },
  computed: {
    concepts: function() {
      var conceptsWithData = {};
      for (let i = 0; i < this.nerSequences.length; i++) {
        const seq = this.nerSequences[i];
        let concepts = seq.concepts;
        for (let j = 0; j < concepts.length; j++) {
          const concept = concepts[j];
          if (!conceptsWithData[concept]) {
            conceptsWithData[concept] = {
              name: concept,
              starts: [seq.start],
              sequenceNrs: [seq.sequenceNr]
            };
          } else {
            conceptsWithData[concept].starts.push(seq.start);
            conceptsWithData[concept].sequenceNrs.push(seq.sequenceNr);
          }
        }
      }
      return conceptsWithData;
    },
    currentSequence: function() {
      return this.nerSequences.reduce(
        (accumulator, currentValue, currentIndex) => {
          return this.currentTime >= currentValue.start / 1000
            ? currentIndex
            : accumulator;
        },
        0
      );
    }
  },
  props: {
    nerSequences: {
      type: Array
    },
  },
  methods: {
    setCurrentTime(tc) {
      this.currentTime = tc;
    }
  }
};
</script>

<style scoped>
.entity {
  display: inline-block;
  margin: 0.1rem !important;
  padding: 0.1rem;
  font-size: 75%;
  cursor: pointer;
}
.entity.concept {
  background-color: var(--entity-concept-bg-color);
  color: var(--entity-concept-text-color);
}
.entity:hover {
  background-color: var(--highlight-bg-color);
}
.entity.active {
  background-color: var(--active-bg-color);
}
</style>
