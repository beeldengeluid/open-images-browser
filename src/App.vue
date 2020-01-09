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
          <span v-if="displayFieldsSelected.length">, along with their </span>
          <span v-for="(field, index) in displayFieldsSelected" :key="field">
            <span v-if="displayFieldsSelected.length > 1 && index < displayFieldsSelected.length - 2">, </span>
            <span v-if="displayFieldsSelected.length > 1 && index == displayFieldsSelected.length - 1"> &amp; </span>
            <span class="ph1 green darken white--text">{{field}}</span>
          </span>
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
        <div class="dflex items-center justify-between flex-wrap">
          <div class="dib mr3">
            <div class="dib dflex items-center">
              <span class="mr2">Sort by</span>
              <v-chip-group
                v-model="sortBy"
                active-class="deep-purple darken-4"
                mandatory
              >
                <v-chip v-for="sortField in sortFields" :key="sortField" :value="sortField">
                  {{ sortField }}
                </v-chip>
              </v-chip-group>
              <v-btn fab x-small color="deep-purple">
                <v-icon @click="toggleSortAscending">{{sortAscending ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="dib pa1 bg-orange">
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
          <div class="dflex items-center">
            <span class="pr2">Display</span>
            <v-chip-group
              v-model="displayFieldsSelected"
              active-class="green darken-4"
              multiple
            >
              <v-chip v-for="displayField in displayFields" :key="displayField" :value="displayField">
                {{displayField}}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </div>
      <div class="mv3 relative dflex flex-wrap">
        <CollectionItem
          v-for = "item in itemsSelectedSorted" 
          :key          = "item['id']"
          :width        = "itemWidth + 'px'"
          :height       = "itemHeight + 'px'"
          :thumbSrc     = "item['thumbSrc']"
          :videoSrc     = "item['videoSrc']"
          :title        = "item['title']"
          :date         = "item['date']"
          :url          = "item['url']"
          :subjects     = "item['subjects']"
          :creators     = "item['creators']"
          :locations    = "item['locations']"
          :displayTitle = "displayFieldsSelected.includes('title')"
          :displayYear  = "displayFieldsSelected.includes('year')"
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

export default {
  name: 'OpenBeeldenBrowser',
  data: function () {
    return {
      items: dataItems,
      noThumbsPerRow: 10,
      displayFields: ['title', 'year'],
      displayFieldsSelected: ['year'],
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
      itemAspectRatio: 352 / 288,
      itemMargin: 4,
      clientWidth: this.getClientWidth(),
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
    },
    getClientWidth(){
      return document.body.clientWidth || document.documentElement.clientWidth
    },
    onResize(){
      this.clientWidth = this.getClientWidth()
    },
  },
  created() {
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
</style>
