import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const { prodId, qty, email } = req.body;
  const product = await Product.findById(prodId);
  if (!product || product.qty < qty) return res.status(400).json({ error: 'Insufficient stock' });

  const order = await Order.create({ prodId, qty, email, time: new Date().toLocaleTimeString() });
  product.qty -= qty;
  await product.save();
  res.status(201).json(order);
};

export const updateOrderStatus = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(updated);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ email: req.params.email });
  res.json(orders);
};
