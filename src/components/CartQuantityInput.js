import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import './CartQuantityInput.css';

const CartQuantityInput = ({ initialValue, min = 1, max = 99, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue.toString());
  const [focused, setFocused] = useState(false);

  // Sync with external changes
  useEffect(() => {
    setQuantity(initialValue);
    setInputValue(initialValue.toString());
  }, [initialValue]);

  const increment = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  const handleInputChange = (e) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleBlur = () => {
    setFocused(false);
    
    // Convert to number and validate
    let numValue = parseInt(inputValue, 10);
    
    // Handle empty or invalid input
    if (isNaN(numValue) || inputValue === '') {
      numValue = initialValue;
      setInputValue(initialValue.toString());
    }
    
    // Apply min/max constraints
    numValue = Math.max(min, Math.min(max, numValue));
    
    setQuantity(numValue);
    setInputValue(numValue.toString());
    onChange(numValue);
  };

  return (
    <div className="cart-quantity-input">
      <button 
        className="quantity-btn decrement" 
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <FaMinus />
      </button>
      
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        className={focused ? 'focused' : ''}
        aria-label="Item quantity"
        maxLength={2}
      />
      
      <button 
        className="quantity-btn increment" 
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default CartQuantityInput;