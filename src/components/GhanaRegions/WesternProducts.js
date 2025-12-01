import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, 
         FaArrowRight, FaArrowLeft, FaDrum, FaTree, FaWater, FaFish, FaAnchor,
         FaCheckCircle, FaShoppingBasket, FaListUl, FaThLarge, FaOilCan, FaMountain } from 'react-icons/fa';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './WesternProducts.css';

// Western Region products data
const westernProducts = [
  { id: 701, name: 'Coconut Oil', category: 'Food & Oils', price: 25.00, image: 'https://via.placeholder.com/150?text=Coconut+Oil', description: 'Pure organic coconut oil from the coastal areas of Western Region, perfect for cooking and skincare.', discount: '10% off', rating: 4.8 },
  { id: 702, name: 'Rubber Craft Stamps', category: 'Crafts', price: 18.50, image: 'https://via.placeholder.com/150?text=Rubber+Stamps', description: 'Handcrafted stamps made from Western Region rubber plantations, carved with traditional Ghanaian symbols.', discount: null, rating: 4.5 },
  { id: 703, name: 'Palm Oil', category: 'Food & Oils', price: 22.00, image: 'https://via.placeholder.com/150?text=Palm+Oil', description: 'Traditional red palm oil from Western Region, rich in flavor and essential nutrients.', discount: '5% off', rating: 4.7 },
  { id: 704, name: 'Coastal Woven Basket', category: 'Home Decor', price: 35.00, image: 'https://via.placeholder.com/150?text=Woven+Basket', description: 'Handwoven baskets from coastal communities, using traditional designs from Western Region.', discount: null, rating: 4.6 },
  { id: 705, name: 'Nzulezo Art Print', category: 'Art', price: 45.00, image: 'https://via.placeholder.com/150?text=Nzulezo+Art', description: 'Beautiful art prints featuring the famous stilt village of Nzulezo, a Western Region landmark.', discount: '8% off', rating: 4.7 },
  { id: 706, name: 'Coastal Smoked Fish', category: 'Food & Oils', price: 18.00, image: 'https://via.placeholder.com/150?text=Smoked+Fish', description: 'Traditional smoked fish prepared by coastal communities of Western Region, a local delicacy.', discount: null, rating: 4.5 },
  { id: 707, name: 'Coastal Shell Jewelry', category: 'Accessories', price: 28.00, image: 'https://via.placeholder.com/150?text=Shell+Jewelry', description: 'Handcrafted jewelry made from seashells collected along Western Region\'s beautiful coastline.', discount: '12% off', rating: 4.6 },
  { id: 708, name: 'Gold-Flecked Soap', category: 'Personal Care', price: 12.00, image: 'https://via.placeholder.com/150?text=Gold+Soap', description: 'Natural soap featuring gold flecks from Western Region, known for its gold mining history.', discount: null, rating: 4.3 },
  { id: 709, name: 'Western Batik Fabric', category: 'Textiles', price: 55.00, image: 'https://via.placeholder.com/150?text=Batik+Fabric', description: 'Hand-dyed batik fabric with patterns inspired by Western Region\'s coastal and forest scenery.', discount: '15% off', rating: 4.8 },
  { id: 710, name: 'Ankasa Forest Honey', category: 'Food & Oils', price: 28.00, image: 'https://via.placeholder.com/150?text=Forest+Honey', description: 'Wild honey harvested sustainably from the Ankasa Forest Reserve in Western Region.', discount: null, rating: 4.9 },
  { id: 711, name: 'Coastal Coconut Craft', category: 'Home Decor', price: 32.00, image: 'https://via.placeholder.com/150?text=Coconut+Craft', description: 'Decorative items crafted from coconut shells, a sustainable craft tradition from Western Region\'s coast.', discount: '8% off', rating: 4.6 },
  { id: 712, name: 'Cape Three Points Painting', category: 'Art', price: 75.00, image: 'https://via.placeholder.com/150?text=Cape+Painting', description: 'Original paintings depicting the beautiful Cape Three Points lighthouse and coastline.', discount: null, rating: 4.7 }
];

const WesternProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('western-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(westernProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('western-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('western');
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
    <div className={`region-page western-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <FaAnchor className="region-icon me-2" /> Western Region
        </h1>
        <p className="region-subtitle">Coastal Gateway & Natural Resource Hub</p>
        
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
              Discover authentic products from the Western Region, known for its 
              coastal resources, forests, and natural wealth including palm oil, coconut, and gold.
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
                {westernProducts
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
                active={activeTab === 'history'} 
                onClick={() => setActiveTab('history')}
              >
                History
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <Row>
                <Col md={6}>
                  <div className="image-frame">
                    <img 
                      src="https://via.placeholder.com/600x400?text=Western+Region" 
                      alt="Western Region" 
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
                  <h3 className="overview-title">The Western Region</h3>
                  <p>
                    The Western Region of Ghana is located in the southern part of the country, 
                    bordered by Côte d'Ivoire to the west and the Atlantic Ocean to the south. 
                    It's one of Ghana's most resource-rich regions, known for its gold mines, 
                    offshore oil fields, lush forests, and beautiful beaches.
                  </p>
                  <p>
                    <strong>Capital:</strong> Sekondi-Takoradi<br />
                    <strong>Population:</strong> Approximately 2.5 million<br />
                    <strong>Major Languages:</strong> Fante, Nzema, Wassa, Ahanta, English<br />
                    <strong>Notable Features:</strong> Cape Three Points, Ankasa Forest Reserve, Nzulezo Stilt Village, Fort Metal Cross
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaOilCan className="highlight-icon" />
                      <span>Natural Resources</span>
                    </div>
                    <div className="highlight-item">
                      <FaWater className="highlight-icon" />
                      <span>Beautiful Coastline</span>
                    </div>
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Rainforests</span>
                    </div>
                    <div className="highlight-item">
                      <FaFish className="highlight-icon" />
                      <span>Fishing Communities</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate</h5>
                    <p>
                      The Western Region experiences a tropical climate with two rainy seasons. 
                      The major rainy season runs from March to July, while the minor one occurs 
                      between September and November. Average temperatures range from 22°C to 34°C, 
                      with high humidity near the coast. The southernmost point of Ghana, Cape Three Points, 
                      is located in this region.
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
                    <Card.Header className="culture-card-header">Kundum Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Kundum Festival is celebrated by the Ahanta and Nzema people in the Western Region. 
                        It's a harvest festival that also serves as a time for spiritual cleansing, family 
                        reunions, and community planning. The festival features traditional drumming, dancing, 
                        and processions.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Kundum+Festival" 
                        alt="Kundum Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-date mt-2">
                        <strong>When:</strong> September - October annually
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Maritime Traditions</Card.Header>
                    <Card.Body>
                      <p>
                        The coastal communities of Western Region have strong maritime cultural traditions. 
                        Fishing villages like Axim and Dixcove maintain rituals related to sea safety, 
                        with fishermen performing ceremonies before major fishing expeditions. These traditions 
                        blend indigenous beliefs with modern practices.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Fishing+Traditions" 
                        alt="Maritime Traditions" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="music-sample">
                        <Button variant="outline-primary" size="sm" className="mt-2">
                          <FaMusic className="me-1" /> Listen to Fishing Songs
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Coastal Craftsmanship</Card.Header>
                    <Card.Body>
                      <p>
                        Western Region artisans are known for crafts that utilize local materials. 
                        Coconut shell carving, marine-themed jewelry, boat building, and basket weaving 
                        are practiced in many communities. These crafts often feature themes related to 
                        the ocean, forests, and natural resources of the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Western+Crafts" 
                        alt="Coastal Craftsmanship" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="craft-workshops">
                        <Badge bg="info" className="me-1">Workshops</Badge>
                        <Badge bg="secondary">Craft Centers</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cape+Three+Points" />
                    </div>
                    <Card.Body>
                      <Card.Title>Cape Three Points</Card.Title>
                      <Card.Text>
                        The southernmost point of Ghana, Cape Three Points is where the Greenwich Meridian 
                        (0° Longitude) meets the equator. It features a historic lighthouse built in 1875 
                        and offers breathtaking views of the Atlantic Ocean along pristine beaches.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> 70km west of Takoradi</div>
                        <div><strong>Entry Fee:</strong> GH₵15 for locals, GH₵30 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Nzulezo" />
                    </div>
                    <Card.Body>
                      <Card.Title>Nzulezo Stilt Village</Card.Title>
                      <Card.Text>
                        A UNESCO World Heritage site, Nzulezo is a village built entirely on stilts over 
                        Lake Tadane. According to local legend, the village was built by settlers who were 
                        led to this location by a snail. Visit by canoe to experience this unique community.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Near Beyin</div>
                        <div><strong>Tour Fee:</strong> GH₵20 for locals, GH₵40 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Ankasa+Forest" />
                    </div>
                    <Card.Body>
                      <Card.Title>Ankasa Forest Reserve</Card.Title>
                      <Card.Text>
                        One of Ghana's most biodiverse protected areas, the Ankasa Forest Reserve contains 
                        pristine rainforest, rivers, and rare wildlife. It's a haven for birdwatchers, 
                        nature lovers, and those interested in Ghana's spectacular flora and fauna.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Western Region, near Elubo</div>
                        <div><strong>Entry Fee:</strong> GH₵20 for locals, GH₵50 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaHistory className="me-2" />Historical Significance</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Pre-1400s</div>
                  <div className="timeline-content">
                    <h4>Indigenous Settlements</h4>
                    <p>
                      The area was inhabited by various ethnic groups including the Ahanta, Nzema, and Wassa 
                      peoples who established communities based primarily on fishing, farming, and trading.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1400s-1600s</div>
                  <div className="timeline-content">
                    <h4>European Contact</h4>
                    <p>
                      Portuguese explorers arrived on the coast in the late 15th century, beginning 
                      European engagement with the region. The name "Gold Coast" was given due to the 
                      abundance of gold found in the area. Multiple European powers established trading posts.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1700s</div>
                  <div className="timeline-content">
                    <h4>Colonial Trade</h4>
                    <p>
                      The region became a center for trade in gold, ivory, timber, and unfortunately, 
                      enslaved people. Forts such as Metal Cross (Dixcove) and St. Anthony (Axim) were 
                      built along the coast as trading centers and defensive structures.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1800s-1900s</div>
                  <div className="timeline-content">
                    <h4>British Control & Resources</h4>
                    <p>
                      The British eventually dominated the region. The Western Region became important 
                      for its natural resources, particularly gold mining, timber, and agricultural products 
                      like cocoa, rubber, and palm oil, which were exported through Sekondi-Takoradi.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1957-Present</div>
                  <div className="timeline-content">
                    <h4>Post-Independence & Oil Discovery</h4>
                    <p>
                      After Ghana's independence in 1957, Western Region continued to be a key economic contributor. 
                      The discovery of offshore oil in commercial quantities in 2007 brought a new era of development. 
                      The "Jubilee Field" and subsequent oil fields have transformed the region into Ghana's oil hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => changeView('products')} className="action-button">
              Browse Western Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WesternProducts;