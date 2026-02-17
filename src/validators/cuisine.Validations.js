import { body } from 'express-validator';


export const cuisineValidations = {
    createCuisine: [
        body('name').notEmpty().withMessage('Cuisine name is required'),
        body('description').optional().isString().withMessage('Description must be a string').isLength({ min: 150, max: 500 }).withMessage("Description must be at least 150 characters long"),
        body('restaurantId').notEmpty().withMessage('Restaurant ID is required').isMongoId().withMessage('Invalid Restaurant ID'),
        body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
        body('category').notEmpty().withMessage('Category is required'),
        body('stock').notEmpty().withMessage('Stock is required').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
        body('image').notEmpty().withMessage('Image URL is required').isURL().withMessage('Invalid image URL'),
    ],
    updateCuisine: [
        body('name').optional().notEmpty().withMessage('Cuisine name cannot be empty'),
        body('description').optional().isString().withMessage('Description must be a string').isLength({ min: 150, max: 500 }).withMessage("Description must be at least 150 characters long"),
        body('price').optional().isNumeric().withMessage('Price must be a number').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
        body('category').optional().notEmpty().withMessage('Category cannot be empty'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
        body('image').optional().isURL().withMessage('Invalid image URL'),
    ]
}