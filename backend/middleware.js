import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.userType !== 'admin') return res.sendStatus(403);
  next();
};
