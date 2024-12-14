const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Exlude password from fetching by default
  
  rating: { type: Number, required: false }, 
  status: { type: String, required: false },
  address: { type: String, required: false }, 
  signOutTime: { type: Date, required: false },
  multiRole: { type: Boolean, required: false, default: false} 
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
