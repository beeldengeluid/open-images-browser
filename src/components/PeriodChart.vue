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
        gray: '#666',
        blue: '#2196F3',
      },
    }
  },
  props: {
    selectedDecadeIndex: { type: Number },
    barSeries: { type: Object },
    lineSeries: { type: Object },
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
        colors: this.colorList,
        theme: { mode: 'dark' },
        plotOptions: {
          bar: {
            columnWidth: '98%',
            distributed: true,
          }
        },
        xaxis: {
          categories: Object.keys(this.barSeries)
        },
        yaxis: [
          {
            // show: false,
            title: { text: 'Total Items' }
          }, 
          {
            // show: false,
            opposite: true,
            title: { text: 'Filtered Items' }
          }
        ],
        grid: { show: false },
        legend: { show: true },
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
    colorList () {
      return Array.from(Object.keys(this.barSeries))
              .fill(this.colors.gray)
              .fill(this.colors.blue, this.selectedDecadeIndex, this.selectedDecadeIndex + 1)
    },
  },
}
</script>

<style>
  .apexcharts-canvas.apexcharts-theme-dark {
      background: none !important;
  }
</style>
