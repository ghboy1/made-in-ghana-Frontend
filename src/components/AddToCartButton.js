import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './AddToCartButton.css';

const AddToCartButton = ({ product, className = '' }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Validate product data
    if (!product || !product.id || typeof product.price !== 'number') {
      console.error('Invalid product data:', product);
      return;
    }
    
    setIsAdding(true);
    
    try {
      addToCart(product, quantity);
      
      // Show success feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setIsAdding(false);
    }
  };

  return (
    <div className={`add-to-cart-container ${className}`}>
      <div className="quantity-selector">
        <button 
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          className="quantity-btn"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button 
          onClick={() => setQuantity(prev => prev + 1)}
          className="quantity-btn"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <button 
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton;