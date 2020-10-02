const UserModel = require('../users/users.model');
const bcrypt = require('bcrypt');

const {
    createVerificationToken,
} = require('../../services/token.service');

const registrationController = async (req, res, next) => {
    try {
        const {body} = req;

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
                {"message": "You have never registered here"}
            );
        };

        const isPassEqual = await bcrypt.compare(password, foundUser.password);

        if(!isPassEqual) {
            return res.status(401).json(
                {"message": "Email or password is wrong"}
            );
        };

        const accessToken = await createVerificationToken({id: foundUser._id});

        res.status(200).send({
            "token": accessToken,
            "user": {
                "email": body.email,
                "subscription": foundUser.subscription,
            }
        });
    } catch (err) {
        next(err)
    };
};




// const loginController = async (req, res, next) => {
//     try {
//         const {body} = req;
//         const {email, password} = body;

//         const findUserByEmail = await findUser(email);

//         console.log(111, findUserByEmail);

//         if(!findUserByEmail) {
//             return res.status(404).json(
//                 {"message": "You have never registered here"}
//             );
//         };

//         const isPassEqual = await bcrypt.compare(password, findUserByEmail.password);

//         if(!isPassEqual) {
//             return res.status(401).json(
//                 {"message": "Email or password is wrong"}
//             );
//         };
//         res.send({
//             "token": findUserByEmail.token,
//             "user": {
//                 "email": body.email,
//                 "subscription": findUserByEmail.subscription,
//             }
//         });



//     } catch (err) {
//         next(err)
//     };
// };

module.exports = {
    registrationController,
    loginController,
};