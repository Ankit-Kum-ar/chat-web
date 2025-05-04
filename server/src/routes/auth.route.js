const express = require('express');
const { signup, login, logout, updateProfile, checkAuth } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');
const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.put('/update-profile', verifyToken, updateProfile);

authRouter.get('/check-auth', verifyToken, checkAuth);

module.exports = authRouter;