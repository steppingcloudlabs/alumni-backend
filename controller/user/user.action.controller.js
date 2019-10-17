module.exports = () => {
  const userServices = require('../../services/user.services')();
  // personal user function
  const userinfo = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await userServices.userinfo(payload);
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
    } catch (error) {
      next(error);
    }
  };
  const userDocument = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await userServices.userDocument(payload);
      if (response && response.length == 0) {
        res.status(200).send({
          status: 400,
          result: 'User doesn\'t exist',
        });
      } else {
        res.status(200).send({
          status: '200',
          result: response,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  const userStatus = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await userServices.userstatus({ payload });
      // console.log(response)
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
    } catch (error) {
      next(error);
    }
  };

  return {
    userinfo,
    userDocument,
    userStatus,

  };
};
