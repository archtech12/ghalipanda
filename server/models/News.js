const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Announcement', 'Event', 'Achievement', 'Press Release', 'Legislative', 'Infrastructure', 'Empowerment', 'Education', 'Other']
  },
  author: {
    type: String,
    default: 'Admin'
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Check if the model is already defined to prevent OverwriteModelError
// This is crucial for Next.js hot reloading and serverless environments
module.exports = mongoose.models.News || mongoose.model('News', newsSchema);