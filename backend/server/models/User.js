// server/models/User.js
import mongoose from 'mongoose';//import
const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },//first name
  mName: { type: String, required: false },//middle name (optional)
  lName: { type: String, required: true },//last name
  email: { type: String, required: true, unique: true },//email
  password: { type: String, required: true },//password
  uType: {//user type
    type: String,
    enum: ['customer', 'merchant'],//choices
    default: 'customer'//default
  }
});
export default mongoose.model('User', userSchema);//export
