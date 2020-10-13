const Joi = require('joi');

const RegistrationSchema = Joi.object({
    email: Joi
        .string()
        .min(2)
        .max(30)
        .required()
        .error(err => {
            console.log(err.forEach(err => {
                if(err.code === 'string.base') {
                    err.message = 'password not valid!!!!!'
                }
            }));
            return err;
        }),
    password: Joi
        .string()
        // .email()
        .min(2)
        .max(30)
        .required()
        .error(err => {
            console.log(err);
            return err;
        }),
});


const validationMiddleware = (schema) => async (req, res, next) => {
    const {error} = await schema.validate(req.body)
    if(error) {
        res.status(400).send({'Error in validation': error})
    };
    next();
};

module.exports = {
    RegistrationValidatorMiddleware: validationMiddleware(RegistrationSchema),
};