// src/components/SizeGuideModal.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const SizeGuideModal = ({ onClose }) => {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-content size-guide-modal"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Boys' Size Guide</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close size guide"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="size-guide-tabs">
            <button className="tab active">Regular Sizes</button>
            <button className="tab">Traditional Wear</button>
            <button className="tab">Footwear</button>
          </div>
          
          <div className="size-guide-content">
            <p className="size-guide-intro">
              Find the perfect fit for your child with our detailed size chart. For traditional Ghanaian clothing, we recommend going one size up to allow for freedom of movement during traditional dances and activities.
            </p>
            
            <div className="measurement-tips">
              <h3>How to Measure</h3>
              <ul>
                <li><strong>Height:</strong> Measure from the top of the head to the bottom of the feet</li>
                <li><strong>Chest:</strong> Measure around the fullest part of the chest</li>
                <li><strong>Waist:</strong> Measure around the natural waistline</li>
              </ul>
            </div>
            
            <div className="size-table-container">
              <h3>Regular Clothing Sizes (in cm)</h3>
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Age</th>
                    <th>Height</th>
                    <th>Chest</th>
                    <th>Waist</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2T</td>
                    <td>2 years</td>
                    <td>86-92</td>
                    <td>53</td>
                    <td>51</td>
                  </tr>
                  <tr>
                    <td>4T</td>
                    <td>4 years</td>
                    <td>98-104</td>
                    <td>58</td>
                    <td>54</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>6 years</td>
                    <td>110-116</td>
                    <td>63</td>
                    <td>57</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>8 years</td>
                    <td>122-128</td>
                    <td>67</td>
                    <td>60</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>10 years</td>
                    <td>134-140</td>
                    <td>71</td>
                    <td>63</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>12 years</td>
                    <td>146-152</td>
                    <td>76</td>
                    <td>66</td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>14 years</td>
                    <td>158-164</td>
                    <td>81</td>
                    <td>69</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="conversion-note">
              <p>Need help or have questions about sizing? Contact our customer service team for assistance.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SizeGuideModal;