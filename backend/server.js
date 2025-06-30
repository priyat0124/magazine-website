const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connectDB = require('./db');
const Magazine = require('./models/Magazine');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect MongoDB
connectDB();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const cat = req.body.category;
    const uploadPath = path.join(__dirname, 'uploads', cat);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// API Routes

// Upload
app.post('/api/magazines', upload.single('file'), async (req, res) => {
  try {
    const { title, category } = req.body;
    const filePath = path.relative(__dirname, req.file.path).replace(/\\/g, '/');
    const mag = new Magazine({ title, category, filePath });
    await mag.save();
    res.json(mag);
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

// Get All or by Category
app.get('/api/magazines', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const list = await Magazine.find(filter);
  res.json(list);
});

// Delete
app.delete('/api/magazines/:id', async (req, res) => {
  try {
    const mag = await Magazine.findByIdAndDelete(req.params.id);
    if (mag) {
      const fullPath = path.join(__dirname, mag.filePath);
      fs.unlinkSync(fullPath);
    }
    res.send({ message: 'Deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Delete failed' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
