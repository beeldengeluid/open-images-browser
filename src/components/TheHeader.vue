<template>
  <header>
    <div class="flex items-center mv4">
      <img src="/logo-open-images-browser.png" alt="Logo Open Images Browser" class="h3 mr3">
      <h1 class="mv0 f1">Open Images Browser</h1>
    </div>
    <section v-if="!isInTouchMode" class="measure-wide mv4">
      <p>
        This UI concept is part of the
        <a
          href="https://www.vogin.nl/portfolio-item/mediascape-2019/"
          target="_blank"
          >MediaScape↗︎</a
        >
        investigation into the utility of
        <a
          href="http://www.digitalhumanities.org/dhq/vol/9/1/000205/000205.html"
          target="_blank"
          >generous interfaces↗︎</a
        >
        for audio-visual collections.
      </p>
      <p>
        It utilizes facet-based filtering as the main interaction model. By
        combining filters, users surface subsets of collection items that match
        their interests. The interface employs data visualisation and commonly
        used web elements to uphold the following
        <a
          href="https://mw2013.museumsandtheweb.com/paper/visual-exploration-of-australian-prints-and-printmaking/"
          target="_blank"
          >generous principles↗︎</a
        >:
      </p>
      <ul>
        <li><strong>Show first, don’t ask</strong></li>
        <li><strong>Provide rich overviews</strong></li>
        <li><strong>Provide Samples</strong></li>
        <li><strong>Provide Context</strong></li>
        <li><strong>Share high quality primary content</strong></li>
      </ul>
    </section>
  </header>
</template>
<script>
export default {
  props: {
    isInTouchMode: { type: Boolean, default: false },
  },
};
</script>
