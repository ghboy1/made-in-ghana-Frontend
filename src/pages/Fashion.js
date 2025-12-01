import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeart, FaRegHeart, FaShoppingCart, FaRegStar, FaStar, FaSearch, 
         FaTimes, FaArrowRight, FaCheck, FaUndo, FaMapMarkerAlt, 
         FaTruck, FaLock, FaInfoCircle, FaBars, FaCreditCard, FaChevronDown,
         FaChevronUp, FaAngleDown } from 'react-icons/fa';
import './FashionUniverse.css';
import './FashionTransition.css';
import ProductCard from '../components/ProductCard';

// Set Modal app element for accessibility
Modal.setAppElement('#root');

// -- Countdown Component
const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;
      
      if (diff <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return <div className="countdown expired">Offer Expired</div>;
  }

  const { days, hours, minutes, seconds } = timeLeft;
  
  return (
    <div className="countdown">
      <div className="countdown-segment">
        <span className="countdown-value">{days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-segment">
        <span className="countdown-value">{hours.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-segment">
        <span className="countdown-value">{minutes.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Mins</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-segment">
        <span className="countdown-value">{seconds.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Secs</span>
      </div>
    </div>
  );
};

// -- Reviews Component
const CustomerReviews = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="customer-reviews">
      <div className="section-header">
        <h2>Customer Stories</h2>
        <div className="ghana-flag-mini">
          <div className="stripe red"></div>
          <div className="stripe gold"></div>
          <div className="stripe green"></div>
        </div>
      </div>
      
      <div className="reviews-slider">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="review-slide">
              <div className="review-content">
                <div className="review-quote">"</div>
                <p className="review-text">{review.comment}</p>
                <div className="review-quote closing">"</div>
                <div className="reviewer-info">
                  <img src={`/assets/images${review.avatar}`} alt={review.name} className="reviewer-avatar" />
                  <div className="reviewer-details">
                    <span className="reviewer-name">{review.name}</span>
                    {review.badge && <span className="reviewer-badge">{review.badge}</span>}
                    <div className="review-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                          {i < review.rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// -- Cart Item Component
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={`/assets/images${item.image}`} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <div className="cart-item-meta">
          {item.size && <span className="cart-item-size">Size: {item.size}</span>}
          {item.color && <span className="cart-item-color">Color: {item.color}</span>}
        </div>
        <div className="cart-item-price">GH₵ {item.price.toFixed(2)}</div>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-selector">
          <button 
            className="quantity-btn minus"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)}
            disabled={item.quantity <= 1}
          >-</button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn plus"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)}
          >+</button>
        </div>
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id, item.size, item.color)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// -- Size Guide Component
const SizeGuide = ({ onClose }) => {
  return (
    <div className="size-guide">
      <div className="size-guide-header">
        <h3>Size Guide</h3>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
      </div>
      <div className="size-guide-content">
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Waist (cm)</th>
              <th>Hips (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>86-91</td>
              <td>71-76</td>
              <td>86-91</td>
            </tr>
            <tr>
              <td>M</td>
              <td>91-97</td>
              <td>76-81</td>
              <td>91-97</td>
            </tr>
            <tr>
              <td>L</td>
              <td>97-102</td>
              <td>81-86</td>
              <td>97-102</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>102-107</td>
              <td>86-91</td>
              <td>102-107</td>
            </tr>
          </tbody>
        </table>
        <div className="measuring-tips">
          <h4>How to Measure</h4>
          <ul>
            <li>
              <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
            </li>
            <li>
              <strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.
            </li>
            <li>
              <strong>Hips:</strong> Measure around the fullest part of your hips.
            </li>
          </ul>
        </div>
      </div>
      <div className="size-guide-footer">
        <p>All measurements are body measurements, not garment dimensions. For traditional Ghanaian garments, we recommend selecting one size larger than your regular size.</p>
      </div>
    </div>
  );
};

// Main component
export default function Fashion() {
  // -- States
  const [started, setStarted] = useState(false);
  const [pageTransition, setPageTransition] = useState('');
  const [filterOccasion, setFilterOccasion] = useState('all');
  const [filterStyle, setFilterStyle] = useState('all');
  const [filterColor, setFilterColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fashion-wishlist')) || [];
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fashion-cart')) || [];
    } catch {
      return [];
    }
  });
  const [overlays, setOverlays] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('default');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    occasion: false,
    style: false,
    color: false,
    price: false
  });
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [pageTransitionActive, setPageTransitionActive] = useState(false);
  const notificationTimeoutRef = useRef(null);

  // Refs
  const collectionSectionRef = useRef(null);
  const heroSectionRef = useRef(null);

  // -- Enhanced outfit data
  const outfits = [
    { 
      id: 1, 
      name: 'Elegant Kente Fusion Dress', 
      image: '/Elegant Kente Fusion Dress.jpg',
      occasion: 'formal', 
      style: 'traditional', 
      color: 'multicolor',
      price: 450.00,
      rating: 4.8,
      discount: 0,
      description: 'A stunning fusion of traditional kente patterns with modern silhouette. Perfect for special occasions that call for celebrating Ghanaian heritage with contemporary elegance.',
      details: {
        material: '100% Handwoven Kente Cloth',
        care: 'Dry clean only',
        madeIn: 'Ghana, by skilled artisans in the Volta Region',
        features: ['Authentic kente patterns', 'Fitted bodice', 'Full flared skirt', 'Hidden side zipper']
      },
      images: ['/Elegant Kente Fusion Dress1.jpg', '/outfits/dress1-2.jpg', '/outfits/dress1-3.jpg'],
      stock: 15
    },
    { 
      id: 2, 
      name: 'Royal Ashanti Evening Gown', 
      image: '/outfits/Royal Ashanti Evening Gown.jpg',
      occasion: 'formal', 
      style: 'classic', 
      color: 'red',
      price: 650.00,
      rating: 4.9,
      discount: 15,
      description: 'Inspired by the regal traditions of the Ashanti kingdom, this elegant evening gown combines luxurious fabrics with traditional adinkra symbols embroidered in gold thread.',
      details: {
        material: 'Premium silk with gold thread embroidery',
        care: 'Professional dry cleaning recommended',
        madeIn: 'Ghana, by master craftspeople in Kumasi',
        features: ['Hand-embroidered adinkra symbols', 'Floor-length design', 'Subtle train', 'Structured bodice']
      },
      images: ['/outfits/gown-1.jpg', '/outfits/gown-2.jpg', '/outfits/gown-3.jpg'],
      stock: 8
    },
    { 
      id: 3, 
      name: 'Modern Denim & Ankara Ensemble', 
      image: '/outfits/denim.jpg',
      occasion: 'casual', 
      style: 'contemporary', 
      color: 'blue',
      price: 320.00,
      rating: 4.6,
      discount: 0,
      description: 'A perfect blend of Western denim and vibrant Ghanaian ankara fabric. This jacket and jeans combination represents the modern Ghanaian fashion sense that bridges cultures.',
      details: {
        material: 'Premium denim with authentic ankara fabric accents',
        care: 'Machine wash cold, gentle cycle, line dry',
        madeIn: 'Ghana, designed in Accra',
        features: ['Ankara fabric panels', 'Custom bronze buttons', 'Relaxed fit', 'Multiple pockets']
      },
      images: ['/outfits/denim-1.jpg', '/outfits/denim-2.jpg', '/outfits/denim-3.jpg'],
      stock: 20
    },
    { 
      id: 4, 
      name: 'Executive Ankara Suit', 
      image: '/outfits/suit.jpg',
      occasion: 'formal', 
      style: 'business', 
      color: 'neutral',
      price: 520.00,
      rating: 4.7,
      discount: 10,
      description: 'Redefine business attire with this executive suit featuring subtle ankara print details. Perfect for the professional who wants to incorporate African heritage into corporate wear.',
      details: {
        material: 'Wool blend with ankara fabric accents',
        care: 'Dry clean only',
        madeIn: 'Ghana, tailored in Accra',
        features: ['Slim fit', 'Ankara pocket square and lining', 'Double-vented back', 'Hand-finished lapels']
      },
      images: ['/outfits/suit-1.jpg', '/outfits/suit-2.jpg', '/outfits/suit-3.jpg'],
      stock: 12
    },
    { 
      id: 5, 
      name: 'Bohemian Ankara Maxi Set', 
      image: '/outfits/boho.jpg',
      occasion: 'casual', 
      style: 'bohemian', 
      color: 'earth tones',
      price: 280.00,
      rating: 4.5,
      discount: 0,
      description: 'Free-spirited and comfortable, this bohemian-style top and maxi skirt set features traditional Ghanaian patterns in earthy tones. Perfect for casual outings and relaxed gatherings.',
      details: {
        material: 'Lightweight cotton with authentic ankara prints',
        care: 'Hand wash cold, line dry',
        madeIn: 'Ghana, crafted in Cape Coast',
        features: ['Adjustable waist ties', 'Full-length skirt', 'Wide sleeves', 'Natural dyes used in fabric']
      },
      images: ['/outfits/boho-1.jpg', '/outfits/boho-2.jpg', '/outfits/boho-3.jpg'],
      stock: 18
    },
    { 
      id: 6, 
      name: 'Children\'s Kente Celebration Set', 
      image: '/outfits/kids.jpg',
      occasion: 'cultural', 
      style: 'traditional', 
      color: 'bright',
      price: 180.00,
      rating: 4.8,
      discount: 20,
      description: 'Specially designed for children to celebrate their Ghanaian heritage, this colorful kente outfit is perfect for cultural events, festivals, and family celebrations.',
      details: {
        material: 'Lightweight kente-inspired cotton',
        care: 'Machine washable, gentle cycle',
        madeIn: 'Ghana, produced by women\'s cooperative in Volta Region',
        features: ['Adjustable waist', 'Comfortable fit', 'Vibrant colors', 'Ages 3-12']
      },
      images: ['/outfits/kids-1.jpg', '/outfits/kids-2.jpg', '/outfits/kids-3.jpg'],
      stock: 25
    },
    { 
      id: 7, 
      name: 'Contemporary Kente Patchwork Jacket', 
      image: '/outfits/jacket.jpg',
      occasion: 'casual', 
      style: 'contemporary', 
      color: 'mixed',
      price: 290.00,
      rating: 4.4,
      discount: 0,
      description: 'A statement piece that combines traditional kente patches in a modern jacket design. Versatile enough to pair with jeans or dress pants for a unique look.',
      details: {
        material: 'Cotton blend with authentic kente patches',
        care: 'Dry clean recommended',
        madeIn: 'Ghana, designed in Accra',
        features: ['Unique patchwork design', 'Front pockets', 'Lined interior', 'Structured shoulders']
      },
      images: ['/outfits/jacket-1.jpg', '/outfits/jacket-2.jpg', '/outfits/jacket-3.jpg'],
      stock: 16
    },
    { 
      id: 8, 
      name: 'Wedding Kente Ensemble', 
      image: '/outfits/wedding.jpg',
      occasion: 'wedding', 
      style: 'traditional', 
      color: 'gold',
      price: 750.00,
      rating: 5.0,
      discount: 5,
      description: 'Traditional Ghanaian wedding attire featuring luxurious hand-woven kente cloth. This matching couple\'s set is designed for the most special day of your life.',
      details: {
        material: 'Premium hand-woven kente cloth',
        care: 'Professional dry cleaning only',
        madeIn: 'Ghana, by master weavers in Bonwire',
        features: ['Matching bride and groom set', 'Royal pattern', 'Gold thread accents', 'Custom sizing']
      },
      images: ['/outfits/wedding-1.jpg', '/outfits/wedding-2.jpg', '/outfits/wedding-3.jpg'],
      stock: 5
    }
  ];

  // Enhanced virtual try-on items
  const virtualItems = [
    { id: 'hat', name: 'Traditional Hat', image: '/assets/images/tryon/hat.png', pos: { top: 0, left: 50 } },
    { id: 'shirt', name: 'Kente Shirt', image: '/assets/images/tryon/shirt.png', pos: { top: 100, left: 50 } },
    { id: 'pants', name: 'Matching Pants', image: '/assets/images/tryon/pants.png', pos: { top: 230, left: 50 } },
    { id: 'shoes', name: 'Leather Sandals', image: '/assets/images/tryon/shoes.png', pos: { top: 350, left: 50 } },
    { id: 'necklace', name: 'Beaded Necklace', image: '/assets/images/tryon/necklace.png', pos: { top: 80, left: 50 } },
    { id: 'bracelet', name: 'Wrist Beads', image: '/assets/images/tryon/bracelet.png', pos: { top: 160, left: 75 } },
  ];

  // Limited time deals
  const limitedDeals = [
    {
      id: 1,
      name: 'Exclusive Independence Day Collection',
      image: '/limited/independence.jpg',
      description: 'Celebrate Ghanaian independence with this limited edition collection featuring the national colors and special commemorative designs.',
      price: 899.99,
      discount: 30,
      endTime: '2025-06-15T00:00:00',
      badge: 'Limited Edition'
    },
    {
      id: 2,
      name: 'Handwoven Royal Kente Bundle',
      image: '/limited/royal.jpg',
      description: 'Premium kente cloth bundle handwoven by master craftsmen using traditional techniques. Includes matching accessories.',
      price: 1200.00,
      discount: 25,
      endTime: '2025-05-20T00:00:00',
      badge: 'Master Crafted'
    }
  ];

  // Customer reviews
  const customerReviews = [
    {
      id: 1,
      name: 'Akosua Mensah',
      avatar: '/reviews/akosua.jpg',
      rating: 5,
      comment: 'I wore the Kente Fusion Dress to my sister\'s wedding and received so many compliments! The quality is exceptional and the design beautifully honors our Ghanaian heritage while feeling modern.',
      date: '2025-03-15',
      badge: 'Verified Purchase'
    },
    {
      id: 2,
      name: 'Kwame Osei',
      avatar: '/reviews/kwame.jpg',
      rating: 4,
      comment: "The Executive Ankara Suit is perfect for my business meetings. It's subtle yet distinctive, and the craftsmanship is excellent. The fit was perfect straight out of the box.",
      date: '2025-02-28',
      badge: 'Verified Purchase'
    },
    {
      id: 3,
      name: 'Ama Darko',
      avatar: '/reviews/ama.jpg',
      rating: 5,
      comment: "I purchased the Bohemian Ankara Set and am absolutely in love with it! The fabric is breathable and perfect for Ghana's climate. Will definitely be ordering more styles soon!",
      date: '2025-04-02',
      badge: 'Verified Purchase'
    }
  ];

  // Ghana's fashion highlights
  const fashionHighlights = [
    {
      icon: '🧵',
      title: 'Authentic Heritage',
      description: 'Each garment carries centuries of Ghanaian cultural significance and craftsmanship tradition.'
    },
    {
      icon: '🌍',
      title: 'Sustainable Production',
      description: 'Ethically sourced materials and production processes that support local communities.'
    },
    {
      icon: '🎨',
      title: 'Unique Designs',
      description: 'Every piece tells a story through colors, patterns, and symbols from Ghana\'s rich cultural tapestry.'
    },
    {
      icon: '👗',
      title: 'Contemporary Fusion',
      description: 'Traditional techniques meeting modern fashion sensibilities for global appeal.'
    }
  ];

  // -- Filtered and sorted outfits
  const filteredOutfits = useMemo(() => {
    let results = [...outfits];
    
    // Apply filters
    if (filterOccasion !== 'all') {
      results = results.filter(outfit => outfit.occasion === filterOccasion);
    }
    
    if (filterStyle !== 'all') {
      results = results.filter(outfit => outfit.style === filterStyle);
    }
    
    if (filterColor !== 'all') {
      results = results.filter(outfit => outfit.color === filterColor);
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // In a real app, you'd sort by date
      results.sort((a, b) => b.id - a.id);
    }
    
    return results;
  }, [filterOccasion, filterStyle, filterColor, sortBy]);

  // -- Unique filter options
  const occasions = ['all', ...Array.from(new Set(outfits.map(o => o.occasion)))];
  const styles = ['all', ...Array.from(new Set(outfits.map(o => o.style)))];
  const colors = ['all', ...Array.from(new Set(outfits.map(o => o.color)))];

  // Get wishlist products
  const wishlistProducts = useMemo(() => {
    return wishlist.map(id => outfits.find(outfit => outfit.id === id)).filter(Boolean);
  }, [wishlist]);

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // -- Effects
  useEffect(() => {
    localStorage.setItem('fashion-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fashion-cart', JSON.stringify(cart));
  }, [cart]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle notification timeout
  useEffect(() => {
    if (notification) {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
    
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [notification]);

  // -- Handlers
  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        setNotification({
          type: 'info',
          message: 'Item removed from wishlist'
        });
        return prev.filter(item => item !== id);
      } else {
        setNotification({
          type: 'success',
          message: 'Item added to wishlist'
        });
        return [...prev, id];
      }
    });
  }, []);

  const toggleOverlay = useCallback((id) => {
    setOverlays(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    setActiveTab('description');
    setQuantity(1);
    setSelectedColor('default');
    setSelectedSize('M');
  }, []);

  // Removed unused closeQuickView function

  const addToCart = useCallback((product, quantity, size, color) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.discount ? 
        product.price - (product.price * product.discount / 100) : 
        product.price,
      quantity,
      size,
      color
    };
    
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item
        return [...prev, cartItem];
      }
    });
    
    // Show success notification
    setNotification({
      type: 'success',
      message: `Added ${quantity} of ${product.name} to your cart!`
    });
  }, []);

  const removeFromCart = useCallback((id, size, color) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.size === size && item.color === color)
    ));
    
    setNotification({
      type: 'info',
      message: 'Item removed from cart'
    });
  }, []);

  const updateCartQuantity = useCallback((id, quantity, size, color) => {
    if (quantity < 1) return;
    
    setCart(prev => prev.map(item => 
      (item.id === id && item.size === size && item.color === color) 
        ? { ...item, quantity } 
        : item
    ));
  }, []);

  const handleReset = useCallback(() => {
    setFilterOccasion('all');
    setFilterStyle('all');
    setFilterColor('all');
    setSortBy('featured');
  }, []);

  // Toggle filter sections
  const toggleFilter = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section]
    });
  };
  
  // Scroll indicator effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollIndicator(true);
      } else {
        setShowScrollIndicator(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Function to handle smooth scrolling with transition effect
  const handleSmoothScroll = (targetRef) => {
    if (targetRef && targetRef.current) {
      setPageTransitionActive(true);
      
      setTimeout(() => {
        window.scrollTo({
          top: targetRef.current.offsetTop - 100,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          setPageTransitionActive(false);
        }, 800);
      }, 300);
    }
  };
  
  // Handle scroll to collection with animation
  const scrollToCollection = () => {
    const collectionSection = document.querySelector('.experience-categories') || 
                             document.querySelector('.experience-section');
    if (collectionSection) {
      setPageTransitionActive(true);
      
      setTimeout(() => {
        window.scrollTo({
          top: collectionSection.offsetTop - 100,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          setPageTransitionActive(false);
        }, 800);
      }, 300);
    }
  };

  // Slider settings
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const dealsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  // -- Render hero/intro screen
  if (!started) {
    return (
      <div className="fashion-hero">
        <div className="hero-content">
          <div className="ghana-star">★</div>
          <h1>Ghana Fashion Universe</h1>
          <p>Explore the rich textile heritage and contemporary styles from the heart of West Africa</p>
          <div className="hero-features">
            {fashionHighlights.map((highlight, index) => (
              <div className="feature" key={index}>
                <div className="feature-icon">{highlight.icon}</div>
                <span>{highlight.title}</span>
              </div>
            ))}
          </div>          <button
            className="hero-cta pulse-animation"
            onClick={() => {
              setPageTransitionActive(true);
              setTimeout(() => {
                setStarted(true);
                setTimeout(() => {
                  setPageTransitionActive(false);
                }, 800);
              }, 300);
            }}
          >
            Explore Collection <FaArrowRight className="cta-icon" />
          </button>
        </div>
        <div className="ghana-flag-hero">
          <div className="stripe red"></div>
          <div className="stripe gold">
            <div className="star">★</div>
          </div>
          <div className="stripe green"></div>
        </div>
      </div>
    );
  }
  // -- Main application render
  return (
    <div className="fashion-app">
      {/* Page transition overlay */}
      <div className={`page-transition-overlay ${pageTransitionActive ? 'active' : ''}`}></div>
      
      {/* Scroll Indicator */}
      <div 
        className={`scroll-indicator ${showScrollIndicator ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaChevronUp />
      </div>
      
      {/* Header */}
      <header className="fashion-header">
        <h2>Ghana Fashion Universe</h2>
        <div className="header-actions">
          <button 
            className="wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="View wishlist"
          >
            <FaRegHeart />
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </button>
          <button 
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="View cart"
          >
            <FaShoppingCart />
            {cart.length > 0 && <span className="count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
          </button>
        </div>
      </header>
      
      {/* Ghana flag banner */}
      <div className="ghana-flag-banner">
        <div className="stripe red"></div>
        <div className="stripe gold"></div>
        <div className="stripe green"></div>
      </div>

      {/* Hero Slider */}
      <section className="fashion-hero-slider">
        <Slider {...heroSliderSettings}>
          <div className="hero-slide">
            <img src="/assets/images/hero/kente-collection.jpg" alt="Kente Collection" loading="lazy" />
            <div className="slide-content">              <h2>Traditional Kente Collection</h2>
              <p>Authentic handwoven patterns celebrating Ghana's rich textile heritage</p>
              <button 
                className="slide-cta pulse-animation"
                onClick={scrollToCollection}
              >
                Explore Collection
              </button>
            </div>
          </div>
          <div className="hero-slide">
            <img src="/assets/images/hero/modern-fusion.jpg" alt="Modern Fusion" loading="lazy" />
            <div className="slide-content">              <h2>Contemporary Ghana</h2>
              <p>Modern designs infused with traditional elements for the global citizen</p>
              <button 
                className="slide-cta pulse-animation"
                onClick={scrollToCollection}
              >
                Explore Collection
              </button>
            </div>
          </div>
          <div className="hero-slide">
            <img src="/assets/images/hero/ankara-prints.jpg" alt="Ankara Prints" loading="lazy" />
            <div className="slide-content">              <h2>Vibrant Ankara Prints</h2>
              <p>Bold patterns and colors that tell the story of West African culture</p>
              <button 
                className="slide-cta pulse-animation"
                onClick={scrollToCollection}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </Slider>
      </section>

      {/* Limited Time Offers */}
      <section className="limited-offers">
        <div className="section-header">
          <h2>Limited Time Offers</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="deals-slider">
          <Slider {...dealsSliderSettings}>
            {limitedDeals.map(deal => (
              <div key={deal.id} className="deal-slide">
                <div className="deal-card">
                  <div className="deal-badge">{deal.badge}</div>
                  <div className="deal-image">
                    <img src={`/assets/images${deal.image}`} alt={deal.name} loading="lazy" />
                    <div className="discount-tag">-{deal.discount}%</div>
                  </div>
                  <div className="deal-content">
                    <h3>{deal.name}</h3>
                    <p>{deal.description}</p>
                    <div className="price-container">
                      <span className="current-price">
                        GH₵ {(deal.price - (deal.price * deal.discount / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">
                        GH₵ {deal.price.toFixed(2)}
                      </span>
                    </div>
                    <Countdown endTime={deal.endTime} />
                    <button className="deal-cta">Shop Now</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Why Choose Ghanaian Fashion */}
      <section className="why-choose-ghana">
        <div className="section-header">
          <h2>Why Choose Ghanaian Fashion</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="features-grid">
          {fashionHighlights.map((highlight, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{highlight.icon}</div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Sort Section */}
      <section className="filter-section">
        <div className="section-header">
          <h2>Explore Our Collection</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="mobile-filter-toggle">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <FaBars /> {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className={`filters-container ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-row">
            <div className="filter-group">
              <div 
                className="filter-header" 
                onClick={() => toggleFilter('occasion')}
              >
                <label htmlFor="occasion-filter">Occasion</label>
                <FaChevronDown className={expandedFilters.occasion ? 'expanded' : ''} />
              </div>
              <div className={`filter-options ${expandedFilters.occasion ? 'expanded' : ''}`}>
                {occasions.map(occasion => (
                  <div className="filter-option" key={occasion}>
                    <input 
                      type="radio" 
                      id={`occasion-${occasion}`} 
                      name="occasion" 
                      checked={filterOccasion === occasion}
                      onChange={() => setFilterOccasion(occasion)}
                    />
                    <label htmlFor={`occasion-${occasion}`}>
                      {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <div 
                className="filter-header" 
                onClick={() => toggleFilter('style')}
              >
                <label htmlFor="style-filter">Style</label>
                <FaChevronDown className={expandedFilters.style ? 'expanded' : ''} />
              </div>
              <div className={`filter-options ${expandedFilters.style ? 'expanded' : ''}`}>
                {styles.map(style => (
                  <div className="filter-option" key={style}>
                    <input 
                      type="radio" 
                      id={`style-${style}`} 
                      name="style" 
                      checked={filterStyle === style}
                      onChange={() => setFilterStyle(style)}
                    />
                    <label htmlFor={`style-${style}`}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <div 
                className="filter-header" 
                onClick={() => toggleFilter('color')}
              >
                <label htmlFor="color-filter">Color</label>
                <FaChevronDown className={expandedFilters.color ? 'expanded' : ''} />
              </div>
              <div className={`filter-options ${expandedFilters.color ? 'expanded' : ''}`}>
                {colors.map(color => (
                  <div className="filter-option" key={color}>
                    <input 
                      type="radio" 
                      id={`color-${color}`} 
                      name="color" 
                      checked={filterColor === color}
                      onChange={() => setFilterColor(color)}
                    />
                    <label htmlFor={`color-${color}`}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <div 
                className="filter-header" 
                onClick={() => toggleFilter('price')}
              >
                <label htmlFor="sort-by">Sort By</label>
                <FaChevronDown className={expandedFilters.price ? 'expanded' : ''} />
              </div>
              <div className={`filter-options ${expandedFilters.price ? 'expanded' : ''}`}>
                <div className="filter-option">
                  <input 
                    type="radio" 
                    id="sort-featured" 
                    name="sort" 
                    checked={sortBy === 'featured'}
                    onChange={() => setSortBy('featured')}
                  />
                  <label htmlFor="sort-featured">Featured</label>
                </div>
                <div className="filter-option">
                  <input 
                    type="radio" 
                    id="sort-price-low" 
                    name="sort" 
                    checked={sortBy === 'price-low'}
                    onChange={() => setSortBy('price-low')}
                  />
                  <label htmlFor="sort-price-low">Price: Low to High</label>
                </div>
                <div className="filter-option">
                  <input 
                    type="radio" 
                    id="sort-price-high" 
                    name="sort" 
                    checked={sortBy === 'price-high'}
                    onChange={() => setSortBy('price-high')}
                  />
                  <label htmlFor="sort-price-high">Price: High to Low</label>
                </div>
                <div className="filter-option">
                  <input 
                    type="radio" 
                    id="sort-rating" 
                    name="sort" 
                    checked={sortBy === 'rating'}
                    onChange={() => setSortBy('rating')}
                  />
                  <label htmlFor="sort-rating">Highest Rated</label>
                </div>
                <div className="filter-option">
                  <input 
                    type="radio" 
                    id="sort-newest" 
                    name="sort" 
                    checked={sortBy === 'newest'}
                    onChange={() => setSortBy('newest')}
                  />
                  <label htmlFor="sort-newest">Newest Arrivals</label>
                </div>
              </div>
            </div>
            
            <button 
              className="reset-filters"
              onClick={handleReset}
            >
              <FaUndo /> Reset All Filters
            </button>
          </div>
          
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z" />
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 13h18v-2H3zm0-7h18V4H3zm0 14h18v-2H3z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Products Grid/List */}
        <div className={`products-container ${viewMode}`}>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading collection...</p>
            </div>
          ) : filteredOutfits.length === 0 ? (
            <div className="no-results">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
              </svg>
              <h3>No matching outfits found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button className="reset-filters-btn" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredOutfits.map((outfit) => (
                <ProductCard
                  key={outfit.id}
                  product={outfit}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  onQuickView={handleQuickView}
                  onAddToCart={(product) => addToCart(product, 1, selectedSize, selectedColor)}
                />
              ))}
            </div>
          )}
        </div>

        {notification && (
          <div className={`notification ${notification.type}`}>
            <span className="notification-message">{notification.message}</span>
            <button className="close-notification" onClick={() => setNotification(null)}>
              <FaTimes />
            </button>
          </div>
        )}

        {/* Wishlist Modal */}
        <Modal
          isOpen={isWishlistOpen}
          onRequestClose={() => setIsWishlistOpen(false)}
          className="wishlist-modal"
          overlayClassName="modal-overlay"
          contentLabel="Wishlist"
        >
          <div className="modal-header">
            <h2>Your Wishlist</h2>
            <button 
              className="close-modal"
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="wishlist-content">
            {wishlistProducts.length === 0 ? (
              <div className="empty-wishlist">
                <div className="empty-icon">❤️</div>
                <h3>Your wishlist is empty</h3>
                <p>Save your favorite Ghana fashion items to your wishlist for later</p>
                <button className="continue-shopping" onClick={() => setIsWishlistOpen(false)}>
                  Browse Collection
                </button>
              </div>
            ) : (
              <>
                <div className="wishlist-items">
                  {wishlistProducts.map(product => (
                    <div className="wishlist-item" key={product.id}>
                      <div className="wishlist-item-image">
                        <img src={`/assets/images${product.image}`} alt={product.name} />
                      </div>
                      <div className="wishlist-item-info">
                        <h3>{product.name}</h3>
                        <div className="wishlist-item-price">
                          {product.discount > 0 ? (
                            <>
                              <span className="current-price">
                                GH₵ {(product.price - (product.price * product.discount / 100)).toFixed(2)}
                              </span>
                              <span className="original-price">GH₵ {product.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="current-price">GH₵ {product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="wishlist-item-actions">
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => {
                              addToCart(product, 1, 'M', 'default');
                              setNotification({
                                type: 'success',
                                message: `${product.name} added to cart!`
                              });
                            }}
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                          <button 
                            className="remove-wishlist-btn"
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <FaTimes /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="wishlist-footer">
                  <button 
                    className="continue-shopping"
                    onClick={() => setIsWishlistOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>

        {/* Cart Modal */}
        <Modal
          isOpen={isCartOpen}
          onRequestClose={() => setIsCartOpen(false)}
          className="cart-modal"
          overlayClassName="modal-overlay"
          contentLabel="Shopping Cart"
        >
          <div className="modal-header">
            <h2>Your Shopping Cart</h2>
            <button 
              className="close-modal"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add Ghanaian fashion items to your cart to begin checkout</p>
                <button className="continue-shopping" onClick={() => setIsCartOpen(false)}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <CartItem 
                      key={`${item.id}-${item.size}-${item.color}-${index}`}
                      item={item}
                      onRemove={removeFromCart}
                      onUpdateQuantity={updateCartQuantity}
                    />
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-price">GH₵ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-footer">
                    <button 
                      className="continue-shopping"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                   
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>

        {/* Quick View Modal */}
        <Modal
          isOpen={isQuickViewOpen}
          onRequestClose={() => setIsQuickViewOpen(false)}
          className="quick-view-modal"
          overlayClassName="modal-overlay"
          contentLabel="Quick View"
        >
          {quickViewProduct && (
            <div className="quick-view-content">
              <div className="modal-header">
                <h2>{quickViewProduct.name}</h2>
                <button 
                  className="close-modal"
                  onClick={() => setIsQuickViewOpen(false)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="product-quick-view">
                <div className="product-image">
                  <img src={`/assets/images${quickViewProduct.image}`} alt={quickViewProduct.name} />
                </div>
                <div className="product-details">
                  <div className="price-container">
                    {quickViewProduct.discount > 0 ? (
                      <>
                        <span className="current-price">
                          GH₵ {(quickViewProduct.price - (quickViewProduct.price * quickViewProduct.discount / 100)).toFixed(2)}
                        </span>
                        <span className="original-price">GH₵ {quickViewProduct.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">GH₵ {quickViewProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => {
                        addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
                        setIsQuickViewOpen(false);
                      }}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Size Guide Modal */}
        {isSizeGuideOpen && (
          <Modal
            isOpen={isSizeGuideOpen}
            onRequestClose={() => setIsSizeGuideOpen(false)}
            className="size-guide-modal"
            overlayClassName="modal-overlay"
            contentLabel="Size Guide"
          >
            <SizeGuide onClose={() => setIsSizeGuideOpen(false)} />
          </Modal>
        )}
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews reviews={customerReviews} />

      {/* Virtual Try-On Experience */}
      <section className="virtual-tryon-section">
        <div className="section-header">
          <h2>Virtual Try-On Experience</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="tryon-container">
          <div className="silhouette-container">
            <div className="silhouette"></div>
            {overlays.map(itemId => {
              const item = virtualItems.find(i => i.id === itemId);
              if (!item) return null;
              return (
                <div 
                  key={item.id} 
                  className="overlay" 
                  style={{ top: `${item.pos.top}px`, left: `${item.pos.left}%` }}
                >
                  <img src={item.image} alt={item.name} />
                </div>
              );
            })}
          </div>
          
          <div className="tryon-controls">
            <h3>Select Items to Try On</h3>
            <div className="virtual-items-grid">
              {virtualItems.map(item => (
                <div 
                  key={item.id} 
                  className={`virtual-item ${overlays.includes(item.id) ? 'selected' : ''}`}
                  onClick={() => toggleOverlay(item.id)}
                >
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                  {overlays.includes(item.id) ? (
                    <div className="item-selected"><FaCheck /></div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="tryon-actions">
              <button className="reset-tryon" onClick={() => setOverlays([])}>
                Reset All
              </button>
              <button className="save-outfit">
                Save Outfit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Payment Info */}
      <section className="shipping-info-section">
        <div className="section-header">
          <h2>Shipping & Payment</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3>Nationwide Delivery</h3>
            <p>We ship to all regions in Ghana with express delivery available to major cities</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon"><FaTruck /></div>
            <h3>International Shipping</h3>
            <p>Worldwide shipping available with tracking for all international orders</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon"><FaCreditCard /></div>
            <h3>Secure Payment</h3>
            <p>Multiple secure payment options including mobile money and credit cards</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon"><FaLock /></div>
            <h3>Buyer Protection</h3>
            <p>30-day return policy for all purchases with money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated with Ghana Fashion</h2>
            <p>Subscribe to receive updates on new collections, special offers, and traditional fashion insights</p>
            
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
            
            <div className="privacy-note">
              <FaInfoCircle /> We respect your privacy and will never share your information
            </div>
          </div>
          
          <div className="newsletter-image">
            <div className="adinkra-pattern"></div>
          </div>
        </div>
      </section>

      {/* Ghana Flag Footer */}
      <footer className="fashion-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Made in Ghana</h3>
            <p>Supporting local artisans and preserving traditional craftsmanship through contemporary fashion.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="social-icon facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="social-icon instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="social-icon twitter"></i></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Ghana Fashion</a></li>
              <li><a href="#">Our Artisans</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Contact Us</h3>
            <address>
              <p>Accra Fashion District</p>
              <p>Independence Avenue</p>
              <p>Accra, Ghana</p>
              <p>Email: info@ghanafashion.com</p>
              <p>Phone: +233 20 123 4567</p>
            </address>
          </div>
        </div>
        
        <div className="ghana-flag-footer">
          <div className="stripe red"></div>
          <div className="stripe gold">
            <div className="star">★</div>
          </div>
          <div className="stripe green"></div>
        </div>
        
        <div className="copyright">
          © {new Date().getFullYear()} Ghana Fashion Universe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
