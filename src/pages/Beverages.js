import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSort, FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './Beverages.css';

const Beverages = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
      setProducts(beverageData);
      setLoading(false);
    }, 800);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('beveragesFavorites');
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
      
      // Filter by category
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      // Filter by price range
      let matchesPrice = true;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-').map(val => parseInt(val, 10));
        matchesPrice = product.price >= min && (max ? product.price <= max : true);
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
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
      localStorage.setItem('beveragesFavorites', JSON.stringify(newFavorites));
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
  const beverageData = [
    {
      id: 'bev1',
      name: 'Sobolo (Hibiscus Drink)',
      description: 'Refreshing hibiscus tea with ginger and fruit flavors',
      price: 12.99,
      image: '/images/beverages/sobolo.jpg',
      rating: 4.9,
      category: 'Non-Alcoholic',
      popularity: 98,
      dateAdded: '2024-03-10',
      inStock: true
    },
    {
      id: 'bev2',
      name: 'Asana Palm Wine',
      description: 'Traditional palm sap wine, naturally fermented',
      price: 22.50,
      image: '/images/beverages/palm-wine.jpg',
      rating: 4.7,
      category: 'Alcoholic',
      popularity: 94,
      dateAdded: '2024-02-15',
      inStock: true
    },
    {
      id: 'bev3',
      name: 'Coconut Water',
      description: 'Fresh coconut water bottled in Ghana',
      price: 8.75,
      image: '/images/beverages/coconut-water.jpg',
      rating: 4.8,
      category: 'Non-Alcoholic',
      popularity: 96,
      dateAdded: '2024-03-01',
      inStock: true
    },
    {
      id: 'bev4',
      name: 'Akpeteshie Premium',
      description: 'Distilled palm wine spirit, traditional Ghanaian drink',
      price: 35.00,
      image: '/images/beverages/akpeteshie.jpg',
      rating: 4.5,
      category: 'Alcoholic',
      popularity: 88,
      dateAdded: '2024-01-20',
      inStock: true
    },
    {
      id: 'bev5',
      name: 'Pito',
      description: 'Traditional millet or sorghum beer from Northern Ghana',
      price: 15.50,
      image: '/images/beverages/pito.jpg',
      rating: 4.4,
      category: 'Alcoholic',
      popularity: 85,
      dateAdded: '2024-02-05',
      inStock: true
    },
    {
      id: 'bev6',
      name: 'Asaana Ginger Drink',
      description: 'Spicy ginger drink with hints of lemon and honey',
      price: 10.99,
      image: '/images/beverages/ginger-drink.jpg',
      rating: 4.6,
      category: 'Non-Alcoholic',
      popularity: 90,
      dateAdded: '2024-01-15',
      inStock: true
    }
  ];

  return (
    <div className="beverages-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> {' > '}
          <span>Beverages</span>
        </div>
        <h1 className="page-title">Ghana-Made Beverages</h1>
        <p className="page-description">
          Experience the rich flavors of Ghana with our selection of traditional and modern beverages. 
          From refreshing non-alcoholic drinks to time-honored fermented specialties, discover the authentic taste of Ghana.
        </p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search beverages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><FaSearch /></button>
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Alcoholic">Alcoholic</option>
              <option value="Non-Alcoholic">Non-Alcoholic</option>
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
          <p>Loading Ghanaian beverages...</p>
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
                    <div className="category-badge">{product.category}</div>
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
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
                <p>No beverages found matching your criteria.</p>
                <button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
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

export default Beverages;