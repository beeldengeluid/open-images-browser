# MediaScape kickoff: Open Beelden Browser

Initial exploration of the [MediaScape project](https://www.vogin.nl/portfolio-item/mediascape-2019/), aimed at exploring the utility of [generous interfaces](http://www.digitalhumanities.org/dhq/vol/9/1/000205/000205.html) for audio-visual archives.

Try the latest version (work in progress): https://mediascape-kickoff.phivk.now.sh/

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

Full data sets of 3489 items, filtered to contain specific meta data fields (in addition to `@id` and `dcterms:title`):

- `openbeelden-items-date.json`: containing the field `dcterms:date`
- `openbeelden-items-hasFormat.json`: containing the field `dcterms:hasFormat`
- `openbeelden-items-spatial.json`: containing the field `dcterms:spatial`
- `openbeelden-items-subject.json`: containing the field `dcterms:subject`
- `openbeelden-items-date-hasFormat-spatial-subject.json`: containing the fields `dcterms:hasFormat`, `dcterms:date`, `dcterms:spatial`, `dcterms:subject`