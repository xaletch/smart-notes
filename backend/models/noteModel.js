const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'без названия',
        required: true,
    },
    title: {
        type: String,
        unique: true,
    },
    smile: {
        type: String,
    },
    text: {
        type: String,
    },
    imageUrl: String,
    blocks: [Object],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Note', noteSchema);