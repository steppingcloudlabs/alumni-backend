const router = require('express-promise-router')();

const HrController = require('../controller/askhr/askhr')();

router
    .route('/askhr')
    .post((req, res, next) => HrController.askhr(req, res, next));

module.exports = router;
