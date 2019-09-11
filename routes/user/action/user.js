const router = require("express-promise-router")();
const PersonalController = require("../../../controller/user/user.action.controller")();


// Router Navigations
router
  .route("/user/:userid")
  .get((req,res,next)=>
  PersonalController.user(req,res,next));



module.exports = router;
