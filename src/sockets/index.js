import { Server } from "socket.io";
import { AppError } from "../utils/appError.js";
import { assignCaptainToOrder } from "../services/order.service.js";
import { notifyUserOrderConfirmed } from "./client.socket.js";

let io;

// Init socket
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // later restrict
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        // Listen for events(users)
        socket.on("join-user", (userId) => {
            socket.join(userId);
            console.log("👤 User joined:", userId);
        });

        // Listen for events(captains)
        socket.on("join-captain", (captainId) => {
            socket.join(captainId);

            console.log(`🚴 Captain ${captainId} joined room`);
        });

        socket.on("order-response", async (data) => {
            const { orderId, captainId, status } = data;

            console.log("📨 Order Response:", data);

            const order = await assignCaptainToOrder(orderId, captainId, status);

            notifyUserOrderConfirmed(order.customerId, order);
        });

        socket.on("disconnect", () => {
            console.log("Socket Disconnected:", socket.id);
        });
    });
};

// Get instance anywhere
export const getIO = () => {
    if (!io) {
        throw new AppError("Socket not initialized", 500);
    }
    return io;
};
