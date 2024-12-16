
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  content: {type: String, required: true},
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

reviewSchema.index({userId: 1, productId: 1});
reviewSchema.index({productId: 1});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
