const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
  ],
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

// Create indexes on userId and productId to optimize population
orderSchema.index({ userId: 1 });
orderSchema.index({ productId: 1 });

// Compound index for fetching product of a specified
orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ userId: 1, productId: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
