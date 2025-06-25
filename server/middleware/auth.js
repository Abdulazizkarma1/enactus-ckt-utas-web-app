export const isAdmin = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};
