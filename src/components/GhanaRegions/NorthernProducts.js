import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaLandmark, 
         FaArrowRight, FaArrowLeft, FaSun, FaMusic,
         FaCheckCircle, FaListUl, FaThLarge, FaHands, 
         FaDrum, FaCut, FaHeart, FaSeedling, FaLeaf,
         FaHome, FaTshirt, FaBowlingPin } from 'react-icons/fa';
import { GiSaltShaker, GiCottonFlower, GiHorseshoe, GiMillet } from 'react-icons/gi';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './NorthernProducts.css';

// Northern Region products data
const northernProducts = [
  { id: 1201, name: "Traditional Dagbon Smock", category: "Clothing", price: 180.00, image: "https://via.placeholder.com/150?text=Dagbon+Smock", description: "Authentic hand-woven smock (fugu) from Tamale, featuring traditional patterns and vibrant colors. Each piece represents months of skilled craftsmanship.", discount: null, rating: 4.9 },
  
  { id: 1202, name: "Daboya Salt", category: "Food", price: 8.50, image: "https://via.placeholder.com/150?text=Daboya+Salt", description: "Natural salt harvested from the ancient salt pans of Daboya. Known for its unique mineral content and distinctive flavor that enhances traditional northern cuisine.", discount: "Buy 2 Get 1 Free", rating: 4.6 },
  
  { id: 1203, name: "Northern Shea Butter", category: "Beauty", price: 15.00, image: "https://via.placeholder.com/150?text=Shea+Butter", description: "Pure, unrefined shea butter produced by women's cooperatives in Northern Ghana. Used for skincare, haircare, and traditional medicinal purposes.", discount: "10% off", rating: 4.8 },
  
  { id: 1204, name: "Dagomba Drum", category: "Musical Instruments", price: 120.00, image: "https://via.placeholder.com/150?text=Dagomba+Drum", description: "Traditional talking drum (lunna) handcrafted by master drum makers from the Dagbon kingdom. Used in ceremonial music and cultural performances.", discount: null, rating: 4.7 },
  
  { id: 1205, name: "Traditional Pito Beer", category: "Beverages", price: 7.50, image: "https://via.placeholder.com/150?text=Pito+Beer", description: "Traditional millet beer brewed using ancient techniques. This fermented beverage plays an important role in northern Ghanaian ceremonies and gatherings.", discount: null, rating: 4.5 },
  
  { id: 1206, name: "Artisanal Leather Sandals", category: "Footwear", price: 45.00, image: "https://via.placeholder.com/150?text=Leather+Sandals", description: "Handcrafted leather sandals made by skilled artisans in Tamale. Features traditional designs and natural tanned leather for durability and comfort.", discount: null, rating: 4.6 },
  
  { id: 1207, name: "Northern Baobab Powder", category: "Food", price: 12.00, image: "https://via.placeholder.com/150?text=Baobab+Powder", description: "Nutrient-rich powder made from wild-harvested baobab fruit. High in vitamin C, calcium, and antioxidants. Perfect for smoothies and baking.", discount: "5% off", rating: 4.4 },
  
  { id: 1208, name: "Dagbon Silver Jewelry", category: "Accessories", price: 85.00, image: "https://via.placeholder.com/150?text=Dagbon+Jewelry", description: "Traditional silver jewelry handcrafted by Dagbon silversmiths. Features intricate designs that tell stories of Northern Ghanaian heritage.", discount: null, rating: 4.8 },
  
  { id: 1209, name: "Millet Flour", category: "Food", price: 6.50, image: "https://via.placeholder.com/150?text=Millet+Flour", description: "Stone-ground millet flour from Northern Ghana's fertile fields. A staple grain used in traditional northern dishes like tuo zaafi.", discount: null, rating: 4.5 },
  
  { id: 1210, name: "Gonja Hat", category: "Accessories", price: 35.00, image: "https://via.placeholder.com/150?text=Gonja+Hat", description: "Traditional hat woven from native grass and cotton. Provides protection from the northern sun while showcasing cultural craftsmanship.", discount: "15% off", rating: 4.6 },
  
  { id: 1211, name: "Northern Yam Chips", category: "Food", price: 4.50, image: "https://via.placeholder.com/150?text=Yam+Chips", description: "Crispy yam chips made from locally grown yams, seasoned with traditional northern spices. A popular snack throughout Ghana.", discount: "3 for GH₵12", rating: 4.7 },
  
  { id: 1212, name: "Handwoven Floor Mat", category: "Home Decor", price: 75.00, image: "https://via.placeholder.com/150?text=Floor+Mat", description: "Large traditional floor mat handwoven from local fibers. Features geometric patterns that represent Northern Ghanaian symbols and stories.", discount: null, rating: 4.5 }
];

const NorthernProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('northern-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(northernProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('northern-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('northern');
    setNeighboringRegions(neighbors);
  }, []);

  // Change view animation
  const changeView = (view) => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveView(view);
      setFadeIn(true);
    }, 300);
  };

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    } else {
      console.log('Added to cart:', product);
    }
    
    // Show toast notification
    setAddedProduct(product);
    setShowToast(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBackToExplore = () => {
    navigate('/learn');
  };
  
  const navigateToRegion = (slug) => {
    navigate(`/regions/${slug}`);
  };

  return (
    <div className={`region-page northern-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
      {/* Toast notification for cart additions */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header className="toast-header">
            <FaCheckCircle className="text-success me-2" />
            <strong className="me-auto">Added to Cart</strong>
          </Toast.Header>
          <Toast.Body>
            {addedProduct && (
              <div className="d-flex align-items-center">
                <img 
                  src={addedProduct.image} 
                  alt={addedProduct.name} 
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                  className="me-2 rounded"
                />
                <div>
                  <div>{addedProduct.name}</div>
                  <div className="product-price">GH₵{addedProduct.price.toFixed(2)}</div>
                </div>
              </div>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="region-header">
        <Button 
          variant="outline-secondary" 
          size="sm" 
          className="back-button mb-2"
          onClick={handleBackToExplore}
        >
          <FaArrowLeft className="me-1" /> Back to Ghana Regions
        </Button>
        
        <h1 className="region-title">
          <GiCottonFlower className="region-icon me-2" /> Northern Region
        </h1>
        <p className="region-subtitle">Land of Traditional Crafts, Music & Cultural Heritage</p>
        
        <Nav className="view-toggle mb-4" variant="pills">
          <Nav.Item>
            <Nav.Link 
              active={activeView === 'region'} 
              onClick={() => changeView('region')}
              className="d-flex align-items-center"
            >
              <FaMapMarkedAlt className="me-2" /> Explore Region
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeView === 'products'} 
              onClick={() => changeView('products')}
              className="d-flex align-items-center"
            >
              <FaStore className="me-2" /> Browse Products
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {activeView === 'products' ? (
        /* Products View */
        <div className="products-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="lead mb-0">
              Discover authentic products from the Northern Region, renowned for its exquisite smock weaving, 
              traditional music instruments, and artisanal crafts that reflect the rich heritage of the Dagbon Kingdom.
            </p>
            <div className="view-options">
              <Button 
                variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                size="sm" 
                className="me-2"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <FaThLarge />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                size="sm"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <FaListUl />
              </Button>
            </div>
          </div>
          
          {categories.map(category => (
            <div key={category} className="category-section mb-5">
              <h2 className="category-title">{category}</h2>
              <Row className={`g-4 ${viewMode === 'list' ? 'product-list-view' : ''}`}>
                {northernProducts
                  .filter(product => product.category === category)
                  .map(product => (
                    <Col key={product.id} lg={viewMode === 'list' ? 12 : 3} md={viewMode === 'list' ? 12 : 4} sm={viewMode === 'list' ? 12 : 6}>
                      <Card className={`product-card h-100 shadow-sm ${viewMode === 'list' ? 'product-list-card' : ''}`}>
                        <div className={viewMode === 'list' ? 'd-md-flex' : ''}>
                          <div className="product-image-container">
                            <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
                            {product.discount && (
                              <Badge bg="danger" className="discount-badge">{product.discount}</Badge>
                            )}
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <Card.Title className="product-title">{product.name}</Card.Title>
                                <Badge bg="secondary" className="mb-2">{product.category}</Badge>
                              </div>
                              <span className="rating">★ {product.rating.toFixed(1)}</span>
                            </div>
                            <Card.Text className="product-description">{product.description}</Card.Text>
                            <div className="mt-auto">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="price">GH₵{product.price.toFixed(2)}</span>
                                {product.discount && (
                                  <span className="original-price text-muted text-decoration-line-through">
                                    GH₵{(product.price * 1.1).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className="d-grid gap-2">
                                <Button 
                                  variant="primary" 
                                  onClick={() => handleAddToCart(product)}
                                  className="d-flex align-items-center justify-content-center add-to-cart-btn"
                                >
                                  <FaShoppingCart className="me-2" /> Add to Cart
                                </Button>
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  as={Link}
                                  to={`/products/${product.id}`}
                                  className="view-details-btn"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </div>
      ) : (
        /* Region Exploration View */
        <div className="region-info-section">
          <Nav className="region-tabs mb-4" variant="tabs">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'culture'} 
                onClick={() => setActiveTab('culture')}
              >
                Culture & Heritage
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'attractions'} 
                onClick={() => setActiveTab('attractions')}
              >
                Attractions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'crafts'} 
                onClick={() => setActiveTab('crafts')}
              >
                Traditional Crafts
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <Row>
                <Col md={6}>
                  <div className="image-frame">
                    <img 
                      src="https://via.placeholder.com/600x400?text=Northern+Region" 
                      alt="Northern Region" 
                      className="img-fluid rounded mb-3 landscape-image" 
                    />
                  </div>

                  <div className="neighboring-regions mt-4">
                    <h5 className="mb-3">Neighboring Regions</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {neighboringRegions.map(region => (
                        <Button 
                          key={region.slug}
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => navigateToRegion(region.slug)}
                          className="region-nav-btn"
                        >
                          {region.region} <FaArrowRight className="ms-1" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <h3 className="overview-title">The Northern Region</h3>
                  <p>
                    The Northern Region is one of Ghana's most culturally rich areas, known for its 
                    traditional craftsmanship, vibrant music traditions, and historical significance. 
                    Home to the ancient Dagbon Kingdom, this region blends centuries-old traditions 
                    with modern development.
                  </p>
                  <p>
                    <strong>Capital:</strong> Tamale<br />
                    <strong>Population:</strong> Approximately 2.5 million<br />
                    <strong>Major Languages:</strong> Dagbani, Gonja, Mampruli, Hausa, English<br />
                    <strong>Notable Features:</strong> Dagbon Kingdom, traditional smock weaving, drumming traditions, Daboya salt mining
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaTshirt className="highlight-icon" />
                      <span>Smock Weaving</span>
                    </div>
                    <div className="highlight-item">
                      <FaDrum className="highlight-icon" />
                      <span>Traditional Music</span>
                    </div>
                    <div className="highlight-item">
                      <FaLandmark className="highlight-icon" />
                      <span>Dagbon Kingdom</span>
                    </div>
                    <div className="highlight-item">
                      <GiSaltShaker className="highlight-icon" />
                      <span>Salt Production</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Geography</h5>
                    <p>
                      The Northern Region has a tropical savanna climate with a single rainy season from May to October, 
                      followed by a prolonged dry season. The landscape is characterized by flat plains, occasional 
                      hills, and scattered trees. The White Volta River flows through parts of the region, providing 
                      water for agriculture and daily use.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'culture' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaLandmark className="me-2" />Cultural Heritage</h3>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Dagbon Kingdom</Card.Header>
                    <Card.Body>
                      <p>
                        The Dagbon Kingdom is one of Ghana's oldest and most significant traditional states, 
                        dating back to the 14th century. Led by the Ya Na (King), who resides in Yendi, the kingdom 
                        maintains rich cultural traditions, court protocols, and hierarchical systems that have 
                        influenced much of Northern Ghana's cultural landscape.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Dagbon+Kingdom" 
                        alt="Dagbon Kingdom" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="cultural-info mt-2">
                        <strong>Key Cultural Site:</strong> Palace of Ya Na in Yendi
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Damba Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Damba Festival is a major cultural celebration in the Northern Region, 
                        especially among the Dagomba people. It commemorates the birth and naming of Prophet 
                        Muhammad and features vibrant displays of drumming, dancing, horsemanship, and 
                        chieftaincy regalia, showcasing the rich cultural heritage of the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Damba+Festival" 
                        alt="Damba Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-season">
                        <strong>Festival Season:</strong> Lunar Islamic calendar, typically falling in October-November
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Traditional Music</Card.Header>
                    <Card.Body>
                      <p>
                        The Northern Region has a rich musical heritage centered around the talking drum 
                        (lunna), gonje (one-stringed fiddle), and other traditional instruments. Music plays 
                        a central role in daily life, ceremonies, and historical storytelling, with drummers 
                        often serving as cultural historians and praise singers.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Music" 
                        alt="Traditional Music" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="spiritual-practices">
                        <Badge bg="info" className="me-1">Ceremonial</Badge>
                        <Badge bg="secondary">Historical</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'attractions' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaMapMarkedAlt className="me-2" />Key Attractions</h3>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Tamale+Central+Mosque" />
                    </div>
                    <Card.Body>
                      <Card.Title>Tamale Central Mosque</Card.Title>
                      <Card.Text>
                        One of the most impressive architectural landmarks in northern Ghana, the Tamale 
                        Central Mosque combines traditional Islamic design with modern elements. The mosque's 
                        towering minarets and domes dominate the city's skyline, offering visitors a glimpse 
                        into the region's strong Islamic heritage.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Central Tamale</div>
                        <div><strong>Visiting:</strong> Respectful attire required; modest donations welcomed</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Daboya+Salt+Mines" />
                    </div>
                    <Card.Body>
                      <Card.Title>Daboya Salt Mining Village</Card.Title>
                      <Card.Text>
                        Visit the historic salt mining community of Daboya, where traditional salt harvesting 
                        has been practiced for centuries. Witness the labor-intensive process of extracting salt 
                        from the banks of the White Volta River using ancient methods passed down through generations.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Daboya, west of Tamale</div>
                        <div><strong>Experience:</strong> Cultural demonstrations, salt production process</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Mole+Dam" />
                    </div>
                    <Card.Body>
                      <Card.Title>Nawuni White Volta River Site</Card.Title>
                      <Card.Text>
                        Experience the natural beauty of the White Volta River at Nawuni, a picturesque spot 
                        where visitors can enjoy boat rides, observe traditional fishing methods, and witness 
                        the vibrant riverside communities that depend on this vital waterway for their livelihood 
                        and cultural practices.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Nawuni, 30km from Tamale</div>
                        <div><strong>Activities:</strong> Boat trips, fishing demonstrations, photography</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'crafts' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaHands className="me-2" />Traditional Crafts</h3>
              <Row>
                <Col md={6}>
                  <div className="craft-spotlight">
                    <div className="craft-image-container">
                      <img src="https://via.placeholder.com/500x300?text=Smock+Weaving" alt="Smock Weaving" className="craft-image" />
                      <div className="craft-badge">Signature Craft</div>
                    </div>
                    <h4 className="craft-title">Smock Weaving (Fugu)</h4>
                    <p className="craft-description">
                      The Northern Region is renowned for its exquisite smock weaving, locally known as "fugu" 
                      production. This traditional craft involves weaving narrow strips of hand-loomed cotton, 
                      which are then sewn together to create the iconic smock garments that symbolize status and 
                      cultural identity throughout Ghana.
                    </p>
                    <p>
                      The process begins with spinning locally grown cotton into thread, dyeing it using 
                      natural plant-based dyes, and weaving it on traditional looms operated by foot pedals. 
                      Master weavers incorporate intricate patterns and symbols that convey meaning and status, 
                      with royal smocks featuring particularly elaborate designs. The completed strips are then 
                      meticulously sewn together and embellished with embroidery to create the final garment.
                    </p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => changeView('products')}
                      className="mt-2 d-flex align-items-center gap-2"
                    >
                      <FaTshirt /> Shop Smock Products
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="craft-list">
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaDrum />
                      </div>
                      <div className="craft-content">
                        <h5>Drum Making</h5>
                        <p>
                          Skilled craftspeople create talking drums, war drums, and ceremonial drums using 
                          wood, animal skins, and natural fibers. These instruments are not merely musical 
                          tools but serve as important communication devices and cultural artifacts.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaCut />
                      </div>
                      <div className="craft-content">
                        <h5>Leatherwork</h5>
                        <p>
                          Traditional tanners and leatherworkers in Northern Ghana transform goat, sheep, and 
                          cattle hides into beautiful and durable products including sandals, bags, poufs, and 
                          ceremonial items using techniques passed down through generations.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <GiSaltShaker />
                      </div>
                      <div className="craft-content">
                        <h5>Salt Mining</h5>
                        <p>
                          The ancient craft of salt extraction in Daboya involves harvesting salt-rich soil from 
                          the banks of the White Volta, filtering water through it to create brine, and then 
                          evaporating the liquid to produce high-quality salt for cooking and preservation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <GiHorseshoe />
                      </div>
                      <div className="craft-content">
                        <h5>Blacksmithing</h5>
                        <p>
                          Northern blacksmiths create essential tools, ceremonial swords, agricultural implements, 
                          and decorative items using traditional forging techniques. This craft plays a vital role 
                          in supporting agriculture and preserving cultural traditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => changeView('products')} className="action-button">
              Browse Northern Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NorthernProducts;