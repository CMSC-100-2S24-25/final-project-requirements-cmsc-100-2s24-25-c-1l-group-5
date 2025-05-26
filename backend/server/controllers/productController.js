import Product from '../models/Product.js';

// ✅ Get all products, with optional sorting and type filtering
export const getProducts = async (req, res) => {
  try {
    const { sort, type } = req.query;

    const filter = type ? { type } : {};
    const sortOpt = sort ? { [sort]: 1 } : {}; // ascending by default

    const products = await Product.find(filter).sort(sortOpt);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add a new product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update existing product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
