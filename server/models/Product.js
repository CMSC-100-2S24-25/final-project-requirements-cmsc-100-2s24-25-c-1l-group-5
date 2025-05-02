// server/models/Product.js
import mongoose from 'mongoose';//import
const prodSchema = new mongoose.Schema({
  name: { type: String, required: true },//name
  desc: { type: String, required: true },//description
  type: { type: Number, enum: [1, 2], required: true },//type 1-crop, 2-poultry
  price: { type: Number, required: true },//price
  qty: { type: Number, required: true }//qty
});
export default mongoose.model('Product', prodSchema);//export
