import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { FaCalendarAlt, FaTimes, FaPlay, FaShoppingCart, FaShare, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from '../contexts/CartContext';
import './NewReleases.css';

// Set Modal app element for accessibility
Modal.setAppElement('#root');

// Product Card Component
const ProductCard = ({ product, favorites, onToggleFavorite, onAddToCart }) => {
  const { id, name, image, price, designer, category, date, available } = product;
  const isFavorite = favorites.includes(id);
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} loading="lazy" />
        <button 
          className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
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
        <p className="product-designer">By {designer}</p>
        <div className="release-date-container">
          <FaCalendarAlt className="calendar-icon" />
          <span>Available: {formatDate(available)}</span>
        </div>
        <div className="price-container">
          <span className="price">{formatPrice(price)}</span>
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

// Format price with Ghana Cedi symbol
const formatPrice = (price) => `GH₵ ${price.toFixed(2)}`;

// Format date to be more readable
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const NewReleases = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart(); // Using cart context

  // Sample releases data
  const releases = [
    { 
      id: 1, 
      name: 'Traditional Kente Cloth (Limited Edition)', 
      date: '2025-04-15', 
      image: '/images/products/kente-premium.jpg', 
      price: 450.00,
      description: 'Hand-woven premium Kente cloth with authentic Ashanti patterns, perfect for special occasions.',
      category: 'Fashion',
      designer: 'Kwame Asante Textiles',
      video: '/videos/kente-making.mp4',
      available: '2025-05-01'
    },
    { 
      id: 2, 
      name: 'Modern Ankara Jacket', 
      date: '2025-03-20', 
      image: '/images/products/ankara-jacket.jpg', 
      price: 320.00,
      description: 'Contemporary jacket featuring vibrant Ankara prints, designed for the modern Ghanaian.',
      category: 'Fashion',
      designer: 'Accra Fashion House',
      video: '/videos/ankara-showcase.mp4',
      available: '2025-04-10'
    },
    { 
      id: 3, 
      name: 'Ghana Black Stars Limited Jersey', 
      date: '2025-03-10', 
      image: '/images/products/black-stars-jersey.jpg', 
      price: 250.00,
      description: 'Official Black Stars jersey with special edition Ghana independence design.',
      category: 'Sports',
      designer: 'Ghana Football Association',
      video: '/videos/jersey-reveal.mp4',
      available: '2025-03-25'
    },
    { 
      id: 4, 
      name: 'Handcrafted Shea Butter Collection', 
      date: '2025-04-05', 
      image: '/images/products/shea-butter.jpg', 
      price: 85.00,
      description: 'Organic shea butter collection sourced from Northern Ghana, with various natural fragrances.',
      category: 'Beauty',
      designer: 'Tamale Natural Products',
      video: '/videos/shea-production.mp4',
      available: '2025-04-20'
    }
  ];

  // Slider settings for upcoming releases
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

  // Toggle favorite status
  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // Handle add to cart function
  const handleAddToCart = useCallback((product) => {
    // Create a cart item with the correct format
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
      manufacturer: product.designer // Use designer as manufacturer
    };
    
    addToCart(cartItem);
    
    // Show toast notification
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

  // Open product detail modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="new-releases-page">
      {/* Banner with Ghana flag colors */}
      <div className="ghana-banner">
        <div className="banner-stripe red"></div>
        <div className="banner-stripe gold"></div>
        <div className="banner-stripe green"></div>
      </div>
      
      {/* Header with Ghana flag */}
      <header className="releases-header">
        <div className="section-header">
          <h1>New Releases</h1>
          <p className="section-subheading">Discover the latest Made in Ghana products</p>
        </div>
        <div className="ghana-flag">
          <div className="stripe red"></div>
          <div className="stripe gold">
            <div className="star">★</div>
          </div>
          <div className="stripe green"></div>
        </div>
      </header>

      {/* Featured Upcoming Releases */}
      <section className="featured-releases">
        <div className="section-header">
          <h2>Featured Upcoming Releases</h2>
          <p className="section-subheading">Pre-order these exciting new products today</p>
        </div>
        
        {isLoading ? (
          <div className="loading-spinner">Loading new releases...</div>
        ) : (
          <div className="hero-slider-container">
            <Slider {...sliderSettings}>
              {releases.map((product) => (
                <div key={product.id} className="hero-slide">
                  <div className="slide-image-container">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="new-badge">NEW</div>
                  </div>
                  <div className="slide-info">
                    <h3>{product.name}</h3>
                    <p className="product-designer">By {product.designer}</p>
                    <div className="release-date">
                      <FaCalendarAlt className="calendar-icon" />
                      <span>Available {formatDate(product.available)}</span>
                    </div>
                    <div className="price-container">
                      <span className="price">{formatPrice(product.price)}</span>
                    </div>
                    <div className="slide-actions">
                      <button
                        className={`wishlist-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        {favorites.includes(product.id) ? '❤️' : '🤍'}
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
        )}
      </section>

      {/* Timeline View */}
      <section className="timeline-view">
        <div className="section-header">
          <h2>Upcoming Releases</h2>
          <p className="section-subheading">Our product roadmap for the coming months</p>
        </div>

        {isLoading ? (
          <div className="loading-spinner">Loading new releases...</div>
        ) : (
          <div className="product-grid">
            {releases.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Spotlight Section */}
      <section className="spotlight-section">
        <div className="section-header">
          <h2>Spotlight Collection</h2>
          <p className="section-subheading">Exclusively featured new release</p>
        </div>
        
        <div className="spotlight-card">
          <img src="/images/spotlight-product.jpg" alt="Heritage Fusion Collection" loading="lazy" />
          <div className="spotlight-info">
            <span className="spotlight-tag">Featured Collection</span>
            <h3>Heritage Fusion Collection</h3>
            <p>A groundbreaking blend of traditional Ghanaian craftsmanship with contemporary design aesthetics. This collection represents the best of Ghana's artisanal talent, bringing ancestral techniques into the modern world.</p>
            <p className="spotlight-release">Launching April 25, 2025</p>
            <div className="spotlight-actions">
              <button 
                className="spotlight-video-btn"
                onClick={() => openModal({ 
                  name: 'Heritage Fusion Collection', 
                  video: '/videos/heritage-fusion.mp4',
                  designer: 'Ghana Design Collaborative',
                  description: 'A collaborative project bringing together artisans from across Ghana to create a collection that honors our heritage while embracing modern design principles.'
                })}
              >
                <FaPlay /> Watch Preview
              </button>
              <button 
                className="add-to-cart-btn spotlight-cart-btn" 
                onClick={() => handleAddToCart({
                  id: 'spotlight1',
                  name: 'Heritage Fusion Collection',
                  price: 750.00,
                  image: '/images/spotlight-product.jpg',
                  category: 'Collection',
                  designer: 'Ghana Design Collaborative'
                })}
              >
                Pre-order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="section-header">
          <h2>What People Are Saying</h2>
          <p className="section-subheading">Customer excitement about our upcoming releases</p>
        </div>
        
        <div className="social-feed">
          <div className="social-card twitter">
            <div className="social-header">
              <img src="/images/avatars/kofi.jpg" alt="Kofi's profile" />
              <div>
                <h4>Kofi Mensah</h4>
                <span>@kofimensah</span>
              </div>
            </div>
            <p>Just pre-ordered the new Kente collection! The craftsmanship looks absolutely stunning. Can't wait to wear it for my sister's wedding. Made in Ghana quality! 🇬🇭 #GhanaProud</p>
            <div className="social-meta">
              <span>2 days ago</span>
            </div>
          </div>
          
          <div className="social-card instagram">
            <div className="social-header">
              <img src="/images/avatars/ama.jpg" alt="Ama's profile" />
              <div>
                <h4>Ama Darko</h4>
                <span>@amalovesgh</span>
              </div>
            </div>
            <p>These new Black Stars jerseys are FIRE! 🔥 The design perfectly captures our national spirit. Already ordered two for me and my brother. Supporting our local designers and our national team! ⚽ #BlackStars</p>
            <div className="social-meta">
              <span>5 days ago</span>
            </div>
          </div>
          
          <div className="social-card facebook">
            <div className="social-header">
              <img src="/images/avatars/kwame.jpg" alt="Kwame's profile" />
              <div>
                <h4>Kwame Boateng</h4>
                <span>@kwameboateng</span>
              </div>
            </div>
            <p>The Shea Butter Collection is incredible. My wife has been using it for a week and the quality is incomparable to imported products. Supporting northern Ghana's women cooperatives makes it even better! 👏🏾</p>
            <div className="social-meta">
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        className="product-modal"
        overlayClassName="modal-overlay"
        contentLabel="Product Details"
      >
        {selectedProduct && (
          <div className="modal-content">
            <button 
              className="close-modal-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              {selectedProduct.designer && (
                <p className="modal-designer">By {selectedProduct.designer}</p>
              )}
            </div>
            
            <div className="modal-body">
              <div className="modal-video-container">
                <video controls poster={selectedProduct.image}>
                  <source src={selectedProduct.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="modal-details">
                <p className="modal-description">{selectedProduct.description}</p>
                
                {selectedProduct.price && (
                  <div className="modal-price-info">
                    <h3>Pre-order Details</h3>
                    <p className="modal-price">{formatPrice(selectedProduct.price)}</p>
                    {selectedProduct.available && (
                      <p className="modal-availability">
                        Available from {formatDate(selectedProduct.available)}
                      </p>
                    )}
                    <button 
                      className="add-to-cart-btn modal-cart-btn"
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setIsModalOpen(false);
                      }}
                    >
                      Pre-order Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="ghana-flag-mini">
                <div className="stripe red"></div>
                <div className="stripe gold"></div>
                <div className="stripe green"></div>
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-action-btn"
                  onClick={() => toggleFavorite(selectedProduct.id)}
                >
                  {favorites.includes(selectedProduct.id) ? <MdFavorite /> : <MdFavoriteBorder />} 
                  {favorites.includes(selectedProduct.id) ? 'Saved' : 'Save'}
                </button>
                <button className="modal-action-btn">
                  <FaShare /> Share
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
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
      
      {/* Banner with Ghana flag colors at footer */}
      <div className="ghana-banner">
        <div className="banner-stripe red"></div>
        <div className="banner-stripe gold"></div>
        <div className="banner-stripe green"></div>
      </div>
    </div>
  );
};

export default NewReleases;