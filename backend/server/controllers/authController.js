// server/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with that email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (auto-assign as customer)
    const user = new User({ email, ...req.body, password: hashedPassword, uType: 'customer' });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminreg = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with that email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (auto-assign as customer)
    const user = new User({ email, ...req.body, password: hashedPassword, uType: 'merchant' });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, uType: user.uType }, process.env.JWT_SECRET, { expiresIn: '1hr' });
    
    res.json({ 
      message: 'Login successful',
      userType: user.uType,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};