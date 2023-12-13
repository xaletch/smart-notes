const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userModels = require('../models/userModels');

exports.auth = async (req, res) => {
    try {
        const user = await userModels.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден',});
        };

        const { passwordHash, ...userData } = user._doc;

        res.json({...userData});
    }
    catch (err) {
        console.log('auth err: ', err);
        res.status(500).json({ message: "Ошибка при входе в аккаунт" });
    }
};