<template>
  <div>
    <apexcharts
      ref="apexPeriodChart"
      width="100%"
      :options="options"
      :series="series"
      class="apex-bar-chart"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PeriodChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    decadeIndex: {
      type: Number,
      default: 0,
    },
    barSeries: {
      type: Object,
      default: () => ({}),
    },
    lineSeries: {
      type: Object,
      default: () => ({}),
    },
    colors: {
      type: Object,
      default: () => ({ bar: '#555', line: '#009688', background: '#121212' }),
    },
  },
  data() {
    return {}
  },
  computed: {
    series() {
      return [
        {
          name: 'Total Videos',
          type: 'bar',
          data: Object.values(this.barSeries),
        },
        {
          name: 'Filtered Videos',
          type: 'line',
          data: Object.values(this.lineSeries),
        },
      ]
    },
    options() {
      return {
        chart: {
          id: 'decade-bar-chart',
          toolbar: { show: false },
          zoom: { enabled: false },
          type: 'line',
          background: this.colors.background,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config.dataPointIndex >= 0) {
                if (config.dataPointIndex !== this.decadeIndex) {
                  this.$emit('decade-click', config.dataPointIndex)
                } else {
                  // prevent deselecting selected bar for more consistent UX
                  const bars = document.querySelectorAll(
                    '.apexcharts-series path'
                  )[config.dataPointIndex]
                  bars.setAttribute('selected', true)
                }
              }
            },
          },
        },
        colors: [this.colors.bar, this.colors.line],
        stroke: { width: [0, 5] },
        theme: { mode: 'dark' },
        plotOptions: { bar: { columnWidth: '80%' } },
        xaxis: {
          categories: Object.keys(this.barSeries),
        },
        yaxis: [
          { title: { text: 'Total Videos' } },
          {
            opposite: true,
            title: { text: 'Filtered Videos' },
          },
        ],
        grid: { show: true },
        legend: { show: true },
        tooltip: { enabled: false },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        states: {
          hover: {
            filter: {
              type: 'lighten',
              value: 0.25,
            },
          },
          active: {
            filter: {
              type: 'lighten',
              value: 0.15,
            },
          },
        },
        responsive: [
          {
            breakpoint: 9999,
            options: { chart: { height: '300' } },
          },
          {
            breakpoint: 800,
            options: { chart: { height: '200' } },
          },
        ],
      }
    },
  },
  watch: {
    decadeIndex(newValue) {
      // toggle DataPointSelection in case decadeIndex is changed indirectly (not via click), e.g. by resetState
      if (
        this.$refs.apexPeriodChart.chart.w.globals.selectedDataPoints[0][0] !==
        newValue
      ) {
        this.$refs.apexPeriodChart.toggleDataPointSelection(0, newValue)
      }
    },
  },
  mounted() {
    this.$refs.apexPeriodChart.toggleDataPointSelection(0, this.decadeIndex)
  },
}
</script>

<style>
/* temp fix for states issue in Firefox
   https://github.com/apexcharts/apexcharts.js/issues/1338 */
.apexcharts-series path[selected='true'] {
  fill: var(--primary-accent-color);
  filter: none;
}
.apexcharts-series path:not([selected]):hover {
  fill: var(--primary-accent-color);
  filter: none;
}
.apexcharts-series path:hover {
  cursor: pointer;
}
</style>
