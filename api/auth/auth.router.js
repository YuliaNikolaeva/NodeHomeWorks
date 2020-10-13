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
    RegistrationAndLoginValidatorMiddleware
} = require('./auth.validator');

const authRouter = Router();

authRouter.post('/register', RegistrationAndLoginValidatorMiddleware,registrationController);
authRouter.post('/login', RegistrationAndLoginValidatorMiddleware, loginController);

authRouter.post('/logout', logoutController);

module.exports = authRouter;