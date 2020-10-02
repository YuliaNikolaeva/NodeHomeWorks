const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    token: String,

    // token: {
    //     type: String,
    //     default: "exampleToken",
    // },
    
}, {versionKey: false});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;