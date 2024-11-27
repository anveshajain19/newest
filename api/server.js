const express = require('express');
const http = require('http');
const https = require('https'); // For HTTPS support (if needed)
const fs = require('fs'); // For reading SSL certificates (if needed)
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

// Initialize the Express app
const app = express();

// Enable CORS for the frontend
const corsConfig = {
    origin: "https://newest-jet.vercel.app", // Update to match your frontend URL
    methods: ["GET", "POST"],
};

// Create an HTTP server (switch to HTTPS if SSL is configured)
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, { cors: corsConfig });

// User-socket mapping for tracking users in rooms
const userSocketMap = {};

// Utility function to get all connected clients in a room
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
        socketId,
        username: userSocketMap[socketId],
    }));
}

// Set up Socket.IO connection handler
io.on('connection', (socket) => {
    console.log(Socket connected: ${socket.id});

    // Handle user joining a room
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username; // Map socket ID to username
        socket.join(roomId); // Join the room

        const clients = getAllConnectedClients(roomId);

        // Notify all clients in the room about the new user
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });

        console.log(${username} joined room ${roomId});
    });

    // Broadcast code changes to other clients in the room
    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    // Sync code to a specific client
    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    // Handle user disconnection
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]; // Get rooms the user is in
        rooms.forEach((roomId) => {
            socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });

        console.log(User ${userSocketMap[socket.id]} disconnected.);
        delete userSocketMap[socket.id]; // Remove user from the mapping
    });

    // Log socket errors
    socket.on('error', (error) => {
        console.error(Socket error: ${error.message});
    });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or default port
server.listen(PORT, () => console.log(Server running on port ${PORT}));
