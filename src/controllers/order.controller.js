import { sendResponse } from "#utils"
import { createOrder, getOrderById, getOrdersByCustomerId } from '../services/order.service.js';


export const createOrderController = async (req, res, next) => {

    try {
        const customerId = req.user.userId;
        const orderData = req.body;
        const { order, transaction } = await createOrder(orderData, customerId);

        sendResponse(res, 201, "Order created successfully", { order, transaction });
    } catch (error) {
        next(error);
    }
};


export const getOrderController = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const orders = await getOrderById(orderId);
        sendResponse(res, 200, "Order retrieved successfully", orders);
    } catch (error) {
        next(error);
    }
};


export const getCustomerOrdersController = async (req, res, next) => {
    try {
        const customerId = req.user.userId;
        const orders = await getOrdersByCustomerId(customerId);
        sendResponse(res, 200, "Orders retrieved successfully", orders);
    } catch (error) {
        next(error);
    }
};