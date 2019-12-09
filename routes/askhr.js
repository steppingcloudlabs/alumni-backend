const router = require('express-promise-router')();

const {
  postTicketValidateBody,
  postTicketSchemas,
} = require('../validator/ticketValidate');

const postTicketController = require('../controller/askhr/postTicket.controller')();

router
    .route('/postticket')
    .post(postTicketValidateBody(postTicketSchemas.authSchema), (req, res, next) => postTicketController.postTicket(req, res, next));


router
    .route('/getticket')
    .post(postTicketValidateBody(postTicketSchemas.authSchema), (req, res, next) => postTicketController.postTicket(req, res, next));


module.exports = router;
