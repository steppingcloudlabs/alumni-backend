const adminrouter = require("express-promise-router")();
const passport = require("passport");
const { adminSignupValidateBody,  adminSigninValidateBody, adminSignupSchemas , adminSigninSchemas } = require("../../../validator/authValidate");
const AdminController = require("../../../controller/admin/admin.auth.controller");
/*
NOTE: 
If we do not include our local passport file in our route file then you'll face belo error 
              [Error: Unknown authentication strategy "jwt"]
*/
require("../../../validator/passport");

// adminrouter Navigations
adminrouter
  .route("/signup")
  .post(adminSignupValidateBody(adminSignupSchemas.authSchema), AdminController.signup);

adminrouter
  .route("/signin")
  .post(
    adminSigninValidateBody(adminSigninSchemas.authSchema),
    passport.authenticate("local", { session: false }),
    AdminController.signin
  );
module.exports = adminrouter;