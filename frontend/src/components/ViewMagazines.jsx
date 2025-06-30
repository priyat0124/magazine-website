import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMagazines.css';

const ViewMagazines = () => {
  const [mode, setMode] = useState('');         // 'user' or 'owner'
  const [loginMode, setLoginMode] = useState(''); // '' | 'owner'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [magazines, setMagazines] = useState([]);

  const fetchMagazines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/magazines');
      setMagazines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (mode === 'user' || mode === 'owner') {
      fetchMagazines();
    }
  }, [mode]);

  const handleOwnerLogin = () => {
    const validFormat = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!validFormat.test(password)) {
      setError('❌ Password must be alphanumeric and at least 6 characters');
      return;
    }
    if (password === 'admin123') {
      setMode('owner');
      setError('');
    } else {
      setError('❌ Incorrect password');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this magazine?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/magazines/${id}`);
      fetchMagazines(); // refresh list
    } catch (err) {
      alert('Delete failed');
    }
  };

  // 👇 Initial view: Choose mode
  if (mode === '') {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Choose Access Mode</h2>
        <div style={{ display: 'inline-flex', gap: '10px' }}>
          <button
            onClick={() => setMode('user')}
            style={buttonStyle}
          >
            User
          </button>
          <button
            onClick={() => setLoginMode('owner')}
            style={buttonStyle}
          >
            Owner
          </button>
        </div>

        {/* Show password field only when owner is clicked */}
        {loginMode === 'owner' && (
  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        padding: '8px',
        width: '220px',
        borderRadius: '5px',
        border: '1px solid #ccc'
      }}
    />
    <button
      onClick={handleOwnerLogin}
      style={{
        ...buttonStyle,
        width: '100px',        // 👈 Makes the button small
        padding: '6px 10px'
      }}
    >
      Login
    </button>
    {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
  </div>
)}
      </div>
    );
  }

  // 👇 Show content for user or owner
  return (
    <div className="view-page" style={{ padding: '30px' }}>
      <h2>{mode === 'owner' ? '🔐 Owner View' : '📖 User View'}</h2>
      <ul>
       {magazines.map((mag) => (
  <li
    key={mag._id}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid #ccc',
    }}
  >
    <span>📄 {mag.title}</span>

    <div style={{ display: 'flex', gap: '10px' }}>
      <a
        href={`http://localhost:5000/${mag.filePath}`}
        target="_blank"
        rel="noreferrer"
        style={{
          padding: '5px 10px',
          fontSize: '12px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          width: '70px',
        }}
      >
        🔍 View
      </a>

      {mode === 'owner' && (
        <button
          onClick={() => handleDelete(mag._id)}
          style={{
            background: '#c0392b',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            fontSize: '12px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '70px',
          }}
        >
          🗑 Delete
        </button>
      )}
    </div>
  </li>
))}
      </ul>
    </div>
  );
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#A0C878',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default ViewMagazines;
