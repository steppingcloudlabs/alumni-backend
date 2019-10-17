module.exports = () => {
  const userServices = require('../../services/user.services')();
  // personal user function
  const user = async (req, res, next) => {
    try {
      const payload = req.params;
      const response = await userServices.user(payload);
      if (!response) {
        res.status(200).send({
          status: '400',
          result: 'Error while getting user',
        });
      }
      res.status(200).send({
        status: '200 OK',
        result: response,
      });
    } catch (error) {
      next(error);
    }
  };
  const userDocument = async (req, res, next) => {
    try {
      const payload = req.params;
      const response = await userServices.userDocument(payload);
      if (response && response.length == 0) {
        res.status(200).send({
          status: 400,
          result: 'User doesn\'t exist',
        });
      } else {
        res.status(200).send({
          status: '200 OK',
          result: response,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  const userStatus = async (req, res, next) => {
    try {
      const payload = req.params;
      const response = await userServices.userStatus(payload);
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
    user,
    userDocument,
    userStatus,

  };
};
