import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaShoppingCart, 
  FaUser, FaCreditCard, FaTruck, FaMapMarkerAlt, FaLock,
  FaTag, FaInfoCircle, FaMobileAlt, FaCashRegister, FaCreditCard as FaCreditCardAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Add for animations
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

// New component for floating order summary
const FloatingOrderSummary = ({ items, totalAmount, shippingCost, finalAmount }) => (
  <div className="floating-order-summary">
    <div className="floating-summary-header">
      <FaShoppingCart />
      <h3>Order Summary</h3>
    </div>
    
    <div className="floating-summary-content">
      <div className="floating-summary-items">
        {items.map((item, index) => (
          <div key={index} className="mini-item">
            <div className="mini-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="mini-item-info">
              <span className="mini-item-name">{item.name}</span>
              <span className="mini-item-quantity">Qty: {item.quantity}</span>
            </div>
            <span className="mini-item-price">₵{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="floating-summary-totals">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₵{totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping:</span>
          <span>
            {shippingCost === 0 ? 
              <span className="free-shipping">FREE</span> : 
              `₵${shippingCost.toFixed(2)}`
            }
          </span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-row total">
          <span>Total:</span>
          <span>₵{finalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
    
    <div className="secure-checkout-info">
      <FaLock /> <span>Secure Checkout</span>
    </div>
  </div>
);

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Extract cart data for easier access
  const items = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;
  const shippingCost = totalAmount > 500 ? 0 : 25; // Free shipping threshold increased to 500 GHS
  const discountedAmount = promoApplied ? totalAmount - promoDiscount : totalAmount;
  const finalAmount = discountedAmount + shippingCost;
  
  // New state for estimated delivery date
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  
  // Calculate estimated delivery date (3-5 business days)
  useEffect(() => {
    const today = new Date();
    const deliveryDateMin = new Date(today);
    deliveryDateMin.setDate(today.getDate() + 3);
    
    const deliveryDateMax = new Date(today);
    deliveryDateMax.setDate(today.getDate() + 5);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const minDateFormatted = deliveryDateMin.toLocaleDateString('en-GB', options);
    const maxDateFormatted = deliveryDateMax.toLocaleDateString('en-GB', options);
    
    setEstimatedDelivery(`${minDateFormatted} - ${maxDateFormatted}`);
  }, []);
  
  // Your existing form data state
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping info
    address: '',
    city: '',
    region: 'Greater Accra',
    digitalAddress: '',
    deliveryInstructions: '',
    
    // Payment info
    paymentMethod: 'momo',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    momoNumber: '',
    momoProvider: 'MTN',
    
    // New field for order notes
    orderNotes: ''
  });
  
  // Your existing error state
  const [errors, setErrors] = useState({});
  
  // Handle promo code application (simulated)
  const handleApplyPromo = (e) => {
    e.preventDefault();
    
    if (!promoCode.trim()) return;
    
    // Simulate promo code validation (in a real app, this would be an API call)
    setLoading(true);
    
    setTimeout(() => {
      // Demo promo codes: "FIRST10" for 10% off, "GHANA50" for 50 GHS off
      if (promoCode === "FIRST10") {
        const discount = totalAmount * 0.1; // 10% discount
        setPromoDiscount(discount);
        setPromoApplied(true);
        alert("Promo code applied! You received 10% off your order.");
      } else if (promoCode === "GHANA50") {
        setPromoDiscount(50);
        setPromoApplied(true);
        alert("Promo code applied! You received 50 GHS off your order.");
      } else {
        alert("Invalid promo code. Please try again.");
      }
      
      setLoading(false);
    }, 1000);
  };
  
  // Existing cart empty check
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [items, navigate, orderPlaced]);
  
  // Your existing input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special formatting for card number (add spaces after every 4 digits)
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19); // Limit to 16 digits + spaces
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    // Special formatting for card expiry (add slash after 2 digits)
    else if (name === 'cardExpiry') {
      const cleaned = value.replace(/\//g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Regular handling for other fields
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Your existing validation logic
  const validateStep = (currentStep) => {
    // Your existing validation code...
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) 
        newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.digitalAddress.trim()) newErrors.digitalAddress = 'Digital address is required';
    }
    
    if (currentStep === 3) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        else if (!/^[0-9\s]{19}$/.test(formData.cardNumber)) 
          newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
        if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
        else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.cardExpiry)) 
          newErrors.cardExpiry = 'Please use format MM/YY';
        if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
        else if (!/^[0-9]{3,4}$/.test(formData.cardCvc)) 
          newErrors.cardCvc = 'CVC must be 3 or 4 digits';
      } else if (formData.paymentMethod === 'momo') {
        if (!formData.momoNumber.trim()) newErrors.momoNumber = 'Mobile money number is required';
        else if (!/^[0-9]{10}$/.test(formData.momoNumber.replace(/\s/g, ''))) 
          newErrors.momoNumber = 'Please enter a valid 10-digit number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Step navigation with animations
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Enhanced order placement with better feedback
  const placeOrder = async () => {
    if (validateStep(3)) {
      setLoading(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate a random order ID with Ghana-specific prefix
        const generatedOrderId = 'MIG' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setOrderId(generatedOrderId);
        
        // Mark order as placed
        setOrderPlaced(true);
        
        // Save order to local storage for history (in a real app, this would go to a database)
        const orderData = {
          id: generatedOrderId,
          date: new Date().toISOString(),
          items: items,
          customer: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
          },
          shipping: {
            address: formData.address,
            city: formData.city,
            region: formData.region,
            digitalAddress: formData.digitalAddress,
          },
          payment: {
            method: formData.paymentMethod,
            total: finalAmount,
          },
          notes: formData.orderNotes,
          status: "Processing"
        };
        
        // Store in local storage (simulating database)
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
        
        // Clear cart after successful order
        clearCart();
        
        // Move to confirmation step
        setStep(4);
      } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Enhanced order summary with product images
  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-items">
        {items.map((item, index) => (
          <div key={index} className="summary-item">
            <div className="summary-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="summary-item-details">
              <div className="item-name">
                {item.name} <span className="item-quantity">× {item.quantity}</span>
              </div>
              <div className="item-meta">
                {item.manufacturer && <span>Made by: {item.manufacturer}</span>}
              </div>
            </div>
            <div className="item-price">₵{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      <div className="summary-row subtotal">
        <span>Subtotal</span>
        <span>₵{totalAmount.toFixed(2)}</span>
      </div>
      
      {promoApplied && (
        <div className="summary-row discount">
          <span>Discount</span>
          <span>-₵{promoDiscount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="summary-row shipping">
        <span>Shipping</span>
        <span>
          {shippingCost === 0 ? 
            <span className="free-shipping">FREE</span> : 
            `₵${shippingCost.toFixed(2)}`
          }
        </span>
      </div>
      
      <div className="summary-divider"></div>
      
      <div className="summary-row total">
        <span>Total</span>
        <span>₵{finalAmount.toFixed(2)}</span>
      </div>
      
      {/* Promo code section */}
      {step === 3 && !promoApplied && (
        <div className="promo-code-section">
          <form onSubmit={handleApplyPromo}>
            <div className="promo-input-group">
              <FaTag className="promo-icon" />
              <input 
                type="text" 
                placeholder="Promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button 
                type="submit" 
                className="apply-promo-btn"
                disabled={loading || !promoCode.trim()}
              >
                {loading ? 'Applying...' : 'Apply'}
              </button>
            </div>
          </form>
          <div className="promo-hint">Try codes: FIRST10, GHANA50</div>
        </div>
      )}
      
      <div className="delivery-estimate">
        <FaTruck className="truck-icon" />
        <div>
          <span className="delivery-label">Estimated Delivery:</span>
          <span className="delivery-date">{estimatedDelivery}</span>
        </div>
      </div>
    </div>
  );

  // Your existing step rendering functions with enhancements
  const renderPersonalInfo = () => (
    <motion.div 
      className="checkout-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="step-title">
        <FaUser className="step-icon" /> Personal Information
      </h2>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name <span className="required">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
            placeholder="John"
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name <span className="required">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
            placeholder="Doe"
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error' : ''}
          placeholder="you@example.com"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number <span className="required">*</span></label>
        <div className="phone-input-group">
          <span className="country-code">+233</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. 0240000000"
            className={errors.phone ? 'error' : ''}
          />
        </div>
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        <div className="input-hint">
          We'll send order updates to this number
        </div>
      </div>
      
      <div className="form-actions">
        <Link to="/cart" className="back-btn">
          <FaArrowLeft /> Back to Cart
        </Link>
        <button onClick={nextStep} className="next-btn">
          Continue to Shipping <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
  
  // More enhanced version of your shipping info step
  const renderShippingInfo = () => (
    <motion.div 
      className="checkout-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="step-title">
        <FaTruck className="step-icon" /> Shipping Information
      </h2>
      
      <div className="form-group">
        <label htmlFor="address">Street Address <span className="required">*</span></label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? 'error' : ''}
          placeholder="123 Main St"
        />
        {errors.address && <div className="error-message">{errors.address}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City/Town <span className="required">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={errors.city ? 'error' : ''}
            placeholder="Accra"
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="region">Region <span className="required">*</span></label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="region-select"
          >
            <option value="Greater Accra">Greater Accra</option>
            <option value="Ashanti">Ashanti</option>
            <option value="Western">Western</option>
            <option value="Eastern">Eastern</option>
            <option value="Northern">Northern</option>
            <option value="Central">Central</option>
            <option value="Volta">Volta</option>
            <option value="Bono">Bono</option>
            <option value="Bono East">Bono East</option>
            <option value="Ahafo">Ahafo</option>
            <option value="Western North">Western North</option>
            <option value="Oti">Oti</option>
            <option value="North East">North East</option>
            <option value="Savannah">Savannah</option>
            <option value="Upper East">Upper East</option>
            <option value="Upper West">Upper West</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="digitalAddress">
          Ghana Digital Address <span className="required">*</span>
          <span className="tooltip-container">
            <FaInfoCircle className="info-icon" />
            <span className="tooltip-text">Enter your Ghana Post Digital Address (e.g. GA-123-4567)</span>
          </span>
        </label>
        <div className="digital-address-group">
          <FaMapMarkerAlt className="address-icon" />
          <input
            type="text"
            id="digitalAddress"
            name="digitalAddress"
            value={formData.digitalAddress}
            onChange={handleInputChange}
            placeholder="e.g. GA-123-4567"
            className={errors.digitalAddress ? 'error' : ''}
          />
        </div>
        {errors.digitalAddress && <div className="error-message">{errors.digitalAddress}</div>}
        <a href="https://ghanapostgps.com" target="_blank" rel="noopener noreferrer" className="find-address-link">
          Don't know your digital address? Find it here
        </a>
      </div>
      
      <div className="form-group">
        <label htmlFor="deliveryInstructions">Delivery Instructions <span className="optional">(Optional)</span></label>
        <textarea
          id="deliveryInstructions"
          name="deliveryInstructions"
          value={formData.deliveryInstructions}
          onChange={handleInputChange}
          placeholder="Special instructions for delivery (e.g., Gate code, landmarks, etc.)"
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="orderNotes">Order Notes <span className="optional">(Optional)</span></label>
        <textarea
          id="orderNotes"
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleInputChange}
          placeholder="Any additional information about your order"
          rows="3"
        />
      </div>
      
      <div className="shipping-info">
        <div className="info-box">
          <FaTruck className="info-icon" />
          <div className="info-content">
            <h4>Delivery Information</h4>
            <p>Orders are typically delivered within 3-5 business days. For Greater Accra region, same-day delivery is available for orders placed before 10:00 AM.</p>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button onClick={prevStep} className="back-btn">
          <FaArrowLeft /> Back to Personal Info
        </button>
        <button onClick={nextStep} className="next-btn">
          Continue to Payment <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
  
  // Enhanced payment section with better visuals
  const renderPaymentInfo = () => (
    <motion.div 
      className="checkout-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="step-title">
        <FaCreditCard className="step-icon" /> Payment Method
      </h2>
      
      <div className="payment-options">
        <div 
          className={`payment-option ${formData.paymentMethod === 'momo' ? 'selected' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'momo' }))}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={formData.paymentMethod === 'momo'}
            onChange={handleInputChange}
            id="momo-payment"
          />
          <label htmlFor="momo-payment">
            <FaMobileAlt className="payment-icon" />
            <div className="payment-label">
              <span className="payment-name">Mobile Money</span>
              <span className="payment-desc">Pay with MTN, Vodafone, or AirtelTigo</span>
            </div>
          </label>
        </div>
        
        <div 
          className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={handleInputChange}
            id="card-payment"
          />
          <label htmlFor="card-payment">
            <FaCreditCardAlt className="payment-icon" />
            <div className="payment-label">
              <span className="payment-name">Credit/Debit Card</span>
              <span className="payment-desc">Pay with Visa, Mastercard, or other cards</span>
            </div>
          </label>
        </div>
        
        <div 
          className={`payment-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={formData.paymentMethod === 'cash'}
            onChange={handleInputChange}
            id="cash-payment"
          />
          <label htmlFor="cash-payment">
            <FaCashRegister className="payment-icon" />
            <div className="payment-label">
              <span className="payment-name">Cash on Delivery</span>
              <span className="payment-desc">Pay when your order arrives</span>
            </div>
          </label>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {formData.paymentMethod === 'momo' && (
          <motion.div 
            className="payment-details momo-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="momoProvider">Mobile Money Provider</label>
                <div className="select-wrapper">
                  <select
                    id="momoProvider"
                    name="momoProvider"
                    value={formData.momoProvider}
                    onChange={handleInputChange}
                    className="provider-select"
                  >
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Vodafone">Vodafone Cash</option>
                    <option value="AirtelTigo">AirtelTigo Money</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="momoNumber">Mobile Money Number <span className="required">*</span></label>
                <div className="phone-input-group">
                  <span className="country-code">+233</span>
                  <input
                    type="tel"
                    id="momoNumber"
                    name="momoNumber"
                    value={formData.momoNumber}
                    onChange={handleInputChange}
                    placeholder="0240000000"
                    className={errors.momoNumber ? 'error' : ''}
                  />
                </div>
                {errors.momoNumber && <div className="error-message">{errors.momoNumber}</div>}
              </div>
            </div>
            
            <div className="momo-info info-box">
              <FaInfoCircle className="info-icon" />
              <p>After placing your order, you will receive a payment prompt on your mobile phone. 
                 Please complete the payment to confirm your order.</p>
            </div>
            
            {/* Mobile Money Provider Logos */}
            <div className="payment-providers">
              <div className="provider mtn">MTN</div>
              <div className="provider vodafone">Vodafone</div>
              <div className="provider airteltigo">AirtelTigo</div>
            </div>
          </motion.div>
        )}
        
        {formData.paymentMethod === 'card' && (
          <motion.div 
            className="payment-details card-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number <span className="required">*</span></label>
              <div className="card-input-group">
                <FaCreditCardAlt className="card-icon" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'error' : ''}
                  maxLength="19"
                />
              </div>
              {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Name on Card <span className="required">*</span></label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                className={errors.cardName ? 'error' : ''}
                placeholder="John Doe"
              />
              {errors.cardName && <div className="error-message">{errors.cardName}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Expiry Date <span className="required">*</span></label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={errors.cardExpiry ? 'error' : ''}
                  maxLength="5"
                />
                {errors.cardExpiry && <div className="error-message">{errors.cardExpiry}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cardCvc">CVC <span className="required">*</span>
                  <span className="tooltip-container">
                    <FaInfoCircle className="info-icon" />
                    <span className="tooltip-text">The 3 or 4 digit security code on the back of your card</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={errors.cardCvc ? 'error' : ''}
                  maxLength="4"
                />
                {errors.cardCvc && <div className="error-message">{errors.cardCvc}</div>}
              </div>
            </div>
            
            <div className="card-info info-box">
              <FaLock className="info-icon" />
              <p>Your payment information is secure. We use encryption to protect your data.</p>
            </div>
            
            {/* Card Payment Provider Logos */}
            <div className="payment-providers">
              <div className="provider visa">Visa</div>
              <div className="provider mastercard">Mastercard</div>
              <div className="provider amex">American Express</div>
            </div>
          </motion.div>
        )}
        
        {formData.paymentMethod === 'cash' && (
          <motion.div 
            className="payment-details cash-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cash-info info-box">
              <FaInfoCircle className="info-icon" />
              <div>
                <p>You will pay in cash when your order is delivered. Please have the exact amount ready.</p>
                <p>Note: Cash on delivery is only available in selected areas of Ghana.</p>
              </div>
            </div>
            
            <div className="cod-areas">
              <h4>Available in these regions:</h4>
              <div className="cod-regions">
                <span>Greater Accra</span>
                <span>Ashanti</span>
                <span>Central</span>
                <span>Eastern</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {renderOrderSummary()}
      
      <div className="form-actions">
        <button onClick={prevStep} className="back-btn">
          <FaArrowLeft /> Back to Shipping
        </button>
        <button 
          onClick={placeOrder} 
          className="place-order-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner"></div> Processing...
            </>
          ) : (
            <>
              <FaLock /> Place Order
            </>
          )}
        </button>
      </div>
      
      <div className="secure-checkout">
        <FaLock /> Secure Checkout. Your information is protected.
      </div>
    </motion.div>
  );
  
  // Enhanced confirmation page with better visuals
  const renderConfirmation = () => (
    <motion.div 
      className="checkout-confirmation"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="confirmation-icon">
        <FaCheckCircle />
      </div>
      
      <h2>Thank You for Your Order!</h2>
      <p className="order-id">Order #{orderId}</p>
      
      <div className="confirmation-message">
        <p className="confirmation-text">Your order has been successfully placed. We have sent a confirmation email to <strong>{formData.email}</strong>.</p>
        
        <div className="order-details">
          <div className="detail-group">
            <h3><FaUser /> Customer</h3>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
          </div>
          
          <div className="detail-group">
            <h3><FaTruck /> Shipping</h3>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.region}</p>
            <p>Digital Address: {formData.digitalAddress}</p>
          </div>
          
          <div className="detail-group">
            <h3><FaCreditCard /> Payment</h3>
            <p>Method: {formData.paymentMethod === 'momo' ? 'Mobile Money' : 
                       formData.paymentMethod === 'card' ? 'Credit Card' : 
                       'Cash on Delivery'}</p>
            <p>Total: ₵{finalAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="delivery-info">
          <h3>Estimated Delivery</h3>
          <p>Your order will be delivered by {estimatedDelivery}.</p>
          <div className="tracking-note">
            <FaInfoCircle />
            <p>You can track your order status in the "My Orders" section.</p>
          </div>
        </div>
        
        {formData.paymentMethod === 'momo' && (
          <div className="payment-instructions">
            <h3>Payment Instructions</h3>
            <p>Please check your mobile phone for a payment prompt from your mobile money provider. Complete the payment to confirm your order.</p>
            <p className="time-limit">Note: Please complete the payment within 30 minutes to avoid order cancellation.</p>
          </div>
        )}
      </div>
      
      <div className="confirmation-actions">
        <Link to="/orders" className="view-orders-btn">
          Track My Order
        </Link>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
  
  // Add this function to render the appropriate step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderShippingInfo();
      case 3:
        return renderPaymentInfo();
      case 4:
        return renderConfirmation();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="checkout-page">
      {!orderPlaced && (
        <>
          <div className="checkout-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Personal Info</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Shipping</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Payment</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-label">Confirmation</div>
            </div>
          </div>
          
          <div className="edit-cart-link-container">
            <Link to="/cart" className="edit-cart-link">
              <FaShoppingCart /> Edit Cart
            </Link>
          </div>
        </>
      )}
      
      <div className="checkout-layout">
        <div className="checkout-container">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>
        
        {!orderPlaced && items.length > 0 && (
          <FloatingOrderSummary 
            items={items}
            totalAmount={totalAmount}
            shippingCost={shippingCost}
            finalAmount={finalAmount}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;