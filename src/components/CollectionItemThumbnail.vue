<template>
  <div @click="$emit('toggle-expanded')" class="bg-black pointer relative overflow-hidden">
    <v-lazy
      :options="{ threshold: 0.1 }"
      transition="fade-transition"
    >
      <v-hover>
        <div slot-scope="{ hover }">
          <img
            v-if="displayThumb"
            :src="thumbSrc"
            :title="title"
            class="grow w-100 db"
          />
          <div
            v-if="displayTitle"
            class="absolute top-0 left-0 pa1 bg-black-50 pevents-none f6 lh-solid"
          >
            {{ title }}
          </div>
          <div
            v-if="displayYear"
            class="absolute bottom-0 left-0 pa1 bg-black-50 pevents-none f6 lh-solid"
          >
            {{ year }}
          </div>
          <transition name="fade">
            <div v-if="hover" class="absolute right-0 bottom-0 pevents-none">
              <v-icon>mdi-fullscreen</v-icon>
            </div>
          </transition>
        </div>
      </v-hover>
    </v-lazy>
  </div>
</template>

<script>
export default {
  name: "CollectionItemThumbnail",
  props: {
    thumbSrc: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "unknown title",
    },
    year: {
      type: String,
      default: "unknown year",
    },
    displayTitle: { type: Boolean, default: false },
    displayYear: { type: Boolean, default: false },
    displayThumb: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}

.pevents-none {
  pointer-events: none;
}
</style>
