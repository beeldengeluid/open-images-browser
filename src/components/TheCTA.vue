<template>
  <section>
    <p class="f2">
      Explore videos from the
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <a href="https://openbeelden.nl/" target="_blank" v-on="on"
            >Open Images Collection↗︎</a
          >
        </template>
        an open media platform that offers online access to audiovisual archive
        material to stimulate creative reuse
      </v-tooltip>
      below.
    </p>

    <p>
      Select a <span class="bb b--primary-accent">decade</span> in the bar chart
      <v-icon>mdi-chart-bar</v-icon> below. <br />
      Then filter further by selecting a
      <span class="bb b--secondary"><v-icon>mdi-tag</v-icon> Subject</span> or
      <span class="bb b--secondary">
        <v-icon>mdi-map-marker</v-icon> Location</span
      >
      filter <v-icon>mdi-filter-variant</v-icon>. <br />
      Or randomize<v-icon>mdi-shuffle</v-icon> the selection and be surprised.
    </p>
  </section>
</template>
