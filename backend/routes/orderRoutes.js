import express from 'express';
import { Order, Product } from '../models.js';
import { verifyToken } from '../middleware.js';

const router = express.Router();

router.get('/orders', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const orders = await Order.find({ email: userEmail }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post('/orders', async (req, res) => {
  const { products, totalPrice, email } = req.body;
  const newOrder = await Order.create({ products, totalPrice, email });
  res.status(201).json(newOrder);
});

router.put('/orders/:id/confirm', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== 0) return res.status(400).json({ error: "Order already processed" });
    await Promise.all(order.products.map(async (item) => {
      const prod = await Product.findById(item.prodId);
      if (prod) {
        prod.quantity -= item.qty;
        await prod.save();
      }
    }));
    order.status = 1;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/orders/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status === 0) order.status = 2;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
