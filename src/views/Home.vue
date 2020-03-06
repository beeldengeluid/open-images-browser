<template>
  <v-app id="app">
    <v-content class="ma2 ma3-ns">
      <header>
        <h1>Open Images Browser</h1>
        <p>
          <span>Below you can explore videos from the </span> 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a href="https://openbeelden.nl/" target="_blank" v-on="on">Open Images Collection ↗︎</a>
            </template>
            an open media platform that offers online access to audiovisual archive material to stimulate creative reuse
          </v-tooltip>.
        </p>
      </header>
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
      <v-btn
        @click="randomizeSelection"
        outlined
      >
        Random!
      </v-btn>
      <PeriodChart 
        :barSeries="decadeCounts" 
        :lineSeries="decadeCountsForSelection" 
        v-on:decade-click="onDecadeClick"
        :decadeIndex="state.decadeIndex" 
        :colors="{ bar: $options.static.colors.inactive, line: $options.static.colors.secondary, background: $options.static.colors.background }" 
      />
      <div class="db dn-l">
        <h3 class="mb2">
          <span class="bb b--secondary">Locations in selection <span class="fw1">{{filtersForSelection['locations'].length}}</span></span>
        </h3>
        <FilterList 
          :filters="filtersForSelection['locations']"
          :activeFilters="state.activeFilters['locations']"
          v-on:toggle-filter = "onToggleLocationFilter"
          v-on:toggle-tail = "onToggleTail"
          activeClass="teal"
        />
        <h3 class="mb2">
          <span class="bb b--secondary">Subjects in selection <span class="fw1">{{filtersForSelection['subjects'].length}}</span></span>
        </h3>
        <FilterList 
          :filters="filtersForSelection['subjects']"
          :activeFilters="state.activeFilters['subjects']"
          v-on:toggle-filter = "onToggleSubjectFilter"
          v-on:toggle-tail = "onToggleTail"
          activeClass="teal"
        />
      </div>
      <v-container fluid class="pa0">
        <v-row>
          <v-col cols="auto" class="dn db-l">
            <div class="mw5">
              <h3 class="mb3">
                <span class="bb b--secondary">Locations in selection <span class="fw1">{{filtersForSelection['locations'].length}}</span></span>
              </h3>
              <FilterList 
                :filters="filtersForSelection['locations']"
                :activeFilters="state.activeFilters['locations']"
                v-on:toggle-filter = "onToggleLocationFilter"
                v-on:toggle-tail = "onToggleTail"
                activeClass="teal"
              />
            </div>
          </v-col>
          <v-col cols="auto" class="dn db-l">
            <div class="mw5">
              <h3 class="mb3">
                <span class="bb b--secondary">Subjects in selection <span class="fw1">{{filtersForSelection['subjects'].length}}</span></span>
              </h3>
              <FilterList 
                :filters="filtersForSelection['subjects']"
                :activeFilters="state.activeFilters['subjects']"
                v-on:toggle-filter = "onToggleSubjectFilter"
                v-on:toggle-tail = "onToggleTail"
                activeClass="teal"
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb3">
              <h3 class="dib mr3 mb2">
                <span class="bb b--secondary mr2">Videos in selection <span class="fw1">{{itemsFilteredSorted.length}}</span></span>
                <span class="fw1 grey--text bb b--primary-accent">(of {{decades[state.decadeIndex].count}} in decade)</span>
              </h3>
              <v-btn 
                @click="resetState"
                v-show="hasActiveFilters"
                small outlined
              >
                Clear Selection
              </v-btn>
            </div>
            <div class="dflex flex-wrap mb3">
              <div class="dflex items-center mr3 mr4-l">
                <span class="mr2 fw7">Sort by</span>
                <v-chip-group v-model="state.sortBy" active-class="indigo" mandatory class="fw5 font-mono">
                  <v-chip v-for="sortField in $options.static.sortFields" :key="sortField" :value="sortField">
                    {{ sortField }}
                  </v-chip>
                </v-chip-group>
                <v-btn fab x-small color="indigo mr2">
                  <v-icon @click="toggleSortAscending">{{state.sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                </v-btn>
              </div>
              <div class="dflex items-center">
                <span class="pr2 fw7">Display</span>
                <v-chip-group v-model="state.displayFieldsSelected" active-class="green" multiple class="fw5 font-mono">
                  <v-chip v-for="displayField in $options.static.displayFields" :key="displayField" :value="displayField">
                    {{displayField}}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <ZoomSlider
              v-model="zoom.value"
              :min="zoom.min" :max="zoom.max" :step="zoom.step"
              :tickLabels="zoomLabels"
              class="mb3 mb4-ns"
            ></ZoomSlider>
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
                :activeLocationFilters = "state.activeFilters['locations']"
                :activeSubjectFilters  = "state.activeFilters['subjects']"
                :locationCountsForSelection = "filterCountsForSelection['locations']"
                :subjectCountsForSelection  = "filterCountsForSelection['subjects']"
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
import StateStory from "@/components/StateStory";
import PeriodChart from "@/components/PeriodChart";
import FilterList from "@/components/FilterList";
import ZoomSlider from "@/components/ZoomSlider";
import CollectionItem from "@/components/CollectionItem";
import BackToTop from 'vue-backtotop'

export default {
  name: 'OpenBeeldenBrowser',
  components: {
    StateStory,
    PeriodChart,
    FilterList,
    ZoomSlider,
    CollectionItem,
    BackToTop
  },
  data () {
    return {
      items: dataItems,
      state: {
        decadeIndex: 7,
        sortBy: 'date',
        sortAscending: true,
        displayFieldsSelected: ['thumb', 'year'],
        activeFilters: {
          locations: [],
          subjects: [],
        },
      },
      zoom: {
        value: 3,
        min: 0,
        max: 6,
        step: 1,
      },
      clientWidth: this.getClientWidth(),      
      chartSeries: [],
      snackbar:{
        state: false,
        text: "",
        timeout: 4000,
      }
    }
  },
  static: {
    defaultState: {
      activeFilters: {
        locations: [],
        subjects: [],
      },
    },
    sortFields: ['id','date', 'title'],
    displayFields: ['title', 'year', 'thumb'],
    filterFields: ['locations', 'subjects'],
    itemAspectRatio: 352 / 288,
    itemMargin: 4,
    colors: {
      primary: '#5E35B1', 
      secondary: '#009688', 
      background: '#121212',
      inactive: '#555',
    },
  },
  computed: {
    itemsPerDecade () {
      return _.groupBy(this.items, i => this.dateToDecade(i['date']))
    },
    itemWidth () {
      let horizontalMarkupMargin = 32
      return (this.clientWidth - horizontalMarkupMargin) / this.noThumbsPerRow - this.$options.static.itemMargin
    },
    itemHeight () {
      return this.itemWidth / this.$options.static.itemAspectRatio
    },
    noThumbsPerRow () {
      return Math.pow(2, this.zoom.value)
    },
    zoomLabels () {
      return _.range(this.zoom.max + 1)
              .map(value => Math.pow(2, value))
    },
    itemsFiltered () {
      return this.itemsPerDecade[this.decades[this.state.decadeIndex].name]
        .filter(
          i => 
            this.filterByLocation(i) && 
            this.filterBySubject(i)
        )
    },
    itemsFilteredAllDecades () {
      return this.items
        .filter(
          i => 
            this.filterByLocation(i) && 
            this.filterBySubject(i)
        )
    },
    itemsFilteredSorted () {
      let order = this.state.sortAscending ? 'asc' : 'desc'
      return _.orderBy(this.itemsFiltered, [this.state.sortBy], [order])
    },
    selectedYearRange () {
      let decadeYearMin = parseInt(this.decades[this.state.decadeIndex].name.slice(0,4))
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
    filterCountsForSelection () {
      const getCounts = (items, fieldName) => {
        let names = _.flatMap(items, i => i[fieldName])
        return _.countBy(names)
      }

      /// more readable, less elegant?
      // filterCounts = {}
      // this.$options.static.filterFields.forEach(filterField => {
      //   filterCounts[filterField] = getCounts(this.itemsFilteredSorted, fitlerField)
      // })
      // return filterCounts
      
      return this.$options.static.filterFields.reduce((filterCountsAccumulator, currentFilterField) => {
        filterCountsAccumulator[currentFilterField] = getCounts(this.itemsFilteredSorted, currentFilterField)
        return filterCountsAccumulator
      }, {})
    },
    filtersForSelection () {
      const getFiltersOrdered = (filterCounts) => {
        let filtersForSelection = this.objectToCollection(filterCounts, 'name', 'count')
        return _.orderBy(filtersForSelection, ['count', 'name'], ['desc', 'asc'])        
      }

      return this.$options.static.filterFields.reduce((filtersAccumulator, currentFilterField) => {
        filtersAccumulator[currentFilterField] = getFiltersOrdered(this.filterCountsForSelection[currentFilterField])
        return filtersAccumulator
      }, {})
    },
    hasActiveFilters () {
      return this.state.activeFilters['locations'].length || this.state.activeFilters['subjects'].length
    },
    decadeCounts () {
      return this.getDecadeCounts(this.items, this.decadeMin, this.decadeMax)
    },
    decades () {
      return this.objectToCollection(this.decadeCounts, 'name', 'count')
    },
    decadeCountsForSelection () {
      return this.getDecadeCounts(this.itemsFilteredAllDecades, this.decadeMin, this.decadeMax)
    },
  },
  methods: {
    objectToCollection (countsObject, keyForKey, keyForValue) {
      return Object.keys(countsObject).map(k => { 
        return {
          [keyForKey]: k,
          [keyForValue]: countsObject[k]
        }
      })
    },
    toggleSortAscending () {
      this.state.sortAscending = ! this.state.sortAscending
    },
    dateToYear (date) {
      return date.slice(0,4)
    },
    dateToDecade (date) {
      return date.slice(0,3)+'0s'
    },
    getClientWidth () {
      return document.body.clientWidth || document.documentElement.clientWidth
    },
    onResize () {
      this.clientWidth = this.getClientWidth()
    },
    onToggleLocationFilter (filterValue) {
      if (this.state.activeFilters['locations'].includes(filterValue)) {
        this.removeLocationFilter(filterValue)
      } else {
        this.addLocationFilter(filterValue)
      }
    },
    addLocationFilter (filterValue) {
      /* for unclear reason .push() doesn't register correctly in the watch() 
         function, so using .concat() instead */
      this.state.activeFilters['locations'] = this.state.activeFilters['locations'].concat([filterValue])
    },
    removeLocationFilter (filterValue) {
      this.state.activeFilters['locations'] = this.state.activeFilters['locations'].filter(lf => lf !== filterValue)
    },
    onToggleSubjectFilter (filterValue) {
      if (this.state.activeFilters['subjects'].includes(filterValue)) {
        this.removeSubjectFilter(filterValue)
      } else {
        this.addSubjectFilter(filterValue)
      }
    },
    addSubjectFilter (filterValue) {
      /* for unclear reason .push() doesn't register correctly in the watch() 
         function, so using .concat() instead */
      this.state.activeFilters['subjects'] = this.state.activeFilters['subjects'].concat([filterValue])
    },
    removeSubjectFilter (filterValue) {
      this.state.activeFilters['subjects'] = this.state.activeFilters['subjects'].filter(lf => lf !== filterValue)
    },
    filterByYear (item) {
      return this.dateToYear(item['date']) >= this.selectedYearRange[0] &&
             this.dateToYear(item['date']) <= this.selectedYearRange[1]
    },
    filterByLocation (item) {
      return this.state.activeFilters['locations'].every(lf => item['locations'].includes(lf)) || !this.state.activeFilters['locations'].length
    },
    filterBySubject (item) {
      return this.state.activeFilters['subjects'].every(sf => item['subjects'].includes(sf)) || !this.state.activeFilters['subjects'].length
    },
    onDecadeClick (dataPointIndex) {
      // set decade
      this.state.decadeIndex = dataPointIndex
    },
    getDecadeCounts (items, decadeMin, decadeMax) {
      // get decades present in data
      let decadesPresent =  _.countBy(items, i => this.dateToDecade(i['date']))
      
      // add intermediary decades
      _.range(decadeMin, decadeMax + 10, 10)
        .map(d => {
          let decade = d + 's'
          if (!Object.keys(decadesPresent).includes(decade)) {
            decadesPresent[decade] = 0
          }
        })

      // sort keys
      const decadesSorted = {};
      Object.keys(decadesPresent).sort().forEach(function(key) {
        decadesSorted[key] = decadesPresent[key];
      });

      return decadesSorted
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
    resetState () {
      this.state.activeFilters = Object.assign({}, this.$options.static.defaultState.activeFilters)
    },
    randomItemFromArray (array) {
      return array[Math.floor(Math.random() * array.length)]
    },
    randomizeDecade () {
      let decadeIndicesAvailable = 
        _.range(_.size(this.decades))
          .filter(
            index => 
              this.decades[index].count > 0 &&
              index !== this.state.decadeIndex
          )
      this.state.decadeIndex = this.randomItemFromArray(decadeIndicesAvailable)
      
    },
    // randomizeFilter (filterField) {
    //   let locationsAvailable = this.filtersForSelection['locations'].filter(l => l.count > 1)
    //   if (locationsAvailable.length) {
    //     let randomLocation = this.randomItemFromArray(locationsAvailable).name
    //     this.state.activeFilters['locations'] = [randomLocation]
    //     return true
          
    //   } 
    //   else {
    //     return false
    //   }
    // },
    randomizeLocation () {
      let locationsAvailable = this.filtersForSelection['locations'].filter(l => l.count > 1)
      if (locationsAvailable.length) {
        let randomLocation = this.randomItemFromArray(locationsAvailable).name
        this.state.activeFilters['locations'] = [randomLocation]
        return true
          
      } 
      else {
        return false
      }
    },
    randomizeSubject () {
      let subjectsAvailable = this.filtersForSelection['subjects'].filter(s => s.count > 1)
      if (subjectsAvailable.length) {
        let randomSubject = this.randomItemFromArray(subjectsAvailable).name
        this.state.activeFilters['subjects'] = [randomSubject]
        return true
          
      } 
      else {
        return false
      }
    },
    randomizeSelection () {
      this.resetState()      
      this.randomizeDecade()
      if (_.random(1)) {
        let isLocationRandomized = this.randomizeLocation()
        if (!isLocationRandomized) {
          // no filters in this decade, recursively retry
          this.randomizeSelection()
        }
      }
      else {
        let isSubjectRandomized = this.randomizeSubject()
        if (!isSubjectRandomized) {
          // no filters in this decade, recursively retry
          this.randomizeSelection()
        }
      }
    },
  },
  watch: {
    'state.sortBy': function (newValue) {
      this.showSnackbar(`${this.state.sortAscending ? '☝️' : '👇'} Sorting by <strong>${newValue}</strong>`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { sortBy: newValue })})
    },
    'state.decadeIndex': function (newValue) {
      this.showSnackbar(`✅ Selected <strong>${this.decades[newValue].name}</strong> decade`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { decadeIndex: newValue })})
    },
    'state.sortAscending': function (newValue) {
      this.showSnackbar(`${newValue ? '☝️' : '👇'} Sorting in <strong>${newValue ? 'ascending' : 'descending'}</strong> order`)
      this.$router.push({ query: Object.assign({}, this.$route.query, { sortAscending: newValue })})
    },
    'state.activeFilters': function (newValue, oldValue) {
      this.$options.static.filterFields.forEach(field => {
        let added = _.difference(newValue[field], oldValue[field])
        if (added.length) {
          this.showSnackbar(`📍 Added location filter <strong>${added[0]}</strong>`)
        } else {
          let removed = _.difference(oldValue[field], newValue[field])
          if (removed.length) {
            this.showSnackbar(`❌ Removed location filter <strong>${removed[0]}</strong>`)
          }
        }
        this.$router.push({ query: Object.assign({}, this.$route.query, { activeFilters: newValue })})        
      })
    },
    'state.displayFieldsSelected': function (newValue, oldValue) {
      let added = _.difference(newValue, oldValue)
      if (added.length) {
        this.showSnackbar(`👀 Displaying <strong>${added[0]}</strong>`)
      } else {
        let removed = _.difference(oldValue, newValue)
        if (removed.length) {
          this.showSnackbar(`🙈 Not displaying <strong>${removed[0]}</strong>`)
        }
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { displayFieldsSelected: newValue })})
    },
  },
  created() {
    _.assignWith(this.state, this.$route.query, this.qsCustomizer)
    // ensure activeFilters has both all default defined in case not in query
    this.state = Object.assign({}, this.state, this.$options.static.defaultState)
    window.addEventListener("resize", _.debounce(this.onResize), 400)
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },
}
</script>

<style>
:root {
  --bg-color: #121212;
  --text-color: #EDEDED;
  --primary-color: #5E35B1;
  --primary-accent-color: #7E57C2;
  --secondary-color: #009688;
}
html, body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.theme--dark.v-application {
  background: var(--bg-color);
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

.filterGroupWidth {
  width: calc(100% - 180px);
}

.min-w-24rem {
  min-width: 24rem;
}

.b--primary-accent {
  border-color: var(--primary-accent-color)
}
.b--secondary {
  border-color: var(--secondary-color)
}
.bg-primary {
  background-color: var(--primary-color);
}
.bg-primary-accent {
  background-color: var(--primary-accent-color);
}
</style>