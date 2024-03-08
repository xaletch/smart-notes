const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModels = require("../models/userModels");

// АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
exports.login = async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Неверный логин или пароль" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret"
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "Вы успешно авторизованы",
      ...userData,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "При авторизации произошла ошибка" });
  }
};
