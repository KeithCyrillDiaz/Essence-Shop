const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Exlude password from fetching by default
  username: { type: String, unique: true },

  rating: { type: Number, required: false, default: 0 },
  totalRating: { type: Number, required: false, default: 0 },
  productCount: { type: Number, required: false, default: 0 },
  status: { type: String, required: false },
  address: { type: String, required: false }, 
  signOutTime: { type: Date, required: false },
  multiRole: { type: Boolean, required: false, default: false} 
  
}, { timestamps: true });

userSchema.index({multiRole: 1});
userSchema.index({email: 1});

const User = mongoose.model('User', userSchema);

module.exports = User;
