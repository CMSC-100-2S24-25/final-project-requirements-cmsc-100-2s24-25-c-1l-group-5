import express from 'express';
import auth from '../../middleware/auth.js';
import adminOnly from '../../middleware/role.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

const router = express.Router();
router.use(auth, adminOnly);

router.get('/', async (req, res) => {
  const orders = await Order.find().populate('productId');
  res.json(orders);
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (status === 1) {
    const product = await Product.findById(order.productId);
    product.quantity -= order.quantity;
    await product.save();
  }

  res.json(order);
});

export default router;
