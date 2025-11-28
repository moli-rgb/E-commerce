const Product = require('../models/Product');
const mongoose = require('mongoose');
const dbConnect = require('../utils/dbConnect');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    console.log('API: getProducts called');
    await dbConnect();

    
    // Check Database Connection State
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    console.log(`Database State: ${dbState} (${dbStatus[dbState]})`);

    if (dbState !== 1) {
      console.error('Database not connected. Attempting to reconnect...');
      // Optional: Trigger reconnection logic here if needed, or just fail fast
      return res.status(503).json({
        message: 'Database not connected',
        readyState: dbState,
        status: dbStatus[dbState]
      });
    }

    console.log('Fetching products from database...');
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Server Error fetching products',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      dbState: mongoose.connection.readyState
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      videos,
      price,
      variations,
      sku,
      stockQuantity,
      lowStockAlertThreshold,
    } = req.body;

    const product = new Product({
      title,
      description,
      images: images || [],
      videos: videos || [],
      price,
      variations: variations || [],
      sku: sku || `SKU-${Date.now()}`,
      stockQuantity,
      lowStockAlertThreshold: lowStockAlertThreshold || 5,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      videos,
      price,
      variations,
      sku,
      stockQuantity,
      lowStockAlertThreshold,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.images = images || product.images;
      product.videos = videos || product.videos;
      product.price = price || product.price;
      product.variations = variations || product.variations;
      product.sku = sku || product.sku;
      product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
      product.lowStockAlertThreshold = lowStockAlertThreshold || product.lowStockAlertThreshold;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
