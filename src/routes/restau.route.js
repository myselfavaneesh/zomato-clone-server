import express from 'express';
const router = express.Router();
import { fetchAllRestaurants, fetchRestaurantById, createNewRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restau.controller.js';
import validate from '../middlewares/validationMiddleware.js';
import { restaurantValidations } from '../validators/restaurant.Validations.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';

// Get restaurants
router.get('/', authenticate, authorizeRoles("admin", "owner","user"), fetchAllRestaurants)

// Get restaurant by ID
router.get('/:id', authenticate, fetchRestaurantById);

// Create a new restaurant
router.post('/', authenticate, authorizeRoles("admin", "owner"), restaurantValidations.createRestaurant, validate, createNewRestaurant);

// Update an existing restaurant
router.put('/:id', authenticate, authorizeRoles("admin"), restaurantValidations.updateRestaurant, validate, updateRestaurant);

// Delete a restaurant
router.delete('/:id', authenticate, authorizeRoles("admin"), deleteRestaurant);

export default router;