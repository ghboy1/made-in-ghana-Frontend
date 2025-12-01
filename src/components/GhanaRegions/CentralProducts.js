import React, { useState } from 'react';
import { Row, Col, Button, Nav, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, FaArrowRight } from 'react-icons/fa';
import './CentralProducts.css';

const centralProducts = [
  { id: 201, name: 'Palm Oil', category: 'Food', price: 15.00, image: 'https://via.placeholder.com/150?text=Palm+Oil', description: 'Premium red palm oil produced in the Central Region.', discount: null, rating: 4.7 },
  { id: 202, name: 'Coastal Painting', category: 'Art', price: 60.00, image: 'https://via.placeholder.com/150?text=Coastal+Art', description: 'Beautiful paintings depicting Central Region\'s coastline and castles.', discount: '10% off', rating: 4.8 },
  { id: 203, name: 'Smoked Fish', category: 'Food', price: 20.00, image: 'https://via.placeholder.com/150?text=Smoked+Fish', description: 'Traditionally smoked fish from Central Region\'s coastal communities.', discount: '5% off', rating: 4.5 },
  { id: 204, name: 'Shell Necklace', category: 'Jewelry', price: 25.00, image: 'https://via.placeholder.com/150?text=Shell+Jewelry', description: 'Handcrafted necklace made from local seashells.', discount: '15% off', rating: 4.4 },
  { id: 205, name: 'Fante Kente', category: 'Textiles', price: 90.00, image: 'https://via.placeholder.com/150?text=Fante+Kente', description: 'Kente cloth with patterns unique to the Fante tradition.', discount: null, rating: 4.9 },
  { id: 206, name: 'Heritage Drum', category: 'Crafts', price: 70.00, image: 'https://via.placeholder.com/150?text=Heritage+Drum', description: 'Traditional drum crafted by artisans in Cape Coast.', discount: '8% off', rating: 4.6 },
  { id: 207, name: 'Coconut Craft', category: 'Home Decor', price: 18.00, image: 'https://via.placeholder.com/150?text=Coconut+Craft', description: 'Decorative items made from coconut shells.', discount: '12% off', rating: 4.3 },
  { id: 208, name: 'Castle Photography', category: 'Art', price: 40.00, image: 'https://via.placeholder.com/150?text=Castle+Photos', description: 'Framed photographs of the historic castles in Central Region.', discount: null, rating: 4.7 }
];

const CentralProducts = ({ addToCart }) => {
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs: 'overview', 'culture', 'attractions', 'history'
  
  const categories = [...new Set(centralProducts.map(product => product.category))];

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    } else {
      console.log('Added to cart:', product);
      // You could implement local cart functionality or show a notification
    }
  };

  return (
    <div className="region-page">
      <div className="region-header">
        <h1>Central Region</h1>
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
          <p className="lead">
            Discover authentic crafts and products from the Central Region, known for its coastal heritage, 
            fishing traditions, and historical significance.
          </p>
          
          {categories.map(category => (
            <div key={category} className="category-section mb-5">
              <h2 className="category-title">{category}</h2>
              <Row className="g-4">
                {centralProducts
                  .filter(product => product.category === category)
                  .map(product => (
                    <Col key={product.id} lg={3} md={4} sm={6}>
                      <Card className="product-card h-100 shadow-sm">
                        <div className="product-image-container">
                          <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
                          {product.discount && (
                            <Badge bg="danger" className="discount-badge">{product.discount}</Badge>
                          )}
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="product-title">{product.name}</Card.Title>
                          <Badge bg="secondary" className="mb-2">{product.category}</Badge>
                          <Card.Text className="product-description">{product.description}</Card.Text>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="price">GH₵{product.price.toFixed(2)}</span>
                              <span className="rating">★ {product.rating.toFixed(1)}</span>
                            </div>
                            <div className="d-grid gap-2">
                              <Button 
                                variant="primary" 
                                onClick={() => handleAddToCart(product)}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <FaShoppingCart className="me-2" /> Add to Cart
                              </Button>
                              <Button variant="outline-secondary" size="sm">View Details</Button>
                            </div>
                          </div>
                        </Card.Body>
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
                    src="https://via.placeholder.com/600x400?text=Central+Region" 
                    alt="Central Region" 
                    className="img-fluid rounded mb-3" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Central Region</h3>
                  <p>
                    The Central Region is known for its rich history, beautiful coastline, and significant role in 
                    Ghana's past. It contains several important historical sites related to the transatlantic slave trade.
                  </p>
                  <p>
                    <strong>Capital:</strong> Cape Coast<br />
                    <strong>Population:</strong> Approximately 2.2 million<br />
                    <strong>Major Languages:</strong> Fante, English<br />
                    <strong>Notable Features:</strong> Cape Coast Castle, Elmina Castle, Kakum National Park
                  </p>
                  <p>
                    The region is a major tourist destination due to its historical castles, beaches, and the famous 
                    canopy walkway at Kakum National Park. It also has a rich fishing tradition and vibrant festivals.
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
                    <Card.Header className="bg-primary text-white">Fante Festivals</Card.Header>
                    <Card.Body>
                      <p>
                        The Fante people of the Central Region celebrate various traditional festivals including 
                        Oguaa Fetu Afahye in Cape Coast and Bakatue in Elmina.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Fante+Festival" 
                        alt="Fante Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Fishing Traditions</Card.Header>
                    <Card.Body>
                      <p>
                        Coastal communities maintain strong fishing traditions with colorful fishing boats 
                        and ceremonies to ensure good catches.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Fishing+Boats" 
                        alt="Fishing Traditions" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Fante Cuisine</Card.Header>
                    <Card.Body>
                      <p>
                        The region is known for its delicious seafood dishes and unique preparations like 
                        Fante Fante (fish stew) and Etew (steamed corn dough).
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Fante+Cuisine" 
                        alt="Fante Cuisine" 
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
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cape+Coast+Castle" />
                    <Card.Body>
                      <Card.Title>Cape Coast Castle</Card.Title>
                      <Card.Text>
                        A UNESCO World Heritage site and one of the most important historical landmarks 
                        in Ghana, used during the transatlantic slave trade.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Kakum+National+Park" />
                    <Card.Body>
                      <Card.Title>Kakum National Park</Card.Title>
                      <Card.Text>
                        Famous for its canopy walkway suspended 30 meters above the ground, offering 
                        spectacular views of the rainforest.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Elmina+Castle" />
                    <Card.Body>
                      <Card.Title>Elmina Castle</Card.Title>
                      <Card.Text>
                        The oldest European building in sub-Saharan Africa, built by the Portuguese in 1482.
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
                  <div className="timeline-date">1482</div>
                  <div className="timeline-content">
                    <h4>Elmina Castle Construction</h4>
                    <p>
                      The Portuguese built Elmina Castle (São Jorge da Mina), establishing the first European 
                      trading post in sub-Saharan Africa.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1637</div>
                  <div className="timeline-content">
                    <h4>Dutch Conquest</h4>
                    <p>
                      The Dutch captured Elmina Castle from the Portuguese and eventually built other forts 
                      along the coast.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1750-1850</div>
                  <div className="timeline-content">
                    <h4>Height of Slave Trade</h4>
                    <p>
                      The castles in the Central Region became major transit points in the transatlantic slave trade.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1877</div>
                  <div className="timeline-content">
                    <h4>Colonial Capital</h4>
                    <p>
                      Cape Coast served as the capital of the Gold Coast colony until it was moved to Accra.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2009</div>
                  <div className="timeline-content">
                    <h4>Presidential Visit</h4>
                    <p>
                      U.S. President Barack Obama visited Cape Coast Castle, highlighting its historical significance 
                      to the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Central Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralProducts;