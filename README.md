# Open Images Browser

Initial exploration for the [MediaScape project](https://www.vogin.nl/portfolio-item/mediascape-2019/), aimed at exploring the utility of [generous interfaces](http://www.digitalhumanities.org/dhq/vol/9/1/000205/000205.html) for audio-visual archives.

This first prototype utilizes facet-based filtering as the main interaction model. It allows users to step-wise create combinations of filters in order to surface subsets of collection items that match their interests. It employs data visualisation and UI techniques to generously communicate the distribution of items per available filter.

Try the latest version (work in progress): https://openimagesbrowser.now.sh

## Installation

install dependencies

    npm install

serve development version

    npm run serve

build production version to `/dist` directory

    npm run build

then serve `/dist`, e.g. using [`serve`](https://github.com/zeit/serve)

    serve -s dist

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
