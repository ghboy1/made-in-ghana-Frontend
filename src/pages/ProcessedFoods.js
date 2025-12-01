import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSort, FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './ProcessedFoods.css';

const ProcessedFoods = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('popularity');
  const [favorites, setFavorites] = useState([]);
  const { dispatch } = useCart();

  // Fetch products effect
  useEffect(() => {
    // Simulating API call
    setLoading(true);
    
    // In a real app, this would be a fetch from your API
    setTimeout(() => {
      setProducts(processedFoodsData);
      setLoading(false);
    }, 800);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('processedFoodsFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by region
      const matchesRegion = !selectedRegion || product.region === selectedRegion;
      
      // Filter by price range
      let matchesPrice = true;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-').map(val => parseInt(val, 10));
        matchesPrice = product.price >= min && (max ? product.price <= max : true);
      }
      
      return matchesSearch && matchesRegion && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      // Save to localStorage
      localStorage.setItem('processedFoodsFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Add to cart
  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
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

  // Sample data - replace with your actual data
  const processedFoodsData = [
    {
      id: 'pf1',
      name: 'Shito Hot Sauce',
      description: 'Traditional Ghanaian black pepper sauce',
      price: 25.99,
      image: '/images/food/shito.jpg',
      rating: 4.8,
      region: 'Greater Accra',
      popularity: 95,
      dateAdded: '2024-03-15',
      inStock: true
    },
    {
      id: 'pf2',
      name: 'Palm Nut Soup Base',
      description: 'Ready-to-cook traditional palm nut soup base',
      price: 18.50,
      image: '/images/food/palm-soup.jpg',
      rating: 4.6,
      region: 'Western',
      popularity: 85,
      dateAdded: '2024-02-20',
      inStock: true
    },
    {
      id: 'pf3',
      name: 'Groundnut Paste',
      description: 'Natural peanut butter for cooking or spreading',
      price: 12.75,
      image: '/images/food/groundnut-paste.jpg',
      rating: 4.7,
      region: 'Northern',
      popularity: 90,
      dateAdded: '2024-01-10',
      inStock: true
    },
    {
      id: 'pf4',
      name: 'Canned Kontomire',
      description: 'Preserved cocoyam leaves for preparing stews',
      price: 15.25,
      image: '/images/food/kontomire.jpg',
      rating: 4.3,
      region: 'Eastern',
      popularity: 75,
      dateAdded: '2024-02-05',
      inStock: true
    },
    {
      id: 'pf5',
      name: 'Plantain Chips',
      description: 'Crispy fried plantain chips with a hint of salt',
      price: 8.99,
      image: '/images/food/plantain-chips.jpg',
      rating: 4.9,
      region: 'Ashanti',
      popularity: 98,
      dateAdded: '2024-03-01',
      inStock: true
    },
    {
      id: 'pf6',
      name: 'Gari',
      description: 'Processed cassava flour for quick meals',
      price: 10.50,
      image: '/images/food/gari.jpg',
      rating: 4.5,
      region: 'Volta',
      popularity: 88,
      dateAdded: '2024-01-25',
      inStock: true
    }
  ];

  return (
    <div className="processed-foods-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> {' > '}
          <span>Processed Foods</span>
        </div>
        <h1 className="page-title">Ghana-Made Processed Foods</h1>
        <p className="page-description">
          Discover authentic Ghanaian processed foods, from traditional condiments to ready-to-eat meals, 
          all made with locally sourced ingredients using time-honored recipes and modern production techniques.
        </p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search processed foods..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><FaSearch /></button>
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>Region:</label>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              <option value="Greater Accra">Greater Accra</option>
              <option value="Ashanti">Ashanti</option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Central">Central</option>
              <option value="Volta">Volta</option>
              <option value="Northern">Northern</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range:</label>
            <select 
              value={selectedPriceRange} 
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-10">Under GH₵10</option>
              <option value="10-20">GH₵10 - GH₵20</option>
              <option value="20-50">GH₵20 - GH₵50</option>
              <option value="50-">Over GH₵50</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort By:</label>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Ghanaian processed foods...</p>
        </div>
      ) : (
        <>
          <div className="results-count">
            Showing {filteredProducts.length} products
          </div>
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={product.image || '/placeholder.jpg'} 
                      alt={product.name} 
                      className="product-image" 
                    />
                    <button 
                      className={`favorite-button ${favorites.includes(product.id) ? 'active' : ''}`} 
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <FaHeart />
                    </button>
                    {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-region">{product.region}</p>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                      ))}
                      <span className="rating-value">({product.rating.toFixed(1)})</span>
                    </div>
                    
                    <div className="product-price-container">
                      <span className="product-price">GH₵{product.price.toFixed(2)}</span>
                      <button 
                        className="add-to-cart-button" 
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No processed foods found matching your criteria.</p>
                <button onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('');
                  setSelectedPriceRange('');
                }}>Clear Filters</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProcessedFoods;