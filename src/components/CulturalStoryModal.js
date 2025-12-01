// src/components/CulturalStoryModal.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTimes, FaPlay } from 'react-icons/fa';

const CulturalStoryModal = ({ story, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!story) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [story]);

  // Close on escape key
  useEffect(() => {
    if (!story) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, story]);

  if (!story) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-content cultural-story-modal"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{story.title}</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close story"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="story-hero">
            <img src={story.image} alt={story.title} className="story-image" />
            {story.videoUrl && (
              <a href={story.videoUrl} className="video-play-button" target="_blank" rel="noopener noreferrer">
                <FaPlay />
                <span>Watch Video</span>
              </a>
            )}
          </div>
          
          <div className="story-content">
            <p className="story-full">{story.fullStory}</p>
            
            {story.relatedProducts && story.relatedProducts.length > 0 && (
              <div className="related-products">
                <h3>Related Products</h3>
                <div className="related-products-grid">
                  {story.relatedProducts.map(productId => (
                    <div key={productId} className="related-product">
                      <Link to={`/product/${productId}`}>
                        View Related Product
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CulturalStoryModal;