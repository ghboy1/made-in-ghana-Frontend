import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaFilter, FaInfoCircle, FaLanguage, FaHandshake
} from 'react-icons/fa';
import { GiSewingNeedle } from 'react-icons/gi';
import { MdEco } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import './BoysFashion.css';

// Import components
import CategoryCarousel from '../components/boys-fashion/CategoryCarousel';
import FilterPanel from '../components/boys-fashion/FilterPanel';
import ProductGrid from '../components/boys-fashion/ProductGrid';
import FeaturedCollection from '../components/boys-fashion/FeaturedCollection';
import CulturalStoryCard from '../components/boys-fashion/CulturalStoryCard';
import PageHeader from '../components/boys-fashion/PageHeader';
import { 
  adinkraSymbols, 
  languages, 
  translations, 
  categories, 
  regionDetails,
  culturalStories, 
  carouselItems, 
  featuredCollections, 
  products 
} from '../data/boysFashionData';

// Lazy-loaded modals
const SizeGuideModal = lazy(() => import('../components/SizeGuideModal'));
const CulturalStoryModal = lazy(() => import('../components/CulturalStoryModal'));
const RegionMapModal = lazy(() => import('../components/RegionMapModal'));
const ShareModal = lazy(() => import('../components/boys-fashion/ShareModal'));

const BoysFashion = () => {
  const { subcategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Feature states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('popular');
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filter states
  const [activeSize, setActiveSize] = useState([]);
  const [activePriceRange, setActivePriceRange] = useState([]);
  const [activeRegion, setActiveRegion] = useState([]);
  
  // Modal states
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCulturalStory, setShowCulturalStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showRegionMap, setShowRegionMap] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState(null);
  const [adinkraHighlight, setAdinkraHighlight] = useState(null);

  // Memoized values
  const currentCategory = useMemo(() =>
    subcategory ? categories.find(cat => cat.link === subcategory) : null,
    [subcategory]
  );

  const filteredProducts = useMemo(() => {
    try {
      let result = [...products];
      
      // Filter by subcategory
      if (subcategory) {
        result = result.filter(p => p.category === subcategory);
      }
      
      // Filter by search term
      if (searchTerm) {
        const normalizedTerm = searchTerm.toLowerCase();
        result = result.filter(p =>
          [p.name, p.description, p.artisan, p.region].some(field =>
            field.toLowerCase().includes(normalizedTerm)
          )
        );
      }
      
      // Apply filters
      if (activeSize.length) {
        result = result.filter(p => p.sizes.some(size => activeSize.includes(size)));
      }
      
      if (activePriceRange.length) {
        result = result.filter(p => {
          const price = p.price;
          return activePriceRange.some(range => {
            if (range === 'Under GH₵50') return price < 50;
            if (range === 'GH₵50 - GH₵100') return price >= 50 && price <= 100;
            if (range === 'GH₵100 - GH₵150') return price > 100 && price <= 150;
            if (range === 'Over GH₵150') return price > 150;
            return false;
          });
        });
      }
      
      if (activeRegion.length) {
        result = result.filter(p => activeRegion.includes(p.region));
      }
      
      // Apply sorting
      result.sort((a, b) => {
        switch (sortOption) {
          case 'price-low': return a.price - b.price;
          case 'price-high': return b.price - a.price;
          case 'newest': return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
          case 'rating': return b.rating - a.rating;
          case 'popular': default: return b.popularityScore - a.popularityScore;
        }
      });
      
      return result;
    } catch (err) {
      setError(err);
      return [];
    }
  }, [subcategory, searchTerm, activeSize, activePriceRange, activeRegion, sortOption]);

  // Effects
  useEffect(() => {
    try {
      // Load saved favorites and recently viewed
      const savedFavorites = localStorage.getItem('boysFashionFavorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      
      const savedRecent = localStorage.getItem('recentlyViewedBoysFashion');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

      // Set up carousel rotation
      const carouselTimer = setInterval(() =>
        setCurrentSlide(prev => (prev + 1) % carouselItems.length), 5000
      );
      
      // Simulate loading delay
      const loadTimer = setTimeout(() => setIsLoading(false), 1000);

      // Clean up timers
      return () => {
        clearInterval(carouselTimer);
        clearTimeout(loadTimer);
      };
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  // Save favorites when changed
  useEffect(() => {
    localStorage.setItem('boysFashionFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Event handlers
  const toggleFavorite = useCallback(productId => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const viewProduct = useCallback(productId => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setRecentlyViewed(prev => {
        const updated = [product, ...prev.filter(p => p.id !== productId)].slice(0, 4);
        localStorage.setItem('recentlyViewedBoysFashion', JSON.stringify(updated));
        return updated;
      });
    }
  }, []);

  const handleFilterChange = useCallback((setter, value) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  }, []);

  const nextSlide = useCallback(() =>
    setCurrentSlide(prev => (prev + 1) % carouselItems.length), 
    [carouselItems.length]
  );
  
  const prevSlide = useCallback(() =>
    setCurrentSlide(prev => (prev - 1 + carouselItems.length) % carouselItems.length), 
    [carouselItems.length]
  );

  const openCulturalStory = useCallback(story => {
    setSelectedStory(story);
    setShowCulturalStory(true);
  }, []);

  const openRegionMap = useCallback(regionName => {
    const region = regionDetails.find(r => r.name === regionName);
    if (region) {
      setSelectedRegion(region);
      setShowRegionMap(true);
    }
  }, []);

  const shareProductInfo = useCallback(product => {
    setShareProduct(product);
    setShowShareModal(true);
  }, []);

  const translate = useCallback(key => {
    return translations[language]?.[key] || translations.en[key];
  }, [language]);
  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setActiveSize([]);
    setActivePriceRange([]);
    setActiveRegion([]);
  }, []);

  const showAdinkraInfo = useCallback(symbolKey => {
    setAdinkraHighlight(adinkraSymbols[symbolKey]);
    setTimeout(() => setAdinkraHighlight(null), 3000);
  }, []);

  // Error handling
  if (error) {
    return (
      <div className="error-container">
        <div className="ghana-flag-banner">
          <div className="flag-stripe red" />
          <div className="flag-stripe gold" />
          <div className="flag-stripe green" />
        </div>
        <h2>Something went wrong</h2>
        <p>We apologize for the inconvenience. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Refresh page
        </button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="ghana-flag-spinner">
          <div className="spinner-stripe red" />
          <div className="spinner-stripe gold" />
          <div className="spinner-stripe green" />
        </div>
        <p>Loading Ghana's finest boys' fashion...</p>
      </div>
    );
  }

  return (
    <div className="boys-fashion-page">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Flag banner */}
      <div className="ghana-flag-banner">
        <div className="flag-stripe red" />
        <div className="flag-stripe gold" />
        <div className="flag-stripe green" />
      </div>

      {/* Language selector */}
      <div className="language-selector">
        <FaLanguage aria-hidden="true" className="language-icon" />
        <select 
          value={language} 
          onChange={e => setLanguage(e.target.value)} 
          aria-label="Select language"
        >          {languages && languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      {/* Page header component */}
      <PageHeader 
        currentCategory={currentCategory} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showAdinkraInfo={showAdinkraInfo}
      />

      {/* Adinkra tooltip */}
      <AnimatePresence>
        {adinkraHighlight && (
          <motion.div 
            className="adinkra-tooltip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="adinkra-symbol-large" aria-hidden="true">{adinkraHighlight.symbol}</div>
            <div className="adinkra-meaning">{adinkraHighlight.meaning}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main id="main-content">
        {!subcategory ? (
          // Home view
          <>
            {/* Category carousel */}
            <CategoryCarousel 
              items={carouselItems}
              currentSlide={currentSlide}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              setCurrentSlide={setCurrentSlide}
            />

            {/* Cultural stories section */}
            <section className="cultural-stories-section">
              <h2>Cultural Stories Behind Our Fashion</h2>
              <div className="stories-grid">                {culturalStories && culturalStories.map(story => (
                  <CulturalStoryCard 
                    key={story.id}
                    story={story}
                    onStoryClick={openCulturalStory}
                  />
                ))}
              </div>
            </section>

            {/* Categories section */}
            <section className="categories-section">
              <h2>Shop by Category</h2>
              <div className="categories-grid">                {categories && categories.map(category => (
                  <Link 
                    key={category.link} 
                    to={`/boys-fashion/${category.link}`}
                    className="category-card"
                  >
                    <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
                    <h3>{category.name}</h3>
                    <img 
                      src={category.image} 
                      alt="" 
                      aria-hidden="true"
                      className="category-image" 
                    />
                    <p>{category.shortDescription}</p>
                    <span className="category-link">Shop Now</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured collections */}
            <section className="featured-collections">
              <h2>Featured Collections</h2>
              <div className="collections-grid">                {featuredCollections && featuredCollections.map(collection => (
                  <FeaturedCollection 
                    key={collection.id}
                    collection={collection}
                  />
                ))}
              </div>
            </section>

            {/* Recently viewed */}
            {recentlyViewed.length > 0 && (
              <section className="recently-viewed">
                <h2>Recently Viewed</h2>
                <div className="recent-products">                  {recentlyViewed && recentlyViewed.map(product => (
                    <div key={product.id} className="recent-product-card">
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>GH₵{product.price.toFixed(2)}</p>
                      <Link 
                        to={`/product/${product.id}`}
                        className="btn-secondary"
                      >
                        View Again
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sustainability section */}
            <section className="sustainability-section">
              <div className="sustainability-content">
                <h2>Our Commitment to Sustainability</h2>
                <div className="eco-badges">
                  <div className="eco-badge">
                    <MdEco aria-hidden="true" />
                    <span>Eco-Friendly Materials</span>
                  </div>
                  <div className="eco-badge">
                    <GiSewingNeedle aria-hidden="true" />
                    <span>Traditional Craftsmanship</span>
                  </div>
                  <div className="eco-badge">
                    <FaHandshake aria-hidden="true" />
                    <span>Fair Trade Practices</span>
                  </div>
                </div>
                <p>Our boys' clothing is crafted with respect for Ghana's traditions and environment. We use locally-sourced, sustainable materials and support traditional artisans throughout Ghana.</p>
                <Link to="/sustainability" className="btn-primary">Learn More</Link>
              </div>
            </section>
          </>
        ) : (
          // Subcategory view
          <>
            {/* Subcategory header */}
            <div className="subcategory-header">
              <div className="breadcrumbs">
                <Link to="/boys-fashion">Boys' Fashion</Link> 
                <span className="breadcrumb-separator" aria-hidden="true">&gt;</span> 
                <span>{currentCategory?.name}</span>
              </div>
              
              <div className="subcategory-controls">
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="btn-secondary"
                >
                  <FaInfoCircle aria-hidden="true" /> {translate('sizeGuide')}
                </button>
                
                <div className="sort-container">
                  <label htmlFor="sort-select" className="sr-only">Sort by</label>
                  <select 
                    id="sort-select"
                    value={sortOption} 
                    onChange={e => setSortOption(e.target.value)}
                    className="sort-select"
                  >
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary filter-toggle"
                  aria-expanded={showFilters}
                  aria-controls="filter-panel"
                >
                  <FaFilter aria-hidden="true" /> 
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>
              </div>
            </div>

            {/* Filter panel */}
            <AnimatePresence>
              {showFilters && (
                <FilterPanel 
                  activeSize={activeSize}
                  activePriceRange={activePriceRange}
                  activeRegion={activeRegion}
                  handleFilterChange={handleFilterChange}
                  setActiveSize={setActiveSize}
                  setActivePriceRange={setActivePriceRange}
                  setActiveRegion={setActiveRegion}
                  openRegionMap={openRegionMap}
                  clearAllFilters={clearAllFilters}
                />
              )}
            </AnimatePresence>

            {/* Results summary */}
            <div className="results-summary">
              <p>
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {(activeSize.length > 0 || activePriceRange.length > 0 || activeRegion.length > 0) ? ' with selected filters' : ''}
              </p>
              
              {(activeSize.length > 0 || activePriceRange.length > 0 || activeRegion.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className="clear-filters-btn"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Products grid */}
            <ProductGrid 
              products={filteredProducts}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              viewProduct={viewProduct}
              shareProductInfo={shareProductInfo}
              translate={translate}
            />
            
            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term to find what you're looking for.</p>
                <button 
                  onClick={clearAllFilters}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <Suspense fallback={<div className="modal-loading">Loading...</div>}>
        <AnimatePresence>
          {showSizeGuide && (
            <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
          )}
          
          {showCulturalStory && selectedStory && (
            <CulturalStoryModal 
              story={selectedStory}
              onClose={() => setShowCulturalStory(false)} 
            />
          )}
          
          {showRegionMap && selectedRegion && (
            <RegionMapModal 
              region={selectedRegion}
              onClose={() => setShowRegionMap(false)} 
            />
          )}
          
          {showShareModal && shareProduct && (
            <ShareModal 
              product={shareProduct}
              onClose={() => setShowShareModal(false)} 
            />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default BoysFashion;