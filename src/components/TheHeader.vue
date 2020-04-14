<template>
  <header>
    <h1>Open Images Browser</h1>
    <section class="measure-wide">
      <p>
        This is a first user interface (UI) exploration in the MediaScape
        project, aimed at exploring the utility of generous interfaces for
        audio-visual collections.
      </p>
      <p>
        This UI concept utilizes facet-based filtering as the main interaction
        model. It offers ways to step-wise create combinations of filters to
        select subsets of collection items based on their metadata. It employs
        data visualisation and 'off the shelf' UI components to show how
        collection items are distributed over the available filters.
      </p>
    </section>
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
  </header>
</template>
