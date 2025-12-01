// Routes.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Fashion from './Fashion';
import WomenFashion from './WomenFashion';
import MenFashion from './MenFashion';
import BoysFashion from './BoysFashion';
import GirlsFashion from './GirlsFashion';
import Baby from './Baby';
import BeautyPersonalCare from './BeautyPersonalCare';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-dropdown">
        <button className="dropbtn">Women</button>
        <div className="dropdown-content">
          <Link to="/womens-fashion">All Women's Fashion</Link>
          <Link to="/womens-fashion/clothing">Clothing</Link>
          <Link to="/womens-fashion/shoes">Shoes</Link>
          <Link to="/womens-fashion/jewelry">Jewelry</Link>
        </div>
      </div>
      
      <div className="nav-dropdown">
        <button className="dropbtn">Beauty</button>
        <div className="dropdown-content">
          <Link to="/beauty">All Beauty</Link>
          <Link to="/beauty/makeup">Makeup</Link>
          <Link to="/beauty/skincare">Skincare</Link>
        </div>
      </div>

      {/* Add similar dropdowns for other categories */}

    </nav>
  );
};

const AppRoutes = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route exact path="/" element={<Fashion />} />
      <Route path="/womens-fashion" element={<WomenFashion />} />
      <Route path="/mens-fashion" element={<MenFashion />} />
      <Route path="/boys-fashion" element={<BoysFashion />} />
      <Route path="/girls-fashion" element={<GirlsFashion />} />
      <Route path="/baby" element={<Baby />} />
      <Route path="/beauty" element={<BeautyPersonalCare />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;