const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // <-- po šito įdedam maršrutus

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Pagrindinis maršrutas (testavimui)
app.get('/', (req, res) => {
  res.send('MERN serveris veikia!');
});

// MongoDB prisijungimas
mongoose.connect('mongodb+srv://smolskijt:TomaszTom@mycluster.syuigzu.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=MyProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Prisijungta prie MongoDB!');
  app.listen(PORT, () => console.log(`Serveris veikia: http://localhost:${PORT}`));
})
.catch((err) => {
  console.error('Nepavyko prisijungti prie DB:', err);
});
