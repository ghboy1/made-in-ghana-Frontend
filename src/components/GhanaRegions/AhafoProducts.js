import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, 
         FaArrowRight, FaArrowLeft, FaTree, FaSeedling, FaLeaf, FaMountain, 
         FaCheckCircle, FaHammer } from 'react-icons/fa';
import './AhafoProducts.css';

// Ahafo region-specific products
const ahafoProducts = [
  { id: 501, name: 'Ahafo Cocoa Beans', category: 'Food', price: 35.00, image: 'https://via.placeholder.com/150?text=Cocoa+Beans', description: 'Premium cocoa beans harvested from the lush forests of Ahafo region, known for exceptional quality and flavor.', discount: '10% off', rating: 4.9 },
  { id: 502, name: 'Goaso Handwoven Basket', category: 'Crafts', price: 28.00, image: 'https://via.placeholder.com/150?text=Handwoven+Basket', description: 'Beautiful handwoven basket made by skilled artisans in Goaso using traditional techniques.', discount: null, rating: 4.7 },
  { id: 503, name: 'Ahafo Honey', category: 'Food', price: 22.00, image: 'https://via.placeholder.com/150?text=Forest+Honey', description: 'Pure, wild honey collected from Ahafo\'s protected forest reserves, with a unique floral flavor profile.', discount: '15% off', rating: 4.8 },
  { id: 504, name: 'Carved Wooden Stool', category: 'Home Decor', price: 75.00, image: 'https://via.placeholder.com/150?text=Wooden+Stool', description: 'Traditional wooden stool hand-carved by master craftsmen in Ahafo, featuring regional motifs and symbols.', discount: null, rating: 4.6 },
  { id: 505, name: 'Ahafo Kente Strip', category: 'Textiles', price: 45.00, image: 'https://via.placeholder.com/150?text=Kente+Strip', description: 'Colorful kente strip woven in Ahafo with patterns that tell stories of the region\'s heritage.', discount: '8% off', rating: 4.5 },
  { id: 506, name: 'Forest Spice Blend', category: 'Food', price: 12.00, image: 'https://via.placeholder.com/150?text=Spice+Blend', description: 'Unique blend of spices and herbs sourced from the Ahafo region, perfect for traditional Ghanaian dishes.', discount: null, rating: 4.7 },
  { id: 507, name: 'Ahafo Cocoa Butter', category: 'Personal Care', price: 18.00, image: 'https://via.placeholder.com/150?text=Cocoa+Butter', description: 'Pure, unrefined cocoa butter made from Ahafo cocoa beans, excellent for skincare and haircare.', discount: '12% off', rating: 4.8 },
  { id: 508, name: 'Timber Cutting Board', category: 'Kitchen', price: 32.00, image: 'https://via.placeholder.com/150?text=Cutting+Board', description: 'Premium cutting board made from sustainable hardwood timber harvested in Ahafo\'s managed forests.', discount: null, rating: 4.6 },
  { id: 509, name: 'Forest Artwork', category: 'Art', price: 65.00, image: 'https://via.placeholder.com/150?text=Forest+Painting', description: 'Beautiful painting depicting the lush forests and wildlife of the Ahafo region by a local artist.', discount: '10% off', rating: 4.9 },
  { id: 510, name: 'Goaso Palm Wine', category: 'Beverages', price: 25.00, image: 'https://via.placeholder.com/150?text=Palm+Wine', description: 'Traditional palm wine bottled in Goaso, offering a sweet, refreshing taste with cultural significance.', discount: null, rating: 4.5 }
];

const AhafoProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('ahafo-view-mode') || 'grid');
  
  const categories = [...new Set(ahafoProducts.map(product => product.category))];

  // Save view preference
  useEffect(() => {
    localStorage.setItem('ahafo-view-mode', viewMode);
  }, [viewMode]);

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

  return (
    <div className="region-page ahafo-region">
      {/* Toast notification for cart additions */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
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
                  <div className="text-primary">GH₵{addedProduct.price.toFixed(2)}</div>
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
          <FaTree className="region-icon me-2" /> Ahafo Region
        </h1>
        <p className="region-subtitle">The Green Heartland of Ghana</p>
        
        <Nav className="view-toggle mb-4" variant="pills">
          <Nav.Item>
            <Nav.Link 
              active={activeView === 'region'} 
              onClick={() => setActiveView('region')}
              className="d-flex align-items-center"
            >
              <FaMapMarkedAlt className="me-2" /> Explore Region
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeView === 'products'} 
              onClick={() => setActiveView('products')}
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
              Discover authentic crafts and products from the Ahafo Region, known for its lush forests, 
              abundant natural resources, and sustainable craftsmanship.
            </p>
            <div className="view-options">
              <Button 
                variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                size="sm" 
                className="me-2"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
          
          {categories.map(category => (
            <div key={category} className="category-section mb-5">
              <h2 className="category-title">{category}</h2>
              <Row className={`g-4 ${viewMode === 'list' ? 'product-list-view' : ''}`}>
                {ahafoProducts
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
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <FaShoppingCart className="me-2" /> Add to Cart
                                </Button>
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm" 
                                  as={Link}
                                  to={`/products/${product.id}`}
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
            <div className="tab-content">
              <Row>
                <Col md={6}>
                  <img 
                    src="https://via.placeholder.com/600x400?text=Ahafo+Region" 
                    alt="Ahafo Region" 
                    className="img-fluid rounded mb-3 landscape-image" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Ahafo Region</h3>
                  <p>
                    The Ahafo Region is one of Ghana's newest regions, created in 2018 from the western 
                    part of the former Brong-Ahafo Region. Known for its lush forests, rich biodiversity, 
                    and abundant natural resources, Ahafo is a significant contributor to Ghana's cocoa 
                    production, timber industry, and gold mining.
                  </p>
                  <p>
                    <strong>Capital:</strong> Goaso<br />
                    <strong>Population:</strong> Approximately 600,000<br />
                    <strong>Major Languages:</strong> Akan (primarily Twi), Sefwi, English<br />
                    <strong>Notable Features:</strong> Forest reserves, gold mines, timber resources, cocoa farms
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Rich Forest Resources</span>
                    </div>
                    <div className="highlight-item">
                      <FaSeedling className="highlight-icon" />
                      <span>Cocoa Cultivation</span>
                    </div>
                    <div className="highlight-item">
                      <FaHammer className="highlight-icon" />
                      <span>Mining Industry</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'culture' && (
            <div className="tab-content">
              <h3 className="mb-4"><FaLandmark className="me-2" />Cultural Heritage</h3>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="bg-primary text-white">Traditions & Festivals</Card.Header>
                    <Card.Body>
                      <p>
                        The Ahafo people celebrate several traditional festivals including the Apoo 
                        Festival, which serves as a purification ritual and a time for community members 
                        to express grievances against authority figures without fear of reprisal.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Ahafo+Festival" 
                        alt="Ahafo Festivals" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="bg-primary text-white">Arts & Crafts</Card.Header>
                    <Card.Body>
                      <p>
                        Ahafo is known for its skilled woodcarvers who create elaborate stools, drums, 
                        and decorative items. The region also has a strong basket weaving tradition, with 
                        designs passed down through generations.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Ahafo+Crafts" 
                        alt="Ahafo Crafts" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="bg-primary text-white">Music & Dance</Card.Header>
                    <Card.Body>
                      <p>
                        Traditional music in Ahafo features drums, rattles, and the seperewa (harp-lute). 
                        The Adowa and Kete dances are popular during celebrations, with unique regional 
                        variations in steps and rhythms.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Ahafo+Music" 
                        alt="Ahafo Music" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'attractions' && (
            <div className="tab-content">
              <h3 className="mb-4"><FaMapMarkedAlt className="me-2" />Notable Attractions</h3>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Goaso+Forest" />
                    <Card.Body>
                      <Card.Title>Goaso Forest Reserve</Card.Title>
                      <Card.Text>
                        One of Ghana's most important forest reserves, home to diverse plant and animal species, 
                        offering opportunities for eco-tourism and forest walks.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cocoa+Farms" />
                    <Card.Body>
                      <Card.Title>Ahafo Cocoa Farms</Card.Title>
                      <Card.Text>
                        Visit working cocoa farms to learn about the cultivation, harvesting, and processing 
                        of Ghana's famous cocoa beans that supply the global chocolate market.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Mim+Timber" />
                    <Card.Body>
                      <Card.Title>Mim Timber Market</Card.Title>
                      <Card.Text>
                        Explore one of Ghana's largest timber markets where local woodworkers showcase their 
                        craftsmanship, from furniture to intricate carvings.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="tab-content">
              <h3 className="mb-4"><FaHistory className="me-2" />Historical Significance</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Pre-1700s</div>
                  <div className="timeline-content">
                    <h4>Forest Kingdoms</h4>
                    <p>
                      The area now known as Ahafo was historically occupied by various forest kingdoms 
                      that maintained control over the rich natural resources of the region.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1700s-1800s</div>
                  <div className="timeline-content">
                    <h4>Ashanti Influence</h4>
                    <p>
                      The Ashanti Kingdom exerted significant influence over the Ahafo area, integrating it 
                      into its trading networks and cultural sphere of influence.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1900s</div>
                  <div className="timeline-content">
                    <h4>Cocoa Boom</h4>
                    <p>
                      The region experienced significant economic growth with the introduction and expansion 
                      of cocoa farming, transforming the local economy and landscape.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1959</div>
                  <div className="timeline-content">
                    <h4>Brong-Ahafo Region</h4>
                    <p>
                      The Brong-Ahafo Region was created, encompassing what would later become the 
                      separate Ahafo Region.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2018</div>
                  <div className="timeline-content">
                    <h4>Regional Autonomy</h4>
                    <p>
                      The Ahafo Region was officially established as part of Ghana's regional reorganization, 
                      separating from the Brong-Ahafo Region to better focus on local development needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Ahafo Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AhafoProducts;