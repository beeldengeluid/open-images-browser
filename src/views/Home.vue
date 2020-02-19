<template>
  <v-app id="app">
    <v-content class="ma3 mt5 tl">
      <h1>Open Images Browser</h1>
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
      <StateStory 
        :state="state" 
        :computed="{
          selectedYearRange: selectedYearRange,
          activeLength: itemsFilteredSorted.length,
          totalLength: items.length,
        }"
        v-on:toggle-location-filter = "onToggleLocationFilter"
        v-on:toggle-subject-filter = "onToggleSubjectFilter"
      />
      <div>
        <apexcharts  width="100%" :options="chartOptions"  :series="chartSeries" class="apex-bar-chart"></apexcharts>
        <div class="db dn-l">
          <div class="dflex items-center justify-start">
            <div class="fw7 w5">Top locations in decade</div>
            <v-chip-group
              prev-icon="keyboard_arrow_left" next-icon="keyboard_arrow_right" 
              multiple class="font-mono filterGroupWidth"
            >
              <v-chip  
                v-for="location in locationsForSelection" :key="location.name"
                @click="onToggleLocationFilter(location.name)"
                :value="location.name"
                :class="state.activeLocationFilters.includes(location.name) ? 'teal white--text' : ''"
                label small
              >
                <strong class="mr1">{{ location.name }}</strong>
                <span>{{locationCountsForSelection[location.name]}}</span>
                <v-icon right small>{{state.activeLocationFilters.includes(location.name) ? 'cancel' : 'filter_list'}} </v-icon>
              </v-chip>
            </v-chip-group>
          </div>
          <div class="dflex items-center justify-start">
            <div class="fw7 w5">Top subjects in decade</div>
            <v-chip-group
              prev-icon="keyboard_arrow_left" next-icon="keyboard_arrow_right" 
              multiple class="font-mono filterGroupWidth"
            >
              <v-chip  
                v-for="subject in subjectsForSelection" :key="subject.name"
                @click="onToggleSubjectFilter(subject.name)"
                :value="subject.name"
                :class="state.activeSubjectFilters.includes(subject.name) ? 'cyan white--text' : ''"
                label small
              >
                <strong class="mr1">{{ subject.name }}</strong>
                <span>{{subjectCountsForSelection[subject.name]}}</span>
                <v-icon right small>{{state.activeSubjectFilters.includes(subject.name) ? 'cancel' : 'filter_list'}} </v-icon>
              </v-chip>
            </v-chip-group>
          </div>
        </div>
        <div class="dib dflex items-center">
          <span class="mr2 fw7">Sort by</span>
          <v-chip-group v-model="state.sortBy" active-class="deep-purple" mandatory class="fw5 font-mono">
            <v-chip v-for="sortField in sortFields" :key="sortField" :value="sortField">
              {{ sortField }}
            </v-chip>
          </v-chip-group>
          <v-btn fab x-small color="deep-purple mr2">
            <v-icon @click="toggleSortAscending">{{state.sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
          </v-btn>
        </div>
        <div class="dflex mt4 flex-wrap items-center justify-between">
          <v-slider
            v-model="zoom.value"
            :min="zoom.min" :max="zoom.max" :step="zoom.step"
            ticks="always"
            tick-size="4"
            :tick-labels="zoomLabels"
            :label="zoom.label"
            color="orange" 
            hide-details
            class="zoom-slider mr4 mb4 min-w-24rem"
          >
            <template v-slot:prepend>
              <v-btn icon @click="zoom.value--">
                <v-icon>zoom_in</v-icon>
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn icon @click="zoom.value++">
                <v-icon>zoom_out</v-icon>
              </v-btn>
            </template>
          </v-slider>
          <div class="dflex items-center mb4">
            <span class="pr2 fw7">Display</span>
            <v-chip-group v-model="state.displayFieldsSelected" active-class="green" multiple class="fw5 font-mono">
              <v-chip v-for="displayField in displayFields" :key="displayField" :value="displayField">
                {{displayField}}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </div>
      <v-container fluid>
        <v-row>
          <v-col cols="auto" class="dn db-l">
            <h3 class="mb3">Locations in selection <span class="fw1">{{noLocationsForSelection}}</span></h3>
            <FilterList 
              :filters="locationsForSelection"
              :activeFilters="state.activeLocationFilters"
              v-on:toggle-filter = "onToggleLocationFilter"
              v-on:toggle-tail = "onToggleTail"
              activeClass="teal"
            />
          </v-col>
          <v-col cols="auto" class="dn db-l">
            <h3 class="mb3">Subjects in selection <span class="fw1">{{noSubjectsForSelection}}</span></h3>
            <FilterList 
              :filters="subjectsForSelection"
              :activeFilters="state.activeSubjectFilters"
              v-on:toggle-filter = "onToggleSubjectFilter"
              v-on:toggle-tail = "onToggleTail"
              activeClass="cyan"
            />
          </v-col>
          <v-col>
            <h3 class="mb3">Videos in selection <span class="fw1">{{itemsFilteredSorted.length}}</span></h3>
            <div class="relative dflex flex-wrap">
              <CollectionItem
                v-for = "item in itemsFilteredSorted" 
                :key             = "item['id']"
                :width           = "itemWidth + 'px'"
                :height          = "itemHeight + 'px'"
                :thumbSrc        = "item['thumbSrc']"
                :videoSrc        = "item['videoSrc']"
                :title           = "item['title']"
                :date            = "item['date']"
                :url             = "item['url']"
                :subjects        = "item['subjects']"
                :creators        = "item['creators']"
                :locations       = "item['locations']"
                :displayTitle    = "state.displayFieldsSelected.includes('title')"
                :displayYear     = "state.displayFieldsSelected.includes('year')"
                :displayThumb    = "state.displayFieldsSelected.includes('thumb')"
                :activeLocationFilters = "state.activeLocationFilters"
                :activeSubjectFilters  = "state.activeSubjectFilters"
                :locationCountsForSelection = "locationCountsForSelection"
                :subjectCountsForSelection  = "subjectCountsForSelection"
                v-on:toggle-location-filter = "onToggleLocationFilter"
                v-on:toggle-subject-filter  = "onToggleSubjectFilter"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
      
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
import '../../node_modules/tachyons/css/tachyons.min.css';
import _ from 'lodash';
import dataItems from "@/assets/data/openbeelden-items-clean.json";
import CollectionItem from "@/components/CollectionItem";
import FilterList from "@/components/FilterList";
import StateStory from "@/components/StateStory";
import VueApexCharts from 'vue-apexcharts'
import BackToTop from 'vue-backtotop'

export default {
  name: 'OpenBeeldenBrowser',
  components: {
    CollectionItem,
    FilterList,
    StateStory,
    apexcharts: VueApexCharts,
    BackToTop
  },
  data () {
    return {
      items: dataItems,
      state: {
        sortBy: 'date',
        selectedDecadeIndex: 7,
        sortAscending: true,
        activeLocationFilters: ['Nederland'],
        activeSubjectFilters: [],
        displayFieldsSelected: ['thumb', 'year'],
      },
      sortFields: ['id','date', 'title'],
      displayFields: ['title', 'year', 'thumb'],
      zoom: {
        value: 4,
        min: 0,
        max: 6,
        step: 1,
        label: 'Zoom Out level',
      },
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
    itemWidth () {
      let horizontalMarkupMargin = 32
      return (this.clientWidth - horizontalMarkupMargin) / this.noThumbsPerRow - this.itemMargin
    },
    itemHeight () {
      return this.itemWidth / this.itemAspectRatio
    },
    noThumbsPerRow () {
      return Math.pow(2, this.zoom.value)
    },
    zoomLabels () {
      return _.range(this.zoom.max + 1)
              .map(value => Math.pow(2, value))
    },
    itemsFiltered () {
      return this.items
        .filter(
          i => this.filterByYear(i) &&
               this.filterByLocation(i) && 
               this.filterBySubject(i)
        )
    },
    itemsFilteredSorted () {
      let order = this.state.sortAscending ? 'asc' : 'desc'
      return _.orderBy(this.itemsFiltered, [this.state.sortBy], [order])
    },
    selectedYearRange () {
      let decade = Object.keys(this.decadeCounts)[this.state.selectedDecadeIndex]
      let decadeYearMin = parseInt(decade.slice(0,4))
      let decadeYearMax = decadeYearMin + 9
      return [decadeYearMin, decadeYearMax]
    },
    yearMin () {
      return Math.min(... this.items.map(i => i['date'].slice(0, 4)))
    },
    yearMax () {
      return Math.max(... this.items.map(i => i['date'].slice(0, 4)))
    },
    decadeMin () {
      return Math.floor(this.yearMin / 10) * 10
    },
    decadeMax () {
      return Math.floor(this.yearMax / 10) * 10
    },
    locationCountsForSelection () {
      let locations = _.flatMap(this.itemsFilteredSorted, i => i['locations'])
      return _.countBy(locations)
    },
    noLocationsForSelection () {
      return _.size(this.locationCountsForSelection)
    },
    locationsForSelection () {
      let locations = 
        Object.keys(this.locationCountsForSelection)
          .map( key => {
            return {
              'name': key,
              'count': this.locationCountsForSelection[key]
            }
          })

      return _.orderBy(locations, ['count', 'name'], ['desc', 'asc'])    
    },
    subjectCountsForSelection () {
      let subjects = _.flatMap(this.itemsFilteredSorted, i => i['subjects']) 
      return _.countBy(subjects)
    },
    noSubjectsForSelection () {
      return _.size(this.subjectCountsForSelection)
    },
    subjectsForSelection () {
      let subjects = 
        Object.keys(this.subjectCountsForSelection)
          .map( key => {
            return {
              'name': key,
              'count': this.subjectCountsForSelection[key]
            }
          })

      return _.orderBy(subjects, ['count', 'name'], ['desc', 'asc'])
    },
    decadeCounts () {
      // get decades present in data
      let decadesPresent =  _.countBy(this.items, i => i['date'].slice(0,3)+'0s')
      
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
    toggleSortAscending () {
      this.state.sortAscending = ! this.state.sortAscending
    },
    dateToYear (date) {
      return date.slice(0,4)
    },
    getClientWidth () {
      return document.body.clientWidth || document.documentElement.clientWidth
    },
    onResize () {
      this.clientWidth = this.getClientWidth()
    },
    onToggleLocationFilter (filterValue) {
      if (this.state.activeLocationFilters.includes(filterValue)) {
        this.removeLocationFilter(filterValue)
      } else {
        this.addLocationFilter(filterValue)
      }
    },
    addLocationFilter (filterValue) {
      /* for unclear reason .push() doesn't register correctly in the watch() 
         function, so using .concat() instead */
      this.state.activeLocationFilters = this.state.activeLocationFilters.concat([filterValue])
    },
    removeLocationFilter (filterValue) {
      this.state.activeLocationFilters = this.state.activeLocationFilters.filter(lf => lf !== filterValue)
    },
    onToggleSubjectFilter (filterValue) {
      if (this.state.activeSubjectFilters.includes(filterValue)) {
        this.removeSubjectFilter(filterValue)
      } else {
        this.addSubjectFilter(filterValue)
      }
    },
    addSubjectFilter (filterValue) {
      /* for unclear reason .push() doesn't register correctly in the watch() 
         function, so using .concat() instead */
      this.state.activeSubjectFilters = this.state.activeSubjectFilters.concat([filterValue])
    },
    removeSubjectFilter (filterValue) {
      this.state.activeSubjectFilters = this.state.activeSubjectFilters.filter(lf => lf !== filterValue)
    },
    filterByYear (item) {
      return this.dateToYear(item['date']) >= this.selectedYearRange[0] &&
             this.dateToYear(item['date']) <= this.selectedYearRange[1]
    },
    filterByLocation (item) {
      return this.state.activeLocationFilters.every(lf => item['locations'].includes(lf)) || !this.state.activeLocationFilters.length
    },
    filterBySubject (item) {
      return this.state.activeSubjectFilters.every(sf => item['subjects'].includes(sf)) || !this.state.activeSubjectFilters.length
    },
    updateChart () {      
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
    onDecadeClick (dataPointIndex) {
      // set decade
      this.state.selectedDecadeIndex = dataPointIndex

      // color bars to show state 
      let colorList = this.getColorList()
      this.chartOptions = {...this.chartOptions, ...{
        colors: colorList
      }}
    },
    getColorList () {
      return Array.from(Object.keys(this.decadeCounts))
              .fill(this.colors.gray)
              .fill(this.colors.indigo, this.state.selectedDecadeIndex, this.state.selectedDecadeIndex + 1)
    },
    showSnackbar (markup) {
      this.snackbar.state = false
      this.$nextTick(() => {
        this.snackbar.markup = markup
        this.snackbar.state = true
      })
    },
    onToggleTail (newValue) {
      if (newValue) {
        this.showSnackbar(`👀 Showing the <strong>full list of filters</strong>`)
      } else {
        this.showSnackbar(`🙈 Hiding <strong>filters with 1 occurance</strong>`)  
      }
    },
    qsCustomizer (objValue, srcValue) {
      return typeof objValue === 'number' ? parseInt(srcValue, 10) : srcValue
    },
  },
  watch: {
    'state.sortBy': function (newValue) {
      this.showSnackbar(`${this.state.sortAscending ? '☝️' : '👇'} Sorting by <strong>${newValue}</strong>`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { sortBy: newValue })})
    },
    'state.selectedDecadeIndex': function (newValue) {
      this.showSnackbar(`✅ Selected <strong>${Object.keys(this.decadeCounts)[newValue]}</strong> decade`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { selectedDecadeIndex: newValue })})
    },
    'state.sortAscending': function (newValue) {
      this.showSnackbar(`${newValue ? '☝️' : '👇'} Sorting in <strong>${newValue ? 'ascending' : 'descending'}</strong> order`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { sortAscending: newValue })})
    },
    'state.activeLocationFilters': function (newValue, oldValue) {
      let added = _.difference(newValue, oldValue)
      if (added.length) {
        this.showSnackbar(`📍 Added location filter <strong>${added[0]}</strong>`)
      } else {
        let removed = _.difference(oldValue, newValue)
        this.showSnackbar(`❌ Removed location filter <strong>${removed}</strong>`)
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { activeLocationFilters: newValue })})
    },
    'state.activeSubjectFilters': function (newValue, oldValue) {
      let added = _.difference(newValue, oldValue)
      if (added.length) {
        this.showSnackbar(`🏷 Added subject filter <strong>${added[0]}</strong>`)
      } else {
        let removed = _.difference(oldValue, newValue)
        this.showSnackbar(`❌ Removed subject filter <strong>${removed}</strong>`)
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { activeSubjectFilters: newValue })})
    },
    'state.displayFieldsSelected': function (newValue, oldValue) {
      let added = _.difference(newValue, oldValue)
      if (added.length) {
        this.showSnackbar(`👀 Displaying <strong>${added}</strong>`)
      } else {
        let removed = _.difference(oldValue, newValue)
        this.showSnackbar(`🙈 Not displaying <strong>${removed}</strong>`)
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { displayFieldsSelected: newValue })})
    },
  },
  created() {
    // Object.assign(this.state, this.$route.query )
    _.assignWith(this.state, this.$route.query, this.qsCustomizer)
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

.filterGroupWidth {
  width: calc(100% - 180px);
}

.min-w-24rem {
  min-width: 24rem;
}

.zoom-slider .v-input__prepend-outer, .zoom-slider .v-input__append-outer {
  margin-top: 0;
}
.zoom-slider .v-slider__tick {
  background-color: hsla(0,0%,100%,.5);
}
</style>