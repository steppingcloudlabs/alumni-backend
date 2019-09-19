const router = require("express-promise-router")();
const passport = require("passport");
const AdminController = require("../../../controller/admin/actions.admin.controller");
require("../../../validator/admin.passport");
// adminRouter Navigations
router.route("/add/company").post(AdminController.add);
router
    .route("/add/news")
    .post((req, res, next) => AdminController.addNews(req, res, next))
    .get((req, res, next) => AdminController.viewNews(req, res, next))
router
    .route("/add/event")
    .post((req, res, next) => AdminController.addEvents(req, res, next))
    .get((req, res, next) => AdminController.viewEvents(req, res, next))

module.exports = router;