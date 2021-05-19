const axios = require("axios");
const CID = process.env.NISV_SEARCH_ODL_API_CID;
const AT = process.env.NISV_SEARCH_ODL_API_AT;
const URL = "https://search-odl.rdlabs.beeldengeluid.nl/api/v1.1/search/open-beelden-beeldengeluid";

module.exports = (req, res) => {
  let axiosConfig = {
    url: URL,
    method: "post",
    params: {
      cid: CID,
      at: AT,
    },
    data: req.body,
  };

  axios(axiosConfig)
    .then((response) => {
      // JSON responses are automatically parsed.
      res.send(response.data);
    })
    .catch((e) => {
      res.send(e);
    });
};
