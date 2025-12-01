import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaShoppingCart, FaStar, FaHeart, FaRegHeart, 
  FaFilter, FaSort, FaInfoCircle, FaMapMarkerAlt, 
  FaArrowLeft, FaArrowRight, FaShare, FaWhatsapp, 
  FaFacebook, FaTwitter, FaLanguage, FaHandshake
} from 'react-icons/fa';
import { GiAfrica, GiClothes, GiSewingNeedle } from 'react-icons/gi';
import { MdVerified, MdEco } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import './GirlsFashion.css';

// Lazy-loaded components for performance
const SizeGuideModal = lazy(() => import('../components/SizeGuideModal'));
const CulturalStoryModal = lazy(() => import('../components/CulturalStoryModal'));
const RegionMapModal = lazy(() => import('../components/RegionMapModal'));

// Comprehensive Adinkra symbols with meanings
const adinkraSymbols = {
  'sankofa': { symbol: '↩', meaning: 'Go back and fetch it - learn from the past' },
  'gye-nyame': { symbol: '⚜', meaning: 'Except for God - supremacy of God' },
  'adinkrahene': { symbol: '◎', meaning: 'Chief of Adinkra symbols - leadership and greatness' },
  'dwennimmen': { symbol: '♈', meaning: 'Ram\'s horns - strength and humility' },
  'akoma': { symbol: '♥', meaning: 'The heart - patience and tolerance' },
  'nkonsonkonson': { symbol: '⛓', meaning: 'Chain link - human unity and relationship' },
  'owuo-atwedee': { symbol: '🪜', meaning: 'Ladder of death - mortality' },
  'nyame-nti': { symbol: '☰', meaning: 'By God\'s grace - faith and trust in God' },
  'mmere-dane': { symbol: '🕰', meaning: 'Time changes - life transformation' },
  'aya': { symbol: '✴', meaning: 'Fern - endurance and resourcefulness' }
};

// Ghanaian languages for translation
const languages = [
  { code: 'en', name: 'English' },
  { code: 'tw', name: 'Twi' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ew', name: 'Ewe' },
  { code: 'ga', name: 'Ga' },
];

const GirlsFashion = () => {
  const { subcategory, subitem } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCulturalStory, setShowCulturalStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showRegionMap, setShowRegionMap] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAdinkraTooltip, setShowAdinkraTooltip] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [sortOption, setSortOption] = useState('popularity');
  
  // Enhanced categories with Ghana-specific details
  const categories = useMemo(() => [
    { 
      name: 'Kente & Traditional', 
      link: 'kente-traditional',
      description: 'Authentic Ghanaian kente and traditional garments for girls',
      image: '/images/girls-fashion/kente-girls.jpg',
      subcats: ['Kente Dresses', 'Kaba & Slit Sets', 'Traditional Blouses', 'Cultural Headwraps'],
      regions: ['Ashanti Region', 'Volta Region'],
      symbol: adinkraSymbols.adinkrahene.symbol,
      symbolMeaning: adinkraSymbols.adinkrahene.meaning,
      culturalContext: 'Kente cloth is cherished in Ghanaian culture, originally worn by royalty. For girls, these adaptations maintain cultural heritage while providing comfortable, age-appropriate designs.'
    },
    { 
      name: 'Modern African Prints', 
      link: 'african-prints',
      description: 'Contemporary clothing featuring Ghanaian prints and patterns',
      image: '/images/girls-fashion/african-print-girls.jpg',
      subcats: ['Ankara Dresses', 'Print Tops', 'Adinkra Pattern Skirts', 'Print Sets'],
      regions: ['Greater Accra', 'Eastern Region'],
      symbol: adinkraSymbols.sankofa.symbol,
      symbolMeaning: adinkraSymbols.sankofa.meaning,
      culturalContext: 'Modern African print clothing for girls blends traditional patterns with contemporary styles, allowing young Ghanaians to embrace their heritage in everyday fashion.'
    },
    { 
      name: 'School Uniforms', 
      link: 'school-uniforms',
      description: 'Quality school uniforms made in Ghana for primary and JHS students',
      image: '/images/girls-fashion/ghana-school-uniform-girls.jpg',
      subcats: ['Primary Uniforms', 'JHS Uniforms', 'House Dresses', 'School Sportswear'],
      regions: ['Greater Accra', 'Central Region'],
      symbol: adinkraSymbols['gye-nyame'].symbol,
      symbolMeaning: adinkraSymbols['gye-nyame'].meaning,
      culturalContext: 'Education is highly valued in Ghanaian society. Well-made school uniforms represent pride and discipline in schools across the country.'
    },
    { 
      name: 'Casual Wear', 
      link: 'casual-wear',
      description: 'Everyday clothing made in Ghana with local fabrics and designs',
      image: '/images/girls-fashion/ghana-casual-girls.jpg',
      subcats: ['T-Shirts', 'Shorts', 'Skirts', 'Casual Dresses'],
      regions: ['Greater Accra', 'Eastern Region'],
      symbol: adinkraSymbols.akoma.symbol,
      symbolMeaning: adinkraSymbols.akoma.meaning,
      culturalContext: 'Casual wear in Ghana often incorporates subtle cultural elements like Adinkra symbols, creating comfortable yet meaningful everyday clothing.'
    },
    { 
      name: 'Footwear', 
      link: 'footwear',
      description: 'Traditional and modern shoes handcrafted by Ghanaian artisans',
      image: '/images/girls-fashion/ghana-girls-shoes.jpg',
      subcats: ['Traditional Sandals', 'Leather Shoes', 'School Shoes', 'Casual Footwear'],
      regions: ['Ashanti Region', 'Northern Region'],
      symbol: adinkraSymbols.dwennimmen.symbol,
      symbolMeaning: adinkraSymbols.dwennimmen.meaning,
      culturalContext: 'Ghanaian footwear for girls combines comfort with cultural designs, often handcrafted using traditional leatherworking techniques passed down through generations.'
    },
    { 
      name: 'Accessories', 
      link: 'accessories',
      description: 'Authentic Ghanaian accessories to complete any outfit',
      image: '/images/girls-fashion/ghana-girls-accessories.jpg',
      subcats: ['Beaded Jewelry', 'Traditional Headbands', 'Handwoven Bags', 'School Accessories'],
      regions: ['Volta Region', 'Northern Region', 'Upper East Region'],
      symbol: adinkraSymbols.nkonsonkonson.symbol,
      symbolMeaning: adinkraSymbols.nkonsonkonson.meaning,
      culturalContext: 'Accessories like beads and headwraps have special significance in Ghanaian traditions, often representing family ties, status, and cultural celebrations.'
    }
  ], []);

  // Region details with cultural significance
  const regionDetails = useMemo(() => [
    {
      name: 'Ashanti Region',
      capital: 'Kumasi',
      specialty: 'Kente Weaving',
      description: 'The Ashanti Region is known for its vibrant kente cloth, with patterns and colors that have distinct meanings in Akan culture.',
      image: '/images/regions/ashanti.jpg'
    },
    {
      name: 'Northern Region',
      capital: 'Tamale',
      specialty: 'Smock (Batakari) Making',
      description: 'Famous for smocks with intricate hand-embroidery that are adapted into beautiful dresses and outfits for girls.',
      image: '/images/regions/northern.jpg'
    },
    {
      name: 'Greater Accra',
      capital: 'Accra',
      specialty: 'Contemporary Fashion',
      description: 'Accra blends traditional elements with modern trends, creating innovative styles for girls that honor heritage.',
      image: '/images/regions/accra.jpg'
    },
    {
      name: 'Volta Region',
      capital: 'Ho',
      specialty: 'Kete and Ewe Cloth',
      description: 'The Volta Region produces distinctive Ewe Kente (Kete) with unique patterns specifically designed for young girls.',
      image: '/images/regions/volta.jpg'
    }
  ], []);
  
  // Cultural stories related to girls' fashion in Ghana
  const culturalStories = useMemo(() => [
    {
      id: 'story-kaba',
      title: 'The Kaba & Slit: Ghana\'s Elegant Tradition',
      summary: 'How the traditional women\'s outfit became a symbol of Ghanaian identity',
      content: 'The kaba and slit is a traditional Ghanaian outfit consisting of a fitted blouse (kaba) and a long skirt (slit). This style emerged during the colonial era as a blend of European-style blouses with traditional wrapped cloths. For young girls, the "mini kaba" has become a cherished outfit for special occasions, connecting them to generations of Ghanaian women. The style varies across different regions, with fabrics and patterns telling stories about family heritage and social status.',
      image: '/images/stories/kaba-story.jpg'
    },
    {
      id: 'story-beads',
      title: 'The Language of Beads',
      summary: 'How waist beads and jewelry communicate in Ghanaian culture',
      content: 'In Ghana, beaded jewelry is more than decoration—it\'s a form of communication and cultural expression. For young girls, receiving their first waist beads is a significant cultural milestone. Different colors, patterns, and arrangements of beads carry specific meanings: white for purity, gold for wealth, blue for loyalty, and red for courage. The Krobo people of Eastern Ghana are especially renowned for their glass bead crafting traditions, passing these skills through generations. Today, these traditions continue with beaded accessories that connect girls to their heritage.',
      image: '/images/stories/beads-story.jpg'
    },
    {
      id: 'story-adinkra',
      title: 'Adinkra: Symbols with Meaning',
      summary: 'How visual symbols became important in girls\' fashion',
      content: 'Adinkra symbols originated with the Gyaman people and were brought to Ghana in the 19th century. Each symbol represents a specific concept or value important in Ghanaian culture. For girls\' clothing, symbols are carefully selected for their meanings—for example, "Sankofa" encourages learning from the past, while "Akoma" (the heart) represents patience and love. These symbols appear on modern clothing, accessories, and school items, helping young girls connect with cultural values through everyday fashion.',
      image: '/images/stories/adinkra-symbols.jpg'
    }
  ], []);
  
  // Featured carousel items with educational content
  const carouselItems = [
    {
      id: 'carousel-1',
      title: 'Ghana Independence Day Collection',
      description: 'Special edition dresses featuring Ghana\'s national colors of red, gold, and green',
      image: '/images/girls-fashion/independence-carousel.jpg',
      cta: 'Shop the Collection',
      link: '/girls-fashion/special/independence-day',
      fact: 'Ghana\'s flag colors have specific meanings: red for struggle, gold for mineral wealth, and green for forests'
    },
    {
      id: 'carousel-2',
      title: 'Back to School - Ghana Style',
      description: 'Premium quality school uniforms made by Ghanaian seamstresses using local fabrics',
      image: '/images/girls-fashion/school-carousel.jpg', 
      cta: 'Get Ready for School',
      link: '/girls-fashion/school-uniforms',
      fact: 'Each school in Ghana has distinctive uniform designs that represent their unique identity'
    },
    {
      id: 'carousel-3',
      title: 'Traditional Kente for Girls',
      description: 'Authentic handwoven kente cloth dresses from the weaving villages of Bonwire',
      image: '/images/girls-fashion/kente-carousel.jpg',
      cta: 'Explore Kente Collection',
      link: '/girls-fashion/kente-traditional',
      fact: 'Kente patterns for girls often incorporate symbols of wisdom, beauty, and growth'
    }
  ];
  
  // Featured collections with Ghana-specific themes
  const featuredCollections = [
    {
      title: 'Independence Day Collection',
      description: 'Special Ghana-flag colored dresses for national celebrations',
      image: '/images/girls-fashion/independence-collection.jpg',
      link: '/girls-fashion/special/independence-day',
      symbol: adinkraSymbols.sankofa.symbol,
      symbolMeaning: adinkraSymbols.sankofa.meaning,
      occasion: 'For Ghana Independence Day celebrations on March 6th',
      artisans: 'Created by women cooperatives in Accra'
    },
    {
      title: 'Adinkra Symbols Collection',
      description: 'Modern clothing featuring traditional Adinkra symbols and their meanings',
      image: '/images/girls-fashion/adinkra-collection.jpg',
      link: '/girls-fashion/special/adinkra-symbols',
      symbol: adinkraSymbols['gye-nyame'].symbol,
      symbolMeaning: adinkraSymbols['gye-nyame'].meaning,
      occasion: 'For cultural education and everyday wear',
      artisans: 'Designed by young female artisans in Kumasi'
    },
    {
      title: 'Traditional Festival Wear',
      description: 'Girls fashion representing Ghana\'s cultural festivals',
      image: '/images/girls-fashion/festival-collection.jpg',
      link: '/girls-fashion/special/festival-wear',
      symbol: adinkraSymbols.adinkrahene.symbol,
      symbolMeaning: adinkraSymbols.adinkrahene.meaning,
      occasion: 'For cultural festivals and special celebrations',
      artisans: 'Made by women craftspeople from diverse regions of Ghana'
    }
  ];
  
  // Sample products with Ghana-specific details
  const products = useMemo(() => [
    {
      id: 1,
      name: 'Girls\' Kente Trim Dress',
      price: 75.00,
      rating: 4.9,
      reviews: 28,
      image: '/images/girls-fashion/kente-dress.jpg',
      category: 'kente-traditional',
      subcategory: 'kente-dresses',
      description: 'Beautiful cotton dress with authentic kente cloth trim',
      longDescription: 'This lovely dress combines comfort with cultural heritage, featuring authentic kente cloth trim handwoven in Bonwire. The kente pattern used is "Fatia Fata Nkrumah" which symbolizes embrace of diverse elements, perfect for celebrating Ghana\'s cultural diversity.',
      artisan: 'Made by Women of Bonwire Collective',
      artisanStory: 'The Women of Bonwire Collective provides sustainable income for mothers in the kente weaving village of Bonwire, allowing them to support their families while preserving traditional weaving techniques.',
      material: '100% cotton with handwoven kente accents',
      isNew: true,
      region: 'Ashanti Region',
      sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
      inStock: true,
      discountPercent: 0,
      popularityScore: 96,
      sustainabilityCertified: true,
      sustainabilityInfo: 'Made with organic cotton grown in Ghana, using natural dyes and fair labor practices',
      careInstructions: 'Hand wash in cold water, do not bleach, hang to dry, iron on low heat if needed',
      adinkraSymbols: ['adinkrahene', 'sankofa']
    },
    {
      id: 2,
      name: 'Mini Kaba & Slit Set',
      price: 95.00,
      rating: 4.8,
      reviews: 31,
      image: '/images/girls-fashion/kaba-set.jpg',
      category: 'kente-traditional',
      subcategory: 'kaba-slit-sets',
      description: 'Traditional kaba and slit outfit sized for young girls',
      longDescription: 'This miniature version of Ghana\'s beloved kaba and slit outfit is tailored specifically for young girls. Made from authentic Ghana-woven fabric with traditional designs, it\'s perfect for special occasions, cultural events, or family celebrations.',
      artisan: 'Crafted by master seamstresses in Accra',
      artisanStory: 'Our kaba sets are made by expert seamstresses who have been creating traditional Ghanaian clothing for decades. They have adapted their skills to create child-friendly versions that maintain cultural authenticity.',
      material: 'Ghana-woven cotton with traditional patterns',
      isNew: false,
      region: 'Greater Accra',
      sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
      inStock: true,
      discountPercent: 0,
      popularityScore: 94,
      sustainabilityCertified: true,
      sustainabilityInfo: 'Supports traditional textile production and provides fair compensation to skilled seamstresses',
      careInstructions: 'Hand wash gently in cold water, lay flat to dry, iron on medium heat',
      adinkraSymbols: ['akoma', 'aya']
    },
    {
      id: 3,
      name: 'Adinkra Symbol Skirt',
      price: 50.00,
      rating: 4.7,
      reviews: 42,
      image: '/images/girls-fashion/adinkra-skirt.jpg',
      category: 'african-prints',
      subcategory: 'adinkra-pattern-skirts',
      description: 'Cotton circle skirt with printed Adinkra symbols',
      longDescription: 'This educational and stylish skirt features hand-printed Adinkra symbols including Sankofa (learn from the past) and Akoma (the heart). The full circle design makes it perfect for everyday wear while celebrating Ghanaian cultural heritage.',
      artisan: 'Designed and printed in Kumasi',
      artisanStory: 'These skirts are printed by a women-led cooperative in Kumasi that provides training and employment opportunities for single mothers and young women.',
      material: 'Organic Ghanaian cotton',
      isNew: true,
      region: 'Ashanti Region',
      sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
      inStock: true,
      discountPercent: 10,
      popularityScore: 91,
      sustainabilityCertified: true,
      sustainabilityInfo: 'Printed with eco-friendly water-based inks that are safe for children and the environment',
      careInstructions: 'Machine wash cold, inside out. Tumble dry low.',
      adinkraSymbols: ['sankofa', 'akoma', 'gye-nyame']
    },
    {
      id: 4,
      name: 'Handcrafted School Sandals',
      price: 65.00,
      rating: 4.6,
      reviews: 22,
      image: '/images/girls-fashion/ghana-school-sandals.jpg',
      category: 'footwear',
      subcategory: 'school-shoes',
      description: 'Durable, handmade leather school sandals crafted by Ghanaian artisans',
      longDescription: 'These school sandals are handcrafted by leather artisans in Kumasi, using traditional techniques combined with modern comfort features. The leather is sourced from sustainable farms in Ghana and processed using traditional methods.',
      artisan: 'Made by Kumasi Women\'s Leatherworks',
      artisanStory: 'Kumasi Women\'s Leatherworks is a cooperative of female artisans who have preserved traditional Ghanaian leatherworking techniques while creating economic opportunities for women.',
      material: 'Ghana-sourced leather with durable soles',
      isNew: false,
      region: 'Ashanti Region',
      sizes: ['UK 10C', 'UK 11C', 'UK 12C', 'UK 13C', 'UK 1', 'UK 2', 'UK 3'],
      inStock: true,
      discountPercent: 0,
      popularityScore: 88,
      sustainabilityCertified: true,
      sustainabilityInfo: 'Leather is vegetable-tanned using traditional methods that avoid harmful chemicals',
      careInstructions: 'Clean with damp cloth, apply leather conditioner monthly',
      adinkraSymbols: []
    },
    {
      id: 5,
      name: 'Girls\' Beaded Necklace Set',
      price: 35.00,
      rating: 4.9,
      reviews: 19,
      image: '/images/girls-fashion/beaded-set.jpg',
      category: 'accessories',
      subcategory: 'beaded-jewelry',
      description: 'Traditional Krobo glass bead necklace and bracelet set',
      longDescription: 'This handcrafted jewelry set features authentic Krobo glass beads made using ancient techniques. Each set includes a necklace and matching bracelet with colors inspired by traditional Ghanaian symbols and meanings.',
      artisan: 'Crafted by Krobo Bead Collective',
      artisanStory: 'The Krobo women have made glass beads for generations using techniques dating back centuries. This collective helps preserve these skills while providing sustainable income for women artisans.',
      material: 'Handmade Krobo glass beads with natural cotton cord',
      isNew: true,
      region: 'Eastern Region',
      sizes: ['One Size (Adjustable)'],
      inStock: true,
      discountPercent: 0,
      popularityScore: 93,
      sustainabilityCertified: true,
      sustainabilityInfo: 'Uses recycled glass with traditional low-impact firing techniques',
      careInstructions: 'Wipe with soft, dry cloth. Avoid exposure to water and chemicals.',
      adinkraSymbols: ['nkonsonkonson', 'akoma']
    }
  ], []);

  // Effect for loading data and setting up timers
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('girlsFashionFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load recently viewed from localStorage
    const savedRecent = localStorage.getItem('recentlyViewedGirlsFashion');
    if (savedRecent) {
      setRecentlyViewed(JSON.parse(savedRecent));
    }
    
    // Set up carousel timer
    const carouselTimer = setInterval(() => {
      setCurrentSlide(prevSlide => 
        prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    // Simulate loading delay
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearInterval(carouselTimer);
      clearTimeout(loadTimer);
    };
  }, [carouselItems.length]);

  // Effect for handling subcategory selection
  useEffect(() => {
    if (subcategory) {
      const category = categories.find(cat => cat.link === subcategory);
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [subcategory, categories]);

  // Handler for opening the cultural story modal
  const openCulturalStory = useCallback((storyId) => {
    const story = culturalStories.find(s => s.id === storyId);
    if (story) {
      setSelectedStory(story);
      setShowCulturalStory(true);
    }
  }, [culturalStories]);

  // Handler for opening the region map modal
  const openRegionMap = useCallback((regionName) => {
    const region = regionDetails.find(r => r.name === regionName);
    if (region) {
      setSelectedRegion(region);
      setShowRegionMap(true);
    }
  }, [regionDetails]);

  // Toggle favorite status
  const toggleFavorite = useCallback((productId) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      
      // Save to localStorage
      localStorage.setItem('girlsFashionFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Search filter for products
  const filteredProducts = useMemo(() => {
    if (!searchTerm && !selectedCategory && selectedFilters.length === 0) {
      return products;
    }
    
    return products.filter(product => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = !selectedCategory || 
        product.category === selectedCategory.link;
      
      // Filter by selected filters (regions, subcategories, etc.)
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => 
          product.region === filter || 
          product.subcategory === filter ||
          (product.adinkraSymbols && product.adinkraSymbols.includes(filter))
        );
      
      return matchesSearch && matchesCategory && matchesFilters;
    });
  }, [products, searchTerm, selectedCategory, selectedFilters]);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    switch(sortOption) {
      case 'price-low':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...filteredProducts].sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
      case 'popularity':
      default:
        return [...filteredProducts].sort((a, b) => b.popularityScore - a.popularityScore);
    }
  }, [filteredProducts, sortOption]);

  // Handler for showing Adinkra symbol tooltip
  const showSymbolInfo = useCallback((symbol) => {
    setCurrentSymbol(adinkraSymbols[symbol]);
    setShowAdinkraTooltip(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowAdinkraTooltip(false);
    }, 3000);
  }, []);

  // Render categories grid on main page
  const renderCategoriesGrid = () => (
    <section className="categories-section">
      <h2 className="section-title">Explore Girls' Ghana Fashion Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <motion.div 
            key={index}
            className="category-card"
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="category-image-container">
              <img 
                src={category.image} 
                alt={category.name} 
                className="category-image"
              />
              <span className="category-symbol" title={category.symbolMeaning}>
                {category.symbol}
              </span>
            </div>
            
            <div className="category-content">
              <h3 className="category-title">
                <Link to={`/girls-fashion/${category.link}`}>{category.name}</Link>
              </h3>
              
              <p className="category-description">{category.description}</p>
              
              <div className="category-regions">
                <small>
                  <GiAfrica /> Regions: {category.regions.join(', ')}
                </small>
              </div>
              
              <div className="subcats-nav">
                <ul>
                  {category.subcats.map((subcat, i) => (
                    <li key={i}>
                      <Link to={`/girls-fashion/${category.link}/${subcat.toLowerCase().replace(/ /g, '-')}`}>
                        {subcat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="cultural-context-button"
                onClick={() => openCulturalStory(
                  category.link === 'kente-traditional' ? 'story-kaba' : 
                  category.link === 'accessories' ? 'story-beads' : 'story-adinkra'
                )}
              >
                <FaInfoCircle /> Cultural Context
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // Render hero carousel
  const renderHeroCarousel = () => (
    <section className="carousel-section">
      <div className="carousel-container">
        {carouselItems.map((item, index) => (
          <motion.div 
            key={item.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0
            }}
            transition={{ duration: 0.7 }}
          >
            <div 
              className="carousel-image" 
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="carousel-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="cultural-fact">
                <FaInfoCircle />
                <span>{item.fact}</span>
              </div>
              <Link to={item.link} className="carousel-cta">
                {item.cta}
              </Link>
            </div>
          </motion.div>
        ))}
        
        <div className="carousel-controls">
          <button 
            className="carousel-arrow prev"
            onClick={() => setCurrentSlide(prev => 
              prev === 0 ? carouselItems.length - 1 : prev - 1
            )}
          >
            <FaArrowLeft />
          </button>
          
          <div className="carousel-dots">
            {carouselItems.map((_, index) => (
              <button 
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          <button 
            className="carousel-arrow next"
            onClick={() => setCurrentSlide(prev => 
              prev === carouselItems.length - 1 ? 0 : prev + 1
            )}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );

  // Render search and filters section
  const renderSearchAndFilters = () => (
    <section className="search-filter-section">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for Ghanaian girls' fashion..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
      
      <div className="filter-sort-container">
        <div className="filter-dropdown">
          <button className="filter-button">
            <FaFilter /> Filter
          </button>
          <div className="filter-options">
            <h4>Regions</h4>
            {regionDetails.map((region, index) => (
              <label key={index} className="filter-option">
                <input 
                  type="checkbox"
                  checked={selectedFilters.includes(region.name)}
                  onChange={() => {
                    setSelectedFilters(prev => 
                      prev.includes(region.name)
                        ? prev.filter(f => f !== region.name)
                        : [...prev, region.name]
                    );
                  }}
                />
                {region.name}
              </label>
            ))}
            
            <h4>Adinkra Symbols</h4>
            {Object.keys(adinkraSymbols).map((key) => (
              <label key={key} className="filter-option">
                <input 
                  type="checkbox"
                  checked={selectedFilters.includes(key)}
                  onChange={() => {
                    setSelectedFilters(prev => 
                      prev.includes(key)
                        ? prev.filter(f => f !== key)
                        : [...prev, key]
                    );
                  }}
                />
                {adinkraSymbols[key].symbol} {key}
              </label>
            ))}
          </div>
        </div>
        
        <div className="sort-dropdown">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="popularity">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Items</option>
          </select>
          <FaSort className="sort-icon" />
        </div>
      </div>
    </section>
  );

  // Render feature collections section
  const renderFeaturedCollections = () => (
    <section className="featured-collections">
      <h2 className="section-title">Featured Collections</h2>
      <div className="collections-grid">
        {featuredCollections.map((collection, index) => (
          <motion.div 
            key={index}
            className="collection-card"
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
            }}
          >
            <Link to={collection.link}>
              <div className="collection-image-container">
                <img 
                  src={collection.image} 
                  alt={collection.title} 
                  className="collection-image"
                />
                <span 
                  className="collection-symbol" 
                  title={collection.symbolMeaning}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showSymbolInfo(
                      Object.keys(adinkraSymbols).find(
                        key => adinkraSymbols[key].symbol === collection.symbol
                      )
                    );
                  }}
                >
                  {collection.symbol}
                </span>
              </div>
              
              <div className="collection-content">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <div className="collection-meta">
                  <span className="collection-occasion">
                    <FaInfoCircle /> {collection.occasion}
                  </span>
                  <span className="collection-artisans">
                    <FaHandshake /> {collection.artisans}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // Render product grid
  const renderProductGrid = () => (
    <section className="products-section">
      <h2 className="section-title">
        {selectedCategory 
          ? `${selectedCategory.name} for Girls` 
          : 'Featured Girls\' Fashion from Ghana'}
      </h2>
      
      {selectedCategory && (
        <div className="category-description-box">
          <p>{selectedCategory.culturalContext}</p>
          <div className="category-actions">
            <button 
              className="size-guide-button"
              onClick={() => setShowSizeGuide(true)}
            >
              <FaInfoCircle /> Size Guide
            </button>
            
            <button 
              className="cultural-story-button"
              onClick={() => openCulturalStory(
                selectedCategory.link === 'kente-traditional' ? 'story-kaba' : 
                selectedCategory.link === 'accessories' ? 'story-beads' : 'story-adinkra'
              )}
            >
              <FaInfoCircle /> Cultural Story
            </button>
          </div>
        </div>
      )}
      
      <div className="products-grid">
        {sortedProducts.map((product) => (
          <motion.div 
            key={product.id}
            className="product-card"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
              
              {product.isNew && (
                <span className="new-badge">New</span>
              )}
              
              {product.discountPercent > 0 && (
                <span className="discount-badge">-{product.discountPercent}%</span>
              )}
              
              <button 
                className="favorite-button"
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              
              <div className="quick-view-overlay">
                <button className="quick-view-button">
                  Quick View
                </button>
              </div>
            </div>
            
            <div className="product-content">
              <div className="product-meta">
                <span className="product-category">
                  {categories.find(c => c.link === product.category)?.name}
                </span>
                
                <div className="product-rating">
                  <FaStar />
                  <span>{product.rating}</span>
                  <small>({product.reviews})</small>
                </div>
              </div>
              
              <h3 className="product-name">{product.name}</h3>
              
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <span className="product-price">
                  ₵{product.price.toFixed(2)}
                </span>
                
                <span className="region-badge">
                  <GiAfrica /> 
                  <button 
                    className="region-text-button"
                    onClick={() => openRegionMap(product.region)}
                  >
                    {product.region}
                  </button>
                </span>
                
                {product.sustainabilityCertified && (
                  <span className="sustainability-badge" title={product.sustainabilityInfo}>
                    <MdEco /> Eco-friendly
                  </span>
                )}
              </div>
              
              {product.adinkraSymbols && product.adinkraSymbols.length > 0 && (
                <div className="adinkra-symbols">
                  {product.adinkraSymbols.map((symbol, i) => (
                    <button 
                      key={i}
                      className="adinkra-button"
                      title={adinkraSymbols[symbol]?.meaning}
                      onClick={() => showSymbolInfo(symbol)}
                    >
                      {adinkraSymbols[symbol]?.symbol}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="product-actions">
                <button className="add-to-cart-button">
                  <FaShoppingCart /> Add to Cart
                </button>
                
                <Link to={`/product/${product.id}`} className="view-details-link">
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // Render cultural education section
  const renderCulturalEducation = () => (
    <section className="cultural-education">
      <h2 className="section-title">Learn About Ghana's Fashion Heritage</h2>
      
      <div className="cultural-stories-grid">
        {culturalStories.map((story, index) => (
          <motion.div 
            key={story.id}
            className="story-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="story-image-container">
              <img 
                src={story.image} 
                alt={story.title} 
                className="story-image"
              />
            </div>
            
            <div className="story-content">
              <h3>{story.title}</h3>
              <p>{story.summary}</p>
              <button 
                className="read-story-button"
                onClick={() => openCulturalStory(story.id)}
              >
                Read Story
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // Render sustainability section
  const renderSustainabilitySection = () => (
    <section className="sustainability-section">
      <h2 className="section-title">Sustainable Fashion from Ghana</h2>
      
      <div className="sustainability-content">
        <div className="sustainability-image">
          <img 
            src="/images/sustainability/girls-eco-fashion.jpg" 
            alt="Sustainable fashion from Ghana" 
          />
        </div>
        
        <div className="sustainability-text">
          <h3>Our Commitment to Ethical & Sustainable Fashion</h3>
          <p>
            Made in Ghana children's clothing supports sustainable practices that preserve 
            both the environment and cultural heritage. Our girls' fashion emphasizes:
          </p>
          
          <ul className="sustainability-list">
            <li>
              <MdEco className="eco-icon" /> 
              Use of organic, locally grown cotton
            </li>
            <li>
              <MdEco className="eco-icon" /> 
              Natural dyes from plants grown in Ghana
            </li>
            <li>
              <MdEco className="eco-icon" /> 
              Support for women artisans and fair labor practices
            </li>
            <li>
              <MdEco className="eco-icon" /> 
              Preservation of traditional crafting techniques
            </li>
            <li>
              <MdEco className="eco-icon" /> 
              Reduced carbon footprint through local production
            </li>
          </ul>
          
          <div className="sustainability-badge">
            <MdVerified className="verified-icon" /> 
            Ghana Sustainable Fashion Certified
          </div>
        </div>
      </div>
    </section>
  );

  // Render artisan highlight section
  const renderArtisanHighlight = () => (
    <section className="artisan-highlight">
      <h2 className="section-title">Meet Our Artisans</h2>
      
      <div className="artisan-highlight-content">
        <div className="artisan-image">
          <img 
            src="/images/artisans/womens-cooperative.jpg" 
            alt="Women's Cooperative in Ghana" 
          />
        </div>
        
        <div className="artisan-story">
          <h3>Women's Cooperative of Bonwire</h3>
          
          <div className="artisan-location">
            <FaMapMarkerAlt /> Ashanti Region, Ghana
          </div>
          
          <p>
            The Women's Cooperative of Bonwire brings together skilled 
            artisans who create our girls' kente clothing. Working in the 
            traditional kente weaving village, these women have adapted centuries-old 
            techniques to create beautiful children's fashion that preserves cultural 
            heritage while providing comfortable, modern styles.
          </p>
          
          <p>
            By purchasing their creations, you support fair wages and sustainable 
            livelihoods for these talented women and their families.
          </p>
          
          <button 
            className="artisan-story-button"
            onClick={() => openCulturalStory('story-kaba')}
          >
            <FaInfoCircle /> Read Their Story
          </button>
        </div>
      </div>
    </section>
  );

  // Main component render
  return (
    <div className="girls-fashion-page">
      {/* Language selector */}
      <div className="language-selector">
        <FaLanguage className="language-icon" />
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading beautiful Ghanaian fashion for girls...</p>
        </div>
      ) : (
        <>
          {/* Page header */}
          <header className="page-header">
            <div className="breadcrumbs">
              <Link to="/">Home</Link> {' > '}
              <Link to="/girls-fashion">Girls' Fashion</Link>
              {selectedCategory && (
                <> {' > '} <span>{selectedCategory.name}</span></>
              )}
            </div>
            
            <h1 className="page-title">
              {selectedCategory 
                ? `${selectedCategory.name} for Girls` 
                : "Girls' Ghana-Made Fashion"}
            </h1>
          </header>
          
          {/* Hero section with carousel */}
          {!selectedCategory && renderHeroCarousel()}
          
          {/* Search and filters */}
          {renderSearchAndFilters()}
          
          {/* Main content based on context */}
          <main className="main-content">
            {!selectedCategory && renderCategoriesGrid()}
            
            {renderProductGrid()}
            
            {!selectedCategory && (
              <>
                {renderFeaturedCollections()}
                {renderCulturalEducation()}
                {renderSustainabilitySection()}
                {renderArtisanHighlight()}
              </>
            )}
          </main>
          
          {/* Symbol tooltip */}
          <AnimatePresence>
            {showAdinkraTooltip && currentSymbol && (
              <motion.div 
                className="adinkra-tooltip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <span className="adinkra-symbol-large">
                  {currentSymbol.symbol}
                </span>
                <span className="adinkra-meaning">
                  {currentSymbol.meaning}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Modals */}
          <Suspense fallback={<div className="loading-modal">Loading...</div>}>
            <AnimatePresence>
              {showSizeGuide && (
                <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
              )}
              
              {showCulturalStory && selectedStory && (
                <CulturalStoryModal 
                  story={selectedStory} 
                  onClose={() => setShowCulturalStory(false)} 
                />
              )}
              
              {showRegionMap && selectedRegion && (
                <RegionMapModal 
                  region={selectedRegion} 
                  onClose={() => setShowRegionMap(false)} 
                />
              )}
            </AnimatePresence>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default GirlsFashion;