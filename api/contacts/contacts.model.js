const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        require: true,
        unique: true,
    },

}, {versionKey: false});


const ContactModel =  mongoose.model('Contact', contactSchema);

module.exports = ContactModel;