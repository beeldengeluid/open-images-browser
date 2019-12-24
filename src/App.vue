<template>
  <v-app id="app">
    <v-content class="ma3 mt5 tl">
      <h1>Open Beelden Browser</h1>
      
      <div class="mv3">
        <p>
          <span>Below you see videos from the Open Beelden Collection, sorted by </span>
          <span class="ph1 bg-purple font-mono">{{sortBy}}</span><span> in </span><span class="ph1 bg-purple">{{sortAscending ? 'ascending' : 'descending'}}</span> order.
          <br>
          <span>The current selection contains </span><span class="ph1 bg-blue">{{itemsSortedSelected.length}}</span><span> out of {{this.items.length}} videos, ranging from the </span><span class="ph1 indigo">{{toOrdinal(selectionRange[0])}}</span> to the <span class="ph1 indigo">{{toOrdinal(selectionRange[1])}}</span>.
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
        <div class="flex items-end">
          <div class="dib mr3 mt3 pa1 bg-purple w5 min-w-13rem mb1">
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
          <div class="dib mr3 mt4 w-100">
            <v-range-slider
              v-model="selectionRange"
              :max="selectionMax"
              thumb-label="always"
              hide-details
              :color="'light-blue'"
              :thumb-color="'indigo'"
              :track-color="'deep-purple'"
              class="align-center"
            >
              <template v-slot:prepend>
                <v-btn fab x-small color="deep-purple">
                  <v-icon @click="toggleSortAscending">{{sortAscending ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}}</v-icon>
                </v-btn>
              </template>
            </v-range-slider>
          </div>
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
          v-for="item in itemsSortedSelected" 
          v-bind:key="item['id']"
          :width= "itemWidth + 'px'"
          :height= "itemHeight + 'px'"
          :thumbSrc= "item['thumbSrc']"
          :videoSrc= "item['videoSrc']"
          :title= "item['title']"
          :date= "item['date']"
          :showTitle= "showTitle"
          :showYear= "showYear"
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
      selectionRange: [1500, 2500],
      selectionMin: 0,
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
    itemsSortedSelected: function () {
      let sorted = this.items
      if (this.sortAscending) {
        sorted.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1)
      } else {
        sorted.sort((a, b) => (a[this.sortBy] < b[this.sortBy]) ? 1 : -1)
      }
      return sorted.slice(this.selectionRange[0], this.selectionRange[1])    
    },
    selectionMax: function () {
      return this.items.length
    },
  },
  methods: {
    toOrdinal(int){
      return converter.toOrdinal(int)
    },
    toggleSortAscending(){
      this.sortAscending = ! this.sortAscending
    },
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

.min-w-13rem {
  min-width: 13rem;
}
</style>
