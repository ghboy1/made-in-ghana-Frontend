import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaStar, FaLeaf, FaHeart } from 'react-icons/fa';
import './HealthHousehold.css';

// Enhanced subcategories with Ghana-specific themes and icons
const subcategories = [
  { label: 'Traditional Remedies', slug: 'traditional-remedies', icon: '🌿', description: 'Natural healing methods passed down through generations' },
  { label: 'Shea Products', slug: 'shea-products', icon: '🥥', description: 'Authentic shea butter and derivatives from Northern Ghana' },
  { label: 'Herbal Medicine', slug: 'herbal-medicine', icon: '🌱', description: 'Medicinal plants and herbs used in Ghanaian healing traditions' },
  { label: 'Organic Household', slug: 'organic-household', icon: '🧹', description: 'Eco-friendly cleaning products made with local ingredients' },
  { label: 'Mother & Baby Care', slug: 'mother-baby', icon: '👶', description: 'Natural products for maternal and infant wellness' },
  { label: 'Personal Wellness', slug: 'personal-wellness', icon: '💆', description: 'Self-care items inspired by Ghanaian wellness practices' },
  { label: 'Natural Supplements', slug: 'supplements', icon: '💊', description: 'Nutritional support from Ghana\'s indigenous plants' },
  { label: 'Home Remedies', slug: 'home-remedies', icon: '🏠', description: 'DIY health solutions using Ghanaian ingredients' },
];

// Ghana-specific health and household items
const healthHouseholdItems = [
  { 
    id: 1, 
    name: 'Pure Shea Butter (Unrefined)', 
    subcategory: 'shea-products', 
    price: 15.99, 
    rating: 4.9,
    image: '/images/health/shea-butter.jpg',
    description: 'Handcrafted by women cooperatives in Northern Ghana, this 100% pure unrefined shea butter is excellent for skin moisturizing and healing.',
    origin: 'Tamale, Northern Region',
    benefits: ['Moisturizes dry skin', 'Reduces inflammation', 'Natural UV protection', 'Anti-aging properties'],
    ingredients: '100% unrefined Butyrospermum parkii (shea butter)',
    usage: 'Apply directly to skin, or melt and incorporate into DIY skincare recipes.'
  },
  { 
    id: 2, 
    name: 'Moringa Leaf Powder', 
    subcategory: 'supplements', 
    price: 12.50, 
    rating: 4.7,
    image: '/images/health/moringa-powder.jpg',
    description: 'Organic moringa leaf powder harvested from sustainable farms in Ghana. Packed with nutrients and antioxidants.',
    origin: 'Eastern Region, Ghana',
    benefits: ['Rich in vitamins and minerals', 'Supports immune system', 'Anti-inflammatory properties', 'Natural energy booster'],
    ingredients: '100% organic Moringa oleifera leaf powder',
    usage: 'Add 1-2 teaspoons to smoothies, juices, or sprinkle on food.'
  },
  { 
    id: 3, 
    name: 'Neem & Aloe Soap', 
    subcategory: 'personal-wellness', 
    price: 8.75, 
    rating: 4.5,
    image: '/images/health/neem-soap.jpg',
    description: 'Handmade soap combining neem oil and locally grown aloe vera, traditional ingredients used for skin healing in Ghana.',
    origin: 'Volta Region, Ghana',
    benefits: ['Natural antibacterial properties', 'Treats skin conditions', 'Gentle cleansing', 'Suitable for sensitive skin'],
    ingredients: 'Organic oils, neem extract, aloe vera gel, shea butter, essential oils',
    usage: 'Use as regular soap for face and body.'
  },
  { 
    id: 4, 
    name: 'Baobab Fruit Powder', 
    subcategory: 'supplements', 
    price: 18.99, 
    rating: 4.8,
    image: '/images/health/baobab-powder.jpg',
    description: 'Nutrient-rich powder from the fruit of Ghana\'s baobab trees, known as the "Tree of Life" in many communities.',
    origin: 'Savannah Region, Ghana',
    benefits: ['High in vitamin C', 'Supports digestive health', 'Boosts immune system', 'Rich in antioxidants'],
    ingredients: '100% pure organic baobab fruit pulp powder',
    usage: 'Mix 1-2 teaspoons into water, juice, smoothies, or yogurt.'
  },
  { 
    id: 5, 
    name: 'Black Soap (Alata Samina)', 
    subcategory: 'personal-wellness', 
    price: 9.50, 
    rating: 4.9,
    image: '/images/health/black-soap.jpg',
    description: 'Traditional Ghanaian black soap made with cocoa pod ash, palm oil, and coconut oil. A centuries-old formula for natural cleansing.',
    origin: 'Ashanti Region, Ghana',
    benefits: ['Deep cleansing', 'Treats acne & eczema', 'Gentle exfoliation', 'All-natural ingredients'],
    ingredients: 'Cocoa pod ash, palm kernel oil, coconut oil, plantain skin ash, shea butter',
    usage: 'Lather with water and use as a daily cleanser for face and body.'
  },
  { 
    id: 6, 
    name: 'Calabash Scrubbing Sponge', 
    subcategory: 'organic-household', 
    price: 5.25, 
    rating: 4.4,
    image: '/images/health/calabash-sponge.jpg',
    description: 'Natural exfoliating bath sponge made from dried calabash gourd fiber, a traditional Ghanaian bathing tool.',
    origin: 'Central Region, Ghana',
    benefits: ['Natural exfoliation', 'Biodegradable', 'Improves circulation', 'Traditional craftsmanship'],
    ingredients: '100% natural dried calabash gourd fiber',
    usage: 'Use with soap or body wash for gentle exfoliation during bathing.'
  },
  { 
    id: 7, 
    name: 'Prekese Herbal Tea', 
    subcategory: 'herbal-medicine', 
    price: 14.75, 
    rating: 4.6,
    image: '/images/health/prekese-tea.jpg',
    description: 'Traditional medicinal tea made from the dried fruit of the Prekese tree (Tetrapleura tetraptera), used for generations in Ghana.',
    origin: 'Western Region, Ghana',
    benefits: ['Supports respiratory health', 'Anti-inflammatory properties', 'Aids digestion', 'Rich in antioxidants'],
    ingredients: '100% natural dried Prekese fruit',
    usage: 'Steep one piece in hot water for 5-10 minutes. Add honey if desired.'
  },
  { 
    id: 8, 
    name: 'Coconut Oil Hair Treatment', 
    subcategory: 'personal-wellness', 
    price: 11.99, 
    rating: 4.7,
    image: '/images/health/coconut-oil.jpg',
    description: 'Cold-pressed virgin coconut oil harvested from Ghana\'s coastal regions, traditionally used for hair and skin care.',
    origin: 'Western Region, Ghana',
    benefits: ['Deep hair conditioning', 'Promotes hair growth', 'Prevents breakage', 'Natural shine'],
    ingredients: '100% cold-pressed virgin coconut oil',
    usage: 'Apply to hair, massage into scalp, leave for 30 minutes or overnight, then wash.'
  },
  { 
    id: 9, 
    name: 'Dawadawa Spice', 
    subcategory: 'traditional-remedies', 
    price: 7.50, 
    rating: 4.3,
    image: '/images/health/dawadawa.jpg',
    description: 'Fermented locust bean seasoning used in Ghanaian cuisine and traditional medicine for gut health and nutrition.',
    origin: 'Northern Region, Ghana',
    benefits: ['Rich in probiotics', 'Source of protein', 'Supports digestive health', 'Traditional superfood'],
    ingredients: 'Fermented locust beans',
    usage: 'Use as a seasoning in soups and stews, or take small amounts as a digestive aid.'
  },
  { 
    id: 10, 
    name: 'Shea Nut Shell Cleaning Powder', 
    subcategory: 'organic-household', 
    price: 6.25, 
    rating: 4.2,
    image: '/images/health/shea-shell-powder.jpg',
    description: 'Natural cleaning powder made from ground shea nut shells, a zero-waste byproduct of shea butter production.',
    origin: 'Northern Region, Ghana',
    benefits: ['Natural abrasive', 'Eco-friendly', 'Biodegradable', 'Supports shea producers'],
    ingredients: '100% ground shea nut shells',
    usage: 'Mix with water to form a paste and use for scouring pots, pans, and surfaces.'
  },
  { 
    id: 11, 
    name: 'Organic Cocoa Butter', 
    subcategory: 'shea-products', 
    price: 16.50, 
    rating: 4.8,
    image: '/images/health/cocoa-butter.jpg',
    description: 'Pure cocoa butter from Ghana\'s world-famous cocoa, used traditionally for skin nourishment and stretch mark prevention.',
    origin: 'Ashanti Region, Ghana',
    benefits: ['Deeply moisturizing', 'Reduces stretch marks', 'Anti-aging properties', 'Rich in antioxidants'],
    ingredients: '100% pure organic cocoa butter',
    usage: 'Apply directly to skin or melt and incorporate into DIY skincare recipes.'
  },
  { 
    id: 12, 
    name: 'Moringa Oil', 
    subcategory: 'personal-wellness', 
    price: 19.75, 
    rating: 4.6,
    image: '/images/health/moringa-oil.jpg',
    description: 'Cold-pressed oil from moringa seeds grown in Ghana, used traditionally for skin care and hair treatment.',
    origin: 'Eastern Region, Ghana',
    benefits: ['Nutrient-rich moisturizer', 'Anti-aging properties', 'Promotes hair growth', 'Soothes skin inflammation'],
    ingredients: '100% cold-pressed moringa seed oil',
    usage: 'Apply a few drops directly to skin or hair.'
  },
  { 
    id: 13, 
    name: 'Hibiscus & Baobab Herbal Tea', 
    subcategory: 'supplements', 
    price: 13.25, 
    rating: 4.7,
    image: '/images/health/hibiscus-tea.jpg',
    description: 'Antioxidant-rich tea blend using flowers and fruits indigenous to Ghana, traditionally consumed for blood pressure management.',
    origin: 'Multiple regions of Ghana',
    benefits: ['Supports heart health', 'Rich in vitamin C', 'Natural antioxidants', 'Caffeine-free'],
    ingredients: 'Dried hibiscus flowers, baobab fruit powder, lemongrass',
    usage: 'Steep in hot water for 5-7 minutes. Can be enjoyed hot or cold.'
  },
  { 
    id: 14, 
    name: 'Neem Oil Insect Repellent', 
    subcategory: 'organic-household', 
    price: 10.99, 
    rating: 4.5,
    image: '/images/health/neem-repellent.jpg',
    description: 'Natural insect repellent made from neem oil, traditionally used in Ghana to keep insects away from homes and gardens.',
    origin: 'Volta Region, Ghana',
    benefits: ['Chemical-free', 'Pet-safe', 'Effective against multiple insects', 'Sustainable'],
    ingredients: 'Neem oil, essential oils, natural emulsifiers',
    usage: 'Spray around doors, windows, and garden areas to repel insects.'
  },
  { 
    id: 15, 
    name: 'Infant Shea Butter Cream', 
    subcategory: 'mother-baby', 
    price: 13.50, 
    rating: 4.9,
    image: '/images/health/baby-shea.jpg',
    description: 'Gentle formulation of whipped shea butter specifically for baby skin, a traditional Ghanaian remedy for diaper rash and dry skin.',
    origin: 'Northern Region, Ghana',
    benefits: ['Soothes diaper rash', 'Gentle on sensitive skin', 'All-natural ingredients', 'Traditionally used for generations'],
    ingredients: 'Unrefined shea butter, calendula oil, chamomile extract',
    usage: 'Apply a small amount to clean, dry skin as needed.'
  },
];

function HealthHousehold() {
  const { subcategory } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredSubcategories = subcategories.filter(sub =>
    sub.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsToDisplay = healthHouseholdItems.filter(item =>
    (subcategory ? item.subcategory === subcategory : true) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSubcategory = subcategory
    ? subcategories.find(sub => sub.slug === subcategory)
    : null;

  return (
    <div className="health-household-page">
      {/* Ghana flag-inspired banner */}
      <div className="ghana-flag-banner">
        <div className="flag-stripe red"></div>
        <div className="flag-stripe gold"></div>
        <div className="flag-stripe green"></div>
      </div>
      
      <header className="category-header">
        <div className="header-content">
          <h1 className="category-title">
            {currentSubcategory?.label || 'Traditional Ghanaian Wellness'}
          </h1>
          <p className="category-tagline">
            {currentSubcategory?.description || 'Natural remedies and household products inspired by centuries of Ghanaian wisdom'}
          </p>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={`Search ${currentSubcategory?.label || 'traditional Ghanaian remedies'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
      </header>

      {!subcategory ? (
        <>
          <section className="hero-section">
            <div className="hero-content">
              <h2>Healing Traditions of Ghana</h2>
              <p>Discover natural remedies and wellness products that have been used by generations of Ghanaians. Our products harness the power of indigenous plants and traditional knowledge.</p>
              <Link to="/health-household/traditional-remedies" className="btn-primary">Explore Traditional Remedies</Link>
            </div>
            <div className="hero-image">
              <img src="/images/ghana-wellness-hero.jpg" alt="Traditional Ghanaian wellness products" />
            </div>
          </section>
          
          <SubcategoryGrid subcategories={filteredSubcategories} />
          
          <section className="featured-products">
            <h2 className="section-title">Most Popular Wellness Products</h2>
            <div className="featured-grid">
              {healthHouseholdItems.slice(0, 3).map(item => (
                <FeaturedProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <ItemGrid 
          items={itemsToDisplay} 
          currentCategory={currentSubcategory?.label || 'Health & Household'} 
          onHover={setHoveredItem}
          hoveredItem={hoveredItem}
        />
      )}
      
      <section className="wellness-heritage">
        <div className="heritage-content">
          <h2>Ghanaian Wellness Heritage</h2>
          <p>For centuries, Ghanaians have utilized the abundant natural resources of their land for healing, self-care, and household needs. Our products honor this legacy while supporting local communities and sustainable practices.</p>
          <div className="heritage-badges">
            <div className="badge">
              <FaLeaf className="badge-icon" />
              <span>Natural & Organic</span>
            </div>
            <div className="badge">
              <FaHeart className="badge-icon" />
              <span>Community Supported</span>
            </div>
            <div className="badge">
              <span className="adinkra-symbol">&#x2B1B;</span>
              <span>Traditional Knowledge</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const SubcategoryGrid = ({ subcategories }) => (
  <div className="subcategory-grid">
    <h2 className="section-title">Explore Wellness Categories</h2>
    {subcategories.length > 0 ? (
      subcategories.map((sub) => (
        <article key={sub.slug} className="subcategory-card">
          <Link to={`/health-household/${sub.slug}`} className="subcategory-link">
            <div className="subcategory-icon">{sub.icon}</div>
            <h3 className="subcategory-title">{sub.label}</h3>
            <p className="subcategory-description">{sub.description}</p>
            <span className="explore-text">Explore →</span>
          </Link>
        </article>
      ))
    ) : (
      <p className="no-results">No matching categories found</p>
    )}
  </div>
);

const FeaturedProductCard = ({ product }) => (
  <div className="featured-product">
    <div className="featured-image">
      <img src={product.image} alt={product.name} />
      <div className="featured-badge">Popular</div>
    </div>
    <div className="featured-details">
      <h3>{product.name}</h3>
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"} />
        ))}
        <span>{product.rating}</span>
      </div>
      <p className="origin">From {product.origin}</p>
      <p className="price">GH₵ {product.price.toFixed(2)}</p>
      <Link to={`/products/${product.id}`} className="btn-view">View Details</Link>
    </div>
  </div>
);

const ItemGrid = ({ items, currentCategory, onHover, hoveredItem }) => (
  <div className="item-grid">
    <h2 className="category-subtitle">{currentCategory}</h2>
    
    {items.length > 0 ? (
      items.map(item => (
        <article 
          key={item.id} 
          className={`item-card ${hoveredItem === item.id ? 'hovered' : ''}`}
          onMouseEnter={() => onHover(item.id)}
          onMouseLeave={() => onHover(null)}
        >
          <div className="item-image-container">
            <img 
              src={item.image} 
              alt={item.name} 
              className="item-image"
              loading="lazy"
            />
            <div className="origin-tag">{item.origin}</div>
          </div>
          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <div className="item-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(item.rating) ? "star-filled" : "star-empty"} />
              ))}
              <span className="rating-value">{item.rating}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <div className="item-benefits">
              {item.benefits.slice(0, 2).map((benefit, index) => (
                <span key={index} className="benefit-tag">{benefit}</span>
              ))}
            </div>
            <p className="item-price">GH₵ {item.price.toFixed(2)}</p>
            <div className="item-actions">
              <Link to={`/products/${item.id}`} className="btn-view">
                View Details
              </Link>
              <button className="btn-cart">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </article>
      ))
    ) : (
      <p className="no-results">No products found matching your search</p>
    )}
  </div>
);

export default HealthHousehold;