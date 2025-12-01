import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaMapMarkerAlt, FaSortAmountDown, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import '../styles/HerbsSpices.css';

const HerbsSpices = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const { dispatch } = useCart(); // Add cart context
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const sampleProducts = [
        {
          id: 1,
          name: 'Organic Ghanaian Ginger',
          description: 'Fresh organic ginger from the Eastern Region of Ghana',
          price: 12.99,
          rating: 4.7,
          imageUrl: '/images/herbs/ginger.jpg',
          region: 'Eastern Region',
          seller: 'Eastern Spice Farmers',
          inStock: true
        },
        {
          id: 2,
          name: 'Ghanaian Black Pepper',
          description: 'Premium quality black pepper from Ghana',
          price: 8.99,
          rating: 4.5,
          imageUrl: '/images/herbs/black-pepper.jpg',
          region: 'Volta Region',
          seller: 'Volta Spice Collective',
          inStock: true
        },
        {
          id: 3,
          name: 'Dried Bay Leaves',
          description: 'Sun-dried bay leaves from Ghana',
          price: 5.99,
          rating: 4.3,
          imageUrl: '/images/herbs/bay-leaves.jpg',
          region: 'Central Region',
          seller: 'Central Herbs',
          inStock: true
        },
        {
          id: 4,
          name: 'Cloves',
          description: 'Aromatic cloves for cooking and medicinal purposes',
          price: 7.99,
          rating: 4.8,
          imageUrl: '/images/herbs/cloves.jpg',
          region: 'Ashanti Region',
          seller: 'Kumasi Herb Market',
          inStock: true
        },
        {
          id: 5,
          name: 'Ghanaian Nutmeg',
          description: 'Whole nutmeg sourced from Ghana',
          price: 9.99,
          rating: 4.6,
          imageUrl: '/images/herbs/nutmeg.jpg',
          region: 'Western Region',
          seller: 'Western Spice Traders',
          inStock: true
        },
        {
          id: 6,
          name: 'Organic Cinnamon Sticks',
          description: 'Fragrant cinnamon sticks from Ghana',
          price: 10.99,
          rating: 4.9,
          imageUrl: '/images/herbs/cinnamon.jpg',
          region: 'Eastern Region',
          seller: 'Eastern Spice Farmers',
          inStock: false
        }
      ];
      
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Add to cart handler function
  const handleAddToCart = (product) => {
    // Dispatch action to add item to cart
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl, // Note: using imageUrl here since that's the property name in this component
        category: 'Herbs & Spices',
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

  const filterByRegion = (product) => {
    if (selectedRegion === 'all') return true;
    return product.region === selectedRegion;
  };

  const sortProducts = (a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default sorting by popularity
    return 0;
  };

  const filteredProducts = products.filter(filterByRegion).sort(sortProducts);

  return (
    <div className="herbs-spices-container">
      <h1>Herbs & Spices from Ghana</h1>
      <p className="section-description">
        Discover authentic herbs and spices sourced directly from Ghanaian farms.
        Our selection includes organic, sustainably harvested products that bring
        the authentic flavors of Ghana to your kitchen.
      </p>
      
      <div className="herbs-filters">
        <div className="filter-group">
          <label><FaMapMarkerAlt /> Region:</label>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="Ashanti Region">Ashanti Region</option>
            <option value="Eastern Region">Eastern Region</option>
            <option value="Central Region">Central Region</option>
            <option value="Volta Region">Volta Region</option>
            <option value="Western Region">Western Region</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label><FaSortAmountDown /> Sort by:</label>
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
      
      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <div className="herbs-products-grid">
          {filteredProducts.map(product => (
            <div className="herb-product-card" key={product.id}>
              <div className="herb-product-image">
                <img src={product.imageUrl || '/images/placeholder.jpg'} alt={product.name} />
              </div>
              <div className="herb-product-info">
                <h3>{product.name}</h3>
                <div className="herb-product-rating">
                  <FaStar className="star-icon" /> 
                  <span>{product.rating} stars</span>
                </div>
                <p className="herb-product-region">
                  <FaMapMarkerAlt /> {product.region}
                </p>
                <p className="herb-product-description">{product.description}</p>
                <div className="herb-product-price-container">
                  <span className="herb-product-price">GH₵ {product.price.toFixed(2)}</span>
                  <span className={`herb-product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <button 
                  className="add-to-cart-btn" 
                  disabled={!product.inStock}
                  onClick={() => product.inStock && handleAddToCart(product)}
                >
                  <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link to={`/products/${product.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add CSS for cart notification */}
      <style jsx>{`
        .cart-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #006b3f; /* Ghana green */
          color: white;
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          transform: translateX(150%);
          transition: transform 0.3s ease-in-out;
        }
        
        .cart-notification.show {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export default HerbsSpices;