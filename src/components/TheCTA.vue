<template>
  <section>
    <p class="mt4 f3">
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
      <v-icon>bar_chart</v-icon> below. <br />
      Then filter further by selecting a
      <span class="bb b--secondary">Subject</span> or
      <span class="bb b--secondary">Location</span> filter
      <v-icon>filter_list</v-icon>. <br />
      Or randomize<v-icon>shuffle</v-icon> the selection and be surprised.
    </p>
  </section>
</template>
