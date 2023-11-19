const { body } = require('express-validator');

exports.notesValidation = [
    body('name', 'note name').isLength({min: 1}),
];