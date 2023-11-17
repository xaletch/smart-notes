const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'без названия',
        require: true,
    },
});

module.exports = mongoose.model('Note', noteSchema);