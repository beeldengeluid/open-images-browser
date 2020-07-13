<template>
  <div class="flex expansion-container">
    <div class="expansion-left tc bg-black ba b--grey--darken-3">
      <video
        :src="item.videoSrc"
        :poster="item.thumbSrc"
        :style="{ 'max-width': videoMaxWidth + 'px' }"
        controls
        width="100%"
        class="outline-0 bg-black"
      ></video>
    </div>
    <div class="expansion-right pa3 pr4 relative grey darken-3">
      <h2 class="mt0 f4">
        {{ item.title }} <span class="fw1">({{ year }})</span>
      </h2>
      <div v-if="item.subjects.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-tag</v-icon>
          <span class="v-mid">
            {{ item.subjects.length }} Subject<span
              v-if="item.subjects.length > 1"
              >s</span
            ></span
          >
        </span>
        <v-chip-group multiple column class="font-mono">
          <v-chip
            v-for="subject in item.subjects"
            :key="subject"
            :value="subject"
            @click="
              $emit('toggle-active-filter', {
                type: 'subjects',
                value: subject,
              })
            "
            label
            :class="
              activeFilters['subjects'].includes(subject)
                ? 'teal white--text'
                : ''
            "
          >
            <strong class="mr1">{{ subject }}</strong>
            <span>{{ filterCountsForSelection["subjects"][subject] }}</span>
            <v-icon right
              >{{
                activeFilters["subjects"].includes(subject)
                  ? "mdi-close-circle"
                  : "mdi-filter-variant"
              }}
            </v-icon>
          </v-chip>
        </v-chip-group>
      </div>
      <div v-if="item.locations.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-map-marker</v-icon>
          <span class="v-mid">
            {{ item.locations.length }} Location<span
              v-if="item.locations.length > 1"
              >s</span
            ></span
          >
        </span>
        <v-chip-group multiple column class="font-mono">
          <v-chip
            v-for="location in item.locations"
            :key="location"
            :value="location"
            @click="
              $emit('toggle-active-filter', {
                type: 'locations',
                value: location,
              })
            "
            label
            :class="
              activeFilters['locations'].includes(location)
                ? 'teal white--text'
                : ''
            "
          >
            <strong class="mr1">{{ location }}</strong>
            <span>{{ filterCountsForSelection["locations"][location] }}</span>
            <v-icon right
              >{{
                activeFilters["locations"].includes(location)
                  ? "mdi-close-circle"
                  : "mdi-filter-variant"
              }}
            </v-icon>
          </v-chip>
        </v-chip-group>
      </div>
      <div v-if="item.creators.length" class="mv2">
        <span class="fw6">
          <v-icon small>mdi-video</v-icon>
          <span class="v-mid"> {{ item.creators.length }} Creator</span
          ><span v-if="item.creators.length > 1">s</span>
        </span>
        <div v-for="creator in item.creators" :key="creator">
          {{ creator }}
        </div>
      </div>
      <div class="mt3">
        <a :href="item.url" target="_blank">See item on Open Images ↗︎</a>
      </div>
      <div class="absolute ma3 top-0 right-0">
        <v-icon @click="$emit('toggle-expanded')">
          mdi-close
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectionItemCard",
  props: {
    item: Object,
    year: String,
    videoMaxWidth: Number,
    activeFilters: Object,
    filterCountsForSelection: Object,
  },
};
</script>

<style scoped>
.expansion-container {
  flex-wrap: wrap;
}
.expansion-container .expansion-left {
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.expansion-container .expansion-right {
  width: 100%;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

@media screen and (min-width: 1140px) {
  .expansion-container {
    flex-wrap: nowrap;
  }
  .expansion-container .expansion-left {
    width: 320px;
    flex-shrink: 0;
    /* vertically center video */
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-right-radius: 0;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .expansion-container .expansion-right {
    flex-grow: 1;
    max-width: 64rem;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
.b--grey--darken-3 {
  border-color: #424242;
}
</style>
