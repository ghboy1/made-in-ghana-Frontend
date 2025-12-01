import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js';
import { SearchContext } from '../contexts/SearchContext.js';
import { useCart } from '../contexts/CartContext';
import { FaSearch, FaStar, FaShoppingCart, FaUser, FaCog, FaGlobe, FaBox } from 'react-icons/fa';
import { GiAfrica } from 'react-icons/gi';
import './TopBar.css';
import { ghanaRegions } from '../data/ghanaRegions';

// Extract smaller components for better organization
const RegionSelector = ({ regions, selectedCategory, handleRegionSelect }) => (
  <div className="region-dropdown-container">
    <FaStar className="black-star" />
    <select
      className="region-dropdown"
      value={selectedCategory}
      onChange={(e) => handleRegionSelect(e.target.value)}
    >
      <option value="">GHANA REGIONS</option>
      {regions.map(region => (
        <option key={region.slug} value={region.slug}>
          {region.region}
        </option>
      ))}
    </select>
  </div>
);

// Enhanced animated showcase component
const GhanaCompanyShowcase = () => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  
  // List of Ghana companies to showcase with more variety
  const ghanaCompanies = [
    "MTN Ghana - Leading Telecom Provider",
    "Cocoa Processing Company - Premium Chocolates",
    "Ghana Commercial Bank - Banking Services",
    "Ashanti Goldfields - Gold Mining",
    "Fan Milk Limited - Dairy Products",
    "Kasapreko Company - Beverages & Spirits",
    "Blue Skies Ghana - Fresh Fruit Products",
    "Guinness Ghana Breweries - Beer & Spirits",
    "Golden Tree Chocolate - Premium Cocoa",
    "Bamboo Bikes Initiative - Eco-friendly Transport",
    "Woodin Ghana Ltd - African Textiles",
    "Akosombo Textiles - Traditional Fabrics",
    "Kantanka Automobile - Made in Ghana Vehicles",
    "Melcom Group - Retail Chain",
    "Accra Brewery - Traditional Beers",
    "Ghandour Cosmetics - Beauty Products",
    "Ernest Chemists - Pharmaceutical Manufacturing",
    "Interplast Ltd - PVC and HDPE Pipes",
    "GIHOC Distilleries - Premium Spirits",
    "Zoomlion Ghana - Waste Management"
  ];
  
  // Slow down the animation when hovered
  useEffect(() => {
    let interval;
    
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentCompanyIndex(prev => (prev + 1) % ghanaCompanies.length);
      }, 5000); // Slower when hovered
    } else {
      interval = setInterval(() => {
        setCurrentCompanyIndex(prev => (prev + 1) % ghanaCompanies.length);
      }, 3000); // Normal speed
    }
    
    return () => clearInterval(interval);
  }, [isHovered, ghanaCompanies.length]);

  return (
    <div 
      className="ghana-company-showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="showcase-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="showcase-input"
          placeholder={ghanaCompanies[currentCompanyIndex]}
          readOnly
          aria-label="Ghana companies showcase"
        />
        <div className="ghana-flag-glow"></div>
        <button 
          className="showcase-button" 
          aria-label="Explore Ghana businesses"
          onClick={() => {
            // Could redirect to a company listing page
            window.location.href = '/companies';
          }}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

function TopBar() {
const { user, updateDigitalAddress, logout } = useContext(UserContext);
const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useContext(SearchContext);
const { cart } = useCart();
const itemCount = cart?.itemCount || 0;
  
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('ghc'); // Default to Ghana Cedis
  const [addressInput, setAddressInput] = useState(user?.digitalAddress || '');
  const [addressError, setAddressError] = useState('');
  
  const accountDropdownTimerRef = useRef(null);
  const accountRef = useRef(null);
  const settingsRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Initialize address input with user data when it changes
  useEffect(() => {
    if (user?.digitalAddress) {
      setAddressInput(user.digitalAddress);
    }
  }, [user?.digitalAddress]);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (accountDropdownTimerRef.current) {
        clearTimeout(accountDropdownTimerRef.current);
      }
    };
  }, []);

  // Region selection handler
  // Region selection handler
  const handleRegionSelect = (slug) => {
    setSelectedCategory(slug); 
    
    if (slug) {
      // Navigate to main region page which has tabs for explore/products
      navigate(`/regions/${slug}`);
    }
  };
  // Enhanced debounced search suggestions with more realistic data
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.length > 2) {
        // Simulated API call - replace with actual backend call
        const mockCategories = ['Textiles', 'Food', 'Art', 'Crafts', 'Jewelry'];
        const mockSuggestions = [
          `${searchTerm} in ${mockCategories[Math.floor(Math.random() * mockCategories.length)]}`,
          `${searchTerm} handmade items`,
          `Traditional ${searchTerm}`,
          `${searchTerm} bestsellers`,
        ];
        setSuggestions(mockSuggestions);
        setIsSuggestionOpen(true);
      } else {
        setSuggestions([]);
        setIsSuggestionOpen(false);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close account dropdown if clicked outside
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
      // Close settings dropdown if clicked outside
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsDropdownOpen(false);
      }
      // Close suggestions if clicked outside search input
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSuggestionOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility for dropdowns
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsAccountDropdownOpen(false);
        setIsSettingsDropdownOpen(false);
        setIsSuggestionOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Enhanced search handling
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Track search analytics
      try {
        // Analytics tracking could go here
        console.log('Search analytics:', { term: searchTerm, category: selectedCategory });
      } catch (error) {
        console.error('Error tracking search:', error);
      }
      
      navigate(`/search?term=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setIsSuggestionOpen(false);
    navigate(`/search?term=${encodeURIComponent(suggestion)}&category=${selectedCategory}`);
  };
  
  // Improved address validation and update
  const handleUpdateAddress = () => {
    // Basic Ghana Digital Address validation (GhanaPostGPS format)
    const addressPattern = /^[A-Z]{2}-\d{4}-\d{4}$/;
    
    if (!addressInput) {
      setAddressError('Please enter a digital address');
      return;
    }
    
    if (!addressPattern.test(addressInput)) {
      setAddressError('Please enter a valid Ghana GPS address (e.g., AF-0347-3725)');
      return;
    }
    
    setAddressError('');
    updateDigitalAddress(addressInput);
    
    // Show success feedback
    const addressEl = document.querySelector('.delivery-info');
    addressEl.classList.add('update-success');
    setTimeout(() => addressEl.classList.remove('update-success'), 2000);
  };

  // Improved logout handler with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      if (logout) {
        logout();
      }
      navigate('/login');
    }
  };

  // Currency formatter based on selected currency
  const formatCurrency = (amount) => {
    const currencies = {
      usd: { symbol: '$', locale: 'en-US' },
      ghc: { symbol: '₵', locale: 'en-GH' },
      eur: { symbol: '€', locale: 'de-DE' },
      gbp: { symbol: '£', locale: 'en-GB' }
    };
    
    const { locale } = currencies[selectedCurrency] || currencies.ghc;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: selectedCurrency.toUpperCase(),
      currencyDisplay: 'symbol'
    }).format(amount);
  };

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <a 
          href="/" 
          className="logo" 
          onClick={(e) => {
            window.location.href = '/';
            e.preventDefault();
          }}
          aria-label="Made in Ghana Home"
        >
          <GiAfrica className="logo-icon" />
          <span>Made in Ghana B2B </span>
          <div className="logo-effect"></div>
        </a>
        
        <div className={`delivery-info ${addressError ? 'has-error' : ''}`}>
          <span className="delivery-label">Deliver to: </span>
          <div className="address-input-group">
            <input
              type="text"
              className="digital-address-input"
              placeholder="Enter GPS Address (e.g., AF-0347-3725)"
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
                setAddressError('');
              }}
              aria-label="Digital address input"
            />
            {addressError && <div className="address-error">{addressError}</div>}
            <button
              className="update-address-btn"
              onClick={handleUpdateAddress}
              aria-label="Update digital address"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="top-bar__center">
        <form className="search-bar" onSubmit={handleSearch} ref={searchInputRef}>
          <div className="search-bar-inner-bg"></div>
          <RegionSelector 
            regions={ghanaRegions}
            selectedCategory={selectedCategory}
            handleRegionSelect={handleRegionSelect}
          />
          <GhanaCompanyShowcase />
          {isSuggestionOpen && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="top-bar__right">
        {/* Language & Settings Dropdown */}
        <div
          className="settings-container"
          ref={settingsRef}
          onMouseEnter={() => setIsSettingsDropdownOpen(true)}
          onMouseLeave={() => setIsSettingsDropdownOpen(false)}
        >
          <button 
            className="settings-selector" 
            aria-expanded={isSettingsDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
          >
            <FaGlobe />
            <span>{selectedLanguage.toUpperCase()}</span>
          </button>
          
          {isSettingsDropdownOpen && (
            <div className="settings-dropdown" role="menu">
              <h3>Language Settings</h3>
              <div className="language-options">
                <label>
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={selectedLanguage === 'en'}
                    onChange={() => setSelectedLanguage('en')}
                  />
                  English - EN
                </label>
                <label>
                  <input
                    type="radio"
                    name="language"
                    value="akan"
                    checked={selectedLanguage === 'akan'}
                    onChange={() => setSelectedLanguage('akan')}
                  />
                  Akan - AK
                </label>
                <label>
                  <input
                    type="radio"
                    name="language"
                    value="ewe"
                    checked={selectedLanguage === 'ewe'}
                    onChange={() => setSelectedLanguage('ewe')}
                  />
                  Ewe - EW
                </label>
                <label>
                  <input
                    type="radio"
                    name="language"
                    value="ga"
                    checked={selectedLanguage === 'ga'}
                    onChange={() => setSelectedLanguage('ga')}
                  />
                  Ga - GA
                </label>
              </div>
              
              <h3>Currency</h3>
              <select
                name="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="currency-selector"
              >
                <option value="ghc">₵ - GHS (Ghana Cedi)</option>
                <option value="usd">$ - USD (US Dollar)</option>
                <option value="eur">€ - EUR (Euro)</option>
                <option value="gbp">£ - GBP (British Pound)</option>
              </select>
              
              <div className="settings-actions">
                <button 
                  className="btn-cancel" 
                  onClick={() => setIsSettingsDropdownOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={() => {
                    // Save to localStorage for persistence
                    localStorage.setItem('userLanguage', selectedLanguage);
                    localStorage.setItem('userCurrency', selectedCurrency);
                    setIsSettingsDropdownOpen(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account & Lists Dropdown */}
        <div
          className="account-lists-container"
          ref={accountRef}
          onMouseEnter={() => {
            if (accountDropdownTimerRef.current) {
              clearTimeout(accountDropdownTimerRef.current);
              accountDropdownTimerRef.current = null;
            }
            setIsAccountDropdownOpen(true);
          }}
          onMouseLeave={() => {
            accountDropdownTimerRef.current = setTimeout(() => {
              setIsAccountDropdownOpen(false);
            }, 300);
          }}
        >
          <button 
            className="account-lists" 
            aria-expanded={isAccountDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
          >
            <FaUser className="user-icon" />
            <div className="account-text">
              <span className="greeting">{user ? `Hello, ${user.name}` : 'Hello, Sign in'}</span>
              <span className="account-label">Account & Lists</span>
            </div>
          </button>
          
          {isAccountDropdownOpen && (
            <div 
              className="account-dropdown" 
              role="menu"
              onMouseEnter={() => {
                if (accountDropdownTimerRef.current) {
                  clearTimeout(accountDropdownTimerRef.current);
                  accountDropdownTimerRef.current = null;
                }
              }}
            >
              <div className="account-dropdown__header">
                {user ? (
                  <div className="user-actions">
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                      {user.role === 'admin' && (
                        <span className="user-role">Administrator</span>
                      )}
                    </div>
                    <div className="action-buttons">
                      <Link to="/account" className="account-btn">My Account</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="admin-btn">Admin Panel</Link>
                      )}
                      <button className="sign-out-btn" onClick={handleLogout}>Sign Out</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="sign-in-btn">Sign in</Link>
                    <p className="new-customer">
                      New customer? <Link to="/register">Start here</Link>
                    </p>
                  </>
                )}
              </div>
              
              <div className="account-dropdown__divider"></div>
              
              <div className="account-dropdown__body">
                <div className="account-dropdown__lists">
                  <h3>Your Lists</h3>
                  <ul>
                    <li><Link to="/lists/create">Create a List</Link></li>
                    <li><Link to="/lists/find">Find a List or Registry</Link></li>
                    <li><Link to="/lists/wishlist">Wishlist</Link></li>
                    <li><Link to="/lists/save-for-later">Saved for Later</Link></li>
                  </ul>
                </div>
                
                <div className="account-dropdown__account">
                  <h3>Your Account</h3>
                  <ul className="account-links">
                    <li><Link to="/account"><FaUser className="menu-icon" /> Account</Link></li>
                    <li><Link to="/orders"><FaBox className="menu-icon" /> Orders</Link></li>
                    {user && user.role === 'admin' && (
                      <li className="admin-menu-item">
                        <Link to="/admin" className="admin-link">
                          <FaCog className="menu-icon" /> Admin Panel
                        </Link>
                      </li>
                    )}
                    <li><Link to="/watchlist">Watchlist</Link></li>
                    <li><Link to="/recommendations">Recommendations</Link></li>
                    <li><Link to="/browsing-history">Browsing History</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div className="returns-orders">
          <Link to="/tracking" className="tracking-link">
            <div className="returns-orders-content">
              <span className="returns-text">Returns</span>
              <span className="orders-text">& Orders</span>
            </div>
          </Link>
        </div>

        {/* Cart with Item Count Badge */}
        <div className="shopping-basket">
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-container">
              <FaShoppingCart className="cart-icon" />
              <span className="cart-count">{itemCount || 0}</span>
            </div>
            <span className="basket-text">Basket</span>
            {itemCount > 0 && (
              <span className="cart-total">{formatCurrency(cart?.totalAmount || 0)}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
