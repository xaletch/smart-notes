const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'без названия',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Note', noteSchema);