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
    ratio() {
      return this.amount / this.total;
    },
    percentage() {
      let pct = 100 * this.ratio;
      return pct > 10
        ? Math.round(pct)
        : pct > 1
        ? pct.toPrecision(2)
        : pct.toPrecision(1);
    },
    isBarWideEnoughForLabel() {
      return this.barWidth > 40;
    },
    barWidth() {
      return this.ratio * this.getClientWidth();
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
