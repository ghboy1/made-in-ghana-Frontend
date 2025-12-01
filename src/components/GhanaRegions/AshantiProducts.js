import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaInfoCircle, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, 
         FaMusic, FaArrowRight, FaArrowLeft, FaCheckCircle, FaGem } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import './ashanti.css';

const ashantiProducts = [
  { id: 201, name: 'Kente Cloth', category: 'Textiles', price: 120.00, image: 'https://via.placeholder.com/150?text=Kente+Cloth', description: 'Traditional handwoven fabric with vibrant patterns, perfect for cultural events.', discount: '10% off', rating: 4.8 },
  { id: 202, name: 'Ashanti Gold Necklace', category: 'Jewelry', price: 250.00, image: 'https://via.placeholder.com/150?text=Gold+Necklace', description: 'Elegant 24K gold necklace crafted by local artisans in Kumasi.', discount: '15% off', rating: 4.9 },
  { id: 203, name: 'Wooden Stool', category: 'Furniture', price: 80.00, image: 'https://via.placeholder.com/150?text=Wooden+Stool', description: 'Hand-carved stool with traditional Adinkra symbols, a cultural masterpiece.', discount: '5% off', rating: 4.5 },
  { id: 204, name: 'Shea Butter', category: 'Personal Care', price: 15.00, image: 'https://via.placeholder.com/150?text=Shea+Butter', description: 'Organic shea butter for skin nourishment, produced by women cooperatives.', discount: '20% off', rating: 4.7 },
  { id: 205, name: 'Cocoa Powder', category: 'Food', price: 25.00, image: 'https://via.placeholder.com/150?text=Cocoa+Powder', description: 'Pure cocoa powder from Ashanti cocoa farms, ideal for baking and beverages.', discount: '12% off', rating: 4.6 },
  { id: 206, name: 'Beaded Bracelet', category: 'Jewelry', price: 30.00, image: 'https://via.placeholder.com/150?text=Beaded+Bracelet', description: 'Colorful beaded bracelet showcasing Ashanti artistry.', discount: '8% off', rating: 4.3 },
  { id: 207, name: 'Palm Oil', category: 'Food', price: 18.00, image: 'https://via.placeholder.com/150?text=Palm+Oil', description: 'Locally produced palm oil, rich in flavor for traditional Ghanaian dishes.', discount: '10% off', rating: 4.4 },
  { id: 208, name: 'Ashanti Pottery', category: 'Home Decor', price: 40.00, image: 'https://via.placeholder.com/150?text=Pottery', description: 'Handmade pottery with intricate designs, perfect for home decor.', discount: '15% off', rating: 4.5 },
  { id: 209, name: 'Adinkra Wall Art', category: 'Home Decor', price: 60.00, image: 'https://via.placeholder.com/150?text=Wall+Art', description: 'Wall art featuring Adinkra symbols, representing Ashanti wisdom.', discount: '10% off', rating: 4.8 },
  { id: 210, name: 'Leather Sandals', category: 'Footwear', price: 45.00, image: 'https://via.placeholder.com/150?text=Leather+Sandals', description: 'Durable leather sandals crafted by skilled Ashanti cobblers.', discount: '5% off', rating: 4.2 },
  { id: 211, name: 'Ashanti Basket', category: 'Crafts', price: 35.00, image: 'https://via.placeholder.com/150?text=Basket', description: 'Woven basket made from local straw, ideal for storage or decor.', discount: '12% off', rating: 4.6 },
  { id: 212, name: 'Spiced Groundnuts', category: 'Food', price: 10.00, image: 'https://via.placeholder.com/150?text=Groundnuts', description: 'Spicy roasted groundnuts, a popular Ashanti snack.', discount: '20% off', rating: 4.3 },
  { id: 213, name: 'Traditional Drum', category: 'Musical Instruments', price: 100.00, image: 'https://via.placeholder.com/150?text=Drum', description: 'Handmade drum used in Ashanti cultural ceremonies.', discount: '10% off', rating: 4.7 },
  { id: 214, name: 'Ashanti Soap', category: 'Personal Care', price: 8.00, image: 'https://via.placeholder.com/150?text=Soap', description: 'Natural black soap made with cocoa pod ash and coconut oil.', discount: '15% off', rating: 4.5 },
  { id: 215, name: 'Gold Earrings', category: 'Jewelry', price: 200.00, image: 'https://via.placeholder.com/150?text=Gold+Earrings', description: 'Exquisite gold earrings reflecting Ashanti royal heritage.', discount: '10% off', rating: 4.9 },
  { id: 216, name: 'Yam Flour', category: 'Food', price: 22.00, image: 'https://via.placeholder.com/150?text=Yam+Flour', description: 'High-quality yam flour for making traditional ampesi.', discount: '8% off', rating: 4.4 },
  { id: 217, name: 'Ashanti Beads', category: 'Crafts', price: 25.00, image: 'https://via.placeholder.com/150?text=Beads', description: 'Traditional beads used for jewelry and ceremonial wear.', discount: '10% off', rating: 4.6 },
  { id: 218, name: 'Wooden Mask', category: 'Home Decor', price: 50.00, image: 'https://via.placeholder.com/150?text=Wooden+Mask', description: 'Carved wooden mask depicting Ashanti folklore.', discount: '15% off', rating: 4.8 },
  { id: 219, name: 'Plantain Chips', category: 'Food', price: 12.00, image: 'https://via.placeholder.com/150?text=Plantain+Chips', description: 'Crispy plantain chips, a favorite Ashanti snack.', discount: '20% off', rating: 4.3 },
  { id: 220, name: 'Ashanti Scepter', category: 'Crafts', price: 150.00, image: 'https://via.placeholder.com/150?text=Scepter', description: 'Ceremonial scepter symbolizing Ashanti leadership.', discount: '10% off', rating: 4.9 },
];

const AshantiProducts = ({ addToCartProp }) => {
  const navigate = useNavigate();
  const { user, addToCart: contextAddToCart } = useContext(UserContext) || {};
  
  const [activeView, setActiveView] = useState('products');
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('ashanti-view-mode') || 'grid');
  
  const categories = [...new Set(ashantiProducts.map(product => product.category))];

  useEffect(() => {
    localStorage.setItem('ashanti-view-mode', viewMode);
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
    <div className="region-page ashanti-region">
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
          <FaGem className="region-icon me-2" /> Ashanti Region
        </h1>
        <p className="region-tagline">The Heart of Ghana's Cultural Heritage</p>
        
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
              Discover authentic crafts and products from the Ashanti Region, known for exceptional craftsmanship and cultural significance.
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
                {ashantiProducts
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
                    src="https://via.placeholder.com/600x400?text=Ashanti+Region" 
                    alt="Ashanti Region" 
                    className="img-fluid rounded mb-3" 
                  />
                </Col>
                <Col md={6}>
                  <h3>The Ashanti Region</h3>
                  <p>
                    The Ashanti Region, located in south Ghana, is known for its rich cultural heritage, 
                    traditional craftsmanship, and historical significance. It is home to the Ashanti people, 
                    one of Ghana's major ethnic groups.
                  </p>
                  <p>
                    <strong>Capital:</strong> Kumasi (Garden City)<br />
                    <strong>Population:</strong> Approximately 5.4 million<br />
                    <strong>Major Languages:</strong> Twi, English<br />
                    <strong>Notable Features:</strong> Manhyia Palace, Lake Bosomtwe, Craft Villages
                  </p>
                  <p>
                    The region is famous for its gold deposits, kente weaving, wood carving, and the 
                    annual Adae Kese festival that celebrates Ashanti culture and traditions.
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
                    <Card.Header className="bg-primary text-white">Kente Weaving</Card.Header>
                    <Card.Body>
                      <p>
                        The Ashanti are known for their colorful kente cloth, a type of silk and cotton fabric 
                        made of interwoven cloth strips. Each pattern has a name and meaning.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Kente+Weaving" 
                        alt="Kente Weaving" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Adinkra Symbols</Card.Header>
                    <Card.Body>
                      <p>
                        These symbols represent concepts or aphorisms and are used extensively in fabrics, 
                        pottery, and architectural elements throughout the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Adinkra+Symbols" 
                        alt="Adinkra Symbols" 
                        className="img-fluid rounded mb-2" 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">Traditional Music & Dance</Card.Header>
                    <Card.Body>
                      <p>
                        The Ashanti have a rich tradition of drumming and dance. The Adowa and Kete 
                        are important ceremonial dances performed during festivals and royal events.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Dance" 
                        alt="Traditional Dance" 
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
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Manhyia+Palace" />
                    <Card.Body>
                      <Card.Title>Manhyia Palace</Card.Title>
                      <Card.Text>
                        Official residence of the Asantehene (King of the Ashanti). The palace includes a museum 
                        showcasing the history of the Ashanti Kingdom.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Lake+Bosomtwe" />
                    <Card.Body>
                      <Card.Title>Lake Bosomtwe</Card.Title>
                      <Card.Text>
                        A natural crater lake sacred to the Ashanti people. It offers beautiful scenery, 
                        swimming, and fishing opportunities.
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Kejetia+Market" />
                    <Card.Body>
                      <Card.Title>Kejetia Market</Card.Title>
                      <Card.Text>
                        One of the largest open-air markets in West Africa, offering everything from fresh produce 
                        to handcrafted items.
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
                  <div className="timeline-date">17th Century</div>
                  <div className="timeline-content">
                    <h4>Formation of the Ashanti Empire</h4>
                    <p>
                      The Ashanti Empire was established by Osei Tutu I with the help of his priest Okomfo Anokye. 
                      They united various Akan states under the Golden Stool, which became the symbol of the Ashanti nation.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1800s</div>
                  <div className="timeline-content">
                    <h4>Anglo-Ashanti Wars</h4>
                    <p>
                      The Ashanti engaged in several conflicts with British colonial forces, defending their sovereignty 
                      and territories. The wars demonstrated the military prowess and organization of the Ashanti Kingdom.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1902</div>
                  <div className="timeline-content">
                    <h4>Formal Annexation</h4>
                    <p>
                      The Ashanti territories were formally annexed by the British, becoming part of the Gold Coast colony.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1935</div>
                  <div className="timeline-content">
                    <h4>Restoration of the Asantehene</h4>
                    <p>
                      The British allowed the restoration of the position of Asantehene (Ashanti King), 
                      recognizing the importance of traditional leadership.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Present Day</div>
                  <div className="timeline-content">
                    <h4>Modern Ashanti Region</h4>
                    <p>
                      Today, the Ashanti Region is one of Ghana's most prosperous areas, blending traditional 
                      culture with modern development while maintaining a strong cultural identity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setActiveView('products')}>
              Browse Ashanti Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AshantiProducts;