const express = require('express');
const verifyToken = require('../middlewares/auth.middleware');
const { getUsersForSidebar, getMessages, sendMessage } = require('../controllers/message.controller');

const messageRouter = express.Router();

messageRouter.get('/users', verifyToken, getUsersForSidebar);

messageRouter.get('/:id', verifyToken, getMessages);

messageRouter.post('/send/:id', verifyToken, sendMessage);

module.exports = messageRouter;