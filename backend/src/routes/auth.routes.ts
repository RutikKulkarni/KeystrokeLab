import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validation/auth.schema';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/user', authMiddleware, getUser);

export default router;