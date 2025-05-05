const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['ecommerce', 'business', 'portfolio'], required: true },
  description: { type: String },
  imageUrl: { type: String, default: '/images/default.jpg' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
