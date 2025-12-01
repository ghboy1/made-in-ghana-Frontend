import React from 'react';
import { Link } from 'react-router-dom';
import './TopSearchTerms.css';

const TopSearchTerms = () => {
  const searchTerms = [
    "Electric equipment", "Essential oils", "Hydraulic equipment",
    "Aluminium die-casting", "Electric cables", "Adhesive tape",
    "Medical equipment", "Hydraulic pumps", "Industrial packaging",
    "Agriculture import-export", "Drill bit manufacturers", "Building materials",
    "Air filters", "Heavy machinery equipment", "Spring steel manufacturers",
    "Packaging machines", "Laser welding machine manufacturers", "Agricultural products",
    "CNC machining", "Manufacturers office containers", "Work clothes",
    "Laser engraving machine manufacturers", "Paper cutting machines", "Pharmaceutical products",
    "Aluminium foil for packing", "Cleaning products", "Wood cutting machines manufacturers",
    "Laboratory equipment"
  ];

  return (
    <div className="top-search-terms">
      <h3>Top Searches</h3>
      <div className="search-terms-grid">
        {searchTerms.map((term, index) => (
          <Link 
            key={index} 
            to={`/search?q=${encodeURIComponent(term)}`} 
            className="search-term-link"
          >
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSearchTerms;