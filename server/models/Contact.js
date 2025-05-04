const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vardas yra privalomas']
  },
  email: {
    type: String,
    required: [true, 'El. paštas yra privalomas']
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    enum: ['Techninė pagalba', 'Pasiūlymai', 'Bendras klausimas'],
    default: 'Bendras klausimas'
  },
  message: {
    type: String,
    required: [true, 'Žinutė negali būti tuščia'],
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['Nauja', 'Apdorojama', 'Baigta', 'Peržiūrėta'],
    default: 'Nauja'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
