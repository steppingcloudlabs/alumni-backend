const orgchartService = require("../../services/orgchart.service")();

const {
  SCClientDetails,
  formatSapData
} = require('../../utils/orgchart.utils')

module.exports = () => {
  // personal user function
  const getOrgChartData = async (req, res, next) => {
    try {
      let companyId = req.body.companyId;
      let userId = req.body.userId
      if (companyId && SCClientDetails[companyId]) {
        const response = await orgchartService.authenticateAndGetData(SCClientDetails[companyId], userId)
        if (response) {
          let formattedData = formatSapData(response.d.results)
          res.status(200).send(formattedData);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    getOrgChartData,
  };
};