const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true, // Required for cross-site requests
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return token;
}

module.exports = generateToken;