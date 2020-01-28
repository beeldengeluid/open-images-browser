<template>
  <v-app id="app">
    <v-content class="ma3 mt5 tl">
      <h1>Open Images Browser</h1>
      
      <div class="mv3">
        <p>
          <span>Below you can explore videos from the </span> 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a href="https://openbeelden.nl/" target="_blank" v-on="on">Open Images Collection ↗︎</a>
            </template>
            <span>Open Images is an open media platform that offers online access to audiovisual archive material to stimulate creative reuse.</span>
          </v-tooltip>
          <span>.</span>
        </p>
        <p>
          <span>The current selection, ranging from </span><span class="ph1 blue white--text">{{yearSelectionRange[0]}}</span> to <span class="ph1 blue white--text">{{yearSelectionRange[1]}}</span>
          <span v-if="locationFilter || subjectFilter">, filtered for </span>
          <span v-if="locationFilter">
            <v-chip
              color="teal"
              text-color="white"
              close
              close-icon="cancel"
              @click:close="closeLocationFilter()"
              label small
            >
              <v-icon left small>room</v-icon>
              <strong>{{ locationFilter }}</strong>
            </v-chip>,
          </span>
          <span v-if="subjectFilter">
            <v-chip
              v-if="subjectFilter"
              color="cyan darken-1"
              text-color="white"
              close
              close-icon="cancel"
              @click:close="closeSubjectFilter()"
              label small
            >
              <v-icon left small>local_offer</v-icon>
              <strong>{{ subjectFilter }}</strong>
            </v-chip>,
          </span>
          <span> contains </span><span class="ph1 indigo white--text">{{itemsSelectedSorted.length}}</span><span> out of {{this.items.length}} videos.</span>
          <br>
          <span>Videos are sorted by </span><span class="ph1 deep-purple font-mono">{{sortBy}}</span><span> in </span><span class="ph1 deep-purple">{{sortAscending ? 'ascending' : 'descending'}} <v-icon @click="toggleSortAscending" small>{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon> </span> order.
          <br>
          <span>Videos are displayed </span><span class="ph1 orange white--text">{{noThumbsPerRow}}</span><span> per row</span>
          <span v-if="displayFieldsSelected.length">, along with their </span>
          <span v-for="(field, index) in displayFieldsSelected" :key="field">
            <span v-if="displayFieldsSelected.length > 1 && index == displayFieldsSelected.length - 1"> &amp; </span>
            <span class="ph1 green white--text">{{field}}</span>
            <span v-if="displayFieldsSelected.length > 1 && index < displayFieldsSelected.length - 2">, </span>
          </span>
          <span>.</span>
        </p>
      </div>
      <div class="mv3">
        <apexcharts 
          width="100%"
          :options="chartOptions" 
          :series="chartSeries"
          class="apex-bar-chart"
        ></apexcharts>  
        <div class="dflex flex-wrap items-center fit-barchart">
          <v-range-slider
            v-model="yearSelectionRange"
            :min="decadeMin"
            :max="decadeMax+10"
            :color="'indigo'"
            :thumb-color="'blue'"
            thumb-label="always"
            hide-details
            class="min-w-50"
          ></v-range-slider>
        </div>
        <div class="mt4 dib dflex items-center">
          <span class="mr2 fw7">Sort by</span>
          <v-chip-group
            v-model="sortBy"
            active-class="deep-purple"
            mandatory
            class="fw5 font-mono"
          >
            <v-chip v-for="sortField in sortFields" :key="sortField" :value="sortField">
              {{ sortField }}
            </v-chip>
          </v-chip-group>
          <v-btn fab x-small color="deep-purple mr2">
            <v-icon @click="toggleSortAscending">{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
          </v-btn>
        </div>
        <div class="dflex mt4 flex-wrap items-center justify-between">
            <v-slider
              v-model="noThumbsPerRow"
              append-icon="zoom_out"
              prepend-icon="zoom_in"
              @click:append="noThumbsPerRow++"
              @click:prepend="noThumbsPerRow--"
              label="Items per row"
              min="1" 
              max="50" 
              step="1"
              color="orange"
              thumb-color="orange"
              thumb-label="always"
              hide-details
              class="mr4"
            ></v-slider>
            <div class="dflex items-center">
              <span class="pr2 fw7">Display</span>
              <v-chip-group
                v-model="displayFieldsSelected"
                active-class="green"
                multiple
                class="fw5 font-mono"
              >
                <v-chip v-for="displayField in displayFields" :key="displayField" :value="displayField">
                  {{displayField}}
                </v-chip>
              </v-chip-group>
            </div>
          </div>
          <div class="dflex flex-wrap mv3 items-center">
            <span class="pr2 fw7"><v-icon left>filter_list</v-icon>Filters</span>
            <v-chip-group class="fw5 font-mono">
              <v-chip
                v-if="locationFilter"
                color="teal"
                text-color="white"
                close
                close-icon="cancel"
                @click:close="closeLocationFilter()"
                label
              >
                <v-icon left>room</v-icon>
                <strong class="mr1">{{ locationFilter }}</strong>
                <span>({{locationCountsForYearSelection[locationFilter]}})</span>
              </v-chip>
              <v-chip
                v-if="subjectFilter"
                color="cyan darken-1"
                text-color="white"
                close
                close-icon="cancel"
                @click:close="closeSubjectFilter()"
                label
              >
                <v-icon left>local_offer</v-icon>
                <strong class="mr1">{{ subjectFilter }}</strong>
                <span>({{subjectCountsForYearSelection[subjectFilter]}})</span>
              </v-chip>
            </v-chip-group>
          </div>
      </div>
      <div class="mv3 relative dflex flex-wrap">
        <CollectionItem
          v-for = "item in itemsSelectedSorted" 
          :key            = "item['id']"
          :width          = "itemWidth + 'px'"
          :height         = "itemHeight + 'px'"
          :thumbSrc       = "item['thumbSrc']"
          :videoSrc       = "item['videoSrc']"
          :title          = "item['title']"
          :date           = "item['date']"
          :url            = "item['url']"
          :subjects       = "item['subjects']"
          :creators       = "item['creators']"
          :locations      = "item['locations']"
          :displayTitle   = "displayFieldsSelected.includes('title')"
          :displayYear    = "displayFieldsSelected.includes('year')"
          :displayThumb   = "displayFieldsSelected.includes('thumb')"
          :locationFilter = "locationFilter"
          :subjectFilter  = "subjectFilter"
          :locationCountsForYearSelection = "locationCountsForYearSelection"
          :subjectCountsForYearSelection  = "subjectCountsForYearSelection"
          v-on:toggle-location-filter = "onToggleLocationFilter"
          v-on:toggle-subject-filter  = "onToggleSubjectFilter"
        />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import './../node_modules/tachyons/css/tachyons.min.css';
import _ from 'lodash';
import converter from 'number-to-words'
import dataItems from "./assets/data/openbeelden-items-clean.json";
import CollectionItem from "./components/CollectionItem";
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'OpenBeeldenBrowser',
  data: function () {
    return {
      items: dataItems,
      yearSelectionRange: [1960, 1980],
      sortFields: ['id','date', 'title'],
      sortBy: 'date',
      displayFields: ['title', 'year', 'thumb'],
      displayFieldsSelected: ['thumb', 'year'],
      sortAscending: true,
      locationFilter: 'Nederland',
      subjectFilter: 'steden',
      noThumbsPerRow: 10,
      itemAspectRatio: 352 / 288,
      itemMargin: 4,
      clientWidth: this.getClientWidth(),
      chartOptions: {
        chart: {
          id: 'decade-bar-chart',
          toolbar: { tools: { download: false } },
          type: 'bar',
          events: {
            click: (event, chartContext, config) => {
              if (config.dataPointIndex >= 0) {
                this.onDecadeClick(config.dataPointIndex)
              }
            }
          }
        },
        colors:['#999'],
        theme: { mode: 'dark' },
        plotOptions: { bar: { columnWidth: '98%' } },
        yaxis: { show: false },
        grid: { show: false },
        dataLabels: { enabled: false },
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
      },
      chartSeries: []
    }
  },
  components: {
    CollectionItem,
    apexcharts: VueApexCharts,
  },
  computed: {
    itemWidth: function () {
      let horizontalMarkupMargin = 32
      return (this.clientWidth - horizontalMarkupMargin) / this.noThumbsPerRow - this.itemMargin
    },
    itemHeight: function () {
      return this.itemWidth / this.itemAspectRatio
    },
    itemsFilteredByYear: function () {
      return this.items.filter(i => this.filterByYear(i))
    },
    itemsSelectedSorted: function () {
      // filter
      let selected = this.itemsFilteredByYear.filter(
        i => this.filterByLocation(i) && this.filterBySubject(i)
      )
      // sort
      if (this.sortAscending) {
        selected.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1)
      } else {
        selected.sort((a, b) => (a[this.sortBy] < b[this.sortBy]) ? 1 : -1)
      }
      return selected
    },
    yearMin: function () {
      return Math.min(... this.items.map(i => i['date'].slice(0, 4)))
    },
    yearMax: function () {
      return Math.max(... this.items.map(i => i['date'].slice(0, 4)))
    },
    decadeMin: function () {
      return Math.floor(this.yearMin / 10) * 10
    },
    decadeMax: function () {
      return Math.floor(this.yearMax / 10) * 10
    },
    locationCountsForYearSelection: function () {
      let locations =  _.flatMap(this.itemsFilteredByYear, i => i['locations']) 
      return _.countBy(locations)
    },
    subjectCountsForYearSelection: function () {
      let subjects =  _.flatMap(this.itemsFilteredByYear, i => i['subjects']) 
      return _.countBy(subjects)
    },
    decadeCounts: function () {
      // get decades present in data
      let decadesPresent =  _.countBy(this.items, function (i) {
        return i['date'].slice(0,3)+'0s'
      })
      
      // add intermediary decades
      let decadesAll = _.range(this.decadeMin, this.decadeMax, 10).map(d => d + 's')
      decadesAll.map(d => {
        if (!Object.keys(decadesPresent).includes(d)) {
          decadesPresent[d] = 0
        }
      })

      const decadesSorted = {};
      Object.keys(decadesPresent).sort().forEach(function(key) {
        decadesSorted[key] = decadesPresent[key];
      });
      return decadesSorted
    },
  },
  methods: {
    toOrdinal(int){
      return converter.toOrdinal(int)
    },
    toggleSortAscending(){
      this.sortAscending = ! this.sortAscending
    },
    dateToYear(date){
      return date.slice(0,4)
    },
    getClientWidth(){
      return document.body.clientWidth || document.documentElement.clientWidth
    },
    onResize(){
      this.clientWidth = this.getClientWidth()
    },
    onToggleLocationFilter: function (filterValue) {
      if (this.locationFilter == filterValue) {
        this.closeLocationFilter()
      } else {
        this.locationFilter = filterValue
      }
    },
    onToggleSubjectFilter: function (filterValue) {
      if (this.subjectFilter == filterValue) {
        this.closeSubjectFilter()
      } else {
        this.subjectFilter = filterValue
      }
    },
    closeLocationFilter: function () {
      this.locationFilter = undefined
    },
    closeSubjectFilter: function () {
      this.subjectFilter = undefined
    },
    filterByYear: function (item) {
      return this.dateToYear(item['date']) >= this.yearSelectionRange[0] &&
             this.dateToYear(item['date']) <= this.yearSelectionRange[1]
    },
    filterByLocation: function (item) {
      return item['locations'].includes(this.locationFilter) || this.locationFilter == undefined
    },
    filterBySubject: function (item) {
      return item['subjects'].includes(this.subjectFilter) || this.subjectFilter == undefined
    },
    updateChart: function () {      
      this.chartOptions = {...this.chartOptions, ...{
        xaxis: {
          categories: Object.keys(this.decadeCounts)
        }
      }}
      this.chartSeries = [{
        name: 'Item count',
        data: Object.values(this.decadeCounts),
      }]
    },
    onDecadeClick: function (dataPointIndex) {
      let decade = Object.keys(this.decadeCounts)[dataPointIndex]
      let decadeYearMin = parseInt(decade.slice(0,4))
      let decadeYearMax = decadeYearMin + 10
      this.yearSelectionRange = [decadeYearMin, decadeYearMax]
    },
  },
  created() {
    this.updateChart()
    window.addEventListener("resize", _.debounce(this.onResize), 400)
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },
}
</script>

<style>
:root {
  --bg-color: #222;
  --text-color: #EEE;
}
html, body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,400i&display=swap");
.font-mono {
  font-family: "Source Code Pro", monospace;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--text-color) !important;
}

.dflex {
  display: flex;
}

.min-w-50 {
  min-width: 50%;
}

.theme--dark.v-label {
  color: #fff !important;
  font-weight: 700;
}

/* 
fix to be released shortly:
https://github.com/vuetifyjs/vuetify/commit/4f151bbdf4388e76d92920ca19c6271c022e6c3f
*/
.v-chip.v-size--small .v-icon.v-chip__close {
  font-size: 18px;
}

.fit-barchart {
  margin-top: -88px;
  margin-left: 4px;
  margin-right: 2px; 
}
@media screen and ( min-width: 448px) {
  .fit-barchart {
    margin-top: -68px;
  }  
}

.apexcharts-canvas.apexcharts-theme-dark {
    background: none;
}
</style>
