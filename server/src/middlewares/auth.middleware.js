const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized access - No token provided',
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized access - Invalid token',
            });
        }

        // Find the user by ID from the token
        const user = await User.findById(decoded.userId).select('-password -__v');
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized access - User not found',
            });
        }
        
        // Attach user information to the request object
        
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized access',
            error: error.message,
        });   
    }
}

module.exports = verifyToken;