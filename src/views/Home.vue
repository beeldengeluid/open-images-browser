<template>
  <v-app id="app">
    <TheNavBar v-if="!touchMode" />
    <v-main class="ma2 ma3-ns">
      <OpenImagesBrowser 
        :items="items" 
        :touchMode="touchMode" 
        :sortFields="sortFields"
        :displayFields="displayFields"
        :filterFields="filterFields"
        :colors="colors"
      />
    </v-main>
  </v-app>
</template>

<script>
import dataItems from "@/assets/data/openbeelden-items-clean.json";
import TheNavBar from "@/components/TheNavBar";
import OpenImagesBrowser from "@/components/OpenImagesBrowser";

export default {
  components: {
    TheNavBar,
    OpenImagesBrowser,
  },
  data() {
    return {
      items: dataItems,
      touchMode: this.$route.query.touchMode === "1",
      sortFields: ["id", "date", "title"],
      displayFields: ["title", "year", "thumb"],
      filterFields: ["locations", "subjects"],
      colors: {
        primary: "#5E35B1",
        secondary: "#009688",
        background: "#121212",
        inactive: "#555",
      },
    };
  },
};
</script>
