const router = require('express-promise-router')();
const getOrgChartData = require('../../controller/orgchart/orgchart.controller')();
router
    .route('/getOrgChartData')
    .post((req, res, next) => orgChartController.getOrgChartData(req, res, next));

module.exports = router;