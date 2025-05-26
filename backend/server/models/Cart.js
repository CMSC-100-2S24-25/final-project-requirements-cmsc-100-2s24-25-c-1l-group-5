import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qty: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, default: 0 },
});

export default mongoose.model('Cart', cartSchema, 'carts');
