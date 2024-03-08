const jwt = require("jsonwebtoken");

// ПРОВЕРКА АВТОРИЗОВАН ЛИ ПОЛЬЗОВАТЕЛЬ ИЛИ ЖЕ НЕТ
module.exports = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");

      req.userId = decoded._id;

      next();
    } catch (err) {
      return res.status(400).json({ message: "Не удалось войти в аккаунт" });
    }
  }
};
