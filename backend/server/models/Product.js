import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: Number,
  price: Number,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);
export default Product;
