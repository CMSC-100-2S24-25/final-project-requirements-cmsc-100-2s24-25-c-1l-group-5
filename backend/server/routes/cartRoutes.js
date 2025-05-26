import { Router } from 'express';
import { getCart, addToCart, deleteCartItem } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
router.get('/:email', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.delete('/', verifyToken, deleteCartItem);
export default router;
