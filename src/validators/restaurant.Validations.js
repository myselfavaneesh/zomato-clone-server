import { body } from "express-validator";

export const restaurantValidations = {
    createRestaurant: [
        body("name").notEmpty().withMessage("Name is required").trim(),
        body("address").notEmpty().withMessage("Address is required"),
        body("city").notEmpty().withMessage("City is required"),
    ],
    updateRestaurant: [
        body("name").optional().notEmpty().withMessage("Name cannot be empty").trim(),
        body("address").optional().notEmpty().withMessage("Address cannot be empty"),
        body("city").optional().notEmpty().withMessage("City cannot be empty"),
    ]
};