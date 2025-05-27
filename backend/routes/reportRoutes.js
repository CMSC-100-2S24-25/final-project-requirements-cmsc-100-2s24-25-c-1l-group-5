import express from 'express';
import { Order } from '../models.js';

const router = express.Router();

router.get('/reports/sales', async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    const groupBy = {
      weekly: { $week: "$date" },
      monthly: { $month: "$date" },
      yearly: { $year: "$date" }
    }[period];

    if (!groupBy) {
      return res.status(400).json({ error: "Invalid period parameter" });
    }

    const report = await Order.aggregate([
      { $match: { status: 1 } },
      {
        $lookup: {
          from: "products",
          localField: "prodId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: groupBy,
          totalSold: { $sum: "$qty" },
          totalIncome: { $sum: { $multiply: ["$qty", "$product.price"] } }
        }
      }
    ]).option({ allowDiskUse: true });
    res.json(report);
  } catch (err) {
    console.error("/reports/sales error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
