import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaCheck, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Component for verified badge
export const VerifiedBadge = () => (
  <Badge className="verified-badge" pill>
    <FaCheck /> verified
  </Badge>
);

// Component for response time badge
export const ResponseBadge = () => (
  <Badge className="response-badge" pill>
    <FaClock /> fast response
  </Badge>
);

// Component for rating stars
export const RatingStars = ({ rating }) => (
  <div className="rating">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>★</span>
    ))}
    <span className="rating-value">({rating.toFixed(1)})</span>
  </div>
);

// Category card component
export const CategoryCard = ({ category, onClick }) => (
  <div className="category-card" onClick={onClick}>
    <div className="category-icon-container">
      {category.icon && <span className="category-icon">{category.icon}</span>}
    </div>
    <h3 className="category-name">{category.name}</h3>
    {category.count && <span className="category-count">{category.count}</span>}
  </div>
);