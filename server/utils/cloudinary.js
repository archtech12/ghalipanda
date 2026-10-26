const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Add clock skew tolerance
  oauth_token: null,
  secure: true,
  cdn_subdomain: false,
  api_proxy: null,
  private_cdn: false,
  secure_distribution: null,
  cname: null,
  short_name: null,
  shared_secret: null,
  // Increase timeout for slow connections
  timeout: 60000
};

// Only configure Cloudinary if credentials are provided
let cloudinaryEnabled = false;
if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
  try {
    cloudinary.config(cloudinaryConfig);
    cloudinaryEnabled = true;
  } catch (error) {
    console.warn('Cloudinary configuration failed:', error.message);
  }
}

// Promisify the uploader
const uploadToCloudinary = cloudinaryEnabled ? promisify(cloudinary.uploader.upload) : null;

/**
 * Upload image to Cloudinary
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<{secure_url: string, public_id: string}>} - Uploaded image details
 */
const uploadImage = async (imagePath) => {
  try {
    // Check if Cloudinary is properly configured and enabled
    if (!cloudinaryEnabled || !process.env.CLOUDINARY_CLOUD_NAME) {
      // Fallback to local storage
      console.log('Cloudinary not configured, using local storage');
      const fileName = path.basename(imagePath);
      const localUrl = `${process.env.SERVER_BASE_URL || 'http://localhost:5000'}/uploads/${fileName}`;
      
      // Move file to uploads directory
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const destinationPath = path.join(uploadDir, fileName);
      fs.renameSync(imagePath, destinationPath);
      
      return {
        secure_url: localUrl,
        public_id: fileName
      };
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(imagePath, {
      folder: 'ghalipanda-projects',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });
    
    // Delete local file after upload
    fs.unlinkSync(imagePath);
    
    return {
      secure_url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    // Handle stale request error by falling back to local storage
    if (error.message && error.message.includes('Stale request')) {
      console.warn('Cloudinary stale request detected, falling back to local storage:', error.message);
      
      // Fallback to local storage
      const fileName = path.basename(imagePath);
      const localUrl = `${process.env.SERVER_BASE_URL || 'http://localhost:5000'}/uploads/${fileName}`;
      
      // Move file to uploads directory
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const destinationPath = path.join(uploadDir, fileName);
      fs.renameSync(imagePath, destinationPath);
      
      return {
        secure_url: localUrl,
        public_id: fileName
      };
    }
    
    // Delete local file even if upload fails
    try {
      fs.unlinkSync(imagePath);
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError);
    }
    
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary or local storage
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<boolean>} - True if deleted successfully
 */
const deleteImage = async (publicId) => {
  try {
    // Check if Cloudinary is properly configured and enabled
    if (!cloudinaryEnabled || !process.env.CLOUDINARY_CLOUD_NAME) {
      // Fallback to local storage deletion
      const uploadDir = path.join(__dirname, '../uploads');
      const filePath = path.join(uploadDir, publicId);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    }
    
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  cloudinaryEnabled
};