import { Router } from 'express';
import { saveSession, getSessions, analyzeSession } from '../controllers/session.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { sessionSchema } from '../validation/session.schema';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, validateRequest(sessionSchema), saveSession);
router.get('/', authMiddleware, getSessions);
router.get('/analysis/:sessionId', authMiddleware, analyzeSession);

export default router;