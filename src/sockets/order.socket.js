import { getIO } from "./index.js";

export const sendOrderToCaptain = (captainId, order) => {
  const io = getIO();

  io.to(captainId).emit("new-order", {
    orderId: order._id,
    address: order.address,
    price: order.totalAmount,
  });
};
