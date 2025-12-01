import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaLandmark, 
         FaArrowRight, FaArrowLeft, FaSun, FaBorderAll,
         FaCheckCircle, FaShoppingBasket, FaListUl, FaThLarge, FaHands, 
         FaHatCowboy, FaCut, FaHeart, FaHome } from 'react-icons/fa';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './UpperEastProducts.css';

// Upper East Region products data
const upperEastProducts = [
  { id: 801, name: 'Bolga Basket (Large)', category: 'Basketry', price: 85.00, image: 'https://via.placeholder.com/150?text=Bolga+Basket', description: 'Handcrafted large Bolgatanga basket made with straw by skilled artisans. Each basket takes days to weave and features traditional patterns.', discount: '10% off', rating: 4.9 },
  { id: 802, name: 'Bolga Market Basket', category: 'Basketry', price: 65.00, image: 'https://via.placeholder.com/150?text=Market+Basket', description: 'Practical market basket with leather handle, perfect for shopping and everyday use. Lightweight yet extremely durable.', discount: null, rating: 4.8 },
  { id: 803, name: 'Smock (Fugu)', category: 'Textiles', price: 150.00, image: 'https://via.placeholder.com/150?text=Smock', description: 'Traditional hand-woven and embroidered cotton smock from the Upper East Region. Perfect for special occasions or as unique outerwear.', discount: '15% off', rating: 4.7 },
  { id: 804, name: 'Pito Traditional Beer', category: 'Beverages', price: 12.00, image: 'https://via.placeholder.com/150?text=Pito', description: 'Traditional sorghum beer brewed in the Upper East Region. This ancestral beverage is served during ceremonies and gatherings.', discount: null, rating: 4.5 },
  { id: 805, name: 'Leather Hat', category: 'Accessories', price: 45.00, image: 'https://via.placeholder.com/150?text=Leather+Hat', description: 'Handcrafted leather hat made by artisans in Bolgatanga, featuring decorative stitching and traditional motifs.', discount: '8% off', rating: 4.6 },
  { id: 806, name: 'Bolga Fan', category: 'Home Decor', price: 18.00, image: 'https://via.placeholder.com/150?text=Bolga+Fan', description: 'Handwoven decorative fan made from straw, traditionally used for cooling and now a popular decorative wall hanging.', discount: null, rating: 4.7 },
  { id: 807, name: 'Shea Butter (Organic)', category: 'Cosmetics', price: 15.00, image: 'https://via.placeholder.com/150?text=Shea+Butter', description: "Pure, unrefined shea butter harvested and processed by women's cooperatives in the Upper East Region.", discount: '5% off', rating: 4.9 },
  { id: 808, name: 'Traditional Drum', category: 'Musical Instruments', price: 120.00, image: 'https://via.placeholder.com/150?text=Drum', description: 'Handcrafted traditional drum made with wood and goatskin, used in cultural ceremonies and performances.', discount: null, rating: 4.8 },
  { id: 809, name: 'Leather Sandals', category: 'Footwear', price: 55.00, image: 'https://via.placeholder.com/150?text=Leather+Sandals', description: 'Durable handmade leather sandals from Bolgatanga, featuring traditional designs and comfortable fit.', discount: '12% off', rating: 4.7 },
  { id: 810, name: 'Leather Wallet', category: 'Accessories', price: 35.00, image: 'https://via.placeholder.com/150?text=Leather+Wallet', description: 'Handcrafted leather wallet made by artisans in the Upper East Region, featuring traditional patterns and durable construction.', discount: null, rating: 4.6 },
  { id: 811, name: 'Wall Basket Set', category: 'Home Decor', price: 95.00, image: 'https://via.placeholder.com/150?text=Wall+Baskets', description: 'Set of three decorative wall baskets in varying sizes, featuring vibrant patterns for striking wall decor.', discount: '8% off', rating: 4.8 },
  { id: 812, name: 'Crocodile Wood Carving', category: 'Art', price: 65.00, image: 'https://via.placeholder.com/150?text=Wood+Carving', description: 'Hand-carved wooden crocodile inspired by the sacred crocodiles of Paga, crafted by local artisans.', discount: null, rating: 4.7 }
];

const UpperEastProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('upper-east-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(upperEastProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('upper-east-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('upper-east');
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
    <div className={`region-page upper-east-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <FaShoppingBasket className="region-icon me-2" /> Upper East Region
        </h1>
        <p className="region-subtitle">Land of Baskets, Culture & Craftsmanship</p>
        
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
              Discover authentic products from the Upper East Region, renowned for its 
              world-famous Bolgatanga baskets, traditional textiles, and exceptional leather crafts.
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
                {upperEastProducts
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
                      src="https://via.placeholder.com/600x400?text=Upper+East+Region" 
                      alt="Upper East Region" 
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
                  <h3 className="overview-title">The Upper East Region</h3>
                  <p>
                    The Upper East Region is located in the northeastern corner of Ghana, bordered by 
                    Burkina Faso to the north and Togo to the east. It's characterized by its distinctive 
                    savannah landscape, traditional architecture, and rich cultural heritage that has been 
                    preserved through generations of skilled artisans.
                  </p>
                  <p>
                    <strong>Capital:</strong> Bolgatanga (often called "Bolga")<br />
                    <strong>Population:</strong> Approximately 1.3 million<br />
                    <strong>Major Languages:</strong> Gurune (Frafra), Kasem, Kusaal, Buli, English<br />
                    <strong>Notable Features:</strong> Paga Crocodile Pond, Tongo Hills, Bolgatanga Baskets, Traditional Architecture
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaShoppingBasket className="highlight-icon" />
                      <span>World-Famous Baskets</span>
                    </div>
                    <div className="highlight-item">
                      <FaHands className="highlight-icon" />
                      <span>Traditional Crafts</span>
                    </div>
                    <div className="highlight-item">
                      <FaHome className="highlight-icon" />
                      <span>Earth Architecture</span>
                    </div>
                    <div className="highlight-item">
                      <FaSun className="highlight-icon" />
                      <span>Savannah Landscape</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Geography</h5>
                    <p>
                      The Upper East Region has a single rainy season from May to October, followed by a 
                      long dry season characterized by the harmattan winds. The landscape is primarily 
                      Guinea savannah, with grasslands, scattered trees, and seasonal rivers. The terrain 
                      is generally flat with occasional rock formations, particularly around Tongo Hills.
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
                    <Card.Header className="culture-card-header">Traditional Architecture</Card.Header>
                    <Card.Body>
                      <p>
                        The Upper East Region is famous for its round mud houses with flat roofs, known as 
                        compound houses. These architectural marvels are built using local materials and 
                        traditional techniques that have been perfected over centuries to withstand the harsh 
                        climate conditions.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Housing" 
                        alt="Traditional Architecture" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="cultural-info mt-2">
                        <strong>Notable Examples:</strong> Sirigu and Paga traditional compounds
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Festivals & Dance</Card.Header>
                    <Card.Body>
                      <p>
                        The people of the Upper East celebrate various festivals throughout the year, many 
                        tied to the agricultural cycle. The Feok Festival of the Builsa, the Gologo Festival 
                        of the Talensi, and the Fao Festival of the Navrongo people are important cultural 
                        events featuring distinctive music, dance, and traditional ceremonies.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Cultural+Dance" 
                        alt="Traditional Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-season">
                        <strong>Festival Season:</strong> Primarily November-January after harvest
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Traditional Beliefs</Card.Header>
                    <Card.Body>
                      <p>
                        Traditional spiritual practices remain important in the Upper East Region. Sacred 
                        groves, ancestral shrines, and the famous sacred crocodiles of Paga reflect the 
                        deep connection between the people and their natural environment. These traditional 
                        beliefs coexist alongside Christianity and Islam in the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Sacred+Sites" 
                        alt="Sacred Sites" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="spiritual-practices">
                        <Badge bg="info" className="me-1">Ancestral Worship</Badge>
                        <Badge bg="secondary">Nature Veneration</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Paga+Crocodiles" />
                    </div>
                    <Card.Body>
                      <Card.Title>Paga Crocodile Pond</Card.Title>
                      <Card.Text>
                        The sacred crocodile ponds of Paga are home to over 100 protected crocodiles that 
                        live in harmony with the local population. According to local belief, these crocodiles 
                        embody the souls of the departed. Visitors can safely approach and even touch these 
                        normally fearsome reptiles under the guidance of local handlers.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Paga, near Ghana-Burkina Faso border</div>
                        <div><strong>Entry Fee:</strong> GH₵20 for locals, GH₵40 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Tongo+Hills" />
                    </div>
                    <Card.Body>
                      <Card.Title>Tongo Hills & Whistling Rocks</Card.Title>
                      <Card.Text>
                        The mysterious Tongo Hills feature dramatic rock formations, ancient shrines, and the 
                        famous "whistling rocks" that produce eerie sounds when the wind blows. This sacred 
                        site holds great spiritual significance for the Talensi people and offers stunning 
                        panoramic views of the surrounding landscape.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Near Tongo, Talensi district</div>
                        <div><strong>Entry Fee:</strong> GH₵15 with local guide required</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Pikworo+Camp" />
                    </div>
                    <Card.Body>
                      <Card.Title>Pikworo Slave Camp</Card.Title>
                      <Card.Text>
                        This historical site at Nania near Paga preserves the memory of a slave transit camp 
                        established in 1704. Visitors can see rock formations that were used as seats, eating 
                        bowls, and drumming surfaces for enslaved people before they were sent south to the 
                        coast. It's a somber reminder of this painful historical period.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Nania, near Paga</div>
                        <div><strong>Entry Fee:</strong> GH₵15 for locals, GH₵25 for foreigners</div>
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
                      <img src="https://via.placeholder.com/500x300?text=Bolga+Baskets" alt="Bolga Baskets" className="craft-image" />
                      <div className="craft-badge">Signature Craft</div>
                    </div>
                    <h4 className="craft-title">Bolgatanga Basketry</h4>
                    <p className="craft-description">
                      The world-famous Bolgatanga baskets, known internationally as "Bolga baskets," are hand-woven 
                      from straw harvested from the stalks of elephant grass (veta vera). Skilled artisans, primarily 
                      women, weave these baskets using techniques passed down through generations. Each basket takes 
                      days to complete and features intricate patterns and vibrant colors from natural and synthetic dyes.
                    </p>
                    <p>
                      Originally created as utilitarian items for carrying agricultural products, these baskets have 
                      become sought-after decorative pieces worldwide, prized for their durability, flexibility, and 
                      beautiful craftsmanship. They represent one of Ghana's most recognizable handicrafts and a vital 
                      source of income for many families in the Upper East Region.
                    </p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => changeView('products')}
                      className="mt-2 d-flex align-items-center gap-2"
                    >
                      <FaShoppingBasket /> Shop Bolga Baskets
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="craft-list">
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaCut />
                      </div>
                      <div className="craft-content">
                        <h5>Leatherwork</h5>
                        <p>
                          Leather artisans create beautiful bags, wallets, sandals, and decorative items using 
                          traditional tanning and dyeing methods. This craft has been practiced for centuries, 
                          with techniques passed down through generations of craftspeople.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaHatCowboy />
                      </div>
                      <div className="craft-content">
                        <h5>Traditional Textiles</h5>
                        <p>
                          The region is known for its distinctive smocks (fugu), hand-woven from strips of cotton 
                          and decorated with intricate embroidery. These garments are both practical for the climate 
                          and symbolically important for ceremonies and special occasions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaHeart />
                      </div>
                      <div className="craft-content">
                        <h5>Pottery & Clay Works</h5>
                        <p>
                          Traditional pottery is created primarily by women who harvest clay locally and shape 
                          it into functional vessels for cooking, storage, and water. Some pieces feature decorative 
                          elements that reflect local cultural motifs and patterns.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaBorderAll />
                      </div>
                      <div className="craft-content">
                        <h5>Decorative Wall Art</h5>
                        <p>
                          The Sirigu area is famous for its geometric wall paintings and relief designs created 
                          by women using natural pigments. These traditional decorations have evolved into a distinct 
                          art form recognized both nationally and internationally.
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
              Browse Upper East Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpperEastProducts;