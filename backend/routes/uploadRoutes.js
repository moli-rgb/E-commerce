const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

// @desc    Upload product images/videos
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', upload.array('files', 10), (req, res) => {
  try {
    const files = req.files.map(file => `/${file.path}`);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
