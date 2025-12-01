import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, 
         FaArrowRight, FaArrowLeft, FaDrum, FaSeedling, FaWater, 
         FaCheckCircle, FaShoppingBasket, FaListUl, FaThLarge } from 'react-icons/fa';
import './BonoEastProducts.css';

const bonoEastProducts = [
  { id: 401, name: 'Techiman Yam Flour', category: 'Food', price: 18.00, image: 'https://via.placeholder.com/150?text=Yam+Flour', description: 'Premium yam flour produced in Techiman, perfect for making fufu and other traditional dishes.', discount: '10% off', rating: 4.7 },
  { id: 402, name: 'Kintampo Shea Butter', category: 'Personal Care', price: 15.00, image: 'https://via.placeholder.com/150?text=Shea+Butter', description: 'Pure organic shea butter sourced from the Kintampo area, excellent for skin and hair care.', discount: null, rating: 4.9 },
  { id: 403, name: 'Nkoranza Kente Cloth', category: 'Textiles', price: 85.00, image: 'https://via.placeholder.com/150?text=Kente+Cloth', description: 'Handwoven kente cloth with patterns unique to the Bono East tradition.', discount: '15% off', rating: 4.8 },
  { id: 404, name: 'Atebubu Clay Pottery', category: 'Crafts', price: 45.00, image: 'https://via.placeholder.com/150?text=Clay+Pottery', description: 'Traditional clay pots handcrafted by skilled artisans in Atebubu.', discount: null, rating: 4.6 },
  { id: 405, name: 'Kintampo Waterfall Art', category: 'Art', price: 65.00, image: 'https://via.placeholder.com/150?text=Waterfall+Art', description: 'Beautiful paintings depicting the majestic Kintampo waterfalls.', discount: '8% off', rating: 4.5 },
  { id: 406, name: 'Techiman Market Basket', category: 'Home Decor', price: 28.00, image: 'https://via.placeholder.com/150?text=Market+Basket', description: 'Sturdy handwoven baskets traditionally used in the famous Techiman market.', discount: null, rating: 4.4 },
  { id: 407, name: 'Bono East Smock', category: 'Fashion', price: 75.00, image: 'https://via.placeholder.com/150?text=Traditional+Smock', description: 'Handcrafted traditional smock with embroidery patterns from the Bono East Region.', discount: '12% off', rating: 4.7 },
  { id: 408, name: 'Organic Cashew Nuts', category: 'Food', price: 22.00, image: 'https://via.placeholder.com/150?text=Cashew+Nuts', description: 'Naturally grown cashew nuts from Bono East\'s fertile farmlands.', discount: '5% off', rating: 4.8 },
  { id: 409, name: 'Bamboo Flute', category: 'Music', price: 35.00, image: 'https://via.placeholder.com/150?text=Bamboo+Flute', description: 'Traditional bamboo flute crafted by local musicians for authentic Bono East melodies.', discount: null, rating: 4.6 },
  { id: 410, name: 'Wild Forest Honey', category: 'Food', price: 20.00, image: 'https://via.placeholder.com/150?text=Bono+Honey', description: 'Pure wild honey harvested from the forests of Bono East.', discount: '10% off', rating: 4.9 },
  { id: 411, name: 'Techiman Maize Flour', category: 'Food', price: 14.00, image: 'https://via.placeholder.com/150?text=Maize+Flour', description: 'Finely ground maize flour from Bono East\'s agricultural heartland, perfect for making banku and porridge.', discount: null, rating: 4.5 },
  { id: 412, name: 'Kintampo Carved Stool', category: 'Home Decor', price: 95.00, image: 'https://via.placeholder.com/150?text=Carved+Stool', description: 'Traditional wooden stool hand-carved by artisans from Kintampo with symbolic Bono patterns.', discount: '7% off', rating: 4.7 }
];

const neighboringRegions = [
  { name: 'Ashanti', slug: 'ashanti' },
  { name: 'Ahafo', slug: 'ahafo' },
  { name: 'Northern', slug: 'northern' },
  { name: 'Savannah', slug: 'savannah' }
];

const BonoEastProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products');
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('bono-east-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  
  const categories = [...new Set(bonoEastProducts.map(product => product.category))];

  useEffect(() => {
    localStorage.setItem('bono-east-view-mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

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
    
    setAddedProduct(product);
    setShowToast(true);
    
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBackToExplore = () => {
    navigate('/learn');
  };
  
  const navigateToRegion = (slug) => {
    navigate(`/regions/${slug}`);
  };

  return (
    <div className={`region-page bono-east-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <FaShoppingBasket className="region-icon me-2" /> Bono East Region
        </h1>
        <p className="region-subtitle">Agricultural Heartland of Ghana</p>
        
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
        <div className="products-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="lead mb-0">
              Discover authentic crafts and products from the Bono East Region, known for its 
              agricultural abundance, vibrant markets, and traditional craftsmanship.
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
                {bonoEastProducts
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
                      src="https://via.placeholder.com/600x400?text=Bono+East+Region" 
                      alt="Bono East Region" 
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
                          {region.name} <FaArrowRight className="ms-1" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <h3 className="overview-title">The Bono East Region</h3>
                  <p>
                    The Bono East Region was created in 2018 as part of Ghana's regional reorganization. 
                    It is known for its agricultural productivity, hosting some of Ghana's largest markets, 
                    and its rich cultural heritage. The regional capital, Techiman, is home to one of West Africa's 
                    largest agricultural markets, attracting traders from across the sub-region.
                  </p>
                  <p>
                    <strong>Capital:</strong> Techiman<br />
                    <strong>Population:</strong> Approximately 1.2 million<br />
                    <strong>Major Languages:</strong> Akan (Bono), Gonja, English<br />
                    <strong>Notable Features:</strong> Techiman Market, Kintampo Waterfalls, Fuller Falls, Bono East Agricultural Belt, Monkey Sanctuary
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaSeedling className="highlight-icon" />
                      <span>Agricultural Powerhouse</span>
                    </div>
                    <div className="highlight-item">
                      <FaWater className="highlight-icon" />
                      <span>Natural Attractions</span>
                    </div>
                    <div className="highlight-item">
                      <FaDrum className="highlight-icon" />
                      <span>Rich Cultural Heritage</span>
                    </div>
                    <div className="highlight-item">
                      <FaShoppingBasket className="highlight-icon" />
                      <span>Commercial Center</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate</h5>
                    <p>
                      Bono East falls within Ghana's transition zone between the southern forest and northern savanna, 
                      with a mix of forest vegetation and grassland. The region experiences two main seasons - rainy 
                      (April to October) and dry (November to March). Average temperatures range from 24°C to 30°C.
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
                    <Card.Header className="culture-card-header">Apoo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Apoo Festival is celebrated by the Bono people, allowing citizens to express 
                        their grievances towards authority figures without fear of punishment. It also 
                        serves as a purification rite for the community and is celebrated with drumming, dancing, and feasting.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Apoo+Festival" 
                        alt="Apoo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-date mt-2">
                        <strong>When:</strong> April - May annually
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Traditional Music</Card.Header>
                    <Card.Body>
                      <p>
                        Bono East is known for its rich musical traditions featuring instruments like 
                        the fontomfrom drums and the seperewa (harp-lute). These musical forms are central 
                        to traditional ceremonies and celebrations, with distinct drumming patterns unique to the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Bono+Music" 
                        alt="Traditional Music" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="music-sample">
                        <Button variant="outline-primary" size="sm" className="mt-2">
                          <FaMusic className="me-1" /> Listen to Sample
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Craft Traditions</Card.Header>
                    <Card.Body>
                      <p>
                        The region maintains strong craft traditions including basket weaving, pottery, 
                        kente weaving, and woodcarving. Many of these crafts are practiced by families who 
                        have passed down techniques across generations, with designs representing local stories and symbols.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Bono+Crafts" 
                        alt="Craft Traditions" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="craft-workshops">
                        <Badge bg="info" className="me-1">Workshops</Badge>
                        <Badge bg="secondary">Apprenticeships</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Kintampo+Waterfalls" />
                    </div>
                    <Card.Body>
                      <Card.Title>Kintampo Waterfalls</Card.Title>
                      <Card.Text>
                        One of Ghana's most beautiful natural attractions, these multi-tiered 
                        waterfalls cascade down rocky steps in a lush forest setting, creating 
                        spectacular scenery and natural swimming pools.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Kintampo</div>
                        <div><strong>Entry Fee:</strong> GH₵15 for locals, GH₵30 for tourists</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Techiman+Market" />
                    </div>
                    <Card.Body>
                      <Card.Title>Techiman Market</Card.Title>
                      <Card.Text>
                        One of West Africa's largest markets, the Techiman Market is a vibrant center 
                        for trade in agricultural produce, crafts, and various goods. It's especially 
                        lively on market days when traders come from all over Ghana and neighboring countries.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Market Days:</strong> Monday, Thursday, and Saturday</div>
                        <div><strong>Best Time to Visit:</strong> Morning (6am - 10am)</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Boabeng+Fiema" />
                    </div>
                    <Card.Body>
                      <Card.Title>Boabeng-Fiema Monkey Sanctuary</Card.Title>
                      <Card.Text>
                        A unique wildlife sanctuary where colobus and mona monkeys are considered sacred 
                        and protected by the local communities of Boabeng and Fiema. These monkeys freely 
                        roam the villages and interact with residents.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Between Boabeng and Fiema villages</div>
                        <div><strong>Entry Fee:</strong> GH₵20 for locals, GH₵40 for tourists</div>
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
                  <div className="timeline-date">Pre-1700s</div>
                  <div className="timeline-content">
                    <h4>Bono Kingdom</h4>
                    <p>
                      The area was part of the ancient Bono Kingdom (also known as Bonoman), 
                      one of the earliest Akan states established around the 11th century. 
                      Bonoman was known for early gold mining and trading activities.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1700s</div>
                  <div className="timeline-content">
                    <h4>Trading Routes</h4>
                    <p>
                      The region became an important transit point for trade routes between 
                      the northern territories and southern Ghana, contributing to its economic growth. 
                      Techiman emerged as a significant market town during this period.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1900s</div>
                  <div className="timeline-content">
                    <h4>Colonial Period</h4>
                    <p>
                      During the colonial era, the area was administered as part of the Brong-Ahafo Region, 
                      with agriculture becoming increasingly important to the economy. Colonial road networks 
                      enhanced the region's position as a trading center.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2018</div>
                  <div className="timeline-content">
                    <h4>Regional Creation</h4>
                    <p>
                      The Bono East Region was officially created in 2018 when the former Brong-Ahafo Region 
                      was divided into three separate regions: Bono, Bono East, and Ahafo. Techiman was 
                      designated as the regional capital.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Present</div>
                  <div className="timeline-content">
                    <h4>Agricultural Hub</h4>
                    <p>
                      Today, the region serves as one of Ghana's important food baskets, producing 
                      significant quantities of food crops and hosting major markets that supply 
                      produce to other parts of Ghana and neighboring countries. It's also developing 
                      its tourism infrastructure around natural attractions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => changeView('products')} className="action-button">
              Browse Bono East Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonoEastProducts;