const router = require('express-promise-router')();
const askhrController = require('../../controller/orgchart/orgchart.controller')();
router
    .route('/getOrgChart')
    .post((req, res, next) => orgChartController.getOrgChart(req, res, next));

module.exports = router;