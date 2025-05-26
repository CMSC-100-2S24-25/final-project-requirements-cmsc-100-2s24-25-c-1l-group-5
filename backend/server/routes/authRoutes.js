// server/routes/authRoutes.js
import { Router } from 'express';
import { register, login, getAllUser, adminreg } from '../controllers/authController.js';

const router = Router();

router.post('/signup', register); 
router.post('/adminsignup', adminreg); // Admin registration route
router.post('/login', login);
router.get('/users', getAllUser);

export default router;