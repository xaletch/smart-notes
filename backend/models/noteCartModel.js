const mongoose = require('mongoose');

const noteCartSchema = new mongoose.Schema({
    notes: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Note',
        require: true,
    }],
});

module.exports = mongoose.model('NoteCart', noteCartSchema);