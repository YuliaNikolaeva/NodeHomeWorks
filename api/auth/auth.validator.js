const Joi = require('joi');

const RegistrationSchema = Joi.object({
    email: Joi
        .string()
        .min(2)
        .max(30)
        .required(),

    password: Joi
        .string()
        // .email()
        .min(2)
        .max(30)
        .required()
});


const validationMiddleware = (schema) => async (req, res, next) => {
    const {error} = await schema.validate(req.body)
    next(error);
};

module.exports = {
    RegistrationAndLoginValidatorMiddleware: validationMiddleware(RegistrationSchema),
};