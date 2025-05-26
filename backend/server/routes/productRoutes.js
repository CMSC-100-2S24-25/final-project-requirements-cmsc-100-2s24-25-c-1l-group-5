import { Router } from 'express';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roleCheck.js';

const router = Router();

// ✅ Public route: Get all products
router.get('/', getProducts);

// ✅ Protected Admin routes
router.post('/', authenticate, isAdmin, addProduct);
router.patch('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
