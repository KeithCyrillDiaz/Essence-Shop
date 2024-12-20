const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {type: Number, required: true, min: 1},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
})


const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itemSchema],
  totalPrice: { type: Number, required: true }

}, { timestamps: true });

// Create indexes on userId and productId to optimize population
cartSchema.index({ userId: 1 });


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
