// server/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { prodId, qty, email } = req.body;
    
    // Check product availability
    const product = await Product.findById(prodId);
    if (!product || product.qty < qty) {
      return res.status(400).json({ error: 'Product unavailable' });
    }
    
    // Create order
    const order = new Order({
      prodId,
      qty,
      email,
      status: 0,
      date: new Date(),
      time: new Date().toLocaleTimeString()
    });
    
    await order.save();
    
    // Update product quantity
    product.qty -= qty;
    await product.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};