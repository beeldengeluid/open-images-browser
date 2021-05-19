<template>
  <v-app id="app">
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
// import axios from "axios";
import dataItems from "@/assets/data/openbeelden-items-clean.json";
import OpenImagesBrowser from "@/components/OpenImagesBrowser";
export default {
  components: {
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
  // TODO: fetch data from Search API via serverless function
  // created () {
  //   /*eslint-disable*/
  //   let axiosConfig = {
  //     url: "/api/open-beelden-beeldengeluid",
  //     method: "post",
  //     data: {
  //       query: {
  //         match_all: {},
  //       },
  //       size: 77,
  //     },
  //   };

  //   axios(axiosConfig)
  //     .then((response) => {
  //       // JSON responses are automatically parsed.
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // },
};
</script>
