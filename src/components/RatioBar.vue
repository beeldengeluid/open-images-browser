<template>
  <div>
    <div class="relative flex justify-end">
      <span class="ph1" :class="[{ inner: innerLabel }, labelClasses]">{{
        label
      }}</span>
      <span class="ph1" :class="{ absolute: isBarWideEnoughForLabel }">{{
        percentage + "%"
      }}</span>
      <div
        :style="{
          'min-height': '21px',
          width: percentage + '%',
          'background-color': color,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatioBar",
  props: {
    amount: Number,
    total: Number,
    label: String,
    labelClasses: { type: String, required: false },
    innerLabel: { type: Boolean, required: false, default: false },
    color: String,
  },
  computed: {
    percentage() {
      return ((100 * this.amount) / this.total).toPrecision(3);
    },
    isBarWideEnoughForLabel() {
      return this.barWidth > 40;
    },
    barWidth() {
      return (this.percentage / 100) * this.getClientWidth();
    },
  },
  methods: {
    getClientWidth() {
      return document.body.clientWidth || document.documentElement.clientWidth;
    },
  },
};
</script>
<style scoped>
.inner {
  position: absolute;
  left: 0;
}
</style>
