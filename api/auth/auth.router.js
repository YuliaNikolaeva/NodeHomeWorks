const {Router} = require('express');
const {
    registrationController,
    loginController,
    logoutController,
} = require ('./auth.controller');

const {
    checkAuthTokenMiddleware,
} = require ('../../middlewares/auth.middleware');

const {
    RegistrationValidatorMiddleware
} = require('./auth.validator');

const authRouter = Router();

authRouter.post('/register', RegistrationValidatorMiddleware,registrationController);
authRouter.post('/login', loginController);

authRouter.post('/logout', logoutController);

module.exports = authRouter;