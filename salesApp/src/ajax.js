import axios from "axios";

const apiHost = "https://bakesaleforgood.com";

export default {
  async requestInitialDeals() {
    return axios
      .get(`${apiHost}/api/deals`)
      .then((response) => response.data)
      .catch((errMsg) => console.error(errMsg));
  },
  async requestDealdetail(dealId) {
    return axios
      .get(`${apiHost}/api/deals/${dealId}`)
      .then((response) => response.data)
      .catch((errMsg) => console.error(errMsg));
  },
  async requestDealsSearch(searchTerm) {
    return axios
      .get(`${apiHost}/api/deals?searchTerm=${searchTerm}`)
      .then((response) => response.data)
      .catch((errMsg) => console.error(errMsg));
  },
};
