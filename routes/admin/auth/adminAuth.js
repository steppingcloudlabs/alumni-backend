const adminrouter = require('express-promise-router')();
const passport = require('passport');
const {adminsignupValidateBody, adminsignupSchemas, adminsigninValidateBody, adminsigninSchemas} = require('../../../validator/authValidate');
const AdminController = require('../../../controller/admin/admin.auth.controller');
require('../../../validator/passport');
// adminRouter Navigations
adminrouter
    .route('/signup')
    .post(adminsignupValidateBody(adminsignupSchemas.authSchema), AdminController.signup);

adminrouter
    .route('/signin')
    .post(
        adminsigninValidateBody(adminsigninSchemas.authSchema),
        passport.authenticate('user-local', {session: false}),
        AdminController.signin
    );

module.exports = adminrouter;
