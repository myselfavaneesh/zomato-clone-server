import express from 'express';
import { userValidations } from '../validators/user.Validations.js';
import validate from '../middlewares/validationMiddleware.js';
import { register, login, fetchUser } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userValidations.createUser, validate, register)
router.post('/login', userValidations.loginUser, validate, login);
router.get("/me", authenticate, fetchUser);

export default router;