const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userModels = require('../models/userModels');

exports.register = async (req, res) => {
    try {
        const err = validationResult(req);

        if (!err) {
            return res.status(400).json(err.array());
        };

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const pasHash = await bcrypt.hash(password, salt);

        const doc = new userModels ({
            username: req.body.username,
            email: req.body.email,
            passwordHash: pasHash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secret');

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err) {
        console.log('register error: ', err);

        res.status(500).json({
            message: 'При регистрации произошла ошибка'
        })
    }
}