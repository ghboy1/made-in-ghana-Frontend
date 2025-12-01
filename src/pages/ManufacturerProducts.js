// src/pages/ManufacturerProducts.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ManufacturerProducts.css';

// Slugify function for URL matching
const slugify = (str) => 
  str.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

// Mock data (replace with API calls)
const featuredProducts = [
  // ... (use the enhanced featuredProducts array from previous example)
];

const ManufacturerProducts = () => {
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const foundManufacturer = featuredProducts.find(p => 
      slugify(p.seller.name) === id
    )?.seller;
    
    if(foundManufacturer) {
      setManufacturer(foundManufacturer);
      setProducts(featuredProducts.filter(p => 
        slugify(p.seller.name) === id
      ));
    }
  }, [id]);

  if(!manufacturer) return <div className="loading">Loading...</div>;

  return (
    <div className="manufacturer-page">
      <header className="manufacturer-header">
        <h1>{manufacturer.name}</h1>
        {manufacturer.verified && <span className="verified-badge">Verified Seller</span>}
        <div className="manufacturer-meta">
          <span className="rating">⭐ {products[0]?.rating || 4.5}/5</span>
          <span>📍 {products[0]?.location || 'Ghana'}</span>
        </div>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <article key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.discount && <span className="discount-badge">{product.discount}</span>}
            </div>
            
            <div className="product-details">
              <h3>{product.name}</h3>
              <div className="price-container">
                <span className="current-price">GH₵{product.price}</span>
                <span className="sold-count">{product.quantitySold}+ sold</span>
              </div>
              
              <div className="product-meta">
                <span className="category">{product.category}</span>
                <Link to={`/products/${product.slug}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ManufacturerProducts;