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
          <span>The current selection, ranging from </span><span class="ph1 blue white--text">{{selectedYearRange[0]}}</span> to <span class="ph1 blue white--text">{{selectedYearRange[1]}}</span>
          <span v-if="locationFilters.length || subjectFilter">, filtered for </span>
          <span v-if="locationFilters.length">
            <v-chip-group
              prev-icon="keyboard_arrow_left" next-icon="keyboard_arrow_right"  
              class="font-mono dib-i v-mid"
            >
              <v-chip  
                v-for="locationFilter in locationFilters" :key="locationFilter"
                :value="locationFilter"
                @click:close="onToggleLocationFilter(locationFilter)" close close-icon="cancel"
                label small class="teal white--text"
              >
                <strong class="mr1">{{ locationFilter }}</strong>
                <span>({{locationCountsForYearSelection[locationFilter]}})</span>
              </v-chip>
            </v-chip-group>
          </span>
          <span v-if="subjectFilter">
            <v-chip
              v-if="subjectFilter"
              color="cyan darken-1" text-color="white"
              @click:close="closeSubjectFilter()" close close-icon="cancel"
              label small
            >
              <v-icon left small>local_offer</v-icon>
              <strong>{{ subjectFilter }}</strong>
            </v-chip>,
          </span>
          <span> contains </span><span class="ph1 indigo white--text">{{itemsSelectedSorted.length}}</span><span> out of {{this.items.length}} videos.</span>
          <br>
          <span>Videos are sorted by </span><span class="ph1 deep-purple font-mono">{{sortBy}}</span><span> in </span>
          <span class="ph1 deep-purple">{{sortAscending ? 'ascending' : 'descending'}} 
            <v-icon @click="toggleSortAscending" small>{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon> 
          </span> order.
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
        <apexcharts  width="100%" :options="chartOptions"  :series="chartSeries" class="apex-bar-chart"></apexcharts>
        <div>
          <v-chip-group
            prev-icon="keyboard_arrow_left" next-icon="keyboard_arrow_right" 
            multiple class="font-mono"
          >
            <v-chip  
              v-for="location in locationsForYearSelection" :key="location.name"
              @click="onToggleLocationFilter(location.name)"
              :value="location.name"
              :class="locationFilters.includes(location.name) ? 'teal white--text' : ''"
              label small
            >
              <strong class="mr1">{{ location.name }}</strong>
              <span>({{locationCountsForYearSelection[location.name]}})</span>
              <v-icon right small>{{locationFilters.includes(location.name) ? 'cancel' : 'filter_list'}} </v-icon>
            </v-chip>
          </v-chip-group>
        </div>
        <div class="dib dflex items-center">
          <span class="mr2 fw7">Sort by</span>
          <v-chip-group v-model="sortBy" active-class="deep-purple" mandatory class="fw5 font-mono">
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
            min="1" max="50" step="1"
            label="Items per row"
            color="orange" thumb-color="orange" thumb-label="always"
            hide-details
            class="mr4"
          ></v-slider>
          <div class="dflex items-center">
            <span class="pr2 fw7">Display</span>
            <v-chip-group v-model="displayFieldsSelected" active-class="green" multiple class="fw5 font-mono">
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
              v-if="subjectFilter"
              @click:close="closeSubjectFilter()" close close-icon="cancel"
              color="cyan darken-1" text-color="white" label
            >
              <v-icon left>local_offer</v-icon><strong class="mr1">{{ subjectFilter }}</strong>
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
          :locationFilters = "locationFilters"
          :subjectFilter  = "subjectFilter"
          :locationCountsForYearSelection = "locationCountsForYearSelection"
          :subjectCountsForYearSelection  = "subjectCountsForYearSelection"
          v-on:toggle-location-filter = "onToggleLocationFilter"
          v-on:toggle-subject-filter  = "onToggleSubjectFilter"
        />
      </div>
      <back-to-top>
        <v-btn light title="Back to top" absolute bottom right fab>
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </back-to-top>
      <v-snackbar v-model="snackbar.state" :timeout="snackbar.timeout" color='grey lighten-4 grey grey--text text--darken-4'>
        <span v-html="snackbar.markup"></span>
      </v-snackbar>
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
import BackToTop from 'vue-backtotop'

export default {
  name: 'OpenBeeldenBrowser',
  components: {
    CollectionItem,
    apexcharts: VueApexCharts,
    BackToTop
  },
  data: function () {
    return {
      items: dataItems,
      selectedYearRange: [1970, 1979],
      selectedDecadeIndex: 6,
      sortFields: ['id','date', 'title'],
      sortBy: 'date',
      displayFields: ['title', 'year', 'thumb'],
      displayFieldsSelected: ['thumb', 'year'],
      sortAscending: true,
      locationFilters: ['Nederland'],
      subjectFilter: 'steden',
      noThumbsPerRow: 10,
      itemAspectRatio: 352 / 288,
      itemMargin: 4,
      clientWidth: this.getClientWidth(),
      colors: {
        gray: '#666',
        indigo: '#3f51b5',
      },
      chartOptions: {
        chart: {
          id: 'decade-bar-chart',
          toolbar: { tools: { download: false } },
          type: 'bar',
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config.dataPointIndex >= 0) {
                this.onDecadeClick(config.dataPointIndex)
              }
            }
          }
        },
        colors: ['#666'],
        theme: { mode: 'dark' },
        plotOptions: {
          bar: {
            columnWidth: '98%',
            distributed: true,
          }
        },
        yaxis: { show: false },
        grid: { show: false },
        legend: { show: false },
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
      chartSeries: [],
      snackbar:{
        state: false,
        text: "",
        timeout: 4000,
      }
    }
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
    locationsForYearSelection: function () {
      let locations = 
        Object.keys(this.locationCountsForYearSelection)
          .map( key => {
            return {
              'name': key,
              'count': this.locationCountsForYearSelection[key]
            }
          })
      return _.orderBy(locations, ['count', 'name'], ['desc',  'asc'])
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
      if (this.locationFilters.includes(filterValue)) {
        this.removeLocationFilter(filterValue)
      } else {
        this.addLocationFilter(filterValue)
      }
    },
    addLocationFilter (filterValue) {
      this.locationFilters.push(filterValue)
      this.showSnackbar(`📍 Added location filter <strong>${filterValue}</strong>`)
    },
    removeLocationFilter (filterValue) {
      _.pull(this.locationFilters, filterValue)
      this.showSnackbar(`❌ Removed location filter <strong>${filterValue}</strong>`)
    },
    onToggleSubjectFilter: function (filterValue) {
      if (this.subjectFilter == filterValue) {
        this.closeSubjectFilter()
      } else {
        this.subjectFilter = filterValue
      }
    },
    closeSubjectFilter: function () {
      this.subjectFilter = undefined
    },
    filterByYear: function (item) {
      return this.dateToYear(item['date']) >= this.selectedYearRange[0] &&
             this.dateToYear(item['date']) <= this.selectedYearRange[1]
    },
    filterByLocation: function (item) {
      return this.locationFilters.every(lf => item['locations'].includes(lf)) || !this.locationFilters.length
    },
    filterBySubject: function (item) {
      return item['subjects'].includes(this.subjectFilter) || this.subjectFilter == undefined
    },
    updateChart: function () {      
      this.chartOptions = {...this.chartOptions, ...{
        xaxis: {
          categories: Object.keys(this.decadeCounts)
        },
        colors: this.getColorList(),
      }}
      this.chartSeries = [{
        name: 'Item count',
        data: Object.values(this.decadeCounts),
      }]
    },
    onDecadeClick: function (dataPointIndex) {
      // set year range
      let decade = Object.keys(this.decadeCounts)[dataPointIndex]
      let decadeYearMin = parseInt(decade.slice(0,4))
      let decadeYearMax = decadeYearMin + 9
      this.selectedYearRange = [decadeYearMin, decadeYearMax]
      // set decade
      this.selectedDecadeIndex = dataPointIndex

      // color bars to show state 
      let colorList = this.getColorList()
      this.chartOptions = {...this.chartOptions, ...{
        colors: colorList
      }}
    },
    getColorList: function () {
      return Array.from(Object.keys(this.decadeCounts))
              .fill(this.colors.gray)
              .fill(this.colors.indigo, this.selectedDecadeIndex, this.selectedDecadeIndex+1)
    },
    showSnackbar (markup) {
      this.snackbar.state = false
      this.$nextTick(() => {
        this.snackbar.markup = markup
        this.snackbar.state = true
      })
    },
  },
  watch: {
    sortBy: function (newValue) {
      this.showSnackbar(`${this.sortAscending ? '☝️' : '👇'} Sorting by <strong>${newValue}</strong>`)
    },
    selectedDecadeIndex: function (newValue) {
      this.showSnackbar(`✅ Selected <strong>${Object.keys(this.decadeCounts)[newValue]}</strong> decade`)
    },
    sortAscending: function (newValue) {
      this.showSnackbar(`${newValue ? '☝️' : '👇'} Sorting in <strong>${newValue ? 'ascending' : 'descending'}</strong> order`)
    },
    /* for some weird reason newValue & oldValue have the same value in this watch funciton, 
       therefore trigger correct notifations in onToggleLocationFilter() */
    // locationFilters: function (newValue, oldValue) {
    //   console.log('oldValue', oldValue)
    //   console.log('newValue', newValue)
    //   let added = _.difference(newValue, oldValue)
    //   if (added.length) {
    //     this.showSnackbar(`📍 Added location filter <strong>${added[0]}</strong>`)
    //   } else {
    //     let removed = _.difference(oldValue, newValue)
    //     this.showSnackbar(`❌ Removed location filter <strong>${removed}</strong>`)
    //   }
    // },
    subjectFilter: function (newValue) {
      if (newValue) {
        this.showSnackbar(`🏷 Filtering for subject: <strong>${newValue}</strong>`)
      } else {
        this.showSnackbar('❌ Removed <strong>subject</strong> filter')
      }
    },
    displayFieldsSelected: function (newValue, oldValue) {
      let added = _.difference(newValue, oldValue)
      if (added.length) {
        this.showSnackbar(`👀 Displaying <strong>${added}</strong>`)
      } else {
        let removed = _.difference(oldValue, newValue)
        this.showSnackbar(`🙈 Not displaying <strong>${removed}</strong>`)
      }
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
    background: none !important;
}

.dib-i {
  display: inline-block !important;
}
</style>
