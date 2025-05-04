const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const cloudinary = require("../lib/cloudinary");

const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate the input data
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long',
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Generate token and set it in the cookie
        const token = generateToken(newUser._id, res);
        
        await newUser.save();

        // Send the response with user data and token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the input data
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid Credentials',
            });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        // Generate token and set it in the cookie
        generateToken(user._id, res);

        // Send the response with user data and token
        res.status(200).json({
            message: 'User logged in successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: 'User logged out successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        const loggedInUser = req.user;

        // Validate the input data
        if (!profilePicture) {
            return res.status(400).json({
                message: 'Profile picture is required',
            });
        }

        // Upload the profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePicture);

        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            loggedInUser._id,
            { profilePicture: uploadResponse.secure_url },
            { new: true } // Return the updated user data
        );
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Send the response with updated user data
        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            message: 'User is authenticated',
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth,
    // Other controller methods can be added here
}