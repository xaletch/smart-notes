const userModels = require("../models/userModels");

// ПОСЛЕ УСПЕШНОЙ АВТОРИЗАЦИИ ПОЛУЧАЕМ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ
exports.auth = async (req, res) => {
  try {
    const user = await userModels.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ success: true, message: null, ...userData });
  } catch (err) {
    console.log("auth err: ", err);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при входе в аккаунт" });
  }
};
