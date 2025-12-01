import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './Fruits.css';

const fruitsInGhana = [
  { name: 'Pineapple', image: '/pineapple.jpg', description: 'A sweet, tropical fruit rich in vitamin C, widely exported from Ghana.' },
  { name: 'Mango', image: '/mango.jpg', description: 'Juicy and flavorful, a popular fruit enjoyed fresh or in dishes.' },
  { name: 'Banana', image: '/banana.jpg', description: 'A versatile fruit available year-round, a major staple in Ghana.' },
  { name: 'Papaya', image: '/papaya.jpg', description: 'Also called pawpaw, known for its vibrant orange flesh and health benefits.' },
  { name: 'Orange', image: '/orange.jpg', description: 'A citrus fruit grown in abundance, perfect for juices and snacks.' },
  { name: 'Guava', image: '/guava.jpg', description: 'Sweet and tangy, often eaten raw or made into refreshing drinks.' },
  { name: 'Watermelon', image: '/watermelon.jpg', description: 'A hydrating fruit popular during Ghana’s hot seasons.' },
  { name: 'Coconut', image: '/coconut.jpg', description: 'Valued for its water, milk, and flesh, a tropical essential.' },
  { name: 'Avocado', image: '/avocado.jpg', description: 'Locally called "pear," creamy and packed with nutrients.' },
  { name: 'Soursopp', image: '/soursop.jpg', description: 'A spiky fruit with a creamy texture, used in juices and desserts.' },
  { name: 'African Star Fruit', image: '/starfruit.jpg', description: 'A tart fruit often used in traditional medicine.' },
  { name: 'Velvet Tamarind', image: '/velvet-tamarind.jpg', description: 'A small, tangy fruit enjoyed as a snack or in drinks.' },
];

const Fruits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useCart(); // Add cart context

  // Add to cart handler function
  const handleAddToCart = (fruit) => {
    // Dispatch action to add item to cart
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: fruit.name.toLowerCase().replace(/\s+/g, '-'), // Create ID from name 
        name: fruit.name,
        price: 9.99, // Add a default price or add price to your fruit objects
        image: fruit.image,
        category: 'Fruits',
        quantity: 1
      }
    });
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<div>${fruit.name} added to cart</div>`;
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

  // Filter fruits based on name and description (case-insensitive)
  const filteredFruits = fruitsInGhana.filter(fruit =>
    fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fruit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fruits-page">
      <header className="fruits-header">
        <h1>Welcome to Ghana Fruits HUB</h1>
        <p className="fruits-intro">
          Discover the vibrant and nutritious fruits cultivated in Ghana, from sweet pineapples to refreshing coconuts.
        </p>
        <div className="search-bar">
          <label htmlFor="fruit-search" className="visually-hidden">Search fruits</label>
          <input
            id="fruit-search"
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search fruits"
          />
        </div>
      </header>

      <div className="fruits-grid">
        {filteredFruits.length > 0 ? (
          filteredFruits.map((fruit, index) => (
            <div key={index} className="fruit-card">
              <img src={fruit.image} alt={fruit.name} loading="lazy" />
              <h3>{fruit.name}</h3>
              <p>{fruit.description}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(fruit)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No fruits found.</p>
        )}
      </div>

      {/* Add CSS for cart notification and buttons */}
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
        
        .add-to-cart-btn {
          background-color: #006b3f;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          transition: background-color 0.2s;
        }
        
        .add-to-cart-btn:hover {
          background-color: #005032;
        }
      `}</style>
    </div>
  );
};

export default Fruits;
