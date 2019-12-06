const router = require('express-promise-router')();

const {
  postTicketValidateBody,
  postTicketSchemas,
} = require('../validator/ticketValidate');

const postTicketController = require('../controller/askhr/postTicket')();

router
    .route('/postTicket')
    .post(postTicketValidateBody(postTicketSchemas.authSchema), (req, res, next) => postTicketController.postTicket(req, res, next));

module.exports = router;
