<template>
  <div id="app" class="ma3 mt5 tl">
    <h1>Open Beelden Browser</h1>
    <div class="mv3">
      <p>
        Currently showing 
        <span class="ph1 bg-purple">{{itemsSelectedSorted.length}}</span> items, 
        <span class="ph1 bg-orange">{{noThumbsPerRow}}</span>
        <span> per row</span>
        <span v-if="showTitle || showYear">, with their </span>
        <span v-if="showTitle" class="ph1 bg-green">titles</span>
        <span v-if="showTitle && showYear"> and </span>
        <span v-if="showYear" class="ph1 bg-green">years</span>
        <span>, sorted by </span>
        <span class="ph1 bg-blue font-mono">{{sortFieldTitles[sortBy]}}</span>.
      </p>
      <div class="dib mr3 mt3 pa1 bg-purple">
        <label for="selectionEndRange">
          <span class="mr2">Selection size</span>
          <input 
            id="selectionEndRange"
            type="range" 
            min="1" 
            max="12" 
            step="1" 
            v-model="selectionEndStep" 
            class="mr2" 
          >
        </label>
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
      <div class="dib mr3 mt3 pa1 bg-blue">
        Sort by
        <label 
          v-for="sortField in sortFields" 
          v-bind:key="sortField"
          :for="sortField"
          class="pa1 font-mono" 
        >
          <input type="radio" :id="sortField" :value="sortField" v-model="sortBy">
          {{sortFieldTitles[sortField]}}
        </label>
      </div>
    </div>
    <div class="mv3 relative">
      <CollectionItem
        v-for="item in itemsSelectedSorted" 
        v-bind:key="item['@id']"
        :width= "100/noThumbsPerRow + '%'"
        :thumbSrc= "getThumb(item)"
        :videoSrc= "getVideo(item)"
        :title= "getTitle(item)"
        :date= "item['dcterms:date']"
        :showTitle= "showTitle"
        :showYear= "showYear"
      />
    </div>
  </div>
</template>

<script>
import './../node_modules/tachyons/css/tachyons.min.css';
// import _ from 'lodash';
import dataItems from "./assets/data/openbeelden-items-date-hasFormat-spatial-subject.json";
import CollectionItem from "./components/CollectionItem";

export default {
  name: 'OpenBeeldenBrowser',
  data: function () {
    return {
      items: dataItems,
      noThumbsPerRow: 10,
      showTitle: false,
      showYear: false,
      selectionBegin: 0,
      selectionEndStep: 5,
      sortBy: '@id',
      sortFieldTitles: {
        '@id': 'id',
        'dcterms:date': 'date',
      },
    }
  },
  components: {
    CollectionItem,
  },
  computed: {
    selectionEnd: function () {
      return Math.pow(2, this.selectionEndStep)
    },
    itemsSelectedSorted: function () {
      return this.items
              .slice(this.selectionBegin,this.selectionEnd)
              .sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : -1)
    },
    sortFields: function () {
      return Object.keys(this.sortFieldTitles)
    },
  },
  methods: {
    getThumb(item){
      let hasFormat = item['dcterms:hasFormat']
      let thumbs = hasFormat.filter(format => format.endsWith('.png'))
      return thumbs[0]
    },
    getTitle(item){
      let titles = item['dcterms:title']
      if (Array.isArray(titles)) {
        let titlesNL = titles.filter(title => title['@language'] == "nl")
        if (titlesNL.length) {
          return titlesNL[0]['@value']
        } else {
          let titlesEN = titles.filter(title => title['@language'] == "en")
          if (titlesEN.length) {
            return titlesEN[0]['@value']
          } else {
            return "No Title"
          }
        }
      } else {
        return titles['@value']
      }
    },
    getVideo(item){
      let hasFormat = item['dcterms:hasFormat']
      let videos = hasFormat.filter(format => format.endsWith('.mp4'))
      return videos[0]
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

.mb-1 {
  margin-bottom: -0.25rem;
}
</style>
