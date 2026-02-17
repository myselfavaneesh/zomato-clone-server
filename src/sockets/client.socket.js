import { getIO } from "./index.js";

export const notifyUserOrderConfirmed = (userId, order) => {

    const io = getIO();

    io.to(userId.toString()).emit("order-confirmed", {
        orderId: order._id,
        status: order.status,
        captain: order.captainDetails,
        message: "Your order has been accepted 🎉"
    });
};
