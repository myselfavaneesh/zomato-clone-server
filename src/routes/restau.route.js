import express from 'express';
const router = express.Router();
import { fetchAllRestaurants, fetchRestaurantById, createNewRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restau.controller.js';
import { restaurantValidations } from '../validators/restaurant.Validations.js';
import { authMiddleware, validate } from "#middlewares"

// Get restaurants
router.get('/', authMiddleware.authenticate, authMiddleware.authorizeRoles("admin", "owner","user"), fetchAllRestaurants)

// Get restaurant by ID
router.get('/:id', authMiddleware.authenticate, fetchRestaurantById);

// Create a new restaurant
router.post('/', authMiddleware.authenticate, authMiddleware.authorizeRoles("admin", "owner"), restaurantValidations.createRestaurant, validate, createNewRestaurant);

// Update an existing restaurant
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles("admin"), restaurantValidations.updateRestaurant, validate, updateRestaurant);

// Delete a restaurant
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles("admin"), deleteRestaurant);

export default router;