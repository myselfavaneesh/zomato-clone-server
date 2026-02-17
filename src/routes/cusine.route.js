import express from 'express';
import multer from 'multer';
import { authMiddleware, validate } from "#middlewares"

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })


import { createCuisineController, getAllCuisinesController, getCuisineByIdController, updateCuisineController, deleteCuisineController } from '../controllers/cuisine.controller.js';
import { cuisineValidations } from '../validators/cuisine.Validations.js';



router.post('/', authMiddleware.authenticate, authMiddleware.authorizeRoles('admin', "owner"), cuisineValidations.createCuisine, validate, createCuisineController);
router.get('/restaurant/:restaurantId', authMiddleware.authenticate, getAllCuisinesController);
router.get('/:id', getCuisineByIdController);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles('admin', 'owner'), cuisineValidations.updateCuisine, validate, updateCuisineController);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles('admin', 'owner'), deleteCuisineController);


export default router;