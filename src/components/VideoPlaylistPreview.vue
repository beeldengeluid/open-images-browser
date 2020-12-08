<template>
  <div>
    <slot></slot>
    <div
      @click="$emit('preview-click')"
      class="pointer hover-border-color"
    >
      <div class="relative mr4 mb4">
        <img
          :src="thumbItem.thumbSrc"
          :alt="thumbItem.title"
          class="relative z-3 db"
        />
        <div
          class="bg-black absolute w-100 h-100 ba b--grey--darken-3 top-1 left-1 z-1"
        ></div>
        <div
          class="bg-black absolute w-100 h-100 ba b--grey--darken-3 top-2 left-2 z-0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlaylistPreview",
  props: {
    thumbItem: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
