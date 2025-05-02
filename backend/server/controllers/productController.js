// server/controllers/productController.js
import Product from '../models/Product.js';

// fetch products
export const getProducts = async (req, res) => {
  try {
    const { sort, type } = req.query;
    let query = {};
    
    if (type) query.type = type;
    
    const products = await Product.find(query)
      .sort(sort === 'price' ? { price: 1 } : {});
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add/create product (admin only)
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};