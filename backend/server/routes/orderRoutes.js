// server/routes/orderRoutes.js
import { Router } from 'express';
import { 
  createOrder,
  updateOrderStatus,
  getUserOrders
} from '../controllers/orderController.js';

const router = Router();

router.post('/', createOrder);
router.patch('/:id', updateOrderStatus);
router.get('/user/:email', getUserOrders);

export default router;