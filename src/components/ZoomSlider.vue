<template>
  <div class="zoom-slider">
    <v-slider
      :value="value" 
      @input="$emit('input', $event)"
      :min="min" :max="max" :step="step"
      ticks="always"
      tick-size="4"
      :tick-labels="tickLabels"
      color="orange" 
      hide-details
    >
      <template v-slot:prepend>
        <v-btn icon @click="$emit('input', value - 1)">
          <v-icon>zoom_in</v-icon>
        </v-btn>
      </template>
      <template v-slot:append>
        <v-btn icon @click="$emit('input', value + 1)">
          <v-icon>zoom_out</v-icon>
        </v-btn>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  name: 'ZoomSlider',
  data: function () {
    return {
    }
  },
  props: {
    value: { type: Number},
    min: { type: Number, default: 0 },
    max: { type: Number, default: 6 },
    step: { type: Number, default: 1 },
    tickLabels: { type: Array },
  },
  methods: {
    increment (amount) {
      this.$emit('increment-zoom', amount)
    },
  },
}
</script>

<style>
.zoom-slider .v-input__prepend-outer, .zoom-slider .v-input__append-outer {
  margin-top: 0;
}
.zoom-slider .v-slider__tick {
  background-color: hsla(0,0%,100%,.5);
}
</style>