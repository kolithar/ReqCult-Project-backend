import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateSignup, validateLogin } from '../validations/auth.validation';

const router = Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
