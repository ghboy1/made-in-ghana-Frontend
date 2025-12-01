import React, { useState, useMemo, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, 
         FaGlobe, FaChevronLeft, FaChevronRight, FaSearch, FaFilter, 
         FaCheckCircle, FaWhatsapp, FaAward } from 'react-icons/fa';
import { BiFilterAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import './SupplierShowcase.css';

// Adinkra symbols component for decorative elements
const AdinkraSymbol = ({ type }) => {
  const symbols = {
    'sankofa': '⛥',
    'gye-nyame': '⧙',
    'adinkrahene': '◎',
    'dwennimmen': '◈',
    'funtunfunefu': '☥'
  };
  
  return <span className={`adinkra-symbol ${type}`}>{symbols[type] || '◎'}</span>;
};

const SupplierShowcase = () => {
  // Sample supplier data with enhanced fields
  const suppliers = useMemo(() => [
    {
      id: 1,
      name: 'GreenFields Agri',
      category: 'Food Crops',
      location: 'Accra',
      region: 'Greater Accra',
      phone: '+233201234567',
      whatsapp: '+233201234567',
      email: 'info@greenfields.com',
      website: 'https://greenfields.com',
      rating: 4.8,
      reviewCount: 126,
      verified: true,
      description: 'Leading supplier of quality food crops grown in Ghana\'s fertile lands. We specialize in maize, rice, and millet, connecting farmers directly with businesses.',
      founded: 2010,
      employeeCount: '50-100',
      certifications: ['Organic Certified', 'Fair Trade'],
      products: [
        {
          id: 101,
          name: 'Premium Maize',
          image: '/images/greenfields/maize.jpg',
          price: '₵120/bag'
        },
        {
          id: 102,
          name: 'Ghana Rice',
          image: '/images/greenfields/rice.jpg',
          price: '₵150/bag'
        },
        {
          id: 103,
          name: 'Organic Millet',
          image: '/images/greenfields/millet.jpg',
          price: '₵110/bag'
        }
      ]
    },
    {
      id: 2,
      name: 'CocoaExport Ltd.',
      category: 'Cash Crops',
      location: 'Kumasi',
      region: 'Ashanti',
      phone: '+233244567890',
      whatsapp: '+233244567890',
      email: 'contact@cocoaexport.gh',
      website: 'https://cocoaexport.gh',
      rating: 4.6,
      reviewCount: 87,
      verified: true,
      description: 'Premium cocoa bean supplier with direct relationships with farmers in Ghana\'s cocoa-growing regions. We provide high-quality beans for chocolate producers worldwide.',
      founded: 1995,
      employeeCount: '100-200',
      certifications: ['Fair Trade', 'Rainforest Alliance'],
      products: [
        {
          id: 201,
          name: 'Premium Cocoa Beans',
          image: '/images/cocoaexport/cocoa-beans.jpg',
          price: '₵900/50kg'
        },
        {
          id: 202,
          name: 'Organic Chocolate Paste',
          image: '/images/cocoaexport/chocolate-paste.jpg',
          price: '₵200/kg'
        }
      ]
    },
    {
      id: 3,
      name: 'AquaHarvest Farms',
      category: 'Fisheries',
      location: 'Tema',
      region: 'Greater Accra',
      phone: '+233207654321',
      whatsapp: '+233207654321',
      email: 'sales@aquaharvest.gh',
      website: 'https://aquaharvest.gh',
      rating: 4.3,
      reviewCount: 62,
      verified: true,
      description: 'Sustainable aquaculture farm supplying fresh fish and seafood to local and international markets. We use environmentally friendly practices to raise tilapia and other fish species.',
      founded: 2015,
      employeeCount: '20-50',
      certifications: ['ASC Certified', 'Sustainable Fishing'],
      products: [
        {
          id: 301,
          name: 'Fresh Tilapia',
          image: '/images/aquaharvest/fish1.jpg',
          price: '₵40/kg'
        },
        {
          id: 302,
          name: 'Catfish',
          image: '/images/aquaharvest/fish2.jpg',
          price: '₵45/kg'
        },
        {
          id: 303,
          name: 'Premium Shrimp',
          image: '/images/aquaharvest/shrimp.jpg',
          price: '₵70/kg'
        }
      ]
    },
    {
      id: 4,
      name: 'KenteWeavers Collective',
      category: 'Textiles',
      location: 'Bonwire',
      region: 'Ashanti',
      phone: '+233209876543',
      whatsapp: '+233209876543',
      email: 'info@kenteweavers.gh',
      website: 'https://kenteweavers.gh',
      rating: 4.9,
      reviewCount: 218,
      verified: true,
      description: 'Master Kente weavers collective that produces authentic hand-woven Kente cloth using traditional methods passed down through generations.',
      founded: 1980,
      employeeCount: '50-100',
      certifications: ['Cultural Heritage Certified', 'Authentic Craft'],
      products: [
        {
          id: 401,
          name: 'Traditional Kente Cloth',
          image: '/images/kenteweavers/kente1.jpg',
          price: '₵800/piece'
        },
        {
          id: 402,
          name: 'Wedding Kente Set',
          image: '/images/kenteweavers/kente2.jpg',
          price: '₵1,200/set'
        },
        {
          id: 403,
          name: 'Modern Kente Accessories',
          image: '/images/kenteweavers/kente3.jpg',
          price: '₵150-450'
        }
      ]
    },
    {
      id: 5,
      name: 'Ghana Shea Butter Co.',
      category: 'Cosmetics',
      location: 'Tamale',
      region: 'Northern',
      phone: '+233241234567',
      whatsapp: '+233241234567',
      email: 'orders@ghanashea.com',
      website: 'https://ghanashea.com',
      rating: 4.7,
      reviewCount: 146,
      verified: true,
      description: 'Women-led cooperative producing premium unrefined shea butter and natural skincare products using traditional methods from Northern Ghana.',
      founded: 2008,
      employeeCount: '20-50',
      certifications: ['Organic Certified', 'Fair Trade', 'Women Owned'],
      products: [
        {
          id: 501,
          name: 'Raw Unrefined Shea Butter',
          image: '/images/ghanashea/sheabutter.jpg',
          price: '₵50/250g'
        },
        {
          id: 502,
          name: 'African Black Soap',
          image: '/images/ghanashea/blacksoap.jpg',
          price: '₵35/bar'
        },
        {
          id: 503,
          name: 'Shea Moisturizer',
          image: '/images/ghanashea/moisturizer.jpg',
          price: '₵80/jar'
        }
      ]
    }
  ], []);  // Close the suppliers array and add the dependency array for useMemo

  // State management
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterVerified, setFilterVerified] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [notification, setNotification] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('supplierFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('supplierFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Show notification briefly then hide it
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Derived data for filtering and display
  const categories = useMemo(() =>
    ['all', ...new Set(suppliers.map(s => s.category))],
  [suppliers]);

  const locations = useMemo(() =>
    ['all', ...new Set(suppliers.map(s => s.location))],
  [suppliers]);

  const regions = useMemo(() =>
    ['all', ...new Set(suppliers.map(s => s.region))],
  [suppliers]);

  // Toggle a supplier in favorites
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        setNotification({
          message: 'Removed from favorites',
          type: 'info'
        });
        return prev.filter(fid => fid !== id);
      } else {
        setNotification({
          message: 'Added to favorites',
          type: 'success'
        });
        return [...prev, id];
      }
    });
  };

  // Filtered and sorted list of suppliers
  const filteredSuppliers = useMemo(() => {
    let results = suppliers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                           s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
      const matchesLocation = filterLocation === 'all' || s.location === filterLocation;
      const matchesRegion = filterRegion === 'all' || s.region === filterRegion;
      const matchesVerified = !filterVerified || s.verified;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(s.id);
      
      return matchesSearch && matchesCategory && matchesLocation && 
             matchesRegion && matchesVerified && matchesFavorites;
    });

    // Apply sorting
    results.sort((a, b) => {
      let compareA, compareB;
      
      switch(sortBy) {
        case 'name':
          compareA = a.name;
          compareB = b.name;
          break;
        case 'rating':
          compareA = a.rating;
          compareB = b.rating;
          break;
        case 'reviews':
          compareA = a.reviewCount;
          compareB = b.reviewCount;
          break;
        default:
          compareA = a.name;
          compareB = b.name;
      }
      
      if (compareA < compareB) return sortDir === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return results;
  }, [suppliers, search, filterCategory, filterLocation, filterRegion, 
      filterVerified, sortBy, sortDir, favorites, showFavoritesOnly]);

  // Helper for displayed supplier rating
  const renderRating = (rating) => {
    return (
      <div className="ss-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar 
            key={star} 
            className={star <= Math.round(rating) ? "star-filled" : "star-empty"} 
          />
        ))}
        <span className="ss-rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch('');
    setFilterCategory('all');
    setFilterLocation('all');
    setFilterRegion('all');
    setFilterVerified(false);
    setSortBy('name');
    setSortDir('asc');
    setShowFavoritesOnly(false);
  };

  // Navigate through product images in the modal
  const navigateImages = (direction) => {
    if (!selectedSupplier) return;
    
    const productCount = selectedSupplier.products.length;
    if (direction === 'next') {
      setActiveImageIndex(prev => (prev + 1) % productCount);
    } else {
      setActiveImageIndex(prev => (prev - 1 + productCount) % productCount);
    }
  };

  // Open inquiry form in a new tab/window
  const openInquiryForm = (supplier) => {
    const subject = `Inquiry about ${supplier.name} products`;
    const body = `I am interested in your products and would like more information.`;
    window.open(`mailto:${supplier.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="supplier-showcase">
      {/* Ghana-inspired decorative elements */}
      <div className="ghana-flag-decoration">
        <div className="flag-stripe red"></div>
        <div className="flag-stripe gold"></div>
        <div className="flag-stripe green"></div>
      </div>
      
      <div className="adinkra-background"></div>
      
      <header className="ss-header">
        <div className="ss-header-content">
          <AdinkraSymbol type="adinkrahene" />
          <h1>Ghana Supplier Showcase</h1>
          <AdinkraSymbol type="adinkrahene" />
          <p>Connect with Ghana's finest suppliers and producers</p>
        </div>
      </header>

      <section className="ss-controls-container">
        <div className="ss-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search suppliers by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch('')}>
              <MdClose />
            </button>
          )}
        </div>
        
        <div className="ss-desktop-filters">
          <div className="ss-filter-row">
            <div className="ss-filter-group">
              <label>Category</label>
              <select 
                value={filterCategory} 
                onChange={e => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ss-filter-group">
              <label>Location</label>
              <select 
                value={filterLocation} 
                onChange={e => setFilterLocation(e.target.value)}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ss-filter-group">
              <label>Region</label>
              <select 
                value={filterRegion} 
                onChange={e => setFilterRegion(e.target.value)}
              >
                {regions.map(reg => (
                  <option key={reg} value={reg}>
                    {reg === 'all' ? 'All Regions' : reg}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ss-filter-group">
              <label>Sort By</label>
              <select 
                value={`${sortBy}-${sortDir}`} 
                onChange={e => {
                  const [newSortBy, newSortDir] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortDir(newSortDir);
                }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="reviews-desc">Most Reviewed</option>
              </select>
            </div>
          </div>
          
          <div className="ss-filter-options">
            <label className="ss-checkbox">
              <input
                type="checkbox"
                checked={filterVerified}
                onChange={e => setFilterVerified(e.target.checked)}
              />
              <span className="checkbox-text">
                <FaCheckCircle /> Verified suppliers only
              </span>
            </label>
            
            <label className="ss-checkbox">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={e => setShowFavoritesOnly(e.target.checked)}
              />
              <span className="checkbox-text">
                <FaHeart /> Show favorites only
              </span>
            </label>
            
            <button className="ss-reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <button 
          className="ss-filter-toggle" 
          onClick={() => setShowFiltersMobile(prev => !prev)}
        >
          <BiFilterAlt /> {showFiltersMobile ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {/* Mobile filters panel */}
        {showFiltersMobile && (
          <div className="ss-mobile-filters">
            <div className="mobile-filter-header">
              <h3>Filter Options</h3>
              <button onClick={() => setShowFiltersMobile(false)}>
                <MdClose />
              </button>
            </div>
            
            <div className="mobile-filter-content">
              <div className="ss-filter-group">
                <label>Category</label>
                <select 
                  value={filterCategory} 
                  onChange={e => setFilterCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="ss-filter-group">
                <label>Location</label>
                <select 
                  value={filterLocation} 
                  onChange={e => setFilterLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="ss-filter-group">
                <label>Region</label>
                <select 
                  value={filterRegion} 
                  onChange={e => setFilterRegion(e.target.value)}
                >
                  {regions.map(reg => (
                    <option key={reg} value={reg}>
                      {reg === 'all' ? 'All Regions' : reg}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="ss-filter-group">
                <label>Sort By</label>
                <select 
                  value={`${sortBy}-${sortDir}`} 
                  onChange={e => {
                    const [newSortBy, newSortDir] = e.target.value.split('-');
                    setSortBy(newSortBy);
                    setSortDir(newSortDir);
                  }}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="reviews-desc">Most Reviewed</option>
                </select>
              </div>
              
              <label className="ss-checkbox">
                <input
                  type="checkbox"
                  checked={filterVerified}
                  onChange={e => setFilterVerified(e.target.checked)}
                />
                <span className="checkbox-text">
                  <FaCheckCircle /> Verified suppliers only
                </span>
              </label>
              
              <label className="ss-checkbox">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={e => setShowFavoritesOnly(e.target.checked)}
                />
                <span className="checkbox-text">
                  <FaHeart /> Show favorites only
                </span>
              </label>
              
              <button 
                className="ss-reset-btn mobile-reset" 
                onClick={() => {
                  resetFilters();
                  setShowFiltersMobile(false);
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="ss-results-info">
        <p>
          <span className="results-count">{filteredSuppliers.length}</span> 
          {filteredSuppliers.length === 1 ? 'supplier' : 'suppliers'} found
        </p>
      </div>

      <section className="ss-grid">
        {filteredSuppliers.map(supplier => (
          <div 
            key={supplier.id} 
            className={`ss-card ${expandedCard === supplier.id ? 'expanded' : ''}`}
          >
            {/* Card header with name and favorite button */}
            <div className="ss-card-header">
              <h2 className="ss-name">
                {supplier.name}
                {supplier.verified && (
                  <span className="verified-badge" title="Verified Supplier">
                    <FaCheckCircle />
                  </span>
                )}
              </h2>
              <button 
                className={`favorite-btn ${favorites.includes(supplier.id) ? 'favorited' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(supplier.id);
                }}
                aria-label={favorites.includes(supplier.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {favorites.includes(supplier.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            {/* Rating display */}
            <div className="ss-info-row">
              {renderRating(supplier.rating)}
              <span className="review-count">({supplier.reviewCount})</span>
            </div>
            
            {/* Category and location */}
            <div className="ss-meta">
              <div className="meta-item">
                <BiFilterAlt className="meta-icon" />
                <span>{supplier.category}</span>
              </div>
              <div className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{supplier.location}, {supplier.region}</span>
              </div>
            </div>
            
            {/* Brief description */}
            <p className="ss-description">{supplier.description}</p>
            
            {/* Product gallery */}
            <div className="ss-gallery">
              {supplier.products.slice(0, 3).map((product, i) => (
                <div className="product-thumbnail" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="ss-product"
                  />
                  <div className="product-info">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="ss-actions">
              <button 
                className="ss-view-details"
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setActiveImageIndex(0);
                }}
              >
                View Details
              </button>
              <button 
                className="ss-contact"
                onClick={() => openInquiryForm(supplier)}
              >
                Contact Supplier
              </button>
            </div>
            
            {/* Mobile expand toggle */}
            <button 
              className="expand-card-toggle"
              onClick={() => setExpandedCard(prev => prev === supplier.id ? null : supplier.id)}
            >
              {expandedCard === supplier.id ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ))}

        {filteredSuppliers.length === 0 && (
          <div className="ss-empty">
            <div className="empty-icon">
              <BiFilterAlt />
            </div>
            <h3>No suppliers found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button className="ss-reset-btn" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="supplier-modal-overlay" onClick={() => setSelectedSupplier(null)}>
          <div className="supplier-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="close-modal" 
              onClick={() => setSelectedSupplier(null)}
              aria-label="Close details"
            >
              <MdClose />
            </button>
            
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-supplier-info">
                  <h2>
                    {selectedSupplier.name}
                    {selectedSupplier.verified && (
                      <span className="verified-badge">
                        <FaCheckCircle />
                      </span>
                    )}
                  </h2>
                  <div className="modal-meta">
                    <span className="modal-category">{selectedSupplier.category}</span>
                    <span className="modal-location">
                      <FaMapMarkerAlt />
                      {selectedSupplier.location}, {selectedSupplier.region}
                    </span>
                  </div>
                  {renderRating(selectedSupplier.rating)}
                </div>
                
                <button 
                  className={`modal-favorite-btn ${favorites.includes(selectedSupplier.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(selectedSupplier.id)}
                >
                  {favorites.includes(selectedSupplier.id) ? (
                    <>
                      <FaHeart /> Saved to Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart /> Add to Favorites
                    </>
                  )}
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-gallery">
                  <div className="featured-image-container">
                    <img 
                      src={selectedSupplier.products[activeImageIndex].image} 
                      alt={selectedSupplier.products[activeImageIndex].name}
                      className="featured-image"
                    />
                    
                    <div className="image-info">
                      <h3>{selectedSupplier.products[activeImageIndex].name}</h3>
                      <span className="image-price">
                        {selectedSupplier.products[activeImageIndex].price}
                      </span>
                    </div>
                    
                    {selectedSupplier.products.length > 1 && (
                      <>
                        <button 
                          className="gallery-nav prev" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImages('prev');
                          }}
                          aria-label="Previous image"
                        >
                          <FaChevronLeft />
                        </button>
                        <button 
                          className="gallery-nav next" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImages('next');
                          }}
                          aria-label="Next image"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="thumbnail-strip">
                    {selectedSupplier.products.map((product, index) => (
                      <div 
                        key={product.id}
                        className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="supplier-details">
                  <div className="details-section">
                    <h3>About</h3>
                    <p>{selectedSupplier.description}</p>
                  </div>
                  
                  <div className="details-section">
                    <h3>Business Information</h3>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Founded</span>
                        <span className="detail-value">{selectedSupplier.founded}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Employees</span>
                        <span className="detail-value">{selectedSupplier.employeeCount}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Certifications</span>
                        <div className="certifications">
                          {selectedSupplier.certifications.map((cert, index) => (
                            <span key={index} className="certification-badge">
                              <FaAward className="cert-icon" /> {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h3>Contact Information</h3>
                    <div className="contact-list">
                      <a href={`tel:${selectedSupplier.phone}`} className="contact-item">
                        <FaPhone /> {selectedSupplier.phone}
                      </a>
                      <a 
                        href={`https://wa.me/${selectedSupplier.whatsapp.replace(/\+/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="contact-item whatsapp"
                      >
                        <FaWhatsapp /> WhatsApp Chat
                      </a>
                      <a href={`mailto:${selectedSupplier.email}`} className="contact-item">
                        <FaEnvelope /> {selectedSupplier.email}
                      </a>
                      <a 
                        href={selectedSupplier.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="contact-item"
                      >
                        <FaGlobe /> Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="inquiry-btn"
                  onClick={() => openInquiryForm(selectedSupplier)}
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default SupplierShowcase;