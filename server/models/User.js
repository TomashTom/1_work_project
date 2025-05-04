const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Slapyvardis yra privalomas.'],
    trim: true
  },
  email: { 
    type: String,
    unique: true,
    required: [true, 'El. pašto adresas yra privalomas.'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Slaptažodis yra privalomas.'],
    minlength: [6, 'Slaptažodis turi būti bent 6 simbolių.']
  },
  phone: {
    type: String,
    required: [true, 'Telefono numeris yra privalomas.'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Gimimo data yra privaloma.']
  },
  address: {
    street: String,
    city: String,
    zip: String,
    country: String
  },
  avatarUrl: {
    type: String, // URL į nuotrauką (galima naudoti Cloudinary, Firebase ar pan.)
    default: 'https://via.placeholder.com/150'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Automatiškai atnaujinti `updatedAt`
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Hash before saving password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
