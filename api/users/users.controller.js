const PORT = process.env.PORT || 3000;
const UserModel = require('./users.model');
const bcrypt = require('bcrypt');


const getCurrentUserController = async (req, res, next) => {
    try {
        const {email}  = req.body;
        const findUserByEmail = await UserModel.findOne({email});
        if (!findUserByEmail) 
        return res
            .status(401)
            .json({message: "Not authorized"});
        
        res.json({
            email: findUserByEmail.email,
            subscription: findUserByEmail.subscription,
        });
    } catch (err) {
        next({message: err});
    };
};


const uploadAvatarController = async (req, res, next) => {
    try {
        const file  = req.file;
        const {userId} = req;
        
        const foundUserByID = await UserModel.findById(userId);

        if(!foundUserByID.token) {
            return res.status(401).json(
                {"message": "Not authorized"}
            );
        };

        const avatarURL = `http://localhost:${PORT}/images/${file.filename}`;

        await UserModel.findByIdAndUpdate(userId, {avatar: file.path}, {new: true})

        res.send(avatarURL);
    } catch (err) {
        next({message: err});
    };
};


module.exports = {
    getCurrentUserController,
    uploadAvatarController,
};