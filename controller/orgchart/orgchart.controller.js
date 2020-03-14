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
      let effectiveDateTime = req.body.effectiveDateTime
      if (companyId && SCClientDetails[companyId]) {
        const response = await orgchartService.authenticateAndGetData(SCClientDetails[companyId], {
          userId: userId,
          effectiveDateTime: effectiveDateTime
        })
        if (response) {
          let formattedData = formatSapData(response)
          res.setHeader("Content-Type", "application/json")
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