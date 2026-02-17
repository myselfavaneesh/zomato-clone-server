import express from 'express';
import { userValidations } from '#validators';
import { authController } from '#controllers';
import { authMiddleware, validate } from "#middlewares"

const router = express.Router();

router.post('/register', userValidations.createUser, validate, authController.register)
router.post('/login', userValidations.loginUser, validate, authController.login);
router.get("/me", authMiddleware.authenticate, authController.fetchUser);

export default router;