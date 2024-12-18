const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  orderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  receiptId: {type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  month: { type: String, required: true},
  day: {type: Number, required: true},
  year: {type: Number, required: true}
}, { timestamps: true });

// Create indexes on userId and productId to optimize population
salesSchema.index({  sellerId: 1 });
salesSchema.index({ productId: 1 });

// Compound index for fetching product of a specified
salesSchema.index({  sellerId: 1, status: 1 });
salesSchema.index({  sellerId: 1, productId: 1 });
salesSchema.index({ _id: 1, sellerId: 1 });


const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
