import { io } from 'socket.io-client';

/**
 * Initializes a Socket.IO connection to the backend server.
 * @returns {Socket} - A Socket.IO client instance.
 */
export const initSocket = async () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    if (!backendURL) {
        console.error("REACT_APP_BACKEND_URL is not defined in the environment variables.");
        throw new Error("Backend URL not provided. Please check your environment configuration.");
    }

    const options = {
        'force new connection': true,  // Ensures a fresh connection on each call
        reconnectionAttempts: Infinity, // Infinite reconnection attempts
        timeout: 10000, // Connection timeout in milliseconds
        transports: ['websocket'], // Use WebSocket transport
    };

    try {
        const socket = io(backendURL, options);
        console.log(`Socket initialized with backend at ${backendURL}`);
        return socket;
    } catch (error) {
        console.error("Error initializing socket connection:", error);
        throw error; // Re-throw error for the caller to handle
    }
};
