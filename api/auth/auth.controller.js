const UserModel = require('../users/users.model');
const bcrypt = require('bcrypt');

const {
    createVerificationToken,
} = require('../../services/token.service');


const { json } = require('express');

const registrationController = async (req, res, next) => {
    try {
        const {body} = req;
        const {email} = body;

        const findUserByMail = await UserModel.findOne({email});

        if(findUserByMail) {
            return res.status(409).send({
                message: "Email in use"
            });
        };

        const hashedPass = await bcrypt.hash(body.password, Number(process.env.SALT));

        const newUser = await UserModel.create({
            ...body,
            password: hashedPass,
        });
        res.status(201).send({
            "user": {
                "email": body.email,
                "subscription": newUser.subscription,
            }
        });
    } catch (err) {
        next(err)
    };
};


const loginController = async (req, res, next) => {
    try {
        const {body} = req;
        const {email, password} = body;

        const foundUser = await UserModel.findOne({email});

        if(!foundUser) {
            return res.status(404).json(
                {"message": "Email or password is wrong"}
            );
        };

        const isPassEqual = await bcrypt.compare(password, foundUser.password);

        if(!isPassEqual) {
            return res.status(401).json(
                {"message": "Email or password is wrong"}
            );
        };

        const accessToken = await createVerificationToken({id: foundUser._id});

        const addToken = await UserModel.findByIdAndUpdate(foundUser._id, {token: accessToken}, {new: true})

        res.json({
            token: foundUser.token,
            user: {
                email: foundUser.email,
                subscription: foundUser.subscription,
            },
        });
    } catch (err) {
        next(err)
    };
};


const getCurrentUserController = async (req, res, next) => {
    try {
        const {email} = req.body;
        const foundUser = await UserModel.findOne({email});

        if(!foundUser) {
            return res.status(401).json(
                {"message": "Not authorized"}
            );
        };

        const currentUser = await UserModel.findById(foundUser._id);
        res.json(currentUser);
    } catch (err) {
        next(err);
    };
};


const logoutController = async (req, res, next) => {
    try {
        const {email} = req.body;
        const foundUserByEmail = await UserModel.findOne({email});

        const currentUser = await UserModel.findById(foundUserByEmail._id);

        if(!currentUser.token) {
            return res.status(401).json(
                {"message": "Not authorized"}
            );
        };

       const deleteToken = await UserModel.findByIdAndUpdate(currentUser._id, {token: ''}, {new: true})

        res.status(204).json({"message": "No Content"})
    } catch (err) {
        next(err);
    };
}

module.exports = {
    registrationController,
    loginController,
    getCurrentUserController,
    logoutController,
};