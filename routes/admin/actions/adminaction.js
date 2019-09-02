const comprouter = require("express-promise-router")();
const passport = require("passport");
const CompanyController = require("../../../controller/admin/add.company");
require("../../../validator/admin.passport");
// adminRouter Navigations
comprouter
  .route("/add")
  .post(CompanyController.add);



module.exports = comprouter;
