import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, default: 'customer' }
});

const User = mongoose.model('User', userSchema);
export default User;
