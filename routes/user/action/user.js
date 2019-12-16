const router = require('express-promise-router')();
const PersonalController = require('../../../controller/user/user.action.controller')();
const NewsController = require('../../../controller/admin/actions.admin.controller');
const JobController = require('../../../controller/user/user.recommendation.controller.js')();

// Router Navigations
router
    .route('/userinfo')
    .post((req, res, next) => PersonalController.userinfo(req, res, next));
router
    .route('/user/status')
    .post((req, res, next) => PersonalController.userStatus(req, res, next));
router
    .route('/user/getjobs')
    .post((req, res, next) => JobController.getJobs(req, res, next));
router
    .route('/user/jobrecommendations')
    .post((req, res, next) => JobController.getRecommendedJobs(req, res, next));
router
    .route('/add/news')
    .post((req, res, next) => NewsController.viewNews((req, res, next)));
router
    .route('/addskills')
    .post((req, res, next) => PersonalController.addskills(req, res, next));
router
    .route('/getskills')
    .post((req, res, next) => PersonalController.getskills(req, res, next));

module.exports = router;
