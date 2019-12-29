const orgchartService = require("../../services/orgchart.service")();
const { SCClientDetails } = require('../../utils/orgchart.utils')

module.exports = () => {
  // personal user function
  const getOrgChartData = async (req, res, next) => {
    try {
      let companyId = req.body.companyId;
      if (companyId && SCClientDetails[companyId]) {
        const response = await orgchartService.authenticateAndGetData(SCClientDetails[companyId])
        if (response) {
          res.status(200).send(response);
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