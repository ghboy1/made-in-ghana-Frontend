import React from 'react';
import './NutsSeeds.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const nutsSeedsInGhana = [
  { 
    name: 'Groundnuts', 
    image: '/groundnuts.jpg', 
    description: 'Popular groundnuts grown in Ghana, used in peanut butter and various snacks.' 
  },
  { 
    name: 'Sesame Seeds', 
    image: '/sesame.jpg', 
    description: 'Essential in many traditional Ghanaian dishes, valued for their nutty flavor.' 
  },
  { 
    name: 'Cashew Nuts', 
    image: '/cashew.jpg', 
    description: 'Ghanaian cashew nuts are known for their rich flavor and are a major export product.' 
  },
  { 
    name: 'Tiger Nuts', 
    image: '/tigernuts.jpg', 
    description: 'Increasingly popular for their health benefits, these are used in local beverages and snacks.' 
  },
  { 
    name: 'Coconut Kernel', 
    image: '/coconut.jpg', 
    description: 'Although often categorized as a fruit, the kernel is a valuable seed used in various dishes.' 
  },
];

const NutsSeeds = () => {
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

  // Filter nuts and seeds based on name and description (case-insensitive)
  const filteredItems = nutsSeedsInGhana.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nutsseeds-page">
      <header className="nutsseeds-header">
        <h1>Welcome to Ghana Nuts & Seeds Hub</h1>
        <p className="nutsseeds-intro">
          Explore the variety of nuts and seeds grown in Ghana, essential for snacks, cooking, and export.
        </p>
        <div className="search-bar">
          <label htmlFor="nutsseeds-search" className="visually-hidden">Search nuts and seeds</label>
          <input
            id="nutsseeds-search"
            type="text"
            placeholder="Search nuts and seeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search nuts and seeds"
          />
        </div>
      </header>
      <div className="nutsseeds-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="nutsseeds-card">
              <img src={item.image} alt={item.name} loading="lazy" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(item)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No nuts or seeds found.</p>
        )}
      </div>
    </div>
  );
};

export default NutsSeeds;
