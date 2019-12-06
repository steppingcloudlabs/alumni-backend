module.exports = () => {
  const askhrservice = require('../services/askhr.service')();
  // personal user function
  const askhr = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrservice.askhr({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          res.status(200).send({
            status: '200',
            result: response,
          });
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
    askhr,
  };
};
