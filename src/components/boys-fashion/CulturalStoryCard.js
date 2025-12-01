import React from 'react';
import { motion } from 'framer-motion';

const CulturalStoryCard = ({ story, onStoryClick }) => {
  return (
    <motion.div 
      className="cultural-story-card"
      whileHover={{ 
        scale: 1.03, 
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)' 
      }}
      onClick={() => onStoryClick(story)}
    >
      <div className="story-image">
        <img src={story.image} alt={story.title} />
      </div>
      <div className="story-info">
        <h3>{story.title}</h3>
        <p>{story.summary}</p>
        <button className="btn-text">
          Read the full story
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(CulturalStoryCard);