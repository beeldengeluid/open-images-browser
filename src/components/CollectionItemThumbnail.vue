<template>
  <div @click="$emit('toggle-expanded')" class="h-100 bg-black pointer">
    <v-lazy
      :options="{ threshold: 0.1 }"
      transition="fade-transition"
      class="h-100"
    >
      <v-hover>
        <div slot-scope="{ hover }">
          <img
            v-if="displayThumb"
            :src="thumbSrc"
            :title="title"
            class="absolute top-0 bottom-0 m-auto grow"
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
            <div v-if="hover" class="absolute right-0 bottom-0">
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
    thumbSrc: String,
    title: String,
    year: String,
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

.m-auto {
  margin: auto;
}
</style>
