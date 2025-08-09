const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  profilePic: { type: String, required: false },
  googleId: { type: String, required: false },
  cartData: { type: Object, default: {} }
}, { minimize: false });




// By default, Mongoose removes (or minimizes) empty objects when saving to MongoDB. 
// Then Mongoose would normally omit the cartData field entirely when saving,
// But by adding:{ minimize: false } You're telling Mongoose:
// Do not omit empty objects. Keep them as-is.

const userModel=mongoose.models.user || mongoose.model("user",userSchema);

module.exports=userModel;

