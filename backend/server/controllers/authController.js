import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user (auto-assign as customer)
    const user = new User({ ...req.body, uType: 'customer' });
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
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful',
      userType: user.uType,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};