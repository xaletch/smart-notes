const { body } = require("express-validator");

exports.registerValidation = [
  body("username", "your name").isLength({ min: 3 }),
  body("email", "Неверный формат email").isEmail(),
  body(
    "password",
    "Пароль должен содержать в себе минимум 8 символов"
  ).isLength({ min: 8 }),
];
