<template>
  <div>
    <RatioBar v-for="bar in bars" :key="bar.label"
      :amount="bar.amount"
      :total="bar.total"
      :label="bar.label"
      :innerLabel="bar.innerLabel"
      :color="bar.color"
    />
  </div>
</template>

<script>
import RatioBar from "./RatioBar";
export default {
  components: {
    RatioBar,
  },
  props: {
    bars: { type: Array, default: () => [] },
  },
};
</script>