const axios = require("axios");
const accessTokenRouter = require("express-promise-router")();
const accessTokenController = require("../../controller/odata/accessToken.controller");

accessTokenRouter.route("/accesstoken").post(accessTokenController.accesstoken);

module.exports = accessTokenRouter;
