import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = new User({ ...req.body, password: await bcrypt.hash(req.body.password, 10) });
  await user.save();
  res.json({ message: 'Registered' });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.sendStatus(401);
  const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
