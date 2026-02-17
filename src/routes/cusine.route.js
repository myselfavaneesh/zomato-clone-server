import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';
import express from 'express';
import validate from '../middlewares/validationMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })


import { createCuisineController, getAllCuisinesController, getCuisineByIdController, updateCuisineController, deleteCuisineController } from '../controllers/cuisine.controller.js';
import { cuisineValidations } from '../validators/cuisine.Validations.js';



router.post('/', authenticate, authorizeRoles('admin', "owner"), cuisineValidations.createCuisine, validate, createCuisineController);
router.get('/restaurant/:restaurantId', getAllCuisinesController);
router.get('/:id', getCuisineByIdController);
router.put('/:id', authenticate, authorizeRoles('admin', 'owner'), cuisineValidations.updateCuisine, validate, updateCuisineController);
router.delete('/:id', authenticate, authorizeRoles('admin', 'owner'), deleteCuisineController);


export default router;