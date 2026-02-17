import { body } from 'express-validator';

export const OrderValidations = {
    createOrder: [
        body("products")
            .isArray({ min: 1 })
            .withMessage("At least one product is required"),
        body("products.*.productId")
            .isMongoId()
            .withMessage("Invalid product ID"),
        body("products.*.quantity")
            .isInt({ min: 1 })
            .withMessage("Quantity must be a positive integer"),
        body("deliveryAddress")
            .notEmpty()
            .withMessage("Delivery address is required"),
        body("restaurantId")
            .isMongoId()
            .withMessage("Invalid restaurant ID"),
        body("paymentStatus")
            .isIn(["completed", "failed"])
            .withMessage("Invalid payment status value")
    ],
    updateOrder: [
        body("status")
            .optional()
            .isIn(["pending", "confirmed", "delivered", "cancelled"])
            .withMessage("Invalid status value")
    ]
};