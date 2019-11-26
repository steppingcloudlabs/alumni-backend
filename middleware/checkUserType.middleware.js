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
  const payload = req.body.type;

  console.log("Middleware is hit");

  try {
    if (payload == "admin") {
      //If the type is admin, let them pass
      next();
    } else {
      //Send a response that user type is invalid
      res.status(200).send({
        status: 400,
        result: "Rejected request"
      });
    }
  } catch (error) {
    logger.error(`Error while checking if user is an admin ${error}`);
  }
};
