const {Router} = require('express');

const {
    getCurrentUserController,
    uploadAvatarController,
} = require('./users.controller');

const {
    checkAuthTokenMiddleware,
} = require ('../../middlewares/auth.middleware');

const {
    avatarUploaderMiddleware
} = require ('../../middlewares/fileUploader.middleware');

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

usersRouter.post("/avatars", checkAuthTokenMiddleware, avatarUploaderMiddleware, uploadAvatarController);

module.exports = usersRouter;