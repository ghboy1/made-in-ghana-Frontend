import React from 'react';
import './Tubers.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const tubersInGhana = [
  { 
    name: 'Cassava', 
    image: '/cassava.jpg', 
    description: 'A staple tuber widely cultivated for its versatility in many Ghanaian dishes.' 
  },
  { 
    name: 'Yam', 
    image: '/yam.jpg', 
    description: 'Popular in Ghanaian cuisine, known for its rich taste and hearty texture.' 
  },
  { 
    name: 'Sweet Potato', 
    image: '/sweetpotato.jpg', 
    description: 'Sweet and nutritious, often used in both savory and dessert recipes.' 
  },
  { 
    name: 'Cocoyam', 
    image: '/cocoyam.jpg', 
    description: 'Valued for its smooth texture, commonly used in traditional local recipes.' 
  },
  { 
    name: 'Taro', 
    image: '/taro.jpg', 
    description: 'A lesser-known tuber with unique flavor, used in some Ghanaian dishes.' 
  },
];

const Tubers = () => {
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

  // Filter tubers based on name or description (case-insensitive)
  const filteredTubers = tubersInGhana.filter(tuber =>
    tuber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tuber.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tubers-page">
      <header className="tubers-header">
        <h1>Welcome to Ghana Tubers Hub</h1>
        <p className="tubers-intro">
          Explore the diverse range of tubers grown in Ghana, essential for traditional recipes and daily meals.
        </p>
        <div className="search-bar">
          <label htmlFor="tuber-search" className="visually-hidden">Search tubers</label>
          <input
            id="tuber-search"
            type="text"
            placeholder="Search tubers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search tubers"
          />
        </div>
      </header>
      <div className="tubers-grid">
        {filteredTubers.length > 0 ? (
          filteredTubers.map((tuber, index) => (
            <div key={index} className="tuber-card">
              <img src={tuber.image} alt={tuber.name} loading="lazy" />
              <h3>{tuber.name}</h3>
              <p>{tuber.description}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(tuber)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No tubers found.</p>
        )}
      </div>
    </div>
  );
};

export default Tubers;
