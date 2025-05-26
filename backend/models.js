import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fName: String, mName: String, lName: String,
  email: String, password: String, uType: { type: String, default: 'customer' }
});

const productSchema = new mongoose.Schema({
  name: String, description: String, type: Number, price: Number, qty: Number, imageURL: String,
});

const orderSchema = new mongoose.Schema({
  products: [
    {
      prodId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  totalPrice: Number,
  email: String,
  status: { type: Number, default: 0 }, // 0 = pending, 1 = confirmed, 2 = canceled
  date: { type: Date, default: Date.now }
});


export const User = mongoose.model('User', userSchema);
export const Product = mongoose.model('Product', productSchema);
export const Order = mongoose.model('Order', orderSchema);
