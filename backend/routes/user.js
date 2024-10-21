const { Router } = require("express");
const { registerValidation } = require("../validation/registerValidation");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const checkAuth = require("../utils/checkAuth");
const { auth } = require("../controllers/auth");

const routers = Router();

// РЕГИСТРАЦИЯ
routers.post("/api/v1/user/register", registerValidation, register);
// АВТОРИЗАЦИЯ
routers.post("/api/v1/user/login", login);
// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
routers.get("/api/v1/user/account", checkAuth, auth);

module.exports = routers;
