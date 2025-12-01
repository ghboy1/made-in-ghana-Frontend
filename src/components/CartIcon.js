import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './CartIcon.css';

const CartIcon = () => {
  const { itemCount } = useCart();
  
  return (
    <Link to="/cart" className="cart-icon-container">
      <FaShoppingCart className="cart-icon" />
      {itemCount > 0 && <span className="cart-counter">{itemCount}</span>}
    </Link>
  );
};

export default CartIcon;