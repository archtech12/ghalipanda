const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'image'
  },
  category: {
    type: String,
    default: 'Other'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.models.Media || mongoose.model('Media', mediaSchema);