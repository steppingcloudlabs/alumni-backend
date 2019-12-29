import { SCClientDetails } from '../../utils/orgchart.utils'
import { authenticateAndGetData } from "../../services/orgchart.service";

module.exports = () => {
  // personal user function
  const getOrgChartData = async (req, res, next) => {
    try {
      let companyId = req.body.companyId;
      if (companyId && SCClientDetails[companyId]) {
        const response = await authenticateAndGetData(SCClientDetails[companyId])
        if (response) {

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