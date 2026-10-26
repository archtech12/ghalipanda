const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  titleHA: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  impact: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },

  videoEmbedLink: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: 'Planned'
  },
  year: {
    type: String,
    required: false
  },
  priority: {
    type: Number,
    default: 0 // For sorting projects
  }
}, {
  timestamps: true
});

// Check if the model is already defined to prevent OverwriteModelError
// This is crucial for Next.js hot reloading and serverless environments
module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);