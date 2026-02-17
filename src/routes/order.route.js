import express from 'express';
const router = express.Router();
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { OrderValidations } from '../validators/order.Validations.js';
import { createOrderController, getOrderController, getCustomerOrdersController } from '../controllers/order.controller.js';


// Create a new order
router.post('/', authenticate, OrderValidations.createOrder, validate, createOrderController);

// Get customer orders (must come before /:orderId to avoid route conflict)
router.get('/customer/me', authenticate, getCustomerOrdersController);

// Get a specific order
router.get('/:orderId', authenticate, getOrderController);

export default router;