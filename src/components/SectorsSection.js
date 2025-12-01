// src/components/SectorsSection.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SectorsSection.css';

// Example data: each sector has a name, icon class, and route
const sectorsData = [
  { name: 'Agriculture', icon: 'fa fa-tractor', route: '/sectors/agriculture' },
  { name: 'Business Services', icon: 'fa fa-briefcase', route: '/sectors/business-services' },
  { name: 'Community', icon: 'fa fa-users', route: '/sectors/community' },
  { name: 'Construction', icon: 'fa fa-building', route: '/sectors/construction' },
  { name: 'Digital Marketing', icon: 'fa fa-bullhorn', route: '/sectors/digital-marketing' },
  { name: 'Energy', icon: 'fa fa-bolt', route: '/sectors/energy' },
  { name: 'Event', icon: 'fa fa-calendar', route: '/sectors/event' },
  { name: 'Finance', icon: 'fa fa-chart-line', route: '/sectors/finance' },
  { name: 'Home & Garden', icon: 'fa fa-home', route: '/sectors/home-garden' },
  { name: 'Hotels & Resorts', icon: 'fa fa-bed', route: '/sectors/hotels-resorts' },
  { name: 'Legal', icon: 'fa fa-gavel', route: '/sectors/legal' },
  { name: 'Logistics & Transport', icon: 'fa fa-truck', route: '/sectors/logistics-transport' },
  { name: 'Mining', icon: 'fa fa-gem', route: '/sectors/mining' },
  { name: 'Oil & Gas', icon: 'fa fa-oil-can', route: '/sectors/oil-gas' },
  { name: 'Pharmaceuticals', icon: 'fa fa-pills', route: '/sectors/pharmaceuticals' },
  { name: 'Manufacturing', icon: 'fa fa-industry', route: '/sectors/manufacturing' },
  { name: 'Restaurants', icon: 'fa fa-utensils', route: '/sectors/restaurants' },
  { name: 'Education & Schools', icon: 'fa fa-graduation-cap', route: '/sectors/education-schools' },
  { name: 'Technology', icon: 'fa fa-laptop-code', route: '/sectors/technology' },
  { name: 'Tour & Travels', icon: 'fa fa-plane', route: '/sectors/tour-travels' },
  { name: 'Wellness', icon: 'fa fa-heart', route: '/sectors/wellness' },
  { name: 'Other Industries', icon: 'fa fa-ellipsis-h', route: '/sectors/other-industries' },
];

function SectorsSection() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter sectors based on search term
  const filteredSectors = sectorsData.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sectors-section">
      {/* Search Container */}
      <div className="search-container">
        <input
          placeholder="Search for products or manufacturers..."
          className="hero-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid of Sectors */}
      <div className="sectors-grid">
        {filteredSectors.map((sector) => (
          <Link
            key={sector.name}
            to={sector.route}
            className="sector-card"
          >
            <i className={sector.icon}></i>
            <h3>{sector.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SectorsSection;
