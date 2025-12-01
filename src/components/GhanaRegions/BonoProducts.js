import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaInfoCircle, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, 
         FaMusic, FaArrowRight, FaArrowLeft, FaCheckCircle, FaGem } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import './BonoProducts.css';

const bonoProducts = [
  { id: 301, name: 'Bono Yam', category: 'Food', price: 20.00, image: 'https://via.placeholder.com/150?text=Bono+Yam', description: 'Freshly harvested yams, a staple in Bono cuisine.', discount: '10% off', rating: 4.6 },
  { id: 302, name: 'Techiman Beads', category: 'Crafts', price: 25.00, image: 'https://via.placeholder.com/150?text=Techiman+Beads', description: 'Handcrafted beads from Techiman market, used in jewelry.', discount: '15% off', rating: 4.7 },
  { id: 303, name: 'Woven Kente', category: 'Textiles', price: 100.00, image: 'https://via.placeholder.com/150?text=Woven+Kente', description: 'Traditional Bono kente fabric with unique patterns.', discount: '5% off', rating: 4.8 },
  { id: 304, name: 'Shea Butter Cream', category: 'Personal Care', price: 18.00, image: 'https://via.placeholder.com/150?text=Shea+Butter+Cream', description: 'Natural shea butter cream for skin hydration.', discount: '20% off', rating: 4.5 },
  { id: 305, name: 'Cassava Flour', category: 'Food', price: 15.00, image: 'https://via.placeholder.com/150?text=Cassava+Flour', description: 'High-quality cassava flour for local dishes.', discount: '12% off', rating: 4.4 },
  { id: 306, name: 'Bono Pottery', category: 'Home Decor', price: 35.00, image: 'https://via.placeholder.com/150?text=Bono+Pottery', description: 'Handmade pottery showcasing Bono artistry.', discount: '10% off', rating: 4.6 },
  { id: 307, name: 'Palm Wine', category: 'Beverages', price: 12.00, image: 'https://via.placeholder.com/150?text=Palm+Wine', description: 'Fresh palm wine, a traditional Bono drink.', discount: '15% off', rating: 4.3 },
  { id: 308, name: 'Wooden Carvings', category: 'Crafts', price: 50.00, image: 'https://via.placeholder.com/150?text=Wooden+Carvings', description: 'Intricate wooden carvings depicting Bono culture.', discount: '10% off', rating: 4.7 },
  { id: 309, name: 'Groundnut Soup Mix', category: 'Food', price: 22.00, image: 'https://via.placeholder.com/150?text=Groundnut+Soup+Mix', description: 'Spiced mix for preparing Bono groundnut soup.', discount: '8% off', rating: 4.5 },
  { id: 310, name: 'Bono Sandals', category: 'Footwear', price: 40.00, image: 'https://via.placeholder.com/150?text=Bono+Sandals', description: 'Leather sandals crafted by Bono artisans.', discount: '5% off', rating: 4.4 },
];

const BonoProducts = ({ addToCartProp }) => {
  const navigate = useNavigate();
  const { user, addToCart: contextAddToCart } = useContext(UserContext) || {};
  
  const [activeView, setActiveView] = useState('products');
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('bono-view-mode') || 'grid');
  
  const categories = [...new Set(bonoProducts.map(product => product.category))];

  useEffect(() => {
    localStorage.setItem('bono-view-mode', viewMode);
  }, [viewMode]);

  const handleAddToCart = (product) => {
    if (contextAddToCart) {
      contextAddToCart(product);
    } else if (addToCartProp) {
      addToCartProp(product);
    } else {
      console.log('Added to cart:', product);
    }
    
    setAddedProduct(product);
    setShowToast(true);
    
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBackToExplore = () => {
    navigate('/learn');
  };

  return (
    <div className="region-page bono-region">
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
          <FaGem className="region-icon me-2" /> Bono Region
        </h1>
        <p className="region-tagline">A Blend of Tradition and Nature</p>
        
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
        <div className="products-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="lead mb-0">
              Explore authentic products from the Bono Region, renowned for its vibrant markets and traditional crafts.
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
                {bonoProducts
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
                    src="https://via.placeholder.com/600x400?text=Bono+Region" 
                    alt="Bono Region" 
                    className="img-fluid rounded mb-3" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Bono Region</h3>
                  <p>
                    The Bono Region, located in central Ghana, is celebrated for its rich cultural heritage, 
                    bustling markets, and natural attractions. It was carved out of the former Brong-Ahafo Region.
                  </p>
                  <p>
                    <strong>Capital:</strong> Sunyani<br />
                    <strong>Population:</strong> Approximately 1.2 million<br />
                    <strong>Major Languages:</strong> Bono, Twi, English<br />
                    <strong>Notable Features:</strong> Techiman Market, Buabeng Fiema Monkey Sanctuary
                  </p>
                  <p>
                    The region is known for its agricultural productivity, traditional crafts, and vibrant festivals 
                    like the Apoo Festival.
                  </p>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'culture' && (
            <div className="tab-content">
              <h3 className="mb-4"><FaLandmark className="me-2" />Cultural Heritage</h3>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Apoo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        A traditional festival to cleanse the community of evil spirits, featuring music, dance, 
                        and colorful processions.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Apoo+Festival" 
                        alt="Apoo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Traditional Crafts</Card.Header>
                    <Card.Body>
                      <p>
                        Bono artisans excel in bead-making, pottery, and weaving, preserving centuries-old techniques.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Crafts" 
                        alt="Traditional Crafts" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Drumming & Dance</Card.Header>
                    <Card.Body>
                      <p>
                        Drumming and dance are central to Bono ceremonies, with performances like the Kete dance.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Drumming+Dance" 
                        alt="Drumming Dance" 
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
              <h3 className="mb-4"><FaMapMarkedAlt className="me-2" />Key Attractions</h3>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Buabeng+Fiema" />
                    <Card.Body>
                      <Card.Title>Buabeng Fiema Monkey Sanctuary</Card.Title>
                      <Card.Text>
                        A unique sanctuary where monkeys and humans coexist, surrounded by lush forest.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Techiman+Market" />
                    <Card.Body>
                      <Card.Title>Techiman Market</Card.Title>
                      <Card.Text>
                        One of Ghana’s largest markets, offering a variety of goods from food to crafts.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Kintampo+Waterfalls" />
                    <Card.Body>
                      <Card.Title>Kintampo Waterfalls</Card.Title>
                      <Card.Text>
                        A stunning waterfall offering a serene environment for relaxation and tourism.
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
                  <div className="timeline-date">Pre-Colonial Era</div>
                  <div className="timeline-content">
                    <h4>Bono Kingdom</h4>
                    <p>
                      The Bono people established a powerful kingdom known for trade and agriculture, 
                      predating the Ashanti Empire.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">19th Century</div>
                  <div className="timeline-content">
                    <h4>Colonial Influence</h4>
                    <p>
                      The region came under British influence as part of the Gold Coast, impacting local governance.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2019</div>
                  <div className="timeline-content">
                    <h4>Creation of Bono Region</h4>
                    <p>
                      The Bono Region was officially created from the Brong-Ahafo Region following a referendum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Bono Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonoProducts;