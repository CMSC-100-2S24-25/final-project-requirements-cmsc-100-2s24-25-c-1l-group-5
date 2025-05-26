import express from 'express';
import auth from '../../middleware/auth.js';
import adminOnly from '../../middleware/role.js';
import User from '../../models/User.js';

const router = express.Router();
router.use(auth, adminOnly);

router.get('/', async (req, res) => {
  const users = await User.find({ userType: 'customer' });
  res.json(users);
});

router.get('/count', async (req, res) => {
  const count = await User.countDocuments({ userType: 'customer' });
  res.json({ count });
});

export default router;
