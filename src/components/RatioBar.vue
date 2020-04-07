<template>
  <div class="fixed w-100 z-2 f6">
    <div
      class="w-100 ph1 flex justify-between"
      :style="{ 'background-color': colors.total }"
    >
      <span>{{ total + " items" }}</span>
      <span>100%</span>
    </div>

    <div class="relative flex justify-end">
      <span class="pr1 grey--text">in decade</span>
      <span class="ph1" :class="{ absolute: isDecadeBarWideEnough }">{{
        decadePercentage + "%"
      }}</span>
      <div
        :style="{
          width: decadePercentage + '%',
          'background-color': colors.decade,
        }"
      ></div>
    </div>

    <div class="relative flex justify-end">
      <span class="pr1 grey--text">in selection</span>
      <span class="ph1" :class="{ absolute: isSelectionBarWideEnough }">{{
        selectionPercentage + "%"
      }}</span>
      <div
        :style="{
          width: selectionPercentage + '%',
          'background-color': colors.selection,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatioBar",
  props: {
    total: Number,
    decade: Number,
    selection: Number,
    colors: Object,
  },
  computed: {
    decadePercentage() {
      return ((100 * this.decade) / this.total).toPrecision(2);
    },
    selectionPercentage() {
      return ((100 * this.selection) / this.total).toPrecision(2);
    },
    isDecadeBarWideEnough() {
      return this.decadeBarWidth > 40;
    },
    isSelectionBarWideEnough() {
      return this.selectionBarWidth > 40;
    },
    decadeBarWidth() {
      return (this.decadePercentage / 100) * this.getClientWidth();
    },
    selectionBarWidth() {
      return (this.selectionPercentage / 100) * this.getClientWidth();
    },
  },
  methods: {
    getClientWidth() {
      return document.body.clientWidth || document.documentElement.clientWidth;
    },
  },
};
</script>
