const path = require('path');
const fs = require('fs');
const { uploadImage, cloudinaryEnabled } = require('../utils/cloudinary');

// Helper function for delete
const deleteImageUtil = async (publicId) => {
  const { deleteImage } = require('../utils/cloudinary');
  return await deleteImage(publicId);
};

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary or local storage
    const result = await uploadImage(req.file.path);
    
    res.status(201).json({
      message: `File uploaded successfully ${cloudinaryEnabled ? 'to Cloudinary' : 'locally'}`,
      imageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/:filename
// @access  Private
const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Delete from Cloudinary or local storage
    const deleted = await deleteImageUtil(filename);
    
    if (deleted) {
      res.json({ message: `File deleted successfully ${cloudinaryEnabled ? 'from Cloudinary' : 'locally'}` });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadImage: uploadImageController,
  deleteImage
};

// Export helper for internal use
module.exports.deleteImageUtil = deleteImageUtil;