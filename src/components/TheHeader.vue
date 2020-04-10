<template>
  <header>
    <h1>Open Images Browser</h1>
    <p>
      <span>Below you can explore videos from the </span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <a href="https://openbeelden.nl/" target="_blank" v-on="on"
            >Open Images Collection ↗︎</a
          >
        </template>
        an open media platform that offers online access to audiovisual
        archive material to stimulate creative reuse </v-tooltip
      >.
    </p>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>
