<template>
<div>
  <apexcharts width="100%" :options="options"  :series="series" class="apex-bar-chart"></apexcharts>
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
      colors: {
        primary: '#311B92',
        secondary: '#009688',
      },
    }
  },
  props: {
    selectedDecadeIndex: { type: Number },
    barSeries: { type: Object },
    lineSeries: { type: Object },
  },
  mounted () {
    let bars = document.querySelectorAll(".apexcharts-series path.apexcharts-bar-area");
    bars[this.selectedDecadeIndex].setAttribute('selected', true)
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
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config.dataPointIndex >= 0) {
                this.$emit('decade-click', config.dataPointIndex)
              }
            }
          }
        },
        colors: [this.colors.primary, this.colors.secondary],
        stroke: {
          width: [0,5]
        },
        theme: { mode: 'dark' },
        plotOptions: {
          bar: {
            columnWidth: '98%',
          }
        },
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
          enabledOnSeries: [1]
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
}
</script>

<style>
.apexcharts-canvas.apexcharts-theme-dark {
    background: none !important;
}
.apexcharts-series path[selected=true] {
  fill: var(--selected-decade-color);
  filter: none;
}
</style>
