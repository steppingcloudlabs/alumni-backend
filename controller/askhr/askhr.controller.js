module.exports = () => {
  const askhrService = require('../../services/askhr.services')();
  // personal user function
  const postTicket = async (req, res, next) => {
    try {
      const {payload, token} = req.body;

      if (token) {
        const response = await askhrService.postTicket({payload, token});
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

  const getTicket = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrService.getTicket({payload, token});
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
  const postmessage = async (req, res, next) => {
    try {
      const {payload, token} = req.body;

      if (token) {
        const response = await askhrService.postmessage({payload, token});
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
  const getmessage = async (req, res, next) => {
    try {
      const {payload, token} = req.body;

      if (token) {
        const response = await askhrService.getmessage({payload, token});
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

  const escalate = async (req, res, next) => {
    try {
      const {payload, token} = req.body;

      if (token) {
        const response = await askhrService.escalate({payload, token});

        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
          if (response == 'E') {
            res.status(200).send({
              status: '200',
              result: 'Escalate',
            });
          } else {
            res.status(200).send({
              status: '200',
              result: 'Dont Escalate',
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
  const ticketstatus = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrService.ticketstatus({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else if (response == 'success') {
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
  const updatemanager = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrService.updatemanager({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else if (response == 'success') {
          res.status(200).send({
            status: '200',
            result: 'updated manager',
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
  const postnotification = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrService.postnotification({
          payload,
          token,
        });
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
  const getnotification = async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await askhrService.getnotification({payload, token});
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
    postTicket,
    getTicket,
    postmessage,
    getmessage,
    escalate,
    ticketstatus,
    updatemanager,
    postnotification,
    getnotification,
  };
};
