import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronRight, FaShoppingCart, FaHeart, FaStar, FaFilter, FaSort, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './Automotive.css';

const Automotive = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  // Define the standard path structure to match HamburgerMenu
  const basePath = '/automotive';

  // Define full category structure with images
  const categories = [
    { 
      name: 'Car Care', 
      link: 'car-care', 
      image: '/images/automotive/car-care.jpg',
      description: 'High-quality Ghanaian car washing, waxing, and detailing products',
      subcats: [
        { name: 'Washing Supplies', link: 'washing-supplies', image: '/images/automotive/washing.jpg' },
        { name: 'Interior Cleaners', link: 'interior-cleaners', image: '/images/automotive/interior-clean.jpg' },
        { name: 'Waxes & Polishes', link: 'waxes-polishes', image: '/images/automotive/wax.jpg' },
      ] 
    },
    { 
      name: 'Car Electronics & Accessories', 
      link: 'electronics', 
      image: '/images/automotive/electronics.jpg',
      description: 'Quality electronics and accessories for your vehicle',
      subcats: [
        { name: 'Audio Systems', link: 'audio', image: '/images/automotive/audio.jpg' },
        { name: 'Dash Cams', link: 'dash-cams', image: '/images/automotive/dash-cam.jpg' },
        { name: 'Phone Mounts', link: 'phone-mounts', image: '/images/automotive/phone-mount.jpg' },
      ] 
    },
    { 
      name: 'Exterior Accessories', 
      link: 'exterior', 
      image: '/images/automotive/exterior.jpg',
      description: 'Enhance your vehicle with Ghanaian-made exterior accessories',
      subcats: [
        { name: 'Car Covers', link: 'car-covers', image: '/images/automotive/car-covers.jpg' },
        { name: 'Bumper Stickers', link: 'bumper-stickers', image: '/images/automotive/bumper-stickers.jpg' },
        { name: 'License Plate Frames', link: 'license-frames', image: '/images/automotive/license-frames.jpg' },
      ] 
    },
    { 
      name: 'Interior Accessories', 
      link: 'interior', 
      image: '/images/automotive/interior.jpg',
      description: 'Customize your vehicle interior with locally-made products',
      subcats: [
        { name: 'Seat Covers', link: 'seat-covers', image: '/images/automotive/seat-covers.jpg' },
        { name: 'Floor Mats', link: 'floor-mats', image: '/images/automotive/floor-mats.jpg' },
        { name: 'Organizers', link: 'organizers', image: '/images/automotive/organizers.jpg' },
      ] 
    },
    { 
      name: 'Lights & Lighting Accessories', 
      link: 'lights', 
      image: '/images/automotive/lights.jpg',
      description: 'Illuminate your drive with quality lighting solutions',
      subcats: [
        { name: 'Headlights', link: 'headlights', image: '/images/automotive/headlights.jpg' },
        { name: 'Taillights', link: 'taillights', image: '/images/automotive/taillights.jpg' },
        { name: 'Interior Lights', link: 'interior-lights', image: '/images/automotive/interior-lights.jpg' },
      ] 
    },
    { 
      name: 'Motorcycle & Powersports', 
      link: 'motorcycle', 
      image: '/images/automotive/motorcycle.jpg',
      description: 'Everything for your motorcycle and powersports needs',
      subcats: [
        { name: 'Motorcycle Parts', link: 'parts', image: '/images/automotive/motorcycle-parts.jpg' },
        { name: 'Riding Gear', link: 'riding-gear', image: '/images/automotive/riding-gear.jpg' },
        { name: 'Accessories', link: 'motorcycle-accessories', image: '/images/automotive/motorcycle-accessories.jpg' },
      ] 
    },
    { 
      name: 'Oils & Fluids', 
      link: 'oils-fluids', 
      image: '/images/automotive/oils.jpg',
      description: 'Keep your vehicle running smoothly with quality oils and fluids',
      subcats: [
        { name: 'Engine Oil', link: 'engine-oil', image: '/images/automotive/engine-oil.jpg' },
        { name: 'Transmission Fluid', link: 'transmission-fluid', image: '/images/automotive/transmission-fluid.jpg' },
        { name: 'Brake Fluid', link: 'brake-fluid', image: '/images/automotive/brake-fluid.jpg' },
      ] 
    },
    { 
      name: 'Tires & Wheels', 
      link: 'tires-wheels', 
      image: '/images/automotive/tires.jpg',
      description: 'Quality tires and wheels for all vehicle types',
      subcats: [
        { name: 'Car Tires', link: 'car-tires', image: '/images/automotive/car-tires.jpg' },
        { name: 'Truck Tires', link: 'truck-tires', image: '/images/automotive/truck-tires.jpg' },
        { name: 'Wheel Accessories', link: 'wheel-accessories', image: '/images/automotive/wheel-accessories.jpg' },
      ] 
    }
  ];

  // Mock sample products - in a real app, this would come from your API
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Sample products data
      const sampleProducts = [
        {
          id: 'auto1',
          name: 'Ghanaian Organic Car Wash Soap',
          category: 'car-care',
          subcategory: 'washing-supplies',
          price: 24.99,
          image: '/images/automotive/car-wash-soap.jpg',
          rating: 4.7,
          description: 'Natural, biodegradable car wash soap made with organic ingredients from Ghana',
          inStock: true,
          region: 'Accra'
        },
        {
          id: 'auto2',
          name: 'Handcrafted Kente Seat Covers',
          category: 'interior',
          subcategory: 'seat-covers',
          price: 89.99,
          image: '/images/automotive/kente-seat-covers.jpg',
          rating: 4.9,
          description: 'Authentic Ghanaian Kente cloth seat covers, handmade by local artisans',
          inStock: true,
          region: 'Kumasi'
        },
        {
          id: 'auto3',
          name: 'Ghana Flag Car Air Freshener',
          category: 'interior',
          subcategory: 'organizers',
          price: 5.99,
          image: '/images/automotive/ghana-air-freshener.jpg',
          rating: 4.5,
          description: 'Scented car air freshener featuring the Ghana flag, with natural fragrances',
          inStock: true,
          region: 'Tema'
        },
        {
          id: 'auto4',
          name: 'Custom Ghana Map Bumper Sticker',
          category: 'exterior',
          subcategory: 'bumper-stickers',
          price: 7.99,
          image: '/images/automotive/ghana-bumper-sticker.jpg',
          rating: 4.6,
          description: 'Waterproof vinyl bumper sticker featuring a stylized map of Ghana',
          inStock: true,
          region: 'Cape Coast'
        },
        {
          id: 'auto5',
          name: 'Premium Shea Butter Leather Conditioner',
          category: 'car-care',
          subcategory: 'interior-cleaners',
          price: 18.99,
          image: '/images/automotive/leather-conditioner.jpg',
          rating: 4.8,
          description: 'Natural leather conditioner made with pure Ghanaian shea butter',
          inStock: true,
          region: 'Northern Region'
        },
        {
          id: 'auto6',
          name: 'Handwoven Straw Dashboard Mat',
          category: 'interior',
          subcategory: 'organizers',
          price: 15.99,
          image: '/images/automotive/straw-dashboard-mat.jpg',
          rating: 4.3,
          description: 'Traditional handwoven straw mat for car dashboards, made by Ghanaian artisans',
          inStock: true,
          region: 'Volta Region'
        },
        {
          id: 'auto7',
          name: 'Adinkra Symbol Steering Wheel Cover',
          category: 'interior',
          subcategory: 'seat-covers',
          price: 29.99,
          image: '/images/automotive/adinkra-wheel-cover.jpg',
          rating: 4.7,
          description: 'Authentic Adinkra symbols embroidered on premium leather steering wheel cover',
          inStock: true,
          region: 'Kumasi'
        },
        {
          id: 'auto8',
          name: 'Motorcycle Helmet with Ghana Flag Design',
          category: 'motorcycle',
          subcategory: 'riding-gear',
          price: 119.99,
          image: '/images/automotive/ghana-helmet.jpg',
          rating: 4.9,
          description: 'DOT-certified motorcycle helmet featuring Ghana flag design',
          inStock: true,
          region: 'Accra'
        }
      ];
      
      // Filter products based on URL parameters and other filters
      let filteredProducts = sampleProducts;
      
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
        
        if (subcategory) {
          filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
        }
      }
      
      if (selectedRegion !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.region === selectedRegion);
      }
      
      // Apply sorting
      if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 800);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('automotiveFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [category, subcategory, selectedRegion, sortBy]);

  // Add to favorites
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      // Save to localStorage
      localStorage.setItem('automotiveFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: 'Automotive',
        subcategory: product.subcategory,
        quantity: 1
      }
    });
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<div>${product.name} added to cart</div>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 10);
  };

  // Get current category and subcategory information
  const getCurrentCategory = () => {
    if (!category) return null;
    return categories.find(cat => cat.link === category);
  };

  const getCurrentSubcategory = () => {
    const currentCat = getCurrentCategory();
    if (!currentCat || !subcategory || !currentCat.subcats) return null;
    return currentCat.subcats.find(sub => sub.link === subcategory);
  };

  const currentCategory = getCurrentCategory();
  const currentSubcategory = getCurrentSubcategory();

  // Toggle mobile filters
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Generate breadcrumb links
  const getBreadcrumbs = () => {
    const crumbs = [
      { name: 'Home', link: '/' },
      { name: 'Automotive', link: basePath }
    ];
    
    if (currentCategory) {
      crumbs.push({
        name: currentCategory.name,
        link: `${basePath}/${category}`
      });
    }
    
    if (currentSubcategory) {
      crumbs.push({
        name: currentSubcategory.name,
        link: `${basePath}/${category}/${subcategory}`
      });
    }
    
    return crumbs;
  };

  return (
    <div className="automotive-page">
      {/* Hero Section - Only on main page */}
      {!category && (
        <div className="automotive-hero">
          <div className="hero-content">
            <h1>Automotive Solutions</h1>
            <p>Discover quality automotive products made in Ghana</p>
            <button className="shop-now-btn" onClick={() => window.scrollTo({top: document.querySelector('.categories-section').offsetTop - 100, behavior: 'smooth'})}>
              Shop Now
            </button>
          </div>
        </div>
      )}

      <div className="automotive-content">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          {getBreadcrumbs().map((crumb, index, array) => (
            <React.Fragment key={index}>
              <Link to={crumb.link}>{crumb.name}</Link>
              {index < array.length - 1 && <FaChevronRight className="breadcrumb-separator" />}
            </React.Fragment>
          ))}
        </div>

        {/* Page Title */}
        <h1 className="page-title">
          {currentSubcategory ? currentSubcategory.name : 
          currentCategory ? currentCategory.name : 
          "Automotive"}
        </h1>

        {/* When in a category or subcategory page, show filter bar */}
        {(category || subcategory) && (
          <div className="filter-section">
            <button className="filter-toggle" onClick={toggleFilter}>
              <FaFilter /> Filters
            </button>
            
            <div className={`filter-options ${filterOpen ? 'open' : ''}`}>
              <div className="filter-group">
                <label><FaMapMarkerAlt /> Region:</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="Accra">Accra</option>
                  <option value="Kumasi">Kumasi</option>
                  <option value="Tema">Tema</option>
                  <option value="Cape Coast">Cape Coast</option>
                  <option value="Northern Region">Northern Region</option>
                  <option value="Volta Region">Volta Region</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label><FaSort /> Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* When in main automotive page, show all categories */}
        {!category && (
          <div className="categories-section">
            <p className="page-description">
              Explore our collection of locally-made automotive products. From car care to accessories, 
              we offer a wide range of Ghanaian automotive solutions for your vehicle.
            </p>
            
            <div className="featured-products">
              <h2>Featured Products</h2>
              <div className="featured-slider">
                {products.slice(0, 4).map((product) => (
                  <div className="featured-product" key={product.id}>
                    <div className="product-image-container">
                      <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
                    </div>
                    <h3>{product.name}</h3>
                    <div className="product-price">GH₵{product.price.toFixed(2)}</div>
                    <button 
                      className="quick-add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Quick Add <FaShoppingCart />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <h2>Shop by Category</h2>
            <div className="categories-grid">
              {categories.map((cat, index) => (
                <Link to={`${basePath}/${cat.link}`} key={index} className="category-card">
                  <div className="category-image-container">
                    <img src={cat.image || '/images/placeholder.jpg'} alt={cat.name} />
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  {cat.subcats && <span className="subcategory-count">{cat.subcats.length} subcategories</span>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* When in a category page but not a subcategory, show subcategories */}
        {category && !subcategory && currentCategory && currentCategory.subcats && (
          <>
            <p className="page-description">
              {currentCategory.description || `Browse our selection of ${currentCategory.name.toLowerCase()} products made in Ghana.`}
            </p>
            
            <div className="subcategories-grid">
              {currentCategory.subcats.map((subcat, index) => (
                <Link to={`${basePath}/${category}/${subcat.link}`} key={index} className="subcategory-card">
                  <div className="subcategory-image-container">
                    <img src={subcat.image || '/images/placeholder.jpg'} alt={subcat.name} />
                  </div>
                  <h3>{subcat.name}</h3>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* When in a category or subcategory page, show products */}
        {(category || subcategory) && (
          <div className="products-section">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="no-products">
                    <p>No products found in this category yet.</p>
                    <Link to={basePath} className="back-link">Return to Automotive</Link>
                  </div>
                ) : (
                  <div className="products-grid">
                    {products.map((product) => (
                      <div className="product-card" key={product.id}>
                        <div className="product-image-container">
                          <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
                          <button 
                            className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product.id)}
                            aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <FaHeart />
                          </button>
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <div className="product-rating">
                            <FaStar className="star-icon" />
                            <span>{product.rating.toFixed(1)}</span>
                          </div>
                          <p className="product-description">{product.description}</p>
                          <div className="product-bottom">
                            <span className="product-price">GH₵{product.price.toFixed(2)}</span>
                            <button 
                              className="add-to-cart-btn"
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                            >
                              <FaShoppingCart />
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Automotive;
