const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Magazine', magazineSchema);
