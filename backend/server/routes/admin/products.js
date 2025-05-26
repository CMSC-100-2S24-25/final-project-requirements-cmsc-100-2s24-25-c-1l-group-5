import express from 'express';
import auth from '../../middleware/auth.js';
import adminOnly from '../../middleware/role.js';
import Product from '../../models/Product.js';

const router = express.Router();
router.use(auth, adminOnly);

router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get('/', async (req, res) => {
  const sortField = req.query.sort || 'name';
  const sortOrder = req.query.type === 'desc' ? -1 : 1;
  const products = await Product.find().sort({ [sortField]: sortOrder });
  res.json(products);
});

export default router;
