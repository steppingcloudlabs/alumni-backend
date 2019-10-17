const router = require('express-promise-router')();
const PersonalController = require('../../../controller/user/user.action.controller')();
const NewsController = require('../../../controller/admin/actions.admin.controller');

// Router Navigations
router
    .route("/userinfo")
    .get((req, res, next) =>
        PersonalController.userinfo(req, res, next))
    .post((req, res, next) =>
        PersonalController.userinfo(req, res, next));

router
    .route('/user/document')
    .get((req, res, next) =>
      PersonalController.userDocument(req, res, next));

router
    .route('/user/status')
    .get((req, res, next) =>
    PersonalController.userStatus(req, res, next));
router
    .route('/add/news')
    .get((req, res, next) => (NewsController.viewNews((req, res, next))));

module.exports = router;
