const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 6;
            },
            message: 'Password must be at least 6 characters long',
        }
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67347bab768161001d967d2a.png',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;