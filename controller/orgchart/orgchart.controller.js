module.exports = () => {
  // personal user function
  const getOrgChart = async (req, res, next) => {
    try {
      res.status(200).json({
        status: 400,
        result: "Rejected Request, Token Required"
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    getOrgChart,
  };
};