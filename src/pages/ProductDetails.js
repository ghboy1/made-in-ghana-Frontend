import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import { getProductById, getProductsByCategory } from '../services/productService';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {    // Fetch product details using the product service
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Use the product service to fetch product details
        const productData = await getProductById(id);
        
        // Ensure price is a number for calculations
        if (productData && typeof productData.price === 'string') {
          productData.price = parseFloat(productData.price.replace(/[^\d.-]/g, ''));
        }
        
        setProduct(productData);
        
        // If product has category, fetch related products
        if (productData && productData.category) {
          const related = await getProductsByCategory(
            productData.category, 
            { limit: 4, exclude: id }
          );
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
    if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;
  
  return (
    <div className="product-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">{product.price.toFixed(2)} GHS</p>
          
          {product.inStock ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
          
          <p className="product-description">{product.description}</p>
          
          {product.specs && (
            <div className="product-specs">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Use the reusable AddToCartButton component */}
          <AddToCartButton product={product} />
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product-card">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <h3>{relatedProduct.name}</h3>
                <p>{typeof relatedProduct.price === 'number' 
                    ? `GHS ${relatedProduct.price.toFixed(2)}` 
                    : relatedProduct.price}</p>
                <button onClick={() => window.location.href = `/product/${relatedProduct.id}`}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;