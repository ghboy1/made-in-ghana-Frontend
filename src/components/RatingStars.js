import React from 'react';
import './RatingStars.css';

const RatingStars = ({ rating }) => {
  // Determine the number of full, half, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  // Build the star elements
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="star full">&#9733;</span>);
  }
  if (hasHalfStar) {
    // Using a half star overlay technique
    stars.push(<span key="half" className="star half">&#9733;</span>);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="star empty">&#9734;</span>);
  }

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
