const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const userModels = require("../models/userModels");

// РЕГИСТРАЦИЯ
exports.register = async (req, res) => {
  try {
    const err = validationResult(req);

    if (!err) {
      return res.status(400).json(err.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const pasHash = await bcrypt.hash(password, salt);

    const doc = new userModels({
      username: req.body.username,
      email: req.body.email,
      passwordHash: pasHash,
    });

    const user = await doc.save();

    const access_token = jwt.sign(
      {
        _id: user._id,
      },
      "secret"
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({
      success: true,
      message: "Учетная запись успешно создана",
      ...userData,
      access_token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При регистрации произошла ошибка",
    });
  }
};
