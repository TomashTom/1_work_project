const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const uploadRoutes = require('./routes/upload');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 





const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); 

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Pagrindinis maršrutas (testavimui)
app.get('/', (req, res) => {
  res.send('MERN serveris veikia!');
});
// API maršrutai
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
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
