import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Header */}
      <div className="header">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">My Magazine</h1>
      </div>

      <div className="home-body">
  {/* Sidebar */}
  <div className="sidebar">
    <h3>Categories</h3>

    {/* Tamil Subcategories */}
    <div className="category-group">
      <strong>Tamil</strong>
      <Link to="/category/Tamil-Safety"><button>Safety</button></Link>
      <Link to="/category/Tamil-Society"><button>Society</button></Link>
      <Link to="/category/Tamil-Education"><button>Education</button></Link>
    </div>

    {/* English Subcategories */}
    <div className="category-group">
      <strong>English</strong>
      <Link to="/category/English-Safety"><button>Safety</button></Link>
      <Link to="/category/English-Society"><button>Society</button></Link>
      <Link to="/category/English-Education"><button>Education</button></Link>
    </div>
  </div>

  {/* Center Welcome */}
  <div className="center-content">
    <h2 className="welcome-text">📚 Welcome to My Magazine</h2>
    <p>Explore, read, and share knowledge through our curated digital magazines.</p>
  </div>

  {/* Right Panel */}
  <div className="right-panel">
    <Link to="/upload"><button className="action-btn">Upload Magazine</button></Link>
    <Link to="/view"><button className="action-btn">View Magazines</button></Link>
  </div>
</div>
    </div>
  );
};

export default Home;
