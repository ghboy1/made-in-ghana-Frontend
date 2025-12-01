import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaShoppingBasket, FaStar } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext'; // Add this import
import './HomeKitchen.css';

// Enhanced with more Ghana-specific items and descriptions
const homeKitchenItems = [
  { 
    id: 1, 
    name: 'Handwoven Bolga Basket Set', 
    subcategory: 'storage', 
    price: 120, 
    rating: 4.8,
    image: '/images/bolga-basket-set.jpg',
    description: 'Traditional Ghanaian handwoven baskets from Bolgatanga, perfect for storage and decoration',
    artisan: 'Crafted by women\'s cooperative in Northern Ghana'
  },
  { 
    id: 2, 
    name: 'African Wooden Utensil Set', 
    subcategory: 'kitchen-dining', 
    price: 85, 
    rating: 4.7,
    image: '/images/wooden-utensil-set.jpg',
    description: 'Hand-carved cooking utensils made from sustainable Ghanaian hardwood',
    artisan: 'Created by master carvers from Kumasi'
  },
  { 
    id: 3, 
    name: 'Hand-Dyed Batik Tablecloth', 
    subcategory: 'kitchen-dining', 
    price: 75, 
    rating: 4.5,
    image: '/images/batik-tablecloth.jpg',
    description: 'Beautiful batik-dyed cotton tablecloth featuring traditional Ghanaian patterns',
    artisan: 'Crafted by textile artists in Accra'
  },
  { 
    id: 4, 
    name: 'Royal Kente Throw Pillows (Set of 2)', 
    subcategory: 'decor', 
    price: 95, 
    rating: 4.9,
    image: '/images/kente-pillows.jpg',
    description: 'Luxurious throw pillows with authentic kente cloth covers',
    artisan: 'Handwoven by master kente weavers in the Volta Region'
  },
  { 
    id: 5, 
    name: 'Adinkra Symbol Wall Art', 
    subcategory: 'wall-art', 
    price: 150, 
    rating: 4.6,
    image: '/images/adinkra-wall-art.jpg',
    description: 'Elegant wooden wall art featuring traditional Adinkra symbols and their meanings',
    artisan: 'Carved by artisans in the Ashanti Region'
  },
  { 
    id: 6, 
    name: 'Recycled Glass Beaded Curtain', 
    subcategory: 'decor', 
    price: 130, 
    rating: 4.4,
    image: '/images/beaded-curtain.jpg',
    description: 'Decorative door curtain made from recycled glass beads in Ghana flag colors',
    artisan: 'Created by bead artisans in the Eastern Region'
  },
  { 
    id: 7, 
    name: 'Palm Leaf Woven Placemats (Set of 4)', 
    subcategory: 'kitchen-dining', 
    price: 45, 
    rating: 4.5,
    image: '/images/palm-placemats.jpg',
    description: 'Eco-friendly placemats handwoven from sustainable palm leaves',
    artisan: 'Made by rural crafters in Ghana\'s Western Region'
  },
  { 
    id: 8, 
    name: 'Shea Butter Soap Set', 
    subcategory: 'bath', 
    price: 40, 
    rating: 4.8,
    image: '/images/shea-soap-set.jpg',
    description: 'Organic handmade soaps with pure Ghanaian shea butter and essential oils',
    artisan: 'Produced by women\'s collective in Northern Ghana'
  },
];

const subcategories = [
  { label: "Kitchen & Dining", slug: 'kitchen-dining', icon: '🍽️' },
  { label: 'Home Décor', slug: 'decor', icon: '🏺' },
  { label: 'Storage & Organization', slug: 'storage', icon: '🧺' },
  { label: 'Bath & Body', slug: 'bath', icon: '🧼' },
  { label: 'Wall Art', slug: 'wall-art', icon: '🖼️' },
  { label: 'Furniture', slug: 'furniture', icon: '🪑' },
  { label: 'Textiles', slug: 'textiles', icon: '🧵' },
  { label: 'Lighting', slug: 'lighting', icon: '💡' },
];

function HomeKitchen() {
  const { subcategory } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const { addToCart } = useCart(); // Add this line
  const [addedToCart, setAddedToCart] = useState(null);
  
  // Modified handler with feedback
  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    };
    
    addToCart(cartItem);
    
    // Show feedback
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000); // Reset after 2 seconds
  };

  const filteredItems = homeKitchenItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return subcategory ? item.subcategory === subcategory && matchesSearch : matchesSearch;
  });

  const currentSubcategory = subcategories.find(sub => sub.slug === subcategory);

  return (
    <div className="home-kitchen-page">
      {/* Ghana-themed flag banner */}
      <div className="ghana-flag-banner">
        <div className="flag-stripe red"></div>
        <div className="flag-stripe gold"></div>
        <div className="flag-stripe green"></div>
      </div>
      
      <header className="category-header">
        <div className="header-content">
          <h1 className="category-title">
            {currentSubcategory?.label || 'Ghanaian Home & Kitchen Treasures'}
          </h1>
          <p className="category-tagline">Authentic handcrafted home goods celebrating Ghana's rich cultural heritage</p>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={`Search for ${currentSubcategory?.label || 'handcrafted Ghanaian home goods'}...`}
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
          <section className="featured-section">
            <h2 className="section-title">Discover Authentic Ghanaian Craftsmanship</h2>
            <div className="featured-banner">
              <div className="featured-content">
                <h3>Traditional Meets Modern</h3>
                <p>Each piece tells a story of Ghana's rich heritage, brought to your home with contemporary functionality.</p>
                <Link to="/home-kitchen/kitchen-dining" className="btn-primary">Explore Collection</Link>
              </div>
            </div>
          </section>
          
          <SubcategoryGrid subcategories={subcategories} />
        </>
      ) : (
        <ItemGrid 
          items={filteredItems} 
          currentCategory={currentSubcategory?.label || 'Home & Kitchen'} 
          onHover={setIsHovered}
          hoveredItem={isHovered}
          onAddToCart={handleAddToCart} // Pass the handler to ItemGrid
          addedToCart={addedToCart} // Pass addedToCart to ItemGrid
        />
      )}
      
      <section className="artisan-highlight">
        <div className="artisan-content">
          <h2>Meet Our Artisans</h2>
          <p>Every purchase supports skilled Ghanaian craftspeople and preserves traditional techniques passed down through generations.</p>
          <Link to="/artisans" className="btn-secondary">Learn Their Stories</Link>
        </div>
      </section>
    </div>
  );
}

const SubcategoryGrid = ({ subcategories }) => (
  <div className="subcategory-grid">
    {subcategories.map((sub) => (
      <article key={sub.slug} className="subcategory-card">
        <Link to={`/home-kitchen/${sub.slug}`} className="subcategory-link">
          <div className="subcategory-icon">{sub.icon}</div>
          <h2 className="subcategory-title">{sub.label}</h2>
          <div className="subcategory-image">
            <img 
              src={`/images/categories/${sub.slug}.jpg`} 
              alt={sub.label} 
              loading="lazy"
            />
          </div>
          <span className="explore-text">Explore →</span>
        </Link>
      </article>
    ))}
  </div>
);

const ItemGrid = ({ items, currentCategory, onHover, hoveredItem, onAddToCart, addedToCart }) => (
  <div className="item-grid">
    <h2 className="category-subtitle">{currentCategory} Collection</h2>
    
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
            <div className="artisan-tag">{item.artisan}</div>
          </div>
          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <div className="item-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="rating-value">{item.rating}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <p className="item-price">GH₵ {item.price.toFixed(2)}</p>
            <div className="item-actions">
              <Link to={`/products/${item.id}`} className="btn-view">
                View Details
              </Link>
              <button 
                className={`btn-cart ${addedToCart === item.id ? 'added' : ''}`}
                onClick={() => onAddToCart(item)}
              >
                <FaShoppingBasket /> 
                {addedToCart === item.id ? 'Added!' : 'Add to Cart'}
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

export default HomeKitchen;