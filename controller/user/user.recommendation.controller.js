module.exports = () => {
  const userServices = require('../../services/user.services')();
  // personal user function
  const getJobs = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await userServices.getJobs({
          payload,
          token,
        });
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          if (response.length == 0) {
            res.status(200).send({
              status: '400',
              result: {},
            });
          } else {
            res.status(200).send({
              status: '200',
              result: response,
            });
          }
        }
      } else {
        res.status(200).json({
          status: 400,
          result: 'Rejected Request, Token Required',
        });
      }
    } catch (error) {
      next(error);
    }
  };
  const getRecommendedJobs = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await userServices.getRecommendedJobs({
          payload,
          token,
        });
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          if (response && response.length == 0) {
            res.status(200).send({
              status: 400,
              result: 'User doesn\'t exist',
            });
          } else {
            res.status(200).send({
              status: 200,
              result: JSON.parse(JSON.stringify({...response})),
            });
          }
        }
      } else {
        res.status(200).json({
          status: 400,
          result: 'Rejected Request, Token Required',
        });
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    getJobs,
    getRecommendedJobs,
  };
};
