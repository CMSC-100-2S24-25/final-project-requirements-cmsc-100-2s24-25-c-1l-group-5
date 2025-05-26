import { Router } from 'express';
import getReport from '../controllers/reportController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/:range', verifyToken, isAdmin, getReport);
export default router;
