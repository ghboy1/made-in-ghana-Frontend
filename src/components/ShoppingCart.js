import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaUndo, FaSyncAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CartQuantityInput from './CartQuantityInput';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cart, updateItemQuantity, removeItem, clearCart, loading } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const shippingCost = cart.totalAmount > 200 ? 0 : 20;
  const freeShippingThreshold = 200;

  const handleQuantityChange = async (item, newQuantity) => {
    setIsProcessing(true);
    try {
      await updateItemQuantity(item.id, newQuantity, item.size, item.color);
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Show error to user
      alert('Failed to update quantity. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveItem = async (item) => {
    setIsProcessing(true);
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      try {
        await removeItem(item.id, item.size, item.color);
      } catch (error) {
        console.error('Error removing item:', error);
        alert('Failed to remove item. Please try again.');
      }
    }
    setIsProcessing(false);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setIsProcessing(true);
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
        alert('Failed to clear cart. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };
  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">
          <FaShoppingCart size={48} />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button 
          className="continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h1>Your Shopping Cart</h1>
      <p className="cart-count">
        {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
      </p>
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-headers">
            <div className="header-product">Product</div>
            <div className="header-price">Price</div>
            <div className="header-quantity">Quantity</div>
            <div className="header-total">Total</div>
            <div className="header-actions"></div>
          </div>
          
          <div className="cart-items-list">
            {cart.items.map((item) => (
              <div 
                className="cart-item" 
                key={`${item.id}-${item.size || 'default'}-${item.color || 'default'}`}
                aria-label={`${item.name} - ${item.quantity} × GH₵${item.price.toFixed(2)}`}
              >
                <div className="item-product">
                  <img 
                    src={item.image || '/images/placeholder.jpg'} 
                    alt={item.name} 
                    className="item-image" 
                    loading="lazy"
                  />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    {item.size && <div className="item-size">Size: {item.size}</div>}
                    {item.color && (
                      <div className="item-color">
                        Color: <span className="color-dot" style={{ backgroundColor: item.color }}></span> {item.color}
                      </div>
                    )}
                    {item.category && <div className="item-category">{item.category}</div>}
                  </div>
                </div>
                
                <div className="item-price">GH₵{item.price.toFixed(2)}</div>
                
                <div className="item-quantity">
                  <CartQuantityInput 
                    initialValue={item.quantity}
                    onChange={(newQuantity) => handleQuantityChange(item, newQuantity)}
                    max={99}
                    min={1}
                  />
                </div>
                
                <div className="item-total">GH₵{(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-actions">
                  <button 
                    className="remove-item-btn" 
                    onClick={() => handleRemoveItem(item)}
                    aria-label={`Remove ${item.name} from cart`}
                    disabled={isProcessing}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-actions">
            <button 
              className="clear-cart-btn" 
              onClick={handleClearCart}
              aria-label="Clear shopping cart"
              disabled={isProcessing}
            >
              <FaUndo /> Clear Cart
            </button>
            <button 
              className="continue-shopping-btn-subtle"
              onClick={() => navigate('/')}
              disabled={isProcessing}
            >
              <FaArrowLeft /> Continue Shopping
            </button>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row subtotal">
            <span>Subtotal</span>
            <span>GH₵{cart.totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="summary-row shipping">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `GH₵${shippingCost.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>GH₵{(cart.totalAmount + shippingCost).toFixed(2)}</span>
          </div>
          
          {cart.totalAmount > freeShippingThreshold ? (
            <div className="free-shipping-message">
              <span className="shipping-checkmark">✓</span> You've qualified for free shipping!
            </div>
          ) : (
            <div className="shipping-threshold-message">
              Add GH₵{(freeShippingThreshold - cart.totalAmount).toFixed(2)} more to get free shipping
              <div className="shipping-progress">
                <div 
                  className="shipping-progress-bar" 
                  style={{ width: `${(cart.totalAmount / freeShippingThreshold) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={isProcessing || cart.totalAmount <= 0}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          <div className="secure-checkout">
            <div className="secure-checkout-icon">🔒</div>
            <span>Secure Checkout</span>
          </div>
          
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">📱</span>
              <span className="payment-icon">💰</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;