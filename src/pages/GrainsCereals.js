import React from 'react';
import './GrainsCereals.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const grainsCerealsInGhana = [
  { 
    name: 'Maize', 
    image: '/maize.jpg', 
    description: 'A staple cereal, widely cultivated and consumed across Ghana.' 
  },
  { 
    name: 'Rice', 
    image: '/rice.jpg', 
    description: 'Ghana produces both local and imported rice varieties for daily meals.' 
  },
  { 
    name: 'Sorghum', 
    image: '/sorghum.jpg', 
    description: 'An ancient grain used in traditional dishes and beverages.' 
  },
  { 
    name: 'Millet', 
    image: '/millet.jpg', 
    description: 'A nutritious cereal grown predominantly in the northern regions of Ghana.' 
  },
  { 
    name: 'Wheat', 
    image: '/wheat.jpg', 
    description: 'While not as widely grown as other cereals, wheat plays a role in baking.' 
  },
  { 
    name: 'Fonio', 
    image: '/fonio.jpg', 
    description: 'A traditional West African grain known for its rapid growth and high nutritional value.' 
  },
  { 
    name: 'Barley', 
    image: '/barley.jpg', 
    description: 'Used in local beverages and increasingly in health foods, barley is a versatile grain.' 
  }
];

const GrainsCereals = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    // Dispatch action to add item to cart
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: typeof product.id !== 'undefined' ? product.id : product.name.toLowerCase().replace(/\s+/g, '-'),
        name: product.name,
        price: product.price || 9.99, // Use price from product or default
        image: product.image || product.imageUrl,
        category: 'Category Name', // Replace with appropriate category
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

  // Filter grains based on name and description (case-insensitive)
  const filteredGrains = grainsCerealsInGhana.filter(grain =>
    grain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grains-page">
      <header className="grains-header">
        <h1>Welcome to Ghana Grains & Cereals Hub</h1>
        <p className="grains-intro">
          Explore the rich variety of grains and cereals grown in Ghana, essential for both local cuisine and traditional beverages.
        </p>
        <div className="search-bar">
          <label htmlFor="grain-search" className="visually-hidden">Search grains and cereals</label>
          <input
            id="grain-search"
            type="text"
            placeholder="Search grains and cereals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search grains and cereals"
          />
        </div>
      </header>
      <div className="grains-grid">
        {filteredGrains.length > 0 ? (
          filteredGrains.map((grain, index) => (
            <div key={index} className="grain-card">
              <img src={grain.image} alt={grain.name} loading="lazy" />
              <h3>{grain.name}</h3>
              <p>{grain.description}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(grain)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No grains or cereals found.</p>
        )}
      </div>
    </div>
  );
};

export default GrainsCereals;
