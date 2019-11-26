# MediaScape-kickoff

## Data

The `data/` directory
 contains sample data from the public [Open Beelden](https://openbeelden.nl/) collection, acquired from the ElasticSearch API via the (internal) [labs notebooks](https://github.com/beeldengeluid/labs-notebooks):

- `openbeelden-item.json`: example item pretty printed for manual inspection
- `openbeelden-items-1k.json`: sample data set of 1000 items (containing all meta data fields)

Full data sets of 3489 items, filtered to contain specific meta data fields (in addition to `@id` and `dcterms:title`):

- `openbeelden-items-date.json`: containing the field `dcterms:date`
- `openbeelden-items-hasFormat.json`: containing the field `dcterms:hasFormat`
- `openbeelden-items-spatial.json`: containing the field `dcterms:spatial`
- `openbeelden-items-subject.json`: containing the field `dcterms:subject`
- `openbeelden-items-date-hasFormat-spatial-subject.json`: containing the fields `dcterms:hasFormat`, `dcterms:date`, `dcterms:spatial`, `dcterms:subject`