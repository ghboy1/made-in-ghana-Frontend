import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronRight, FaShoppingCart, FaHeart, FaStar, FaFilter, FaSort } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './BeautyPersonalCare.css';

const BeautyPersonalCare = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const basePath = '/beauty';

  const categories = [
    { 
      name: 'Makeup', 
      link: 'makeup', 
      image: '/images/beauty/makeup.jpg',
      icon: '💄',
      description: 'Ghana-made makeup products using natural ingredients and traditional formulations',
      subcats: [
        { name: 'Lips', link: 'lips', image: '/images/beauty/lips.jpg' },
        { name: 'Eyes', link: 'eyes', image: '/images/beauty/eyes.jpg' },
        { name: 'Face', link: 'face', image: '/images/beauty/face.jpg' },
        { name: 'Nails', link: 'nails', image: '/images/beauty/nails.jpg' }
      ] 
    },
    { 
      name: 'Skin Care', 
      link: 'skin-care', 
      image: '/images/beauty/skincare.jpg',
      icon: '✨',
      description: 'Natural skincare products made with shea butter, cocoa butter and other Ghanaian ingredients',
      subcats: [
        { name: 'Cleansers', link: 'cleansers', image: '/images/beauty/cleansers.jpg' },
        { name: 'Moisturizers', link: 'moisturizers', image: '/images/beauty/moisturizers.jpg' },
        { name: 'Masks', link: 'masks', image: '/images/beauty/masks.jpg' },
        { name: 'Serums', link: 'serums', image: '/images/beauty/serums.jpg' }
      ] 
    },
    { 
      name: 'Hair Care', 
      link: 'hair-care', 
      image: '/images/beauty/haircare.jpg',
      icon: '💇',
      description: 'Traditional and modern hair care solutions for all hair types using local ingredients',
      subcats: [
        { name: 'Shampoo', link: 'shampoo', image: '/images/beauty/shampoo.jpg' },
        { name: 'Conditioners', link: 'conditioners', image: '/images/beauty/conditioners.jpg' },
        { name: 'Styling', link: 'styling', image: '/images/beauty/styling.jpg' },
        { name: 'Treatments', link: 'treatments', image: '/images/beauty/treatments.jpg' }
      ] 
    },
    { 
      name: 'Fragrance', 
      link: 'fragrance', 
      image: '/images/beauty/fragrance.jpg',
      icon: '🌸',
      description: 'Unique fragrances inspired by Ghana\'s rich botanical heritage',
      subcats: [
        { name: 'Perfumes', link: 'perfumes', image: '/images/beauty/perfumes.jpg' },
        { name: 'Colognes', link: 'colognes', image: '/images/beauty/colognes.jpg' },
        { name: 'Body Sprays', link: 'body-sprays', image: '/images/beauty/body-sprays.jpg' }
      ] 
    },
    { 
      name: 'Foot, Hand & Nail Care', 
      link: 'foot-hand-nail', 
      image: '/images/beauty/hand-care.jpg',
      icon: '👐',
      description: 'Specialized care products for hands, feet and nails using natural Ghanaian botanicals',
      subcats: [
        { name: 'Foot Care', link: 'foot-care', image: '/images/beauty/foot-care.jpg' },
        { name: 'Hand Care', link: 'hand-care', image: '/images/beauty/hand-care-products.jpg' },
        { name: 'Nail Care', link: 'nail-care', image: '/images/beauty/nail-care.jpg' }
      ] 
    },
    { 
      name: 'Tools & Accessories', 
      link: 'tools', 
      image: '/images/beauty/tools.jpg',
      icon: '🧴',
      description: 'Handcrafted beauty tools and accessories made by Ghanaian artisans',
      subcats: [
        { name: 'Brushes', link: 'brushes', image: '/images/beauty/brushes.jpg' },
        { name: 'Mirrors', link: 'mirrors', image: '/images/beauty/mirrors.jpg' },
        { name: 'Storage', link: 'storage', image: '/images/beauty/storage.jpg' }
      ] 
    },
    { 
      name: 'Shave & Hair Removal', 
      link: 'shave', 
      image: '/images/beauty/shaving.jpg',
      icon: '🪒',
      description: 'Traditional and modern hair removal solutions with natural ingredients',
      subcats: [
        { name: 'Razors', link: 'razors', image: '/images/beauty/razors.jpg' },
        { name: 'Shaving Cream', link: 'shaving-cream', image: '/images/beauty/shaving-cream.jpg' },
        { name: 'Waxing Kits', link: 'waxing-kits', image: '/images/beauty/waxing.jpg' }
      ] 
    },
    { 
      name: 'Personal Care', 
      link: 'personal-care', 
      image: '/images/beauty/personal-care.jpg',
      icon: '🧼',
      description: 'Essential personal care products made with natural Ghana-sourced ingredients',
      subcats: [
        { name: 'Bath & Body', link: 'bath-body', image: '/images/beauty/bath-body.jpg' },
        { name: 'Deodorants', link: 'deodorants', image: '/images/beauty/deodorants.jpg' },
        { name: 'Body Scrubs', link: 'body-scrubs', image: '/images/beauty/body-scrubs.jpg' }
      ] 
    },
    { 
      name: 'Oral Care', 
      link: 'oral-care', 
      image: '/images/beauty/oral-care.jpg',
      icon: '🪥',
      description: 'Natural oral care solutions with ingredients like neem, African sea salt and more',
      subcats: [
        { name: 'Toothbrushes', link: 'toothbrushes', image: '/images/beauty/toothbrushes.jpg' },
        { name: 'Toothpaste', link: 'toothpaste', image: '/images/beauty/toothpaste.jpg' },
        { name: 'Mouthwash', link: 'mouthwash', image: '/images/beauty/mouthwash.jpg' }
      ] 
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const beautyProducts = [
        {
          id: 'b1',
          name: 'Pure Shea Butter Moisturizer',
          category: 'skin-care',
          subcategory: 'moisturizers',
          price: 24.99,
          image: '/images/beauty/shea-moisturizer.jpg',
          rating: 4.9,
          description: 'Natural shea butter moisturizer sourced from Northern Ghana, unrefined and pure',
          inStock: true,
          brand: 'Pure Ghana',
          features: ['100% natural', 'No additives', 'For all skin types']
        },
        {
          id: 'b2',
          name: 'Cocoa Butter Lip Balm',
          category: 'makeup',
          subcategory: 'lips',
          price: 8.50,
          image: '/images/beauty/cocoa-lip-balm.jpg',
          rating: 4.7,
          description: 'Nourishing lip balm made with rich Ghanaian cocoa butter for soft, hydrated lips',
          inStock: true,
          brand: 'Cocoa Kiss',
          features: ['Moisturizing', 'Natural scent', 'No artificial colors']
        },
        {
          id: 'b3',
          name: 'Baobab Oil Hair Treatment',
          category: 'hair-care',
          subcategory: 'treatments',
          price: 18.99,
          image: '/images/beauty/baobab-oil.jpg',
          rating: 4.8,
          description: 'Intensive hair treatment with pure baobab oil to strengthen and nourish hair',
          inStock: true,
          brand: 'NaturalRoots',
          features: ['Strengthening', 'Anti-breakage', 'Deep conditioning']
        },
        {
          id: 'b4',
          name: 'African Black Soap',
          category: 'personal-care',
          subcategory: 'bath-body',
          price: 12.50,
          image: '/images/beauty/black-soap.jpg',
          rating: 4.9,
          description: 'Traditional African black soap handmade in Ghana with palm ash, plantain skin, and cocoa pod',
          inStock: true,
          brand: 'Heritage Soap',
          features: ['For acne-prone skin', 'Gentle exfoliation', 'Reduces hyperpigmentation']
        },
        {
          id: 'b5',
          name: 'Coconut & Neem Toothpaste',
          category: 'oral-care',
          subcategory: 'toothpaste',
          price: 7.99,
          image: '/images/beauty/coconut-toothpaste.jpg',
          rating: 4.6,
          description: 'Natural toothpaste made with coconut oil and neem extract for healthy teeth and gums',
          inStock: true,
          brand: 'NaturalSmile',
          features: ['Fluoride-free', 'Anti-bacterial', 'Whitening']
        },
        {
          id: 'b6',
          name: 'Kalahari Melon Facial Serum',
          category: 'skin-care',
          subcategory: 'serums',
          price: 29.99,
          image: '/images/beauty/melon-serum.jpg',
          rating: 4.8,
          description: 'Lightweight facial serum with cold-pressed Kalahari melon seed oil, rich in antioxidants',
          inStock: true,
          brand: 'Glow Ghana',
          features: ['Brightening', 'Anti-aging', 'Hydrating']
        },
        {
          id: 'b7',
          name: 'Handcrafted Wooden Hair Comb',
          category: 'tools',
          subcategory: 'brushes',
          price: 15.75,
          image: '/images/beauty/wooden-comb.jpg',
          rating: 4.7,
          description: 'Handmade comb crafted from sustainable Ghanaian wood, perfect for all hair types',
          inStock: true,
          brand: 'EcoStyle',
          features: ['Anti-static', 'Wide tooth', 'Gentle detangling']
        },
        {
          id: 'b8',
          name: 'Alata Samina Body Wash',
          category: 'personal-care',
          subcategory: 'bath-body',
          price: 14.50,
          image: '/images/beauty/alata-samina.jpg',
          rating: 4.8,
          description: 'Liquid version of the traditional Alata Samina soap, gentle cleansing for all skin types',
          inStock: true,
          brand: 'Heritage Soap',
          features: ['Moisturizing', 'Gentle formula', 'Traditional ingredients']
        }
      ];
      
      let filteredProducts = beautyProducts;
      
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
        
        if (subcategory) {
          filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
        }
      }

      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => {
          if (max) {
            return p.price >= min && p.price <= max;
          } else {
            return p.price >= min;
          }
        });
      }

      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          break;
        default:
          break;
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 800);
    
    const savedFavorites = localStorage.getItem('beautyFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [category, subcategory, priceRange, sortBy]);

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      localStorage.setItem('beautyFavorites', JSON.stringify(newFavorites));
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
        category: 'Beauty & Personal Care',
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
      { name: 'Beauty & Personal Care', link: basePath }
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

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="beauty-personal-care">
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
         "Beauty & Personal Care"}
      </h1>

      {!category && (
        <>
          <p className="page-description">
            Discover authentic Ghanaian beauty and personal care products made with natural, 
            locally-sourced ingredients. From traditional African black soap to shea butter 
            moisturizers, our products combine ancient wisdom with modern formulations.
          </p>
          
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Link to={`${basePath}/${cat.link}`} key={index} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <div className="category-image-container">
                  <img src={cat.image || '/images/placeholder.jpg'} alt={cat.name} />
                </div>
                <h2>{cat.name}</h2>
                <p className="category-description">{cat.description}</p>
                {cat.subcats && <span className="subcategory-count">{cat.subcats.length} types</span>}
              </Link>
            ))}
          </div>
        </>
      )}

      {category && !subcategory && currentCategory && currentCategory.subcats && (
        <>
          <p className="page-description">
            Browse our selection of {currentCategory.name.toLowerCase()} products handcrafted in Ghana.
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
          <button className="filter-toggle" onClick={toggleFilter}>
            <FaFilter /> Filters
          </button>

          <div className={`filters-sidebar ${filterOpen ? 'open' : ''}`}>
            <h3>Filter & Sort</h3>
            
            <div className="filter-group">
              <h4>Price Range</h4>
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="0-10">Under GH₵10</option>
                <option value="10-20">GH₵10 - GH₵20</option>
                <option value="20-30">GH₵20 - GH₵30</option>
                <option value="30-">Over GH₵30</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Sort By</h4>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <button className="close-filters" onClick={toggleFilter}>Close</button>
          </div>

          <div className="products-container">
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
                    <Link to={basePath} className="back-link">Return to Beauty & Personal Care</Link>
                  </div>
                ) : (
                  <>
                    <div className="results-count">
                      <p>Showing {products.length} products</p>
                      
                      <div className="desktop-sort">
                        <label><FaSort /> Sort By:</label>
                        <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="popular">Popularity</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="newest">Newest</option>
                        </select>
                      </div>
                    </div>
                  
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
                            <div className="product-brand">{product.brand}</div>
                          </div>
                          <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-rating">
                              <FaStar className="star-icon" />
                              <span>{product.rating.toFixed(1)}</span>
                            </div>
                            <p className="product-description">{product.description}</p>
                            
                            {product.features && (
                              <ul className="product-features">
                                {product.features.map((feature, idx) => (
                                  <li key={idx}>{feature}</li>
                                ))}
                              </ul>
                            )}
                            
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyPersonalCare;