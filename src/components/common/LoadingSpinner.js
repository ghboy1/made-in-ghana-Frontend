import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Loading content..." }) => {
  return (
    <div className="ghana-spinner-container">
      <div className="ghana-spinner">
        <div className="ghana-spinner-flag">
          <div className="stripe red"></div>
          <div className="stripe gold">
            <div className="star"></div>
          </div>
          <div className="stripe green"></div>
        </div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;