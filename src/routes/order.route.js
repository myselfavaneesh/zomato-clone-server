import express from 'express';
const router = express.Router();
import { authMiddleware, validate } from "#middlewares"
import { OrderValidations } from '../validators/order.Validations.js';
import { createOrderController, getOrderController, getCustomerOrdersController } from '../controllers/order.controller.js';


// Create a new order
router.post('/', authMiddleware.authenticate, OrderValidations.createOrder, validate, createOrderController);

// Get customer orders (must come before /:orderId to avoid route conflict)
router.get('/customer/me', authMiddleware.authenticate, getCustomerOrdersController);

// Get a specific order
router.get('/:orderId', authMiddleware.authenticate, getOrderController);

export default router;