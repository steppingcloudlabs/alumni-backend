const router = require("express-promise-router")();
const express=require('express');
const passport = require("passport");
const { validateBody, schemas } = require("../../validator/user/authValidate");
const UserController = require("../../controller/user/user.auth.controller");
require('../../validator/user/passport')

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
