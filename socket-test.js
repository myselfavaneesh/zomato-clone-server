import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // apna port check kar

const socket = io(SOCKET_URL, {
    transports: ["websocket"], // force websocket
});

socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
    socket.emit("join-captain", "CAPTAIN_101");
    // Test join room (captainId example)
    socket.emit("join", "test-captain-123");
});

socket.on("new-order", (data) => {
    console.log("📦 New Order Received:", data);
    socket.emit("order-response", {
        orderId: data.orderId,
        captainId: "CAPTAIN_101",
        status: "accepted",
    });
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected");
});

socket.on("connect_error", (err) => {
    console.log("⚠️ Connection Error:", err.message);
});
