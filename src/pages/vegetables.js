import React from 'react';
import './Vegetables.css'; // Import the CSS file for styling
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
const Vegetables = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { dispatch } = useCart();

  const vegetablesInGhana = [
    { 
      name: 'Tomato', 
      image: '/tomato.jpg', 
      description: 'Fresh tomatoes grown in Ghana, bursting with flavor and nutrients.' 
    },
    { 
      name: 'Pepper', 
      image: '/pepper.jpg', 
      description: 'A variety of peppers used in many Ghanaian dishes for their heat and taste.' 
    },
    { 
      name: 'Onion', 
      image: '/onion.jpg', 
      description: 'Essential for cooking, onions from Ghana add a rich flavor to meals.' 
    },
    { 
      name: 'Okra', 
      image: '/okra.jpg', 
      description: 'Widely cultivated okra is used in soups and stews for its unique texture.' 
    },
    { 
      name: 'Eggplant', 
      image: '/eggplant.jpg', 
      description: 'Also known as garden egg, this vegetable is popular in traditional recipes.' 
    },
    { 
      name: 'Cabbage', 
      image: '/cabbage.jpg', 
      description: 'Cabbage grown locally, perfect for salads and cooked dishes.' 
    },
    { 
      name: 'Carrot', 
      image: '/carrot.jpg', 
      description: 'Crunchy and sweet, carrots are an important local crop in Ghana.' 
    },
    { 
      name: 'Spinach', 
      image: '/spinach.jpg', 
      description: 'Leafy spinach rich in iron and vitamins, common in Ghanaian cuisine.' 
    },
    { 
      name: 'Garden Egg', 
      image: '/garden-egg.jpg', 
      description: 'A type of eggplant favored in Ghana, often used in stews and sauces.' 
    },
    { 
      name: 'Amaranth', 
      image: '/amaranth.jpg', 
      description: 'A highly nutritious leafy green, widely grown and used in local dishes.' 
    },
  ];

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

  // Filter vegetables based on the search term (case-insensitive)
  const filteredVegetables = vegetablesInGhana.filter(veg =>
    veg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vegetables-page">
      <header className="page-header">
        <h1>Welcome to Ghana Vegetables HUB</h1>
        <p className="page-intro">
          Ghana Vegetables HUB is your gateway to the rich and diverse world of vegetables grown in Ghana.
          From the vibrant colors of tomatoes to the earthy tones of local produce, explore the variety of vegetables that thrive in Ghana's fertile lands.
        </p>
        <div className="search-bar">
          <label htmlFor="vegetable-search" className="visually-hidden">Search vegetables</label>
          <input
            id="vegetable-search"
            type="text"
            placeholder="Search vegetables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search vegetables"
          />
        </div>
      </header>

      <main className="vegetables-grid">
        {filteredVegetables.length > 0 ? (
          filteredVegetables.map((item) => (
            <div key={item.name} className="vegetable-card">
              <div className="card-image-container">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="vegetables-image"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(item)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', width: '100%'}}>No vegetables found.</p>
        )}
      </main>
    </div>
  );
};

export default Vegetables;
