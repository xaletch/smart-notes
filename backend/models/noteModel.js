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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;