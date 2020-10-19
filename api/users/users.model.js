const mongoose = require('mongoose');

const {
    createPathToDefaultAvatar,
  } = require('../../config');


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
        default: createPathToDefaultAvatar()
    }
}, {versionKey: false});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;