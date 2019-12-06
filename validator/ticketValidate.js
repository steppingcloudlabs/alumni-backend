const joi = require('joi');

module.exports = {
  postTicketValidateBody: (schema) => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  postTicketSchemas: {
    authSchema: joi.object().keys({
      payload: joi.object().keys({
        participants: joi.string().required(),
        created_at: joi.date().required(),
        created_by: joi.string().required(),
        updated_by: joi.string().required(),
        title: joi.string().required(),
        message: joi.string().required(),
        esclation: joi.boolean().required(),
        esclation_manager_1: joi.string().required(),
        esclation_manager_2: joi.string().required(),
        esclation_manager_3: joi.string().required(),
        resolved_status: joi.boolean().required(),
      }),
      token: joi.string().required(),
    }),
  },
};
