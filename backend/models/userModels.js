const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    note: {
        type: Object,
        required: true,
        default: {},
    },
});

module.exports = mongoose.model('User', userSchema);