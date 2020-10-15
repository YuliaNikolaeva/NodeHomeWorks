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
    avatarURL: {
        type: String,
        required: true,
        default: '../public/images/default_avatar.png'
    }
}, {versionKey: false});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;