import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BestSellers.css';
import { useCart } from '../contexts/CartContext';

// Product Card Component
const ProductCard = ({ product, wishlist, onToggleWishlist, onAddToCart }) => {
  const { id, name, image, price, rating, category, discount } = product;
  const isInWishlist = wishlist.includes(id);
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <div className="product-card">
      {discount > 0 && (
        <div className="product-discount-badge">-{discount}%</div>
      )}
      <div className="product-image-container">
        <img src={image} alt={name} loading="lazy" />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={() => onToggleWishlist(id)}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
            </svg>
          )}
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <div className="price-container">
          <span className="price">{formatPrice(discountedPrice)}</span>
          {discount > 0 && <span className="original-price">{formatPrice(price)}</span>}
        </div>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'star filled' : 'star'}>
              {i < rating ? '★' : '☆'}
            </span>
          ))}
          <span className="rating-count">({Math.floor(Math.random() * 50) + 10})</span>
        </div>
        <button 
          className="add-to-cart-btn" 
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Countdown Component
const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;
      
      if (diff <= 0) {
        setIsExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return <div className="countdown expired">Offer Expired</div>;
  }

  const { hours, minutes, seconds } = timeLeft;
  
  return (
    <div className="countdown">
      <div className="countdown-segment">
        <span className="countdown-value">{hours.toString().padStart(2, '0')}</span>
        <span className="countdown-label">HOURS</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-segment">
        <span className="countdown-value">{minutes.toString().padStart(2, '0')}</span>
        <span className="countdown-label">MINS</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-segment">
        <span className="countdown-value">{seconds.toString().padStart(2, '0')}</span>
        <span className="countdown-label">SECS</span>
      </div>
    </div>
  );
};

// Reviews Section
const CustomerReviews = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="customer-reviews">
      <h2>What Customers Say</h2>
      <div className="reviews-slider">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="review-slide">
              <div className="review-content">
                <div className="quote-icon">❝</div>
                <p className="review-text">{review.comment}</p>
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.customer}</span>
                  {review.badge && <span className="reviewer-badge">{review.badge}</span>}
                </div>
                <div className="review-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                      {i < review.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Utility function to format price
const formatPrice = (price) => `GHC ${price.toFixed(2)}`;

// Main Component
const BestSellers = () => {
  const [category, setCategory] = useState('All Categories');
  const [priceSort, setPriceSort] = useState('Price: Low to High');
  const [ratingFilter, setRatingFilter] = useState('Customer Ratings');
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart(); // Use the cart context instead
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Enhanced product data
  const topProducts = [
    { 
      id: 1, 
      name: 'Handcrafted Kente Shirt', 
      image: '/image/Limited Edition Kente Collection.svg', 
      price: 150.00, 
      rating: 4,
      category: 'Fashion',
      discount: 10
    },
    { 
      id: 2, 
      name: 'Traditional Ghana Beads', 
      image: '/image/Traditional Ghana Beads4.jpg', 
      price: 80.00, 
      rating: 5,
      category: 'Jewelry',
      discount: 0
    },
    { 
      id: 3, 
      name: 'Authentic Adinkra Fabric', 
      image: '/image/Authentic Adinkra Fabric.jpg', 
      price: 120.00, 
      rating: 4.5, 
      category: 'Textiles',
      discount: 15
    },
    { 
      id: 4, 
      name: 'Handmade Shea Butter', 
      image: '/image/Handmade Shea Butter.jpg', 
      price: 35.00, 
      rating: 5, 
      category: 'Beauty',
      discount: 0
    },
    { 
      id: 5, 
      name: 'African Print Dress', 
      image: '/image/African Print Dress.jpg', 
      price: 175.00, 
      rating: 4, 
      category: 'Fashion',
      discount: 20
    },
    { 
      id: 6, 
      name: 'Ghana Chocolate Pack', 
      image: '/image/Ghana Chocolate Pack.jpg', 
      price: 45.00, 
      rating: 4.5, 
      category: 'Food',
      discount: 0
    }
  ];

  const deals = [
    { 
      id: 1, 
      name: 'Limited Edition Kente Collection', 
      image: '/image/Limited Edition Kente Collection.svg', 
      price: 299.99, 
      discount: 30,
      endTime: '2025-05-15T00:00:00', 
      description: 'Exclusive collection of premium handwoven kente cloth from master artisans in Ghana\'s Ashanti region.'
    },
    { 
      id: 2, 
      name: 'Gold Coast Jewelry Box', 
      image: '/image/Gold Coast Jewelry Box.jpg', 
      price: 199.99, 
      discount: 25,
      endTime: '2025-05-10T00:00:00',
      description: 'Authentic collection of handmade Ghanaian jewelry featuring traditional designs and modern craftsmanship.'
    }
    
  ];

  const reviews = [
    { 
      id: 1, 
      comment: 'The quality of the kente cloth is exceptional! The colors are vibrant and the craftsmanship is outstanding. Shipping to the US was faster than expected.', 
      customer: 'Kofi Annan', 
      badge: 'Verified Purchase',
      rating: 5 
    },
    { 
      id: 2, 
      comment: 'I bought the Ghana beads for my sister\'s wedding and they were absolutely beautiful. Everyone was asking where I got them!', 
      customer: 'Ama Ata Aidoo', 
      badge: 'Verified Purchase',
      rating: 5 
    },
    { 
      id: 3, 
      comment: 'The shea butter is amazing for my skin. Pure, natural, and works better than any expensive cream I\'ve tried.', 
      customer: 'David Dontoh', 
      badge: 'Verified Purchase',
      rating: 4 
    }
  ];

  // Filter and sort products
  const filteredProducts = topProducts.filter(product => {
    if (category !== 'All Categories' && product.category !== category) return false;
    if (ratingFilter === '4 stars & up' && product.rating < 4) return false;
    if (ratingFilter === '3 stars & up' && product.rating < 3) return false;
    return true;
  }).sort((a, b) => {
    if (priceSort === 'Price: Low to High') return a.price - b.price;
    if (priceSort === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  // Handle wishlist toggle
  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  // Handle add to cart
  const handleAddToCart = useCallback((product) => {
    // Calculate the actual price (with discount applied if exists)
    const actualPrice = product.discount 
      ? product.price - (product.price * product.discount / 100) 
      : product.price;
    
    // Create a cart item with the correct format expected by the cart context
    const cartItem = {
      id: product.id,
      name: product.name,
      price: actualPrice,
      image: product.image,
      quantity: 1,
      category: product.category,
      manufacturer: 'Made in Ghana' // Add default manufacturer or remove if not needed
    };
    
    addToCart(cartItem);
    
    // Show toast/notification (consider using a proper toast library)
    const toastMessage = document.createElement('div');
    toastMessage.className = 'add-to-cart-toast';
    toastMessage.innerHTML = `
      <div class="toast-content">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="#006b3f" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>${product.name} added to cart!</span>
      </div>
    `;
    document.body.appendChild(toastMessage);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
      toastMessage.classList.add('toast-hide');
      setTimeout(() => document.body.removeChild(toastMessage), 500);
    }, 3000);
  }, [addToCart]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const dealSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bestsellers-page">
      {/* Banner with Ghana flag colors */}
      <div className="ghana-banner">
        <div className="banner-stripe red"></div>
        <div className="banner-stripe gold"></div>
        <div className="banner-stripe green"></div>
      </div>
      
      {/* Hero Section: Carousel */}
      <section className="bestsellers-hero">
        <div className="section-header">
          <h1>Ghana's Finest Products</h1>
          <p className="section-subheading">Discover authentic handcrafted goods from Ghana</p>
        </div>
        
        <div className="hero-slider-container">
          <Slider {...sliderSettings}>
            {topProducts.map((product) => (
              <div key={product.id} className="hero-slide">
                <div className="slide-image-container">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.discount > 0 && (
                    <div className="sale-badge">SALE</div>
                  )}
                </div>
                <div className="slide-info">
                  <h3>{product.name}</h3>
                  <div className="price-container">
                    <span className="price">
                      {formatPrice(product.discount ? product.price - (product.price * product.discount / 100) : product.price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="original-price">{formatPrice(product.price)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < product.rating ? 'star filled' : 'star'}>
                        {i < product.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <div className="slide-actions">
                    <button
                      className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {wishlist.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Featured Deals with Countdown */}
      <section className="featured-deals">
        <div className="section-header">
          <h2>Limited Time Offers</h2>
          <p className="section-subheading">Special deals on authentic Ghanaian products</p>
        </div>
        
        <div className="deals-slider-container">
          <Slider {...dealSliderSettings}>
            {deals.map((deal) => (
              <div key={deal.id} className="deal-slide">
                <div className="deal-card">
                  <div className="deal-image-container">
                    <img src={deal.image} alt={deal.name} loading="lazy" />
                    <div className="discount-badge">-{deal.discount}%</div>
                  </div>
                  <div className="deal-info">
                    <h3>{deal.name}</h3>
                    <p className="deal-description">{deal.description}</p>
                    <div className="price-container">
                      <span className="price">
                        {formatPrice(deal.price - (deal.price * deal.discount / 100))}
                      </span>
                      <span className="original-price">{formatPrice(deal.price)}</span>
                    </div>
                    <Countdown endTime={deal.endTime} />
                    <button className="buy-now-btn">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Product Grid with Filters */}
      <section className="bestsellers-grid">
        <div className="section-header">
          <h2>Browse Best Sellers</h2>
          <p className="section-subheading">Handpicked selection of Ghana's top products</p>
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category-filter">Category</label>
            <select 
              id="category-filter"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Fashion</option>
              <option>Jewelry</option>
              <option>Textiles</option>
              <option>Beauty</option>
              <option>Food</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="price-filter">Price</label>
            <select 
              id="price-filter"
              value={priceSort} 
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="rating-filter">Rating</label>
            <select 
              id="rating-filter"
              value={ratingFilter} 
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option>Customer Ratings</option>
              <option>4 stars & up</option>
              <option>3 stars & up</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading products...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Customer Reviews Slider */}
      <CustomerReviews reviews={reviews} />
      
      {/* About Ghana Products */}
      <section className="about-ghana-products">
        <div className="section-header">
          <h2>Why Choose Ghanaian Products?</h2>
          <p className="section-subheading">Cultural heritage through exceptional craftsmanship</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧵</div>
            <h3>Authentic Craftsmanship</h3>
            <p>Each product is handcrafted by skilled artisans using traditional techniques passed down through generations.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Sustainable Materials</h3>
            <p>We prioritize eco-friendly and sustainable materials that respect Ghana's rich natural resources.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Support Local Economy</h3>
            <p>Your purchase directly supports local artisans and communities, helping to preserve cultural heritage.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Unique Designs</h3>
            <p>Distinctive patterns and symbols represent Ghana's cultural stories and traditions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSellers;