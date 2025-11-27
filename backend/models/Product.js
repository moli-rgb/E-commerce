const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // URL or path
  }],
  videos: [{
    type: String, // URL or path
  }],
  price: {
    type: Number,
    required: true,
  },
  variations: [{
    size: String,
    color: String,
    material: String,
    stockQuantity: Number, // Optional: track stock per variation
  }],
  sku: {
    type: String,
    unique: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  lowStockAlertThreshold: {
    type: Number,
    default: 5,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
