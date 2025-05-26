import Order from '../models/Order.js';
import Product from '../models/Product.js';

const getReport = async (req, res) => {
  const { range } = req.params; // weekly, monthly, yearly

  let groupFormat;
  if (range === 'weekly') groupFormat = { $week: '$date' };
  else if (range === 'monthly') groupFormat = { $month: '$date' };
  else groupFormat = { $year: '$date' };

  const report = await Order.aggregate([
    { $match: { status: 1 } },
    {
      $lookup: {
        from: 'products',
        localField: 'prodId',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $group: {
        _id: groupFormat,
        totalIncome: { $sum: { $multiply: ['$qty', '$product.price'] } },
        productsSold: { $sum: '$qty' },
        sales: {
          $push: {
            name: '$product.name',
            qty: '$qty',
            income: { $multiply: ['$qty', '$product.price'] }
          },
        },
      },
    },
  ]);

  res.json(report);
};

export default getReport;
