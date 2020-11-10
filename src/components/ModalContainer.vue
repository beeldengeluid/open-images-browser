<template>
  <div
    class="fixed w-100 h-100 bg-black-90 top-0 flex items-center flex-wrap z-9999 overflow-y-auto justify-center"
  >
    <div class="absolute ma3 top-0 right-0 z-1">
      <v-icon @click="onModalCloseRequested">mdi-close</v-icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    onModalCloseRequested() {
      this.$emit("close-modal");
    },
  },
  mounted() {
    this._keyListener = function(e) {
      if (e.key === "Escape") {
        this.onModalCloseRequested();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>

<style scoped></style>
