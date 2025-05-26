import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const user = new User({ ...req.body, uType: 'customer' });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, uType: user.uType }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, userType: user.uType, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
