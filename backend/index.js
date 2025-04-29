import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/userRoutes.js';
import chatroomRouter from './routes/chatRoomRoutes.js';
import messageModel from './models/messageModel.js';
import chatRoomModel from './models/chatroomModel.js';

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, {
    cors: {
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    },
});

// Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    })
);

// Database Connection
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected...");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
connectDb();

// WebSocket Setup
io.on('connection', (socket) => {
    // console.log(`New client connected: ${socket.id}`);

    socket.on("join-room", (room) => {
        socket.join(room);
    });
    socket.on('sendMessage', async ({ room, content, senderId, senderName }) => {
        try {



            if (content.trim() !== "") {
                const newMessage = new messageModel({ content, senderId, senderName, timestamp: new Date(Date.now()).toLocaleString() })
                const savedMessage = await newMessage.save()

                await chatRoomModel.findOneAndUpdate({ roomName: room }, { $push: { messages: savedMessage._id } }, { new: true })

                const msg = { content, senderId, senderName, timestamp: savedMessage.timestamp }
                //socket.join(room)
                io.to(room).emit("receive-message", msg)

                // console.log("message has been sent");
            } else {
                console.log("Blank message is making the problem");
            }





        } catch (error) {
            console.error('Error sending message:', error);
        }

    });


    socket.on('disconnect', () => {
        // console.log(`Client disconnected: ${socket.id}`);
    });
});

// API Routes
app.use("/api/v2/user", userRouter);
app.use("/api/v2/chatroom", chatroomRouter);

// Start Server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
