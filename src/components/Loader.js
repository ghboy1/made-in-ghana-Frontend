import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="ghana-loader">
        <div className="stripe red"></div>
        <div className="stripe gold">
          <div className="star">★</div>
        </div>
        <div className="stripe green"></div>
      </div>
      <p>Loading Made in Ghana content...</p>
    </div>
  );
};

export default Loader;