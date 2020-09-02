const axios = require("axios");
const CID = process.env.NISV_SEARCH_API_CID;
const AT = process.env.NISV_SEARCH_API_AT;

let axiosConfig = {
  url:
    "https://search.rdlabs.beeldengeluid.nl/api/v1.1/search/open-beelden-beeldengeluid",
  method: "post",
  params: {
    cid: CID,
    at: AT,
  },
  data: {
    query: {
      "match_all": {}
    },
    size: 10,
  },
};

module.exports = (req, res) => {
  axios(axiosConfig)
    .then((response) => {
      // JSON responses are automatically parsed.
      res.send(response.data);
    })
    .catch((e) => {
      res.send("error");
    });

}