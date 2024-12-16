const mongoose = require('mongoose');
const logger = require('../utils/logger');

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  productName: { type: String, required: true },
  topNotes: [{ type: String }],
  middleNotes: [{ type: String }],
  baseNotes: [{ type: String }],
  brand: { type: String },
  longevity: { type: String},
  projection: { type: String },
  occasion: [{ type: String }],
  bestFor: [{ type: String }],
  quantity: {type: Number, required: true},
  rating: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({userId: 1});


const Product = mongoose.model('Product', productSchema);

const checkIndexes = async () => {
  try {
    const indexes = await Product.collection.getIndexes();
    if(!indexes) {
      logger.Error("Indexes not found");
    }
    // console.log('Indexes:', indexes);
  } catch (error) {
    logger.Error(`Error checking indexes: ${error}`);
  }
}

checkIndexes();

module.exports = Product;
