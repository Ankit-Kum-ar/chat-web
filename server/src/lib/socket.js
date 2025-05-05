const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['https://chatter-5uwp.onrender.com', 'http://localhost:5173'],
    },
});

function getReceiverSocketId(userId) {
    // This function should return the socket ID of the receiver based on the userId
    return userSocketMap[userId]; // Assuming userSocketMap is a global object that maps user IDs to socket IDs
}

// Store the onlineUsers in a Set to avoid duplicates
const userSocketMap = {}; // { userId: socketId } => userId is the id of the user and socketId is the id of the socket

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId; // Assuming userId is passed as a query parameter
    console.log('User ID:', socket.handshake.query.userId);
    if (userId) {
        userSocketMap[userId] = socket.id; // Store the socket ID for the user
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }
    // Emit the online users to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit the online users to all connected clients


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId]; // Remove the user from the online users list
        // Emit the online users to all connected clients
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit the online users to all connected clients
    });

    // Handle other events here
});

module.exports = {
    app,
    server,
    io,
    getReceiverSocketId,
};