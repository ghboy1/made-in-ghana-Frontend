// src/components/RegionMapModal.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const RegionMapModal = ({ region, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  if (!region) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-content region-map-modal"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{ borderTop: `4px solid ${region.colorScheme}` }}
      >
        <div className="modal-header">
          <h2>
            <FaMapMarkerAlt /> 
            {region.name}
          </h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close region information"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="region-map-container">
            <img src={region.mapImage} alt={`Map of ${region.name}`} className="region-map" />
          </div>
          
          <div className="region-info">
            <p className="region-description">{region.description}</p>
            
            <div className="region-details">
              <div className="detail-section">
                <h3>Capital</h3>
                <p>{region.capital}</p>
              </div>
              
              <div className="detail-section">
                <h3>Traditional Garments</h3>
                <ul>
                  {region.traditionalGarments.map(garment => (
                    <li key={garment}>{garment}</li>
                  ))}
                </ul>
              </div>
              
              <div className="detail-section">
                <h3>Famous Crafts</h3>
                <ul>
                  {region.famousCrafts.map(craft => (
                    <li key={craft}>{craft}</li>
                  ))}
                </ul>
              </div>
              
              <div className="detail-section">
                <h3>Artisan Villages</h3>
                <ul>
                  {region.artisanVillages.map(village => (
                    <li key={village}>{village}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegionMapModal;