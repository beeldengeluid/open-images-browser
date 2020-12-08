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
        v-for="concept in concepts"
        :id="'ner-' + concept.name"
        :key="concept.name"
        class="flex flex-column font-mono"
      >
        <div
          v-for="(start, index) in concept.starts"
          :key="concept.name + '-' + index"
          class="entity concept dib"
          :data-start="start"
          :class="
            currentSequence === concept.sequenceNrs[index] ? 'active' : ''
          "
          @click="$emit('jumpToTimecode', start / 1000)"
        >
          {{ concept.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ASREntities',
  props: {
    nerSequences: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTime: 0,
    }
  },
  computed: {
    concepts() {
      const conceptsWithData = {}
      for (let i = 0; i < this.nerSequences.length; i++) {
        const seq = this.nerSequences[i]
        const concepts = seq.concepts
        for (let j = 0; j < concepts.length; j++) {
          const concept = concepts[j]
          if (!conceptsWithData[concept]) {
            conceptsWithData[concept] = {
              name: concept,
              starts: [seq.start],
              sequenceNrs: [seq.sequenceNr],
            }
          } else {
            conceptsWithData[concept].starts.push(seq.start)
            conceptsWithData[concept].sequenceNrs.push(seq.sequenceNr)
          }
        }
      }
      return conceptsWithData
    },
    currentSequence() {
      return this.nerSequences.reduce(
        (accumulator, currentValue, currentIndex) => {
          return this.currentTime >= currentValue.start / 1000
            ? currentIndex
            : accumulator
        },
        0
      )
    },
  },
  methods: {
    setCurrentTime(tc) {
      this.currentTime = tc
    },
  },
}
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
