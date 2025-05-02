// server/models/Order.js
import mongoose from 'mongoose';//import
const ordSchema = new mongoose.Schema({
  orderId: { type: String, required: true },//order id
  prodId: { type: String, required: true },//product id
  qty: { type: Number, required: true },//quantity
  status: { type: Number, default: 0, enum: [0, 1, 2] },//status, 1-pending, 2-completed, 3-canceled
  email: { type: String, required: true },//email
  date: { type: Date, required: true, default: Date.now },//default current date
  time: { type: String, required: true }//time
});
export default mongoose.model('Order', ordSchema);//export
