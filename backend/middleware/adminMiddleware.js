
const userModel = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (user && user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Access Denied: Admins only" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = adminMiddleware;
