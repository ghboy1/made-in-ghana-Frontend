import React, { useState } from 'react';
import { Row, Col, Button, Nav, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, FaArrowRight } from 'react-icons/fa';
import './GreaterAccraProducts.css';

const greaterAccraProducts = [
  { id: 101, name: 'Accra Art Prints', category: 'Art', price: 45.00, image: 'https://via.placeholder.com/150?text=Accra+Art', description: 'Contemporary art prints showcasing Accra\'s vibrant urban landscape.', discount: '10% off', rating: 4.6 },
  { id: 102, name: 'Ga Kente Stole', category: 'Textiles', price: 85.00, image: 'https://via.placeholder.com/150?text=Kente+Stole', description: 'Elegantly designed kente stole with unique Ga patterns.', discount: '5% off', rating: 4.8 },
  { id: 103, name: 'Labadi Beach Painting', category: 'Art', price: 120.00, image: 'https://via.placeholder.com/150?text=Beach+Painting', description: 'Original painting depicting the lively atmosphere of Labadi Beach.', discount: null, rating: 4.7 },
  { id: 104, name: 'Accra Beaded Jewelry', category: 'Jewelry', price: 35.00, image: 'https://via.placeholder.com/150?text=Beaded+Jewelry', description: 'Handcrafted beaded necklace and bracelet set inspired by Ga traditions.', discount: '15% off', rating: 4.5 },
  { id: 105, name: 'Urban Leather Bag', category: 'Accessories', price: 75.00, image: 'https://via.placeholder.com/150?text=Leather+Bag', description: 'Modern leather bag made by Accra\'s skilled leather craftsmen.', discount: '8% off', rating: 4.4 },
  { id: 106, name: 'Jamestown Photography Book', category: 'Books', price: 50.00, image: 'https://via.placeholder.com/150?text=Photo+Book', description: 'A visual journey through historic Jamestown with stunning photographs.', discount: null, rating: 4.9 },
  { id: 107, name: 'Coconut Oil', category: 'Personal Care', price: 15.00, image: 'https://via.placeholder.com/150?text=Coconut+Oil', description: 'Pure cold-pressed coconut oil produced from coastal Greater Accra.', discount: '20% off', rating: 4.6 },
  { id: 108, name: 'Accra Spice Mix', category: 'Food', price: 12.00, image: 'https://via.placeholder.com/150?text=Spice+Mix', description: 'Traditional spice blend perfect for seasoning fish and meat dishes.', discount: '5% off', rating: 4.3 },
  { id: 109, name: 'Independence Arch Model', category: 'Souvenirs', price: 40.00, image: 'https://via.placeholder.com/150?text=Arch+Model', description: 'Detailed miniature model of the iconic Independence Arch.', discount: null, rating: 4.5 },
  { id: 110, name: 'Handwoven Basket', category: 'Home Decor', price: 30.00, image: 'https://via.placeholder.com/150?text=Basket', description: 'Beautifully crafted basket made from locally sourced materials.', discount: '12% off', rating: 4.7 }
];

const GreaterAccraProducts = ({ addToCart }) => {
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs: 'overview', 'culture', 'attractions', 'history'
  
  const categories = [...new Set(greaterAccraProducts.map(product => product.category))];

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
        <h1>Greater Accra Region</h1>
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
            Discover authentic crafts and products from Greater Accra, the vibrant capital region known for contemporary art and traditional crafts with urban influences.
          </p>
          
          {categories.map(category => (
            <div key={category} className="category-section mb-5">
              <h2 className="category-title">{category}</h2>
              <Row className="g-4">
                {greaterAccraProducts
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
                    src="https://via.placeholder.com/600x400?text=Greater+Accra+Region" 
                    alt="Greater Accra Region" 
                    className="img-fluid rounded mb-3" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Greater Accra Region</h3>
                  <p>
                    Greater Accra is the smallest yet most populous region of Ghana, containing the capital city Accra. 
                    It's the economic and administrative hub of the country with a vibrant mix of modern and traditional life.
                  </p>
                  <p>
                    <strong>Capital:</strong> Accra<br />
                    <strong>Population:</strong> Approximately 5 million<br />
                    <strong>Major Languages:</strong> Ga, English, Akan<br />
                    <strong>Notable Features:</strong> Jamestown Lighthouse, Independence Square, National Museum
                  </p>
                  <p>
                    The region is home to the seat of government, major financial institutions, and the country's
                    largest port. Its coastal location has made it a historical trading hub and a melting pot of cultures.
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
                    <Card.Header className="bg-primary text-white">Ga Homowo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        An important harvest festival celebrated by the Ga people, involving a period of silence, 
                        traditional drumming, and the sprinkling of kpokpoi (a traditional food).
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Homowo+Festival" 
                        alt="Homowo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Contemporary Art Scene</Card.Header>
                    <Card.Body>
                      <p>
                        Accra is home to a vibrant art scene with numerous galleries, studios, and art festivals
                        showcasing Ghanaian contemporary artworks.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Accra+Art" 
                        alt="Accra Art Scene" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Highlife Music</Card.Header>
                    <Card.Body>
                      <p>
                        Greater Accra is at the heart of Ghana's highlife music tradition, a genre 
                        that has shaped the country's musical identity for generations.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Highlife+Music" 
                        alt="Highlife Music" 
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
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Nkrumah+Memorial" />
                    <Card.Body>
                      <Card.Title>Kwame Nkrumah Memorial Park</Card.Title>
                      <Card.Text>
                        A memorial park dedicated to Ghana's first president, featuring a mausoleum and 
                        museum about his life and Ghana's independence.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Jamestown+Lighthouse" />
                    <Card.Body>
                      <Card.Title>Jamestown Lighthouse</Card.Title>
                      <Card.Text>
                        A historic lighthouse in the old Jamestown district, offering panoramic 
                        views of Accra and the Gulf of Guinea.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Labadi+Beach" />
                    <Card.Body>
                      <Card.Title>Labadi Beach</Card.Title>
                      <Card.Text>
                        One of Accra's most popular beaches, known for its lively atmosphere, 
                        fresh seafood, and cultural performances.
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
                  <div className="timeline-date">1500s</div>
                  <div className="timeline-content">
                    <h4>European Contact</h4>
                    <p>
                      The coastal area of present-day Greater Accra became a major trading post for 
                      European powers, particularly the Portuguese, Dutch, and British.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1877</div>
                  <div className="timeline-content">
                    <h4>Accra becomes Capital</h4>
                    <p>
                      Accra replaced Cape Coast as the capital of the British Gold Coast colony.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1957</div>
                  <div className="timeline-content">
                    <h4>Independence</h4>
                    <p>
                      Accra witnessed the historic declaration of Ghana's independence by Kwame Nkrumah at Independence Square.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1960s-Present</div>
                  <div className="timeline-content">
                    <h4>Urban Expansion</h4>
                    <p>
                      Greater Accra has experienced rapid urbanization, transforming from a colonial town 
                      into a metropolitan hub for West Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Greater Accra Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreaterAccraProducts;