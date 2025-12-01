import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLeaf, FaTree, 
         FaArrowRight, FaArrowLeft, FaCoffee, FaHiking, FaSeedling, 
         FaCheckCircle, FaShoppingBasket, FaListUl, FaThLarge } from 'react-icons/fa';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './VoltaProducts.css';

// Volta Region products data
const voltaProducts = [
  { id: 801, name: 'Premium Cocoa Beans', category: 'Food & Agriculture', price: 45.00, image: 'https://via.placeholder.com/150?text=Cocoa+Beans', description: 'Premium-grade cocoa beans from Western North\'s finest farms, perfect for chocolate making or culinary uses.', discount: '5% off', rating: 4.9 },
  { id: 802, name: 'Cocoa Butter Moisturizer', category: 'Beauty', price: 22.50, image: 'https://via.placeholder.com/150?text=Cocoa+Butter', description: 'Natural moisturizer made from pure cocoa butter harvested from Western North farms, excellent for skin care.', discount: null, rating: 4.8 },
  { id: 803, name: 'Handcrafted Wooden Chess Set', category: 'Crafts', price: 85.00, image: 'https://via.placeholder.com/150?text=Chess+Set', description: 'Artisan chess set carved from sustainably harvested Western North hardwoods with traditional designs.', discount: '10% off', rating: 4.7 },
  { id: 804, name: 'Forest Honey', category: 'Food & Agriculture', price: 18.00, image: 'https://via.placeholder.com/150?text=Forest+Honey', description: 'Wild honey collected from the pristine forests of Western North, known for its rich flavor and medicinal properties.', discount: null, rating: 4.9 },
  { id: 805, name: 'Rainforest Tea Blend', category: 'Beverages', price: 12.50, image: 'https://via.placeholder.com/150?text=Rainforest+Tea', description: 'Herbal tea blended with leaves and flowers from the rainforests of Western North, offering a unique flavor and health benefits.', discount: '8% off', rating: 4.6 },
  { id: 806, name: 'Cocoa Pod Wall Art', category: 'Home Decor', price: 65.00, image: 'https://via.placeholder.com/150?text=Cocoa+Art', description: 'Decorative wall art featuring cocoa pods carved from local wood, celebrating the region\'s cocoa heritage.', discount: null, rating: 4.7 },
  { id: 807, name: 'Wooden Serving Bowls', category: 'Home Decor', price: 35.00, image: 'https://via.placeholder.com/150?text=Wooden+Bowls', description: 'Set of 3 handcrafted serving bowls made from sustainable Western North timber, perfect for everyday use or display.', discount: '15% off', rating: 4.5 },
  { id: 808, name: 'Forest Spice Mix', category: 'Food & Agriculture', price: 8.50, image: 'https://via.placeholder.com/150?text=Spice+Mix', description: 'Unique blend of spices harvested from the forests of Western North, adding authentic Ghanaian flavor to any dish.', discount: null, rating: 4.4 },
  { id: 809, name: 'Natural Cocoa Powder', category: 'Food & Agriculture', price: 15.00, image: 'https://via.placeholder.com/150?text=Cocoa+Powder', description: 'Pure, unsweetened cocoa powder from Western North farms, perfect for baking and hot chocolate.', discount: '5% off', rating: 4.8 },
  { id: 810, name: 'Carved Elephant Figurine', category: 'Crafts', price: 48.00, image: 'https://via.placeholder.com/150?text=Wood+Elephant', description: 'Intricately carved elephant figurine made from local hardwood, symbolizing strength and wisdom.', discount: null, rating: 4.6 },
  { id: 811, name: 'Bamboo Fiber Textiles', category: 'Textiles', price: 28.00, image: 'https://via.placeholder.com/150?text=Bamboo+Textile', description: 'Eco-friendly textiles made from bamboo fibers grown in Western North, known for softness and sustainability.', discount: '12% off', rating: 4.5 },
  { id: 812, name: 'Cocoa Nib Cookies', category: 'Food & Agriculture', price: 9.50, image: 'https://via.placeholder.com/150?text=Cocoa+Cookies', description: 'Traditional cookies with cocoa nibs from Western North, a perfect blend of crunch and chocolate flavor.', discount: null, rating: 4.7 }
];

const VoltaProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('volta-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(voltaProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('volta-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('volta');
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
    <div className={`region-page volta-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <FaTree className="region-icon me-2" /> Volta Region
        </h1>
        <p className="region-subtitle">Ghana's Eastern Haven of Culture & Natural Beauty</p>
        
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
              Discover authentic products from Western North, Ghana's prized cocoa-growing region, 
              known for its lush rainforests, sustainable timber, and rich agricultural heritage.
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
                {voltaProducts
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
                      src="https://via.placeholder.com/600x400?text=Western+North+Region" 
                      alt="Western North Region" 
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
                  <h3 className="overview-title">The Volta Region</h3>
                  <p>
                    The Western North Region was created in 2018 as part of Ghana's reorganization of regions. 
                    Carved from the former Western Region, it is known for its extensive rainforests, cocoa 
                    production, and remarkable biodiversity. The region plays a crucial role in Ghana's 
                    economy as one of the country's major cocoa-producing areas.
                  </p>
                  <p>
                    <strong>Capital:</strong> Sefwi Wiawso<br />
                    <strong>Population:</strong> Approximately 880,000<br />
                    <strong>Major Languages:</strong> Sefwi, Akan, English<br />
                    <strong>Notable Features:</strong> Bia National Park, Cocoa Farms, Ankasa Forest Reserve
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaCoffee className="highlight-icon" />
                      <span>Cocoa Production</span>
                    </div>
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Rainforests</span>
                    </div>
                    <div className="highlight-item">
                      <FaLeaf className="highlight-icon" />
                      <span>Biodiversity</span>
                    </div>
                    <div className="highlight-item">
                      <FaSeedling className="highlight-icon" />
                      <span>Agriculture</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate</h5>
                    <p>
                      The Western North Region has a tropical climate with two rainy seasons. 
                      Its extensive forest cover contributes to high humidity and consistent rainfall, 
                      making it ideal for cocoa cultivation. Average temperatures range between 
                      25°C to 30°C throughout the year, with the highest rainfall occurring between 
                      May and July.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'culture' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4">Cultural Heritage</h3>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Eluo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Eluo Festival is celebrated by the Sefwi people of Western North Region. 
                        This important cultural event marks the beginning of the yam harvest season and 
                        includes rituals to thank the ancestors for a bountiful harvest. The festival 
                        features traditional drumming, dancing, and displays of local crafts.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Eluo+Festival" 
                        alt="Eluo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-date mt-2">
                        <strong>When:</strong> September annually
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Cocoa Farming Culture</Card.Header>
                    <Card.Body>
                      <p>
                        Cocoa farming is not just an economic activity but a way of life in the Western 
                        North Region. Farmers have developed unique harvesting techniques and ceremonies 
                        that have been passed down for generations. Cocoa has influenced everything from 
                        music to proverbs and community organization.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Cocoa+Farming" 
                        alt="Cocoa Farming Culture" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="traditions">
                        <Badge bg="success" className="me-1">Harvesting Songs</Badge>
                        <Badge bg="success">Cocoa Ceremonies</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Wood Carving Tradition</Card.Header>
                    <Card.Body>
                      <p>
                        The abundant forest resources of Western North have led to a rich tradition of 
                        wood carving. Local artisans create intricate sculptures, masks, stools, and 
                        household items that reflect historical events, legends, and everyday life. 
                        These carvings often incorporate motifs from cocoa farming and forest animals.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Wood+Carving" 
                        alt="Wood Carving Tradition" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="craft-workshops">
                        <Badge bg="info">Carving Workshops</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'attractions' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4">Key Attractions</h3>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Bia+National+Park" />
                    </div>
                    <Card.Body>
                      <Card.Title>Bia National Park</Card.Title>
                      <Card.Text>
                        Bia National Park is one of Ghana's most important protected areas, hosting 
                        rare species like forest elephants, bongo antelopes, and numerous primates. 
                        The park represents one of West Africa's last remaining portions of the original 
                        rainforest belt, making it a critical biodiversity hotspot.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Northwestern part of Western North</div>
                        <div><strong>Entry Fee:</strong> GH₵20 for locals, GH₵50 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cocoa+Research+Institute" />
                    </div>
                    <Card.Body>
                      <Card.Title>Cocoa Research Institute</Card.Title>
                      <Card.Text>
                        Visit the Cocoa Research Institute to learn about Ghana's history with this 
                        valuable crop. The institute offers tours of experimental farms, demonstrations 
                        of chocolate-making, and exhibits on the development of disease-resistant cocoa 
                        varieties that have transformed Ghana's agricultural landscape.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Near Sefwi Wiawso</div>
                        <div><strong>Tour Fee:</strong> GH₵15 for locals, GH₵30 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Sefwi+Wiawso+Palace" />
                    </div>
                    <Card.Body>
                      <Card.Title>Sefwi Wiawso Palace</Card.Title>
                      <Card.Text>
                        The ancestral palace of the Sefwi Wiawso traditional area offers visitors a 
                        glimpse into the region's rich cultural heritage. The palace showcases traditional 
                        architecture, historical artifacts, and royal regalia. Visitors may occasionally 
                        witness traditional court proceedings and ceremonies.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Sefwi Wiawso town center</div>
                        <div><strong>Visit Fee:</strong> GH₵10 for locals, GH₵25 for foreigners</div>
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
              <h3 className="mb-4">Historical Significance</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Pre-1700s</div>
                  <div className="timeline-content">
                    <h4>Early Settlements</h4>
                    <p>
                      The area was originally settled by groups related to the Akan peoples, particularly 
                      the Sefwi, who established kingdoms and chiefdoms throughout the forest region. 
                      Their economies were based on hunting, gathering forest products, and farming.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1700s-1800s</div>
                  <div className="timeline-content">
                    <h4>Kingdom Development</h4>
                    <p>
                      The Sefwi Kingdom developed as one of the powerful states in the area, with distinctive 
                      cultural practices and political systems. The dense forests provided protection from 
                      external invasions and allowed the development of unique cultural traditions.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Late 1800s</div>
                  <div className="timeline-content">
                    <h4>Colonial Period</h4>
                    <p>
                      The area came under British influence as part of the Gold Coast colony. The British 
                      were interested in the region's gold deposits and timber resources, which led to 
                      increased extraction activities and the building of rudimentary infrastructure.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Early 1900s</div>
                  <div className="timeline-content">
                    <h4>Introduction of Cocoa</h4>
                    <p>
                      Cocoa cultivation was introduced to the region, transforming its economy and landscape. 
                      The favorable climate and soil conditions made the area ideal for cocoa production, 
                      which quickly became the dominant economic activity and shaped cultural practices.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1957-2018</div>
                  <div className="timeline-content">
                    <h4>Post-Independence Era</h4>
                    <p>
                      After Ghana's independence, the area remained part of the Western Region. It continued 
                      to be a major contributor to Ghana's economy through cocoa production, timber, and 
                      other forest resources. Conservation efforts began to address deforestation concerns.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2018-Present</div>
                  <div className="timeline-content">
                    <h4>New Regional Status</h4>
                    <p>
                      In 2018, Western North was carved out as a separate region from the Western Region 
                      as part of Ghana's creation of six new regions. This change aimed to bring governance 
                      closer to the people and accelerate development. Sefwi Wiawso was designated as the 
                      regional capital.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => changeView('products')} className="action-button">
              Browse Western North Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoltaProducts;