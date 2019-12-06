<template>
  <div id="app" class="ma3 mt5 tl ">
    <h1>Open Beelden Browser</h1>
    <div class="mv3">
      <p>
        Currently showing <span class="ph1 bg-purple">{{itemsSelected.length}} items</span>, <span class="ph1 bg-orange">{{noThumbsPerRow}} per row</span>, <span v-if="showTitle">along with</span><span v-if="!showTitle">without</span> <span class="ph1 bg-green">their titles</span>.
      </p>
      <div class="dib mr4 pa1 bg-purple">
        <label for="selectionEndRange">
          <span class="mr2 v-top">Selection size</span>
          <input 
            id="selectionEndRange"
            type="range" 
            min="1" 
            max="12" 
            step="1" 
            v-model="selectionEndStep" 
            class="mr2 v-top" 
          >
        </label>
      </div>
      <div class="dib mr4 pa1 bg-orange">
        <label for="noThumbsRange">
          <span class="mr2 v-top">Thumbs per row</span>
          <input 
            id="noThumbsRange"
            type="range" 
            min="1" 
            max="50" 
            step="1" 
            v-model="noThumbsPerRow" 
            class="mr2 v-top" 
          > 
          <input type="number" v-model="noThumbsPerRow" class="w3 v-top" />
        </label>
      </div>
      <div class="dib mr4 pa1 bg-green">
        <label for="showTitleCheckbox">
          <span class="mr2 v-top">Show titles</span>
          <input class="v-top" type="checkbox" id="showTitleCheckbox" v-model="showTitle">
        </label>
      </div>
    </div>
    <div class="mv3 relative">
      <div 
        class="thumbsContainer" 
      >
        <div
          v-for="(item, index) in itemsSelected" 
          v-bind:key="item._id"
          :style="{ width: 100/noThumbsPerRow + '%' }"
          class="thumbWrapper dib relative overflow-hidden v-top"
        >
          <img
            :src="thumbs[index]"
            :title="item['@id']"
            class="mb-1"
          >
          <span 
            v-if="showTitle"
            class="absolute left-0 top-0 pa1 bg-black-50"
          >
            {{titles[index]}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './../node_modules/tachyons/css/tachyons.min.css';
// import _ from 'lodash';
import dataItems from "./assets/data/openbeelden-items-hasFormat.json";


export default {
  name: 'Open Beelden Browser',
  data: function () {
    return {
      items: dataItems,
      noThumbsPerRow: 10,
      showTitle: true,
      selectionBegin: 0,
      selectionEndStep: 5,
    }
  },
  computed: {
    selectionEnd: function () {
      return Math.pow(2, this.selectionEndStep)
    },
    itemsSelected: function () {
      return dataItems.slice(this.selectionBegin,this.selectionEnd)
    },
    thumbs: function () {
      return this.items.map(item => {
        let hasFormat = item['dcterms:hasFormat']
        let thumbs = hasFormat.filter(format => format.endsWith('.png'))
        return thumbs[0]
      })
    },
    titles: function () {
      return this.items.map(item => {
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
      })
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mb-1 {
  margin-bottom: -0.25rem;
}
</style>
