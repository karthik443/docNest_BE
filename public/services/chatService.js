import { Server } from 'socket.io';

export default function initializeSocketIO(server) {
    const io = new Server(server, {
        cors: {
            origin: '*', // Adjust to allow your front-end URL
        },
    });

    const users = new Map(); // Store userId and socketId

    io.on('connection', (socket) => {
        console.log('New Socket.IO connection established');
        
        // Listen for a custom 'register' event from the client to receive the userId
        socket.on('register', (userId) => {
            console.log(`Registering user: ${userId} with socket id: ${socket.id}`);
            users.set(userId, socket.id); // Store the userId and socket.id mapping
        });

        // Listen for 'chatMessage' events from the client
        socket.on('chatMessage', (data) => {
            const { userId,userName, message, recipientId } = data;
   
            
            // Find the recipient's socket using the recipientId
            const recipientSocketId = users.get(recipientId);
            if (recipientSocketId) {
                // Send the message to the recipient's socket
                io.to(recipientSocketId).emit('chatMessage', {
                    sentBy:userName,
                    message,
                    time: new Date().toLocaleTimeString(),
                    sentById:userId,
                    recipientId:recipientId
                });
            } else {
                console.log('Recipient is not connected');
            }
            const senderSocketId = users.get(userId);
            if (senderSocketId) {
                io.to(senderSocketId).emit('chatMessage', {
                    sentBy: 'You', // So it shows as "You" to the sender
                    message: message,
                    type: 'sent', // Indicates this is a sent message for the sender
                    time: new Date().toLocaleTimeString(),
                    sentById:userId,
                    recipientId:recipientId
                });
            }
        });

        // Handle WebSocket disconnection
        socket.on('disconnect', () => {
            console.log(`Socket with ID: ${socket.id} disconnected`);
            // Remove the user from the Map when they disconnect
            for (const [userId, socketId] of users.entries()) {
                if (socketId === socket.id) {
                    users.delete(userId); // Remove user on disconnect
                    break;
                }
            }
        });
    });
}
