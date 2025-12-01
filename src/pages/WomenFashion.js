// WomenFashion.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronRight, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './WomenFashion.css';

const WomenFashion = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const basePath = '/womens-fashion';

  const categories = [
    { 
      name: 'Clothing', 
      link: 'clothing', 
      image: '/images/fashion/women/clothing.jpg',
      subcats: [
        { name: 'Dresses', link: 'dresses', image: '/images/fashion/women/dresses.jpg' },
        { name: 'Tops', link: 'tops', image: '/images/fashion/women/tops.jpg' },
        { name: 'Bottoms', link: 'bottoms', image: '/images/fashion/women/bottoms.jpg' },
        { name: 'Traditional Wear', link: 'traditional-wear', image: '/images/fashion/women/traditional.jpg' },
        { name: 'Kente Clothing', link: 'kente', image: '/images/fashion/women/kente.jpg' }
      ] 
    },
    { 
      name: 'Shoes', 
      link: 'shoes', 
      image: '/images/fashion/women/shoes.jpg',
      subcats: [
        { name: 'Heels', link: 'heels', image: '/images/fashion/women/heels.jpg' },
        { name: 'Flats', link: 'flats', image: '/images/fashion/women/flats.jpg' },
        { name: 'Sandals', link: 'sandals', image: '/images/fashion/women/sandals.jpg' },
        { name: 'Traditional Footwear', link: 'traditional-footwear', image: '/images/fashion/women/traditional-shoes.jpg' }
      ] 
    },
    { 
      name: 'Jewelry', 
      link: 'jewelry', 
      image: '/images/fashion/women/jewelry.jpg',
      subcats: [
        { name: 'Necklaces', link: 'necklaces', image: '/images/fashion/women/necklaces.jpg' },
        { name: 'Earrings', link: 'earrings', image: '/images/fashion/women/earrings.jpg' },
        { name: 'Bracelets', link: 'bracelets', image: '/images/fashion/women/bracelets.jpg' },
        { name: 'Traditional Jewelry', link: 'traditional-jewelry', image: '/images/fashion/women/traditional-jewelry.jpg' }
      ] 
    },
    { 
      name: 'Watches', 
      link: 'watches', 
      image: '/images/fashion/women/watches.jpg' 
    },
    { 
      name: 'Handbags', 
      link: 'handbags', 
      image: '/images/fashion/women/handbags.jpg',
      subcats: [
        { name: 'Crossbody Bags', link: 'crossbody', image: '/images/fashion/women/crossbody.jpg' },
        { name: 'Tote Bags', link: 'tote', image: '/images/fashion/women/tote.jpg' },
        { name: 'Clutches', link: 'clutches', image: '/images/fashion/women/clutches.jpg' },
        { name: 'Traditional Bags', link: 'traditional-bags', image: '/images/fashion/women/traditional-bags.jpg' }
      ] 
    },
    { 
      name: 'Accessories', 
      link: 'accessories', 
      image: '/images/fashion/women/accessories.jpg',
      subcats: [
        { name: 'Scarves', link: 'scarves', image: '/images/fashion/women/scarves.jpg' },
        { name: 'Hats', link: 'hats', image: '/images/fashion/women/hats.jpg' },
        { name: 'Belts', link: 'belts', image: '/images/fashion/women/belts.jpg' },
        { name: 'Hair Accessories', link: 'hair-accessories', image: '/images/fashion/women/hair-accessories.jpg' }
      ] 
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const sampleProducts = [
        {
          id: 'w1',
          name: 'Ankara Print Dress',
          category: 'clothing',
          subcategory: 'dresses',
          price: 79.99,
          image: '/images/fashion/women/ankara-dress.jpg',
          rating: 4.8,
          description: 'Beautiful Ankara print dress made in Ghana with traditional fabric',
          inStock: true
        },
        {
          id: 'w2',
          name: 'Kente Clutch Purse',
          category: 'handbags',
          subcategory: 'clutches',
          price: 45.50,
          image: '/images/fashion/women/kente-clutch.jpg',
          rating: 4.6,
          description: 'Handcrafted clutch purse with authentic Kente cloth from Ghana',
          inStock: true
        },
        {
          id: 'w3',
          name: 'Beaded Waist Beads',
          category: 'jewelry',
          subcategory: 'traditional-jewelry',
          price: 25.99,
          image: '/images/fashion/women/waist-beads.jpg',
          rating: 4.9,
          description: 'Traditional Ghanaian waist beads, handmade with glass beads',
          inStock: true
        },
      ];
      
      let filteredProducts = sampleProducts;
      
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
        
        if (subcategory) {
          filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
        }
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 800);
    
    const savedFavorites = localStorage.getItem('womenFashionFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [category, subcategory]);

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      localStorage.setItem('womenFashionFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleAddToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: 'Women\'s Fashion',
        subcategory: product.subcategory,
        quantity: 1
      }
    });
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<div>${product.name} added to cart</div>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 10);
  };

  const getCurrentCategory = () => {
    if (!category) return null;
    return categories.find(cat => cat.link === category);
  };

  const getCurrentSubcategory = () => {
    const currentCat = getCurrentCategory();
    if (!currentCat || !subcategory || !currentCat.subcats) return null;
    return currentCat.subcats.find(sub => sub.link === subcategory);
  };

  const currentCategory = getCurrentCategory();
  const currentSubcategory = getCurrentSubcategory();

  const getBreadcrumbs = () => {
    const crumbs = [
      { name: 'Home', link: '/' },
      { name: 'Women\'s Fashion', link: basePath }
    ];
    
    if (currentCategory) {
      crumbs.push({
        name: currentCategory.name,
        link: `${basePath}/${category}`
      });
    }
    
    if (currentSubcategory) {
      crumbs.push({
        name: currentSubcategory.name,
        link: `${basePath}/${category}/${subcategory}`
      });
    }
    
    return crumbs;
  };

  return (
    <div className="womens-fashion">
      <div className="breadcrumbs">
        {getBreadcrumbs().map((crumb, index, array) => (
          <React.Fragment key={index}>
            <Link to={crumb.link}>{crumb.name}</Link>
            {index < array.length - 1 && <FaChevronRight className="breadcrumb-separator" />}
          </React.Fragment>
        ))}
      </div>

      <h1 className="page-title">
        {currentSubcategory ? currentSubcategory.name : 
         currentCategory ? currentCategory.name : 
         "Women's Fashion"}
      </h1>

      {!category && (
        <>
          <p className="page-description">
            Explore our collection of locally-made Ghanaian women's fashion, 
            from traditional Kente and Ankara prints to modern designs.
          </p>
          
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Link to={`${basePath}/${cat.link}`} key={index} className="category-card">
                <div className="category-image-container">
                  <img src={cat.image || '/images/placeholder.jpg'} alt={cat.name} />
                </div>
                <h2>{cat.name}</h2>
                {cat.subcats && <span className="subcategory-count">{cat.subcats.length} subcategories</span>}
              </Link>
            ))}
          </div>
        </>
      )}

      {category && !subcategory && currentCategory && currentCategory.subcats && (
        <>
          <p className="page-description">
            Browse our selection of {currentCategory.name.toLowerCase()} designed and crafted in Ghana.
          </p>
          
          <div className="subcategories-grid">
            {currentCategory.subcats.map((subcat, index) => (
              <Link to={`${basePath}/${category}/${subcat.link}`} key={index} className="subcategory-card">
                <div className="subcategory-image-container">
                  <img src={subcat.image || '/images/placeholder.jpg'} alt={subcat.name} />
                </div>
                <h3>{subcat.name}</h3>
              </Link>
            ))}
          </div>
        </>
      )}

      {(category || subcategory) && (
        <div className="products-section">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="no-products">
                  <p>No products found in this category yet.</p>
                  <Link to={basePath} className="back-link">Return to Women's Fashion</Link>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <div className="product-card" key={product.id}>
                      <div className="product-image-container">
                        <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
                        <button 
                          className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                          onClick={() => toggleFavorite(product.id)}
                          aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <FaHeart />
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating">
                          <FaStar className="star-icon" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                        <p className="product-description">{product.description}</p>
                        <div className="product-bottom">
                          <span className="product-price">GH₵{product.price.toFixed(2)}</span>
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <FaShoppingCart />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WomenFashion;