import { Router } from 'express';
import { createOrder, updateOrderStatus, getUserOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.post('/', authenticate, createOrder);
router.get('/user/:email', authenticate, getUserOrders);
router.patch('/:id', authenticate, updateOrderStatus);
export default router;
