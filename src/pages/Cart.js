import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaTrashAlt, FaArrowLeft, FaShoppingBag, FaLock, FaTag, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ProductCarousel from '../components/ProductCarousel';
import { getAllProducts } from '../services/productService';
import { getRecommendedProducts } from '../utils/recommendationEngine';
import '../styles/Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();
    // Add safety checks for cart data
  const cartItems = useMemo(() => cart?.items || [], [cart]);
  const totalAmount = useMemo(() => cart?.totalAmount || 0, [cart]);
  const itemCount = useMemo(() => cart?.itemCount || 0, [cart]);
  const isEmpty = useMemo(() => !cart || !cartItems.length, [cart, cartItems]);
  
  // Shipping calculation - Free for orders over 500 GHS, otherwise 25 GHS
  const shippingCost = totalAmount > 500 ? 0 : 25;
  
  // Final amount with shipping
  const finalAmount = totalAmount + shippingCost;
    // Get recommended products based on cart items
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const allProducts = await getAllProducts();
        if (Array.isArray(allProducts)) {
          const recommendations = getRecommendedProducts(cartItems, allProducts);
          setRecommendedProducts(recommendations);
        } else {
          console.error('Products data is not an array:', allProducts);
          setRecommendedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product recommendations:', error);
        setRecommendedProducts([]);
      }
    };
    
    fetchRecommendations();
  }, [cartItems]);
  
  // Handle promo code application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    // You can implement your promo logic here
    alert(`Promo code ${promoCode} applied!`);
  };
  
  // For clearing cart with confirmation
  const confirmClearCart = () => {
    setShowClearConfirm(true);
  };
  
  // Scroll to top when cart updates
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cartItems.length]);
  
  // Replace the recommendations placeholder:
  const renderRecommendations = () => {
    if (recommendedProducts.length === 0) {
      return null;
    }
    
    return (
      <div className="you-might-like">
        <ProductCarousel products={recommendedProducts} />
      </div>
    );
  };
  
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <div className="cart-progress">
          <div className="progress-step active">Cart</div>
          <div className="progress-connector"></div>
          <div className="progress-step">Shipping</div>
          <div className="progress-connector"></div>
          <div className="progress-step">Payment</div>
        </div>
      </div>
      
      {isEmpty ? (
        <motion.div 
          className="empty-cart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-cart-icon">
            <FaShoppingBag size={60} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="cart-container">
            <div className="cart-items-container">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Action</span>
              </div>
              
              {cartItems.map(item => (
                <motion.div 
                  key={item.id} 
                  className="cart-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <div className="item-details">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <div className="item-meta">
                        {item.manufacturer && <span>Made by: {item.manufacturer}</span>}
                        {item.region && <span>Region: {item.region}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="item-price">
                    {item.price.toFixed(2)} GHS
                  </div>
                  
                  <div className="quantity-control">
                    <button 
                      className="qty-btn decrease"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >−</button>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} 
                    />
                    <button 
                      className="qty-btn increase"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  
                  <div className="item-subtotal">
                    {(item.price * item.quantity).toFixed(2)} GHS
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </motion.div>
              ))}
              
              <div className="cart-actions-row">
                <Link to="/" className="continue-shopping-btn">
                  <FaArrowLeft /> Continue Shopping
                </Link>
                <button 
                  onClick={confirmClearCart} 
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            <div className="cart-summary-container">
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Items ({itemCount}):</span>
                  <span>{totalAmount.toFixed(2)} GHS</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `${shippingCost.toFixed(2)} GHS`
                    )}
                  </span>
                </div>
                
                <div className="promo-section">
                  <form onSubmit={handleApplyPromo}>
                    <div className="promo-input">
                      <FaTag className="promo-icon" />
                      <input 
                        type="text" 
                        placeholder="Promo code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="apply-promo-btn"
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </button>
                  </form>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{finalAmount.toFixed(2)} GHS</span>
                </div>
                
                <button 
                  onClick={() => navigate('/checkout')} // Replace setIsCheckoutOpen with navigate
                  className="checkout-btn"
                >
                  <FaLock /> Proceed to Checkout
                </button>
                
                <div className="checkout-info">
                  <div className="checkout-info-item">
                    <FaTruck />
                    <span>Free shipping on orders over 500 GHS</span>
                  </div>
                  <div className="checkout-info-item">
                    <FaLock />
                    <span>Secure checkout with encrypted payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Render recommendations */}
          {!isEmpty && renderRecommendations()}
        </>
      )}
      
      {/* Clear cart confirmation modal */}
      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Clear your cart?</h3>
            <p>Are you sure you want to remove all items from your cart?</p>
            <div className="modal-actions">
              <button 
                className="modal-cancel" 
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-confirm" 
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;