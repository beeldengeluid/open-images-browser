<template>
  <v-app id="app">
    <v-content class="ma3 mt5 tl">
      <h1>Open Images Browser</h1>
      
      <div class="mv3">
        <p>
          <span>Below you see videos from the </span> 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a href="https://openbeelden.nl/" target="_blank" v-on="on">Open Images Collection ↗︎</a>
            </template>
            <span>Open Images is an open media platform that offers online access to audiovisual archive material to stimulate creative reuse.</span>
          </v-tooltip>
          <span>.</span>
          <br>
          <span>The current selection, ranging from </span><span class="ph1 indigo">{{yearSelectionRange[0]}}</span> to <span class="ph1 indigo">{{yearSelectionRange[1]}}</span>
          <span> contains </span><span class="ph1 bg-blue">{{itemsSelectedSorted.length}}</span><span> out of {{this.items.length}} videos.</span>
          <br>
          <span>Videos are sorted by </span><span class="ph1 bg-purple font-mono">{{sortBy}}</span><span> in </span><span class="ph1 bg-purple">{{sortAscending ? 'ascending' : 'descending'}} <v-icon @click="toggleSortAscending" small>{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon> </span> order.
          <br>
          <span>Videos are displayed </span><span class="ph1 bg-orange">{{noThumbsPerRow}}</span><span> per row</span>
          <span v-if="showTitle || showYear">, along with their </span>
          <span v-if="showTitle" class="ph1 bg-green">titles</span>
          <span v-if="showTitle && showYear"> and </span>
          <span v-if="showYear" class="ph1 bg-green">years</span>
          <span>.</span>
        </p>
      </div>
      <div class="mv3">
        <div class="mr3 mt5 w-100">
          <v-range-slider
            v-model="yearSelectionRange"
            :min="yearMin"
            :max="yearMax"
            thumb-label="always"
            hide-details
            :color="'light-blue'"
            :thumb-color="'indigo'"
            :track-color="'grey'"
            class="align-center"
          >
          </v-range-slider>
        </div>
        <div class="dib mr3 mt3">
          <div class="dib mr3 mt3 pa1 bg-purple min-w-13rem">
            Sort by
            <label 
              v-for="sortField in sortFields" 
              v-bind:key="sortField"
              :for="sortField"
              class="pa1 font-mono" 
            >
              <input type="radio" :id="sortField" :value="sortField" v-model="sortBy">
              {{sortField}}
            </label>
          </div>
          <v-btn fab x-small color="deep-purple">
            <v-icon @click="toggleSortAscending">{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
          </v-btn>
        </div>
        <div class="dib mr3 mt3 pa1 bg-orange">
          <label for="noThumbsRange">
            <span class="mr2">Thumbs per row</span>
            <input 
              id="noThumbsRange"
              type="range" 
              min="1" 
              max="50" 
              step="1" 
              v-model="noThumbsPerRow" 
              class="mr2" 
            > 
            <input type="number" v-model="noThumbsPerRow" class="w3 f7" />
          </label>
        </div>
        <div class="dib mr3 mt3 pa1 bg-green">
          <label for="showTitleCheckbox">
            <input class="mr1" type="checkbox" id="showTitleCheckbox" v-model="showTitle">
            <span>Show titles</span>
          </label>
        </div>
        <div class="dib mr3 mt3 pa1 bg-green">
          <label for="showYearCheckbox">
            <input class="mr1" type="checkbox" id="showYearCheckbox" v-model="showYear">
            <span>Show years</span>
          </label>
        </div>
      </div>
      <div class="mv3 relative">
        <CollectionItem
          v-for = "item in itemsSelectedSorted" 
          :key       = "item['id']"
          :width     = "itemWidth + 'px'"
          :height    = "itemHeight + 'px'"
          :thumbSrc  = "item['thumbSrc']"
          :videoSrc  = "item['videoSrc']"
          :title     = "item['title']"
          :date      = "item['date']"
          :url       = "item['url']"
          :subjects  = "item['subjects']"
          :creators  = "item['creators']"
          :locations = "item['locations']"
          :showTitle = "showTitle"
          :showYear  = "showYear"
        />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import './../node_modules/tachyons/css/tachyons.min.css';
// import _ from 'lodash';
import converter from 'number-to-words'
import dataItems from "./assets/data/openbeelden-items-clean.json";
import CollectionItem from "./components/CollectionItem";

export default {
  name: 'OpenBeeldenBrowser',
  data: function () {
    return {
      items: dataItems,
      noThumbsPerRow: 10,
      showTitle: false,
      showYear: true,
      yearSelectionRange: [1970, 1980],
      sortBy: 'date',
      sortFields: ['id','date'],
      sortAscending: true,
      colors: {
        'blue': '#4A90E2',
        'purple': '#5E2CA5',
        'orange': '#FF6300',
        'green': '#19A974',
      },
      clientWidth: (document.body.clientWidth || document.documentElement.clientWidth),
      itemAspectRatio: 352 / 288,
      itemMargin: 4,
    }
  },
  components: {
    CollectionItem,
  },
  computed: {
    itemWidth: function () {
      let horizontalMarkupMargin = 32
      return (this.clientWidth - horizontalMarkupMargin) / this.noThumbsPerRow - this.itemMargin
    },
    itemHeight: function () {
      return this.itemWidth / this.itemAspectRatio
    },
    itemsSelectedSorted: function () {
      // filter based on selectionRange
      let selected = this.items.filter(
        i => this.dateToYear(i['date']) >= this.yearSelectionRange[0] &&
             this.dateToYear(i['date']) <= this.yearSelectionRange[1]
      )
      // sort
      if (this.sortAscending) {
        selected.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1)
      } else {
        selected.sort((a, b) => (a[this.sortBy] < b[this.sortBy]) ? 1 : -1)
      }
      return selected
    },
    selectionMax: function () {
      return this.items.length
    },
    yearMin: function () {
      return Math.min(... this.items.map(i => i['date'].slice(0, 4)))
    },
    yearMax: function () {
      return Math.max(... this.items.map(i => i['date'].slice(0, 4)))
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
    }
  }
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

.min-w-13rem {
  min-width: 13rem;
}
</style>
