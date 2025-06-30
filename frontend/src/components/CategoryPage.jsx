import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/magazines?category=${categoryName}`)
      .then(res => setMagazines(res.data));
  }, [categoryName]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{categoryName} Magazines</h2>
      <ul>
        {magazines.map(m => (
          <li key={m._id}>
            <strong>{m.title}</strong> — <a href={`http://localhost:5000/${m.filePath}`} target="_blank" rel="noreferrer">View</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
