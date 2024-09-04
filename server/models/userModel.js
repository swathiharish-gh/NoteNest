const mongoose = require('mongoose');

// Schema for the User model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userBio: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userMobile: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
