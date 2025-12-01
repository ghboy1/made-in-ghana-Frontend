import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const PageHeader = ({ currentCategory, searchTerm, setSearchTerm, showAdinkraInfo }) => {
  return (
    <header className="page-header">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        {currentCategory ? (
          <>
            <span 
              className="category-symbol" 
              onClick={() => showAdinkraInfo(currentCategory.link)}
              role="button"
              tabIndex="0"
              aria-label={`Learn about the symbol for ${currentCategory.name}`}
            >
              {currentCategory.symbol}
            </span>
            {currentCategory.name}
          </>
        ) : "Boys' Ghanaian Fashion"}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {currentCategory?.description || 
          "Authentic Ghanaian clothing and accessories for boys, celebrating culture and comfort"}
      </motion.p>
      
      <motion.div 
        className="search-container" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for boys' clothing..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search for boys' clothing"
          />
          <button className="search-button" aria-label="Search">
            <FaSearch aria-hidden="true" />
          </button>
        </div>
        
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </motion.div>
    </header>
  );
};

export default React.memo(PageHeader);