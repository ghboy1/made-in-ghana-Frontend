// components/MusicTopBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MusicTopBar.css';

const MusicTopBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const africanCountries = [
    { slug: 'ghana', name: 'Ghana' },
    { slug: 'nigeria', name: 'Nigeria' },
    { slug: 'kenya', name: 'Kenya' },
    { slug: 'south-africa', name: 'South Africa' },
    // Add more African countries
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
  };

  return (
    <header className="music-topbar">
      <nav className="music-topbar__nav">
        {/* Left Section - Logo */}
        <Link to="/" className="music-topbar__logo">
          AFRICAN MUSIC
        </Link>

        {/* Center Section - Search & Dropdown */}
        <div className="music-topbar__center">
          <form className="music-search" onSubmit={handleSearch}>
            <div className="country-select-wrapper">
              <i className="fas fa-star country-select-icon"></i>
              <select
                className="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">AFRICAN COUNTRIES</option>
                {africanCountries.map(country => (
                  <option key={country.slug} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search African artists and songs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <ul className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Sign In */}
        <div className="music-topbar__right">
          <Link to="/login" className="signin-button">
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MusicTopBar;