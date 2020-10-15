const UserModel = require('./users.model');


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


module.exports = {
    getCurrentUserController,
};