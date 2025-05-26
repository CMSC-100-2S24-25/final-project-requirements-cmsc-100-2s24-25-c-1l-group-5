import express from 'express';
import { User, Product, Order } from './models.js';

const r = express.Router();

// Auth
r.post('/register', async (req, res) => {
  const { email, password, ...rest } = req.body;
  const user = await User.create({ email, password: await bcrypt.hash(password, 10), ...rest });
  res.json(user);
});

r.post('/login', async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (!u || !await bcrypt.compare(req.body.password, u.password)) return res.sendStatus(401);
  const token = jwt.sign({ email: u.email, userType: u.userType }, process.env.JWT_SECRET);
  res.json({ token });
});

// Users
r.get('/users', async (req, res) => {
  const users = await User.find();
  const totalUsers = await User.countDocuments();
  res.json({ totalUsers, users });
});

r.post('/users', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const user = await User.create({ email, password, ...rest });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

r.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

r.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

r.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Products
r.get('/products', async (req, res) => {
  const { sortBy = 'name', order = 'asc' } = req.query;
  const sortOrder = order === 'asc' ? 1 : -1;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder;

  const products = await Product.find().sort(sortOptions);
  res.json(products);
});

r.post('/products', async (req, res) => {
    console.log("Server received:", req.body);
  const product = await Product.create(req.body);
  res.json(product);
});

r.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

r.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

r.post("/products/:id/decrement", async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  if (!qty || qty < 1) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.qty < qty) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    product.qty -= qty;
    await product.save();

    res.json(product); // send updated product with new qty
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Orders
r.get('/orders', async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

r.post('/orders', async (req, res) => {
  const { products, totalPrice, email } = req.body;
  const newOrder = await Order.create({ products, totalPrice, email });
  res.status(201).json(newOrder);
});

r.put('/orders/:id/confirm', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status !== 0) return res.status(400).json({ error: "Order already processed" });

  // Reduce qty for each product
  for (const item of order.products) {
    const prod = await Product.findById(item.prodId);
    if (prod) {
      prod.quantity -= item.qty;
      await prod.save();
    }
  }

  order.status = 1;
  await order.save();

  res.json(order);
});

r.put('/orders/:id/cancel', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status === 0) order.status = 2;
  await order.save();
  res.json(order);
});

r.delete('/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

r.put('/orders/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

r.get('/myorders', async (req, res) => {
  const { email } = req.body;
  const orders = await Order.find({ email }).sort({ date: -1 });
  res.json(orders);
});

// Sales Report
r.get('/reports/sales', async (req, res) => {
  const period = req.query.period || 'monthly';
  const groupBy = {
    weekly: { $week: "$date" },
    monthly: { $month: "$date" },
    yearly: { $year: "$date" }
  }[period];

  const report = await Order.aggregate([
    { $match: { status: 1 } },
    {
      $lookup: {
        from: "products",
        localField: "prodId",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: groupBy,
        totalSold: { $sum: "$qty" },
        totalIncome: { $sum: { $multiply: ["$qty", "$product.price"] } }
      }
    }
  ]);
  res.json(report);
});

// Profile
r.get('/profile', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }); // no req.user.email
  res.json(user);
});

r.put('/profile', async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: req.body.email },
    req.body,
    { new: true }
  );
  res.json(updatedUser);
});

export default r;
