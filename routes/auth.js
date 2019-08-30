const router = require("express-promise-router")();
const passport = require("passport");
const { validateBody, schemas } = require("../validator/authValidate");
const UserController = require("../controller/auth.controller");

// Router Navigations
router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signup);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    UserController.signin
  );

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);

module.exports = router;
