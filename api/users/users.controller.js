const UserModel = require('./users.model');


const getCurrentUserController = async (req, res, next) => {
    try {
        const {email}  = req.body;
        const findUserByEmail = await UserModel.findOne({email});
        res.json(findUserByEmail);

    } catch (err) {
        next({message: err});
    };
};


module.exports = {
    getCurrentUserController,
};