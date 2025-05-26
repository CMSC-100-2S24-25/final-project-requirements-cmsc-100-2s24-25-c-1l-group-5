import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();
router.use(auth);

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/me', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(updated);
});

export default router;
