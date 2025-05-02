// server/routes/productRoutes.js
import { Router } from 'express';
import { 
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct 
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;