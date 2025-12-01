import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCollection = ({ collection }) => {
  return (
    <motion.div 
      className="featured-collection"
      whileHover={{ 
        y: -10, 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}
      style={{ backgroundColor: collection.color }}
    >
      <div className="collection-image">
        <img src={collection.coverImage} alt={collection.title} />
      </div>
      <div className="collection-info">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <Link to={collection.link} className="btn-secondary">
          View Collection
        </Link>
      </div>
    </motion.div>
  );
};

export default React.memo(FeaturedCollection);