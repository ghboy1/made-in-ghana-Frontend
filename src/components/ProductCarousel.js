import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import '../styles/ProductCarousel.css';

const ProductCarousel = ({ products, title = 'You might also like' }) => {
  const { addToCart } = useCart();
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(4);
  
  // Determine how many items to show based on screen width
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 600) {
        setVisibleItems(1);
      } else if (window.innerWidth < 900) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1200) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };
    
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);
  
  const nextSlide = () => {
    if (startIndex < products.length - visibleItems) {
      setStartIndex(startIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('GH₵', '').trim()),
      image: product.image,
      quantity: 1
    });
  };
  
  return (
    <div className="product-carousel">
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button 
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="carousel-control"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={nextSlide}
            disabled={startIndex >= products.length - visibleItems}
            className="carousel-control"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      
      <div className="carousel-container" ref={containerRef}>
        <motion.div 
          className="carousel-track"
          animate={{ x: -startIndex * (containerRef.current?.offsetWidth / visibleItems || 0) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-item">
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-rating">
                    <FaStar /> <span>{product.rating}</span>
                  </div>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="product-tags">
                    {product.tags.map((tag, idx) => (
                      <span key={idx} className="product-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCarousel;