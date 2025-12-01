import React, { useState } from 'react';
import { Row, Col, Button, Nav, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, FaArrowRight, FaMountain, FaWater, FaLeaf } from 'react-icons/fa';
import './EasternProducts.css';

const easternProducts = [
  { id: 301, name: 'Akosombo Silk Fabric', category: 'Textiles', price: 95.00, image: 'https://via.placeholder.com/150?text=Akosombo+Silk', description: 'Premium handwoven silk fabric made near Akosombo Dam, reflecting the region\'s natural colors.', discount: '10% off', rating: 4.9 },
  { id: 302, name: 'Aburi Botanical Honey', category: 'Food', price: 22.00, image: 'https://via.placeholder.com/150?text=Aburi+Honey', description: 'Pure honey harvested from apiaries in the Aburi Botanical Gardens.', discount: null, rating: 4.8 },
  { id: 303, name: 'Akuapem Cocoa Butter', category: 'Personal Care', price: 18.00, image: 'https://via.placeholder.com/150?text=Cocoa+Butter', description: 'Natural cocoa butter from the Akuapem Ridge, perfect for skincare.', discount: '15% off', rating: 4.7 },
  { id: 304, name: 'Boti Falls Painting', category: 'Art', price: 75.00, image: 'https://via.placeholder.com/150?text=Boti+Falls', description: 'Beautiful painting of the majestic twin Boti Falls, showcasing Eastern Region\'s natural beauty.', discount: null, rating: 4.8 },
  { id: 305, name: 'Atewa Forest Coffee', category: 'Food', price: 28.00, image: 'https://via.placeholder.com/150?text=Atewa+Coffee', description: 'Specialty coffee grown in the highlands of the Atewa Forest Reserve.', discount: '8% off', rating: 4.9 },
  { id: 306, name: 'Krobo Beads Jewelry', category: 'Jewelry', price: 45.00, image: 'https://via.placeholder.com/150?text=Krobo+Beads', description: 'Colorful handcrafted beaded jewelry from the Krobo tradition of Eastern Ghana.', discount: '12% off', rating: 4.6 },
  { id: 307, name: 'Koforidua Wood Carving', category: 'Home Decor', price: 60.00, image: 'https://via.placeholder.com/150?text=Wood+Carving', description: 'Intricately carved wooden sculpture from master carvers in Koforidua.', discount: null, rating: 4.7 },
  { id: 308, name: 'Mountain Herb Tea', category: 'Food', price: 12.00, image: 'https://via.placeholder.com/150?text=Herb+Tea', description: 'Herbal tea blend using medicinal plants from the Eastern highlands.', discount: '10% off', rating: 4.5 },
  { id: 309, name: 'Akosombo Batik', category: 'Textiles', price: 35.00, image: 'https://via.placeholder.com/150?text=Akosombo+Batik', description: 'Hand-dyed batik fabric inspired by the Volta River and dam.', discount: '5% off', rating: 4.4 },
  { id: 310, name: 'Palm Wine Basket', category: 'Home Decor', price: 30.00, image: 'https://via.placeholder.com/150?text=Palm+Wine+Basket', description: 'Traditional basket used for storing and serving palm wine, handwoven in Eastern Region.', discount: null, rating: 4.3 },
  { id: 311, name: 'Akyem Gold Jewelry', category: 'Jewelry', price: 180.00, image: 'https://via.placeholder.com/150?text=Akyem+Gold', description: 'Exquisite gold jewelry crafted using traditional Akyem goldsmithing techniques.', discount: '20% off', rating: 4.9 },
  { id: 312, name: 'Eastern Spice Blend', category: 'Food', price: 14.00, image: 'https://via.placeholder.com/150?text=Spice+Blend', description: 'Aromatic spice mix using ingredients from Eastern Region\'s fertile farmlands.', discount: null, rating: 4.6 }
];

const EasternProducts = ({ addToCart }) => {
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs: 'overview', 'culture', 'attractions', 'history'
  
  const categories = [...new Set(easternProducts.map(product => product.category))];

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    } else {
      console.log('Added to cart:', product);
      // You could implement local cart functionality or show a notification
    }
  };

  return (
    <div className="region-page eastern-region">
      <div className="region-header">
        <h1>Eastern Region</h1>
        <p className="region-subtitle">Ghana's Natural Paradise</p>
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
            Discover authentic crafts and products from the Eastern Region, known for its lush mountains, 
            spectacular waterfalls, and rich agricultural heritage.
          </p>
          
          {categories.map(category => (
            <div key={category} className="category-section mb-5">
              <h2 className="category-title">{category}</h2>
              <Row className="g-4">
                {easternProducts
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
                Natural Wonders
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
                    src="https://via.placeholder.com/600x400?text=Eastern+Region" 
                    alt="Eastern Region" 
                    className="img-fluid rounded mb-3 landscape-image" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Eastern Region</h3>
                  <p>
                    The Eastern Region of Ghana is known for its spectacular landscapes featuring mountains, 
                    waterfalls, and lush forests. It's home to the Akosombo Dam, which created Lake Volta, the 
                    largest artificial lake by surface area in the world.
                  </p>
                  <p>
                    <strong>Capital:</strong> Koforidua<br />
                    <strong>Population:</strong> Approximately 3.2 million<br />
                    <strong>Major Languages:</strong> Akan (Twi, Akuapem), Krobo, English<br />
                    <strong>Notable Features:</strong> Aburi Botanical Gardens, Boti Falls, Akosombo Dam, Atewa Forest
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaMountain className="highlight-icon" />
                      <span>Mountainous Terrain</span>
                    </div>
                    <div className="highlight-item">
                      <FaWater className="highlight-icon" />
                      <span>Stunning Waterfalls</span>
                    </div>
                    <div className="highlight-item">
                      <FaLeaf className="highlight-icon" />
                      <span>Agricultural Hub</span>
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
                    <Card.Header className="bg-primary text-white">Krobo Beadmaking</Card.Header>
                    <Card.Body>
                      <p>
                        The Krobo people of the Eastern Region are renowned for their colorful glass beadmaking. 
                        This centuries-old tradition involves recycling glass into beautiful beads used for 
                        adornment, ceremonies, and cultural identity.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Krobo+Beads" 
                        alt="Krobo Beadmaking" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="bg-primary text-white">Akyem Traditions</Card.Header>
                    <Card.Body>
                      <p>
                        The Akyem people celebrate the Ohum Festival, a thanksgiving celebration for 
                        bountiful harvests. Their traditional gold craftsmanship is among Ghana's finest, 
                        with techniques passed down through generations.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Akyem+Traditions" 
                        alt="Akyem Traditions" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="bg-primary text-white">Akuapem Heritage</Card.Header>
                    <Card.Body>
                      <p>
                        The Akuapem people are known for their Odwira Festival and their significant 
                        contribution to Ghanaian education and Christianity. The Akuapem Ridge towns 
                        were among the first to establish formal education in Ghana.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Akuapem+Heritage" 
                        alt="Akuapem Heritage" 
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
              <h3 className="mb-4"><FaMapMarkedAlt className="me-2" />Natural Wonders</h3>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Boti+Falls" />
                    <Card.Body>
                      <Card.Title>Boti Falls</Card.Title>
                      <Card.Text>
                        The magnificent twin waterfalls are one of Ghana's most beautiful natural sights. 
                        During the rainy season, the falls create a spectacular view as they cascade down 
                        the rocky cliff face.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Aburi+Gardens" />
                    <Card.Body>
                      <Card.Title>Aburi Botanical Gardens</Card.Title>
                      <Card.Text>
                        Established in 1890, these historic gardens showcase exotic and indigenous plants. 
                        Located on the cool Akuapem Ridge, they provide a peaceful retreat with stunning views.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Akosombo+Dam" />
                    <Card.Body>
                      <Card.Title>Akosombo Dam</Card.Title>
                      <Card.Text>
                        This engineering marvel created Lake Volta, the world's largest artificial lake by surface area. 
                        The dam provides hydroelectric power and has transformed Ghana's economy.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Atewa+Forest" />
                    <Card.Body>
                      <Card.Title>Atewa Forest Reserve</Card.Title>
                      <Card.Text>
                        This biodiversity hotspot is one of Ghana's most important conservation areas. 
                        The upland evergreen forest is home to rare butterflies, birds, and plants.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Umbrella+Rock" />
                    <Card.Body>
                      <Card.Title>Umbrella Rock</Card.Title>
                      <Card.Text>
                        This unique natural formation resembles an umbrella and has become a popular 
                        tourist attraction for its unusual shape and the panoramic views it offers.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Akonedi+Shrine" />
                    <Card.Body>
                      <Card.Title>Akonedi Shrine</Card.Title>
                      <Card.Text>
                        Located in Larteh Akuapem, this important traditional shrine attracts visitors 
                        interested in traditional spiritual practices and cultural heritage.
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
                  <div className="timeline-date">1700s</div>
                  <div className="timeline-content">
                    <h4>Akwamu Empire</h4>
                    <p>
                      The powerful Akwamu empire controlled much of what is now Eastern Region, 
                      establishing trade routes and cultural influence across southern Ghana.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1830s</div>
                  <div className="timeline-content">
                    <h4>Basel Missionaries</h4>
                    <p>
                      Swiss missionaries established schools and churches in Akuapem, bringing formal 
                      education and Christianity to the region. This led to Akuapem becoming an early 
                      center of education in Ghana.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1890</div>
                  <div className="timeline-content">
                    <h4>Establishment of Aburi Gardens</h4>
                    <p>
                      The British colonial government established the Aburi Botanical Gardens, which 
                      became an important research center for plant cultivation and a retreat for 
                      colonial officials seeking relief from coastal heat.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1965</div>
                  <div className="timeline-content">
                    <h4>Akosombo Dam Completion</h4>
                    <p>
                      President Kwame Nkrumah's vision was realized with the completion of the Akosombo Dam, 
                      creating Lake Volta and providing hydroelectric power crucial for Ghana's industrialization.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Present Day</div>
                  <div className="timeline-content">
                    <h4>Agricultural and Tourism Hub</h4>
                    <p>
                      The Eastern Region has developed into one of Ghana's most important agricultural areas 
                      and a growing tourism destination known for its natural beauty and cultural heritage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Eastern Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasternProducts;