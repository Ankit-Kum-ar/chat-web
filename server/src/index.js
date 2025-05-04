const express = require('express');
require('dotenv').config();
const authRouter = require('./routes/auth.route.js');
const connectDB = require('./lib/db.js');
const cookieParser = require('cookie-parser');
const messageRouter = require('./routes/message.route.js');
const cors = require('cors');
const { app, server } = require('./lib/socket.js');

app.use(express.json({ limit: "100mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: "100mb" })); // Adjust the limit as needed
app.use(cookieParser());

// CORS middleware
app.use(cors({
    origin: "http://localhost:5173", // Replace with your client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Routes 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on URL http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
});