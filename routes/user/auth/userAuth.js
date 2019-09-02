const router = require("express-promise-router")();
const passport = require("passport");
const { validateBody, schemas } = require("../../../validator/authValidateq");
const UserController = require("../../../controller/user/user.auth.controller");
/*
NOTE: 
If we do not include our local passport file in our route file then you'll face belo error 
              [Error: Unknown authentication strategy "jwt"]
*/
require('../../../validator/passport')


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
