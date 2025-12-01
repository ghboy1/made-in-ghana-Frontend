import React, { useEffect, useState, useContext, useCallback, memo, Suspense } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import Link for navigation
import Autosuggest from "react-autosuggest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { SearchContext } from "../contexts/SearchContext";
import { useCart } from "../contexts/CartContext";
import { FaSearch } from 'react-icons/fa';
import Recommendations from './Recommendations'; // Import the Recommendations component

// Import data
import { 
  featuredProducts, 
  featuredManufacturers, 
  organicFoodProductCategories 
} from '../data/productData';

// Import custom hooks
import { useFloatingStars } from '../hooks/useFloatingStars';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useFloatingFlags } from '../hooks/useFloatingFlags';
import { useFloatingHearts } from '../hooks/useFloatingHearts';
import { useFloatingLikes } from '../hooks/useFloatingLikes';
import { useFloatingPatterns } from '../hooks/useFloatingPatterns';

// Main component
function Home() {
  // Custom hooks for floating elements
  useFloatingStars('floatingStarsContainer');
  useFloatingHearts('floatingHeartsContainer');
  useFloatingLikes('floatingLikesContainer');
  useFloatingFlags('floatingFlagsContainer');
  useFloatingPatterns('floatingPatternsContainer');
  
  const { showScroll, scrollTop } = useScrollToTop(300);
  
  // Context hooks
  const { addToCart, removeFromCart, updateQuantity } = useCart();
  const { setSelectedCategory } = useContext(SearchContext);
  
  // State declarations
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Navigation hooks
  const navigate = useNavigate();
  const { category } = useParams();

  // Set up filtered products based on category
  useEffect(() => {
    if (category) {
      const filtered = featuredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
      setSelectedCategory(category);
    } else {
      setFilteredProducts(featuredProducts);
      setSelectedCategory(null);
    }
  }, [category, setSelectedCategory]);

  // Event handlers
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchValue)}`);
    }
  }, [searchValue, navigate]);

  // Autosuggest handlers
  const getSuggestions = useCallback((value) => {
    const inputValue = value.trim().toLowerCase();
    if (inputValue.length === 0) return [];
    
    return [...featuredProducts, ...organicFoodProductCategories]
      .filter((item) => item.name.toLowerCase().includes(inputValue))
      .slice(0, 8);
  }, []);

  // Render sections as separate components for better organization
  const renderHeroSection = () => (
    <section className="hero-search-section">
      <div className="container">
        <div className="search-container">
          <h1>Made in Ghana B2B Marketplace</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={(item) => item.name}
                renderSuggestion={(item) => <div>{item.name}</div>}
                inputProps={{
                  placeholder: "Search term e.g. shea butter, kente cloth, cocoa products...",
                  value: searchValue,
                  onChange: (_, { newValue }) => setSearchValue(newValue),
                  className: "search-input",
                }}
              />
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>
          <p className="search-tagline">
            Create one request and get multiple quotes from verified Ghanaian suppliers. 100% free.
          </p>
        </div>

        {/* PLATFORM STATISTICS */}
        <div className="platform-stats">
          <div className="stat-item">
            <div className="stat-value">{featuredManufacturers.length}+</div>
            <div className="stat-label">B2B providers</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{organicFoodProductCategories.length}</div>
            <div className="stat-label">Industry sectors</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{featuredProducts.length}+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">16</div>
            <div className="stat-label">Regions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">10K+</div>
            <div className="stat-label">Buyers per month</div>
          </div>
        </div>
      </div>
    </section>
  );

  // Add product section to actually use filteredProducts
  const renderProductSection = () => (
    <section className="product-recommendations-section">
      <div className="container">
        <div className="section-header">
          <h2>{category ? `${category} Products` : 'Featured Products'}</h2>
        </div>
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found. Please try another category.</p>
            </div>
          ) : (
            renderProductCards(filteredProducts)
          )}
        </div>
      </div>
    </section>
  );

  const renderProductCards = (products) => {
    return products.map((product) => {
      // Ensure price is a number for cart logic
      const safeProduct = {
        ...product,
        price: typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^\d.-]/g, ''))
          : product.price
      };
      return (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-image" />
            {product.verified && (
              <div className="verified-badge">
                <span>✓ verified</span>
              </div>
            )}
          </div>
          <h3 className="product-name">{product.name}</h3>
          {product.price && (
            <div className="product-price">
              GH₵{safeProduct.price.toFixed(2)}
            </div>
          )}
          <div className="product-actions">
            <button 
              className="add-to-cart-btn" 
              onClick={() => addToCart(safeProduct, 1)}
            >
              Add to Cart
            </button>
            <button 
              className="view-details-btn"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Details
            </button>
          </div>
        </div>
      );
    });
  };

  // Render Product Recommendations Section
  const renderRecommendationsSection = () => {
    const limitedRecommendations = featuredProducts.slice(0, 4); // Show only 4 products

    return (
      <section className="recommendations-section">
        <h2>Product Recommendations</h2>
        <Recommendations products={limitedRecommendations} />
        <div className="see-more-container">
          <Link to="/recommendations" className="see-more-button">
            See More
          </Link>
        </div>
      </section>
    );
  };

  // Render Popular Categories Section
  const renderCategoriesSection = () => {
    const popularCategories = [
      {
        id: 1,
        name: "Containers, logistics, and warehouse supplies",
        icon: "🏭",
        slug: "containers-logistics"
      },
      {
        id: 2,
        name: "Conveying technology",
        icon: "⚙️",
        slug: "conveying-technology"
      },
      {
        id: 3,
        name: "Electrical Engineering",
        icon: "⚡",
        slug: "electrical-engineering"
      },
      {
        id: 4,
        name: "Fastening technology, connection technology, and fittings",
        icon: "🔧",
        slug: "fastening-technology"
      },
      {
        id: 5,
        name: "Machine parts",
        icon: "🔩",
        slug: "machine-parts"
      },
      {
        id: 6,
        name: "Measurement and Testing Equipment",
        icon: "📏",
        slug: "measurement-equipment"
      },
      {
        id: 7,
        name: "Plastic and plastic products",
        icon: "♻️",
        slug: "plastic-products"
      },
      {
        id: 8,
        name: "Refrigeration, air conditioning, ventilation, and heating technology",
        icon: "❄️",
        slug: "refrigeration-hvac"
      },
      {
        id: 9,
        name: "Tools and Manufacturing Supplies",
        icon: "🛠️",
        slug: "tools-manufacturing"
      }
    ];

    return (
      <section className="popular-categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories on the Marketplace</h2>
            <p>Explore Ghana's top industrial and manufacturing categories</p>
          </div>
          <div className="categories-grid">
            {popularCategories.map(category => (
              <Link 
                to={`/category/${category.slug}`} 
                className="category-card" 
                key={category.id}
              >
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
                <div className="category-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderBusinessDirectory = () => {
    // Create alphabet array for navigation
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    // Create numbers array for showrooms
    const numbers = Array.from({ length: 26 }, (_, i) => i + 1);

    return (
      <section className="business-directory-section">
        <div className="container">
          <h2 className="directory-main-title">Business Directory</h2>
          
          {/* Business Sectors - Centered Button */}
          <div className="sectors-button-container">
            <Link to="/sectors" className="all-sectors-button">
              See all business sectors
            </Link>
          </div>
          
          {/* 4-Column Layout for Directory */}
          <div className="directory-columns-container">
            {/* Top Categories Column */}
            <div className="directory-column">
              <h3 className="directory-column-title">Top categories</h3>
              <div className="directory-alphabet">
                {alphabet.map((letter) => (
                  <Link key={letter} to={`/categories/${letter}`} className="alphabet-link">
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Find Companies Column */}
            <div className="directory-column">
              <h3 className="directory-column-title">Find more companies</h3>
              <div className="directory-alphabet">
                {alphabet.map((letter) => (
                  <Link key={letter} to={`/companies/${letter}`} className="alphabet-link">
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Top Products Column */}
            <div className="directory-column">
              <h3 className="directory-column-title">Top products</h3>
              <div className="directory-alphabet">
                {alphabet.map((letter) => (
                  <Link key={letter} to={`/products/${letter}`} className="alphabet-link">
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Showrooms Column */}
            <div className="directory-column">
              <h3 className="directory-column-title">Showrooms</h3>
              <div className="directory-alphabet">
                {numbers.map((number) => (
                  <Link key={number} to={`/showrooms/${number}`} className="alphabet-link">
                    {number}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Europages style footer */}
          <div className="directory-footer">
            <p>Made in Ghana B2B – the B2B marketplace in Ghana</p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="home-page europages-style">
      <div id="floatingStarsContainer" className="floating-stars-container"></div>
      <div id="floatingFlagsContainer" className="floating-elements-container"></div>
      <div id="floatingHeartsContainer" className="floating-elements-container"></div>
      <div id="floatingLikesContainer" className="floating-elements-container"></div>
      <div id="floatingPatternsContainer" className="floating-elements-container"></div>
      
      <Suspense fallback={<div className="loading">Loading...</div>}>
        {renderHeroSection()}
        {renderCategoriesSection()}
        {renderProductSection()}
        {renderRecommendationsSection()}
        {renderBusinessDirectory()}
      </Suspense>

      {/* SCROLL TO TOP */}
      <button 
        className={`scroll-top-btn ${showScroll ? 'visible' : ''}`}
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" className="scroll-top__icon">
          <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z"/>
        </svg>
      </button>
    </div>
  );
}

// Use memo for performance optimization
export default memo(Home);