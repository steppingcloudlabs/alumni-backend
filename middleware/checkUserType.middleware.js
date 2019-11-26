module.exports = function(req, res, next) {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  /**
   * Check if user is an admin or not
   */
  const {payload} = req.body;
  try {
    if (payload.type == 'admin') {
      // If the type is admin, let them pass
      next();
    } else {
      // Send a response that user type is invalid
      res.status(200).send({
        status: 400,
        result: 'Rejected request',
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      result: error,
    });
  }
};
