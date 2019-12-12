module.exports = () => {
  const userServices = require('../../services/user.services')();
  // personal user function
  const userinfo = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await userServices.userinfo({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          if (response.length == 0) {
            res.status(200).send({
              status: '400',
              result: 'Error while getting user',
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
  const userStatus = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await userServices.userstatus({payload, token});
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

  const addskills = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      const response = await userServices.addskills({payload, token});
      if (token) {
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          if (response == 'Fail') {
            res.status(200).send({
              status: '400',
              result: Failed,
            });
          } else {
            res.status(200).send({
              status: '200 OK',
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


  return {
    userinfo,
    userStatus,
    addskills,

  };
};
