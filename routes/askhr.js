const router = require('express-promise-router')();

const {
  postTicketValidateBody,
  postTicketSchemas,
} = require('../validator/ticketValidate');

const askhrController = require('../controller/askhr/askhr.controller')();

router
    .route('/postticket')
    .post(postTicketValidateBody(postTicketSchemas.authSchema), (req, res, next) => askhrController.postTicket(req, res, next));


router
    .route('/getticket')
    .post(postTicketValidateBody(postTicketSchemas.authSchema), (req, res, next) => askhrController.postTicket(req, res, next));


module.exports = router;
