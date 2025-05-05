const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const destinationPath = path.resolve(__dirname, '../../client/public/images');
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = 'image-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nepavyko įkelti failo' });
  }
  const imageUrl = `/images/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
