// server/routes/authRoutes.js
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();

// Week 5: POST endpoints
router.post('/register', register); 
router.post('/login', login);

export default router;