const joi = require('joi');
module.exports = {
    signupValidateBody: (schema) => {
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
    signupSchemas: {
        authSchema: joi.object().keys({
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required(),
            companyname: joi.string().required(),
            userid: joi.string().required(),
        }),
    },

    signinValidateBody: (schema) => {
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
    signinSchemas: {
        authSchema: joi.object().keys({
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required(),
        }),
    },
    adminsignupValidateBody: (schema) => {
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
    adminsignupSchemas: {
        authSchema: joi.object().keys({
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required(),
            userType: joi
                .string()
                .valid('admin', 'user', 'hr')
                .required(),
            userid: joi.string().required(),
            companyname: joi.string().required(),
        }),
    },
    adminsigninValidateBody: (schema) => {
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
    adminsigninSchemas: {
        authSchema: joi.object().keys({
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required(),
        }),
    },
    forgetPasswordValidateBody: (schema) => {
        return (req, res, next) => {
            const result = joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) {
                req.vaue = {};
            }
            next();
        };
    },
    forgetPasswordSchemas: {
        authSchema: joi.object().keys({
            payload: joi.object().keys({
                email: joi
                    .string()
                    .email()
                    .required(),
            }),
        }),
    },
};