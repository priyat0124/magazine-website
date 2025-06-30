import React, { useState } from 'react';
import axios from 'axios';
import './UploadMagazine.css';

const UploadMagazine = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!title || !category || !file) {
      setMessage('❗ Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/magazines', formData);
      if (res.status === 200) {
        setMessage('✅ Your file was uploaded successfully!');
        setTitle('');
        setFile(null);
        setCategory('');
      }
    } catch (err) {
      setMessage('❌ Upload failed. Try again.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Article</h2>

      <label>Enter Title:</label>
      <input
        type="text"
        placeholder="Title of the article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Choose Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">-- Select Category --</option>
  <optgroup label="Tamil">
    <option value="Tamil-Safety">Tamil - Safety</option>
    <option value="Tamil-Society">Tamil - Society</option>
    <option value="Tamil-Education">Tamil - Education</option>
  </optgroup>
  <optgroup label="English">
    <option value="English-Safety">English - Safety</option>
    <option value="English-Society">English - Society</option>
    <option value="English-Education">English - Education</option>
  </optgroup>
</select>

      <label>Select File:</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload}>Upload</button>

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadMagazine;
