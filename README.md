# MediaScape

### Live demo

[mediascape.now.sh](https://mediascape.now.sh/)

### Component documentation

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://beeldengeluid.github.io/MediaScape)

### About

The [MediaScape project](https://www.vogin.nl/portfolio-item/mediascape-2019/) investigates the utility of [generous interfaces](http://www.digitalhumanities.org/dhq/vol/9/1/000205/000205.html) for audio-visual collections. Or:

> How to find happiness in AV collections without searching for it?

Most collection interfaces employ a query-based interface model, usually in the form of search bar. This paradigm generally works great when a user:

1. knows what sorts of things are present in the collection
2. has a clear idea of what they are looking for
3. can express that idea as a textual keyword query

If one or more of these requirements doesn't hold, the search bar's convenience quickly breaks down. An alternative is to be more forthcoming about what can be found in a collection and offering readily available paths to access different parts of it. This idea of 'generous interfaces' was first formulated by [Mitchell Whitelaw in 2012](http://mtchl.net/towards-generous-interfaces-for-archival-collections/) and since applied and expanded in various directions in the Digital Cultural Heritage field.

As part of our investigation in the MediaScape project, we are developing a series of generous user interface (UI) concepts for audiovisual collections.

## Open Images Browser

This first UI concept utilizes facet-based filtering as the main interaction model. Users combine filters in order to surface subsets of collection items that match their interests. The interface employs data visualisation and commonly used web elements to uphold the following principles ([as formulated by Ben Ennis Butler](https://mw2013.museumsandtheweb.com/paper/visual-exploration-of-australian-prints-and-printmaking/)):

- **Show first, don’t ask**; not requiring the user to provide a query in order see content
- **Provide rich overviews**; showing how items are distributed over time per decade
- **Provide Samples**; using thumbnails to give an a visual feel for a video's content
- **Provide Context**; showing common location and subject filters as well as distribution over time, expanding items in the context of the full filtered set
- **Share high quality primary content**; embed the orginal video and link to the original record.

## Installation & development

install dependencies

    npm install

serve development version

    npm run serve

build production version to `/dist` directory

    npm run build

to test the build locally, serve `/dist`, e.g. using [`serve`](https://github.com/zeit/serve)

    serve -s dist

serve Storybook environment

    npm run serve-storybook

build Storybook as static site to `/docs` directory (auto deployed via GitHub Pages on push to `master`)

    npm run build-storybook

currently the project is being deployed via [Vercel](https://vercel.com/)'s git integration by running

    now

## Data

The `src/assets/data/` directory contains sample data from the public [Open Beelden](https://openbeelden.nl/) collection, acquired from the ElasticSearch API via the (internal) [labs notebooks](https://github.com/beeldengeluid/labs-notebooks):

- `openbeelden-item.json`: example item pretty printed for manual inspection
- `openbeelden-items-1k.json`: sample data set of 1000 items (containing all meta data fields)
- `openbeelden-sample-date-hasFormat-spatial-subject.json`: 3 pretty printed example items, containing the fields `dcterms:hasFormat`, `dcterms:date`, `dcterms:spatial`, `dcterms:subject`

Full data sets of 3489 items, filtered to contain specific meta data fields (in addition to `@id` and `dcterms:title`):

- `openbeelden-items-date.json`: containing the field `dcterms:date`
- `openbeelden-items-hasFormat.json`: containing the field `dcterms:hasFormat`
- `openbeelden-items-spatial.json`: containing the field `dcterms:spatial`
- `openbeelden-items-subject.json`: containing the field `dcterms:subject`
- `openbeelden-items-date-hasFormat-spatial-subject.json`: containing the fields `dcterms:hasFormat`, `dcterms:date`, `dcterms:spatial`, `dcterms:subject`
