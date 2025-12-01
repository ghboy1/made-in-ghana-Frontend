import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaRegHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
import { GiAfrica } from 'react-icons/gi';
import { MdEco } from 'react-icons/md';

const ProductCard = ({ 
  product, 
  isFavorite, 
  toggleFavorite, 
  viewProduct, 
  shareProductInfo, 
  translate 
}) => {
  return (
    <motion.div 
      className="product-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="product-badges">
        {product.isNew && <span className="new-badge">New</span>}
        {product.discountPercent > 0 && <span className="discount-badge">{product.discountPercent}% Off</span>}
        <span className="region-badge" title={`Made in ${product.region}`}>
          <GiAfrica /> {product.region}
        </span>
        {product.sustainabilityCertified && (
          <span className="eco-badge" title="Sustainably made">
            <MdEco />
          </span>
        )}
      </div>
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-hover-buttons">
          <button 
            className="favorite-button"
            onClick={() => toggleFavorite(product.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button 
            className="share-button"
            onClick={() => shareProductInfo(product)}
            aria-label="Share product"
          >
            <FaShare />
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"} />
            ))}
            <span>{product.rating.toFixed(1)} ({product.reviews})</span>
          </div>
          <div className="product-price">
            {product.discountPercent > 0 && (
              <span className="original-price">
                GH₵{(product.price / (1 - product.discountPercent / 100)).toFixed(2)}
              </span>
            )}
            <span className={product.discountPercent > 0 ? "discounted-price" : ""}>
              GH₵{product.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        <p className="product-artisan">{product.artisan}</p>
        
        <div className="product-sizes">
          <span className="sizes-label">Sizes:</span>
          <div className="sizes-list">
            {product.sizes.map(size => (
              <span key={size} className="size-chip">{size}</span>
            ))}
          </div>
        </div>
        
        <div className="product-actions">
          <Link 
            to={`/product/${product.id}`} 
            className="view-button"
            onClick={() => viewProduct(product.id)}
          >
            {translate('viewDetails')}
          </Link>
          <button 
            className={`cart-button ${!product.inStock ? 'disabled' : ''}`}
            disabled={!product.inStock}
          >
            <FaShoppingCart /> {product.inStock ? translate('addToCart') : translate('outOfStock')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = ({ 
  products, 
  favorites, 
  toggleFavorite, 
  viewProduct, 
  shareProductInfo, 
  translate 
}) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          toggleFavorite={toggleFavorite}
          viewProduct={viewProduct}
          shareProductInfo={shareProductInfo}
          translate={translate}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductGrid);