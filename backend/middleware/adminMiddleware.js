const userModel = require('../models/userModel');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized: Admins only' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Authorization error' });
  }
};

module.exports = adminMiddleware;

