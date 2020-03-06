<template>
<div>
  <apexcharts width="100%" :options="options"  :series="series" class="apex-bar-chart" ref="apexPeriodChart"></apexcharts>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PeriodChart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
    }
  },
  props: {
    decadeIndex: { type: Number },
    barSeries: { type: Object },
    lineSeries: { type: Object },
    colors: { type: Object },
  },
  mounted () {
    this.$refs.apexPeriodChart.toggleDataPointSelection(0,this.decadeIndex)
  },
  computed: {
    series () {
      return [
        {
          name: 'Total Items',
          type: 'bar',
          data: Object.values(this.barSeries),
        },
        {
          name: 'Filtered Items',
          type: 'line',
          data: Object.values(this.lineSeries),
        },
      ]
    },
    options () {
      return {
        chart: {
          id: 'decade-bar-chart',
          toolbar: { show: false },
          type: 'line',
          background: this.colors.background,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config.dataPointIndex >= 0) {
                this.$emit('decade-click', config.dataPointIndex)
              }
            }
          }
        },
        colors: [this.colors.bar, this.colors.line],
        stroke: { width: [0,5] },
        theme: { mode: 'dark' },
        plotOptions: { bar: { columnWidth: '80%' } },
        xaxis: {
          categories: Object.keys(this.barSeries),
        },
        yaxis: [
          { title: { text: 'Total Items' } }, 
          {
            opposite: true,
            title: { text: 'Filtered Items' }
          }
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
            }
          },
          active: {
            filter: {
              type: 'lighten',
              value: 0.15,
            }
          },
        },
        responsive: [
          {
            breakpoint: 9999,
            options: { chart: { height: '300' } }
          },
          {
            breakpoint: 800,
            options: { chart: { height: '200' } }
          }
        ]
      }
    },
  },
  watch: {
    decadeIndex (newValue) {
      // toggle DataPointSelection in case decadeIndex is changed indirectly (not via click), e.g. by resetState
      if (this.$refs.apexPeriodChart.chart.w.globals.selectedDataPoints[0][0] !== newValue) {
        this.$refs.apexPeriodChart.toggleDataPointSelection(0,newValue)
      }
    }
  },
}
</script>

<style>
/* temp fix for states issue in Firefox
   https://github.com/apexcharts/apexcharts.js/issues/1338 */
.apexcharts-series path[selected=true] {
  fill: var(--primary-accent-color);
  filter: none;
}
.apexcharts-series path:not([selected]):hover{
  fill: var(--primary-accent-color);
  filter: none;
}
</style>