const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const contactSchema = new mongoose.Schema({
    // email, username, subject, message 
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
