const { Router } = require('express');
const { registerValidation } = require('../validation/registerValidation');

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const checkAuth = require('../utils/checkAuth');
const { auth } = require('../controllers/auth');

const routers = Router();

routers.get('/user' );
routers.post('/user/register', registerValidation, register);
routers.post('/user/login', login);
routers.get('/user/account', checkAuth, auth);


module.exports = routers;