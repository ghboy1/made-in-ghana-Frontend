import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaRegStar, FaStar, FaSearch } from 'react-icons/fa';

const ProductCard = ({ product, wishlist, onToggleWishlist, onQuickView, onAddToCart }) => {
  const { id, name, image, price, rating, style, occasion, discount } = product;
  const isInWishlist = wishlist.includes(id);
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="fashion-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {discount > 0 && (
        <div className="discount-badge">-{discount}%</div>
      )}
      <div className="product-image-container">
        <img 
          src={process.env.PUBLIC_URL + `/assets/images${image}`} 
          alt={name} 
          loading="lazy" 
          className={isHovered ? "zoomed" : ""}
        />
        <div className={`product-card-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(id);
            }}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button 
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label="Quick view"
          >
            <FaSearch />
          </button>
          <button 
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, 1, 'M', 'default');
            }}
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-occasion">{occasion}</span>
          <span className="product-style">{style}</span>
        </div>
        <h3 className="product-name">{name}</h3>
        <div className="price-container">
          <span className="price">GH₵ {discountedPrice.toFixed(2)}</span>
          {discount > 0 && <span className="original-price">GH₵ {price.toFixed(2)}</span>}
        </div>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
              {i < Math.floor(rating) ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
          {rating % 1 !== 0 && (
            <span className="star half-filled">
              <div className="half-star">
                <FaStar />
              </div>
            </span>
          )}
          <span className="rating-count">({Math.floor(Math.random() * 50) + 10})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;