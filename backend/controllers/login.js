const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userModels = require('../models/userModels');

exports.login = async (req, res) => {
    try {
        const user = await userModels.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({message: 'Неверный логин или пароль'});
        };

        const validPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!validPassword) {
            return res.status(400).json({message: 'Неверный логин или пароль'});
        };

        const token = jwt.sign({
            _id: user._id,
        }, 'secret');

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err) {
        console.log('login error: ', err);

        res.status(400).json({ message: 'При авторизации произошла ошибка' });
    };
};