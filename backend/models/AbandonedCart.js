const mongoose = require('mongoose');

const abandonedCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  guestEmail: {
    type: String,
    default: null,
  },
  cartItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
    variation: {
      size: String,
      color: String,
      material: String,
    },
  }],
  reminderSent: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('AbandonedCart', abandonedCartSchema);
