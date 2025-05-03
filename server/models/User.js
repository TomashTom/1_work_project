const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  vardas: {
    type: String,
    required: true,
  },
  pavarde: {
    type: String,
    required: true,
  },
  elpastas: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
