const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGO_URI || 'mongodb://localhost:27017/mydatabase');
        console.log(`MongoDB connected successfully ${mongoose.connection.host} on port ${mongoose.connection.port}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDB;