import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaShoppingCart, FaStar, FaHeart, FaRegHeart, 
  FaFilter, FaSort, FaArrowLeft, FaArrowRight 
} from 'react-icons/fa';
import { GiAfrica } from 'react-icons/gi';
import { MdEco } from 'react-icons/md';
import { useCart } from '../contexts/CartContext';
import './MenFashion.css';

const MenFashion = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState([]);
  
  // Use the global cart context instead
  const { addToCart } = useCart();
  
  // Helper function for navigating between categories
  const navigateToCategory = useCallback((categoryLink) => {
    navigate(`/mens-fashion/${categoryLink}`);
  }, [navigate]);

  // Categories data
  const categories = useMemo(() => [
    { 
      name: 'Traditional Wear', 
      link: 'traditional-wear',
      description: 'Authentic Ghanaian traditional garments for men',
      image: '/images/men-fashion/traditional-men.jpg',
    },
    { 
      name: 'Modern African Prints', 
      link: 'african-prints',
      description: 'Contemporary clothing featuring Ghanaian prints and patterns',
      image: '/images/men-fashion/african-print-men.jpg',
    },
    { 
      name: 'Casual Wear', 
      link: 'casual-wear',
      description: 'Everyday clothing made in Ghana with local fabrics and designs',
      image: '/images/men-fashion/ghana-casual-men.jpg',
    },
    { 
      name: 'Formal Attire', 
      link: 'formal-attire',
      description: 'Professional and occasion wear with Ghanaian influences',
      image: '/images/men-fashion/ghana-formal-men.jpg',
    },
    { 
      name: 'Footwear', 
      link: 'footwear',
      description: 'Traditional and modern shoes handcrafted by Ghanaian artisans',
      image: '/images/men-fashion/ghana-men-shoes.jpg',
    },
    { 
      name: 'Accessories', 
      link: 'accessories',
      description: 'Authentic Ghanaian accessories to complete any outfit',
      image: '/images/men-fashion/ghana-men-accessories.jpg',
    }
  ], []);
  
  // Effects to load data
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('menFashionFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Simulate loading delay
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  // Effect for handling subcategory selection
  useEffect(() => {
    if (subcategory) {
      // Find the category that corresponds to the subcategory from URL
      const category = categories.find(cat => cat.link === subcategory);
      
      if (category) {
        setSelectedCategory(category);
      } else {
        // Handle legacy URLs from the old menu structure
        const mappings = {
          'clothing': ['traditional-wear', 'african-prints', 'casual-wear', 'formal-attire'],
          'shoes': ['footwear'],
          'watches': ['accessories'],
          'accessories': ['accessories'],
        };
        
        const mapped = mappings[subcategory];
        if (mapped && mapped.length > 0) {
          // Redirect to the first matching new category
          navigate(`/mens-fashion/${mapped[0]}`, { replace: true });
        } else {
          setSelectedCategory(null);
        }
      }
    } else {
      setSelectedCategory(null);
    }
  }, [subcategory, categories, navigate]);

  // Toggle favorite status
  const toggleFavorite = useCallback((productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      // Save to localStorage
      localStorage.setItem('menFashionFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Add to cart function
  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price)
    };
    addToCart(productToAdd, 1);
  };

  // Sample products data
  useEffect(() => {
    setProducts([
      {
        id: 'prod-1',
        name: 'Traditional Kente Cloth',
        description: 'Handwoven authentic kente cloth from Bonwire',
        price: 450,
        discountPercent: 0,
        category: 'traditional-wear',
        region: 'Ashanti Region',
        image: '/images/men-fashion/kente-1.jpg',
        rating: 4.9,
        reviews: 124,
        isNew: false,
        sustainabilityCertified: true,
      },
      {
        id: 'prod-2',
        name: 'Modern Smock (Batakari)',
        description: 'Contemporary northern Ghana smock with embroidery',
        price: 180,
        discountPercent: 10,
        category: 'traditional-wear',
        region: 'Northern Region',
        image: '/images/men-fashion/smock-1.jpg',
        rating: 4.7,
        reviews: 89,
        isNew: true,
        sustainabilityCertified: true,
      },
      {
        id: 'prod-3',
        name: 'African Print Dress Shirt',
        description: 'Tailored shirt with traditional Ghanaian patterns',
        price: 120,
        discountPercent: 0,
        category: 'african-prints',
        region: 'Greater Accra',
        image: '/images/men-fashion/ankara-1.jpg',
        rating: 4.5,
        reviews: 76,
        isNew: false,
        sustainabilityCertified: false,
      },
      {
        id: 'prod-4',
        name: 'Kente Trim Suit',
        description: 'Modern suit with kente accent details',
        price: 350,
        discountPercent: 5,
        category: 'formal-attire',
        region: 'Greater Accra',
        image: '/images/men-fashion/formal-1.jpg',
        rating: 4.8,
        reviews: 42,
        isNew: true,
        sustainabilityCertified: false,
      },
      {
        id: 'prod-5',
        name: 'Ghana T-Shirt',
        description: 'Comfortable cotton T-shirt with Ghana flag design',
        price: 45,
        discountPercent: 0,
        category: 'casual-wear',
        region: 'Greater Accra',
        image: '/images/men-fashion/casual-1.jpg',
        rating: 4.3,
        reviews: 118,
        isNew: false,
        sustainabilityCertified: true,
      },
      {
        id: 'prod-6',
        name: 'Handcrafted Leather Sandals',
        description: 'Traditional leather sandals made by artisans',
        price: 85,
        discountPercent: 0,
        category: 'footwear',
        region: 'Northern Region',
        image: '/images/men-fashion/footwear-1.jpg',
        rating: 4.6,
        reviews: 64,
        isNew: false,
        sustainabilityCertified: true,
      },
      {
        id: 'prod-7',
        name: 'Beaded Wrist Bracelet',
        description: 'Handmade beaded bracelet with traditional patterns',
        price: 35,
        discountPercent: 0,
        category: 'accessories',
        region: 'Volta Region',
        image: '/images/men-fashion/accessories-1.jpg',
        rating: 4.7,
        reviews: 53,
        isNew: true,
        sustainabilityCertified: true,
      },
      {
        id: 'prod-8',
        name: 'African Print Blazer',
        description: 'Statement blazer with vibrant Ghanaian print',
        price: 220,
        discountPercent: 15,
        category: 'african-prints',
        region: 'Greater Accra',
        image: '/images/men-fashion/african-print-2.jpg',
        rating: 4.8,
        reviews: 37,
        isNew: true,
        sustainabilityCertified: false,
      }
    ]);
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    if (!searchTerm && !selectedCategory && selectedFilters.length === 0) {
      return products;
    }
    
    return products.filter(product => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = !selectedCategory || 
        product.category === selectedCategory.link;
      
      // Filter by selected filters (regions)
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => product.region === filter);
      
      return matchesSearch && matchesCategory && matchesFilters;
    });
  }, [products, searchTerm, selectedCategory, selectedFilters]);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    switch(sortOption) {
      case 'price-low':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...filteredProducts].sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
      case 'popularity':
      default:
        return [...filteredProducts];
    }
  }, [filteredProducts, sortOption]);

  // Render categories grid 
  const renderCategoriesGrid = () => (
    <section className="categories-section">
      <h2 className="section-title">Explore Men's Ghana Fashion Categories</h2>      <div className="categories-grid">
        {categories && categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-image-container">
              <img 
                src={category.image} 
                alt={category.name} 
                className="category-image"
              />
            </div>
            
            <div className="category-content">
              <h3 className="category-title">
                <Link to={`/mens-fashion/${category.link}`}>{category.name}</Link>
              </h3>
              
              <p className="category-description">{category.description}</p>
              
              <button 
                className="view-category-button"
                onClick={() => navigateToCategory(category.link)}
              >
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Render search and filters section
  const renderSearchAndFilters = () => (
    <section className="search-filter-section">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for Ghanaian men's fashion..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
      
      <div className="filter-sort-container">
        <div className="filter-dropdown">
          <button className="filter-button">
            <FaFilter /> Filter by Region
          </button>
          <div className="filter-options">
            {['Ashanti Region', 'Northern Region', 'Greater Accra', 'Volta Region'] && ['Ashanti Region', 'Northern Region', 'Greater Accra', 'Volta Region'].map((region, index) => (
              <label key={index} className="filter-option">
                <input 
                  type="checkbox"
                  checked={selectedFilters.includes(region)}
                  onChange={() => {
                    setSelectedFilters(prev => 
                      prev.includes(region)
                        ? prev.filter(f => f !== region)
                        : [...prev, region]
                    );
                  }}
                />
                {region}
              </label>
            ))}
          </div>
        </div>
        
        <div className="sort-dropdown">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="popularity">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Items</option>
          </select>
          <FaSort className="sort-icon" />
        </div>
      </div>
    </section>
  );

  // Render product grid
  const renderProductGrid = () => (
    <section className="products-section">
      <h2 className="section-title">
        {selectedCategory 
          ? `${selectedCategory.name} for Men` 
          : 'Featured Men\'s Fashion from Ghana'}
      </h2>
        <div className="products-grid">
        {sortedProducts && sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
              
              {product.isNew && (
                <span className="new-badge">New</span>
              )}
              
              {product.discountPercent > 0 && (
                <span className="discount-badge">-{product.discountPercent}%</span>
              )}
              
              <button 
                className="favorite-button"
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            <div className="product-content">
              <div className="product-meta">
                <span className="product-category">
                  {categories.find(c => c.link === product.category)?.name}
                </span>
                
                <div className="product-rating">
                  <FaStar />
                  <span>{product.rating}</span>
                  <small>({product.reviews})</small>
                </div>
              </div>
              
              <h3 className="product-name">{product.name}</h3>
              
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <span className="product-price">
                  ₵{product.price.toFixed(2)}
                </span>
                
                <span className="region-badge">
                  <GiAfrica /> {product.region}
                </span>
                
                {product.sustainabilityCertified && (
                  <span className="sustainability-badge">
                    <MdEco /> Eco-friendly
                  </span>
                )}
              </div>
              
              <div className="product-actions">
                <button 
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                
                <Link to={`/product/${product.id}`} className="view-details-link">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Main component render
  return (
    <div className="men-fashion-page">
      {/* Loading state */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading authentic Ghanaian fashion for men...</p>
        </div>
      ) : (
        <>
          {/* Page header */}
          <header className="page-header">
            <div className="breadcrumbs">
              <Link to="/">Home</Link> {' > '}
              <Link to="/mens-fashion">Men's Fashion</Link>
              {selectedCategory && (
                <> {' > '} <span>{selectedCategory.name}</span></>
              )}
            </div>
            
            <h1 className="page-title">
              {selectedCategory 
                ? `${selectedCategory.name} for Men` 
                : "Men's Ghana-Made Fashion"}
            </h1>
          </header>
          
          {/* Search and filters */}
          {renderSearchAndFilters()}
          
          {/* Main content based on context */}
          <main className="main-content">
            {!selectedCategory && renderCategoriesGrid()}
            {renderProductGrid()}
          </main>
          
          {/* Cart notification container - styled via CSS */}
          <div id="notification-container"></div>
        </>
      )}
    </div>
  );
};

export default MenFashion;