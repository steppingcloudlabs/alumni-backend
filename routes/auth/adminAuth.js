const router = require("express-promise-router")();
const passport = require("passport");
const { validateBody, schemas } = require("../../validator/authValidate");
const AdminController = require("../../controller/admin/admin.auth.controller");

// Router Navigations
router
  .route("/signup")
  .post(validateBody(schemas.authSchema), AdminController.signup);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    AdminController.signin
  );

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    AdminController.secret
  );

module.exports = router;
