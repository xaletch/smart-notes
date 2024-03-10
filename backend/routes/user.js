const { Router } = require("express");
const { registerValidation } = require("../validation/registerValidation");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const checkAuth = require("../utils/checkAuth");
const { auth } = require("../controllers/auth");

const routers = Router();

// РЕГИСТРАЦИЯ
routers.post("/api/user/register", registerValidation, register);
// АВТОРИЗАЦИЯ
routers.post("/api/user/login", login);
// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
routers.get("/api/user/account", checkAuth, auth);

module.exports = routers;
