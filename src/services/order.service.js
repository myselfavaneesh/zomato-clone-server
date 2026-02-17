import Order from '../models/order.model.js';
import { AppError } from "../utils/appError.js";
import { Cuisine } from '../models/cuisine.model.js';
import { createTransaction } from './transaction.service.js';
import { getCaptainById } from './captain.service.js';

export const createOrder = async (orderData, customerId) => {

    const session = await Order.startSession();
    session.startTransaction();

    try {

        if (orderData.paymentStatus === "failed") {
            throw new AppError("Payment failed. Cannot create order.", 400);
        }

        // Check for existing active orders
        const existingOrder = await Order.findOne({
            customerId: customerId,
            status: { $in: ["pending", "confirmed"] },
        }).session(session);

        if (existingOrder) {
            throw new AppError("An active order already exists for this customer", 400);
        }

        // Validate products
        const cuisineIds = orderData.products.map(p => p.productId);
        const cuisines = await Cuisine.find({ _id: { $in: cuisineIds } })
            .session(session);

        if (cuisines.length !== cuisineIds.length) {
            throw new AppError("One or more products are invalid", 400);
        }

        for (const cuisine of cuisines) {
            const item = orderData.products.find(
                p => p.productId.toString() === cuisine._id.toString()
            );

            if (cuisine.restaurantId.toString() !== orderData.restaurantId) {
                throw new AppError("All products must belong to same restaurant", 400);
            }

            if (cuisine.stock < item.quantity) {
                throw new AppError("Insufficient stock", 400);
            }

            // Reduce stock
            cuisine.stock -= item.quantity;
            await cuisine.save({ session });
        }

        // Create order
        const order = await Order.create(
            [{ ...orderData, customerId }],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        const totalAmount = cuisines.reduce((total, cuisine) => {
            const item = orderData.products.find(
                p => p.productId.toString() === cuisine._id.toString()
            );
            return total + cuisine.price * item.quantity;
        }, 0);

        // Create transaction
        const transaction = await createTransaction({
            orderId: order[0]._id,
            totalAmount: totalAmount,
            paymentMethod: "UPI",
            status: "completed",
        });

        return { order: order[0], transaction };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error instanceof AppError
            ? error
            : new AppError("Failed to create order", 500);
    }
};


export const getOrderById = async (orderId) => {
    try {

        const order = await Order.findById(orderId)
            .populate({
                path: "products.productId",
                select: "name price"
            })
            .populate({
                path: "restaurantId",
                select: "name address"
            })
            .populate({
                path: "transactionId",
                select: "totalAmount paymentMethod status"
            })
            .exec();

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return order;

    } catch (error) {
        throw error instanceof AppError
            ? error
            : new AppError("Failed to retrieve order", 500);
    }
};


export const getOrdersByCustomerId = async (customerId) => {
    try {
        const orders = await Order.find({ customerId })
            .populate({
                path: "products.productId",
                select: "name price"
            })
            .populate({
                path: "restaurantId",
                select: "name address"
            })
            .populate({
                path: "transactionId",
                select: "totalAmount paymentMethod status"
            })
            .exec();

        return orders;

    } catch (error) {
        throw error instanceof AppError
            ? error
            : new AppError("Failed to retrieve orders", 500);
    }
};


const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new AppError("Order not found", 404);
        }
        order.status = status;
        await order.save();
        return order;
    } catch (error) {
        throw new AppError("Failed to update order status", 500);
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw new AppError("Order not found", 404);
        }
        return order;
    } catch (error) {
        throw new AppError("Failed to delete order", 500);
    }
};


export const assignCaptainToOrder = async (orderId, captainId) => {
    try {
        const captain = await getCaptainById(captainId);

        const order = await Order.findById(orderId);
        if (!order) {
            throw new AppError("Order not found", 404);
        }
        if (order.status !== "pending") {
            throw new AppError("Order is already assigned or completed", 400);
        }
        order.assignedCaptainId = captain._id;
        order.status = "assigned";
        order.captainStatus = "accepted";
        order.captainDetails = {
            name: captain.userId.name,
            email: captain.userId.email,
            captainId: captain._id
        };
        await order.save();
        return order;
    } catch (error) {
        throw new AppError("Failed to assign captain to order", 500);
    }
};

