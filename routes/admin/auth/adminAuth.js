const adminrouter = require("express-promise-router")();
const passport = require("passport");
const { validateBody, schemas } = require("../../../validator/authValidate");
const AdminController = require("../../../controller/admin/admin.auth.controller");
require("../../../validator/admin.passport");
// adminRouter Navigations
adminrouter
  .route("/signup")
  .post(validateBody(schemas.authSchema), AdminController.signup);

adminrouter
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    AdminController.signin
  );

adminrouter
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    AdminController.secret
  );

module.exports = adminrouter;
