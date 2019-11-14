module.exports = () => {
  const userServices = require('../../services/user.services')();
  // personal user function
  const userinfo = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await userServices.userinfo(payload);
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      }
      else {
        if (response.length == 0) {
          res.status(200).send({
            status: '400',
            result: 'Error while getting user',
          });
        }
        else {
          res.status(200).send({
            status: '200',
            result: response,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
  const userStatus = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await userServices.userstatus({payload});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      }
      else {
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
    } catch (error) {
      next(error);
    }
  };

  return {
    userinfo,
    userStatus,

  };
};
