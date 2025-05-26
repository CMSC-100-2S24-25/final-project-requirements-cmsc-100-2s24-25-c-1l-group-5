const adminOnly = (req, res, next) => {
  if (req.user.userType !== 'admin') return res.sendStatus(403);
  next();
};

export default adminOnly;
