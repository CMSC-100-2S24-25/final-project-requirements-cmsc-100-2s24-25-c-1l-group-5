import express from 'express';
import auth from '../../middleware/auth.js';
import adminOnly from '../../middleware/role.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

const router = express.Router();
router.use(auth, adminOnly);

router.get('/', async (req, res) => {
  const groupBy = {
    week: { $week: '$orderedAt' },
    month: { $month: '$orderedAt' },
    year: { $year: '$orderedAt' }
  }[req.query.type];

  const report = await Order.aggregate([
    { $match: { status: 1 } },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $group: {
        _id: groupBy,
        totalSales: { $sum: { $multiply: ['$quantity', '$product.price'] } },
        itemsSold: { $sum: '$quantity' }
      }
    }
  ]);

  res.json(report);
});

export default router;
