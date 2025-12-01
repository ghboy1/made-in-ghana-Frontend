import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const FilterPanel = ({
  activeSize,
  activePriceRange,
  activeRegion,
  handleFilterChange,
  setActiveSize,
  setActivePriceRange,
  setActiveRegion,
  openRegionMap,
  clearAllFilters
}) => {
  const sizes = ["2T", "3T", "4T", "5T", "6", "8", "10", "12", "14", "16"];
  const priceRanges = ["Under GH₵50", "GH₵50 - GH₵100", "GH₵100 - GH₵150", "Over GH₵150"];
  const regions = ["Ashanti Region", "Greater Accra Region", "Northern Region", "Volta Region", "Western Region"];

  return (
    <motion.div
      className="filter-panel"
      id="filter-panel"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="filter-header">
        <h3>Filter Products</h3>
        <button 
          onClick={clearAllFilters}
          className="clear-all-btn"
          disabled={!(activeSize.length > 0 || activePriceRange.length > 0 || activeRegion.length > 0)}
        >
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <h4>Size</h4>
        <div className="filter-options size-options">
          {sizes.map(size => (
            <label key={size} className="filter-option">
              <input
                type="checkbox"
                checked={activeSize.includes(size)}
                onChange={() => handleFilterChange(setActiveSize, size)}
              />
              <span className="option-label">{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price</h4>
        <div className="filter-options">
          {priceRanges.map(range => (
            <label key={range} className="filter-option">
              <input
                type="checkbox"
                checked={activePriceRange.includes(range)}
                onChange={() => handleFilterChange(setActivePriceRange, range)}
              />
              <span className="option-label">{range}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Region</h4>
        <div className="filter-options region-options">
          {regions.map(region => (
            <label key={region} className="filter-option region-option">
              <input
                type="checkbox"
                checked={activeRegion.includes(region)}
                onChange={() => handleFilterChange(setActiveRegion, region)}
              />
              <span className="option-label">{region}</span>
              <button
                className="region-info-btn"
                onClick={() => openRegionMap(region)}
                aria-label={`Learn about ${region}`}
              >
                <FaMapMarkerAlt />
              </button>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(FilterPanel);