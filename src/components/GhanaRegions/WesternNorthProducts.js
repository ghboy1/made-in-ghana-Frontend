import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaTree, FaSeedling, 
         FaArrowRight, FaArrowLeft, FaLeaf, FaMountain, FaCheckCircle, FaShoppingBasket,
         FaListUl, FaThLarge, FaDrumstickBite, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './WesternNorthProducts.css';

// Western North Region products data
const westernNorthProducts = [
  { id: 801, name: 'Premium Cocoa Beans', category: 'Cocoa Products', price: 45.00, image: 'https://via.placeholder.com/150?text=Cocoa+Beans', description: 'Highest quality fermented and dried cocoa beans from Western North\'s fertile forests.', discount: '5% off', rating: 4.9 },
  { id: 802, name: 'Natural Cocoa Powder', category: 'Cocoa Products', price: 28.50, image: 'https://via.placeholder.com/150?text=Cocoa+Powder', description: 'Pure unsweetened cocoa powder with rich flavor and aroma, perfect for cooking and beverages.', discount: null, rating: 4.8 },
  { id: 803, name: 'Cocoa Butter Cream', category: 'Beauty & Care', price: 35.00, image: 'https://via.placeholder.com/150?text=Cocoa+Butter', description: 'Nourishing body cream made from pure cocoa butter for soft, hydrated skin.', discount: '10% off', rating: 4.7 },
  { id: 804, name: 'Forest Honey', category: 'Food & Beverages', price: 22.00, image: 'https://via.placeholder.com/150?text=Forest+Honey', description: 'Raw, unfiltered honey harvested from the pristine forest reserves of Western North.', discount: null, rating: 4.9 },
  { id: 805, name: 'Handmade Wooden Carvings', category: 'Crafts & Decor', price: 65.00, image: 'https://via.placeholder.com/150?text=Wood+Carvings', description: 'Intricately carved wooden sculptures from sustainably harvested Western North timber.', discount: '15% off', rating: 4.6 },
  { id: 806, name: 'Forest Spice Blend', category: 'Food & Beverages', price: 18.00, image: 'https://via.placeholder.com/150?text=Spice+Blend', description: 'Aromatic spice mix featuring local herbs and peppers from Western North region.', discount: null, rating: 4.5 },
  { id: 807, name: 'Cocoa Husk Mulch', category: 'Garden & Farm', price: 15.00, image: 'https://via.placeholder.com/150?text=Cocoa+Mulch', description: 'Organic garden mulch made from cocoa husks, perfect for enriching garden soil.', discount: '8% off', rating: 4.4 },
  { id: 808, name: 'Tropical Fruit Preserves', category: 'Food & Beverages', price: 12.50, image: 'https://via.placeholder.com/150?text=Fruit+Preserves', description: 'Delicious preserves made from exotic fruits grown in Western North\'s tropical climate.', discount: null, rating: 4.6 },
  { id: 809, name: 'Cocoa Batik Fabric', category: 'Textiles', price: 45.00, image: 'https://via.placeholder.com/150?text=Batik+Fabric', description: 'Hand-dyed batik fabric with traditional patterns using natural dyes including cocoa.', discount: '12% off', rating: 4.7 },
  { id: 810, name: 'Forest Tea Blend', category: 'Food & Beverages', price: 14.50, image: 'https://via.placeholder.com/150?text=Forest+Tea', description: 'Herbal tea blend made with leaves, flowers, and herbs foraged from Western North forests.', discount: null, rating: 4.8 },
  { id: 811, name: 'Wooden Kitchen Utensils', category: 'Home & Kitchen', price: 32.00, image: 'https://via.placeholder.com/150?text=Wooden+Utensils', description: 'Set of handcrafted wooden spoons, spatulas, and serving tools made from native hardwoods.', discount: '10% off', rating: 4.5 },
  { id: 812, name: 'Bamboo Baskets', category: 'Crafts & Decor', price: 28.00, image: 'https://via.placeholder.com/150?text=Bamboo+Baskets', description: 'Beautifully woven baskets using bamboo from the Western North forests, perfect for storage.', discount: null, rating: 4.6 }
];

const WesternNorthProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('western-north-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(westernNorthProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('western-north-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('western-north');
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
    <div className={`region-page western-north-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <FaTree className="region-icon me-2" /> Western North Region
        </h1>
        <p className="region-subtitle">Ghana's Cocoa Heartland & Forest Treasures</p>
        
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
              Discover authentic products from Western North, home to Ghana's finest cocoa, 
              sustainable timber, and forest treasures.
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
                {westernNorthProducts
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
                    <div className="image-overlay">
                      <div className="overlay-text">Cocoa Country</div>
                    </div>
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
                  <h3 className="overview-title">The Western North Region</h3>
                  <div className="forest-divider"></div>
                  <p>
                    The Western North Region, established in 2018, is one of Ghana's newest administrative 
                    regions formed when it was carved out of the original Western Region. It is characterized 
                    by lush rainforests, rolling hills, and is Ghana's cocoa heartland, producing a significant 
                    portion of the country's cocoa beans.
                  </p>
                  <p>
                    <strong>Capital:</strong> Sefwi Wiawso<br />
                    <strong>Population:</strong> Approximately 850,000<br />
                    <strong>Major Languages:</strong> Sefwi, Akan, English<br />
                    <strong>Notable Features:</strong> Bia National Park, Cocoa Farms, Sefwi Wiawso Palace
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaSeedling className="highlight-icon" />
                      <span>Cocoa Heartland</span>
                    </div>
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Forest Reserves</span>
                    </div>
                    <div className="highlight-item">
                      <FaMountain className="highlight-icon" />
                      <span>Rolling Hills</span>
                    </div>
                    <div className="highlight-item">
                      <FaLeaf className="highlight-icon" />
                      <span>Biodiversity</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Ecology</h5>
                    <p>
                      The region enjoys a tropical climate with two rainy seasons, creating ideal 
                      conditions for agriculture, especially cocoa farming. Average annual rainfall 
                      is between 1,500mm and 1,800mm. The region is home to some of Ghana's most 
                      pristine forests, including portions of the Bia Biosphere Reserve, which hosts 
                      rare and endangered flora and fauna.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'culture' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4 culture-header">Cultural Heritage</h3>
              <div className="forest-divider"></div>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Eluo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Eluo Festival is celebrated by the Sefwi people to purify the community 
                        and honor ancestral spirits. During this festival, the chief and elders perform 
                        rituals to cleanse the stools (symbols of authority) and the community from any 
                        misfortunes. It's a time of spiritual renewal and cultural affirmation.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Eluo+Festival" 
                        alt="Eluo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-date mt-2">
                        <FaCalendarAlt className="me-2" />
                        <strong>When:</strong> November - December annually
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Cocoa Farming Traditions</Card.Header>
                    <Card.Body>
                      <p>
                        Cocoa farming is not just an economic activity but a cultural cornerstone 
                        in Western North. Traditional farming methods have been passed down through 
                        generations, with specific rituals for planting, harvesting, and processing cocoa. 
                        These practices blend agricultural knowledge with spiritual customs.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Cocoa+Farming" 
                        alt="Cocoa Farming Traditions" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="farming-tools">
                        <Badge bg="info" className="me-1">Traditional Tools</Badge>
                        <Badge bg="secondary">Fermentation Methods</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Forest Craftsmanship</Card.Header>
                    <Card.Body>
                      <p>
                        The people of Western North have developed exceptional woodworking skills using 
                        the region's abundant timber resources. Carvers create intricate works of art, 
                        functional items, and traditional ceremonial objects. The craft is tied to 
                        spiritual beliefs about the forest and its resources.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Wood+Craftsmanship" 
                        alt="Forest Craftsmanship" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="craft-workshops">
                        <Badge bg="info" className="me-1">Wood Carving</Badge>
                        <Badge bg="secondary">Sustainable Practices</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="indigenous-knowledge mt-5">
                <h4 className="mb-3">Indigenous Knowledge Systems</h4>
                <Row>
                  <Col md={6}>
                    <div className="knowledge-card">
                      <h5><FaLeaf className="me-2" />Herbal Medicine</h5>
                      <p>
                        Traditional healers in Western North possess extensive knowledge of medicinal plants 
                        found in the region's forests. These healers treat a variety of ailments using 
                        preparations made from leaves, roots, and bark. This knowledge has been preserved 
                        through oral tradition and is still practiced alongside modern medicine.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="knowledge-card">
                      <h5><FaDrumstickBite className="me-2" />Cuisine & Food Preservation</h5>
                      <p>
                        The region has distinctive culinary traditions that make use of forest products, 
                        cocoa, and local crops. Traditional food preservation techniques include smoking, 
                        sun-drying, and fermentation. Special dishes are prepared during festivals and 
                        ceremonies to honor ancestors and celebrate community.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          
          {activeTab === 'attractions' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4 attractions-header"><FaMapMarkedAlt className="me-2" />Key Attractions</h3>
              <div className="forest-divider"></div>
              <Row className="g-4">
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Bia+National+Park" />
                      <div className="attraction-type">Nature</div>
                    </div>
                    <Card.Body>
                      <Card.Title>Bia National Park & Biosphere Reserve</Card.Title>
                      <Card.Text>
                        This UNESCO-designated biosphere reserve is home to rare forest elephants, 
                        primates, and over 200 bird species. The park contains some of Ghana's last 
                        remaining pristine rainforest and offers visitors hiking trails, wildlife 
                        viewing, and ecological education opportunities.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Northern part of Western North</div>
                        <div><strong>Entry Fee:</strong> GH₵25 for locals, GH₵60 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Sefwi+Palace" />
                      <div className="attraction-type">Culture</div>
                    </div>
                    <Card.Body>
                      <Card.Title>Sefwi Wiawso Palace & Museum</Card.Title>
                      <Card.Text>
                        The palace of the Sefwi Wiawso traditional area offers visitors a glimpse 
                        into the rich cultural heritage of the region. The attached museum displays 
                        artifacts, regalia, and historical items that tell the story of the Sefwi 
                        kingdom and its traditions.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Sefwi Wiawso</div>
                        <div><strong>Tour Fee:</strong> GH₵15 for locals, GH₵30 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cocoa+Tour" />
                      <div className="attraction-type">Experience</div>
                    </div>
                    <Card.Body>
                      <Card.Title>Model Cocoa Farm Tours</Card.Title>
                      <Card.Text>
                        Experience the complete cocoa farming process from seedling to chocolate. 
                        These educational tours take visitors through a working cocoa plantation, 
                        demonstrating planting, harvesting, fermentation, and processing techniques. 
                        Taste freshly made chocolate and purchase cocoa products directly from farmers.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Various locations in the region</div>
                        <div><strong>Tour Fee:</strong> GH₵30-50 depending on tour package</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="eco-tourism mt-5">
                <h4>Sustainable Eco-Tourism Initiatives</h4>
                <p className="eco-tourism-description">
                  Western North is developing sustainable tourism that preserves natural resources 
                  while supporting local communities. Forest lodges, guided nature walks, and 
                  community-based tourism experiences are available for environmentally conscious travelers.
                </p>
                <Row className="g-3 mt-2">
                  <Col md={4}>
                    <div className="eco-initiative">
                      <FaUsers className="eco-icon" />
                      <h5>Community-Based Tourism</h5>
                      <p>Stay with local families and experience authentic daily life</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="eco-initiative">
                      <FaTree className="eco-icon" />
                      <h5>Forest Conservation Tours</h5>
                      <p>Help with reforestation and wildlife monitoring efforts</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="eco-initiative">
                      <FaSeedling className="eco-icon" />
                      <h5>Sustainable Agriculture Visits</h5>
                      <p>Learn about eco-friendly farming practices that protect biodiversity</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4 history-header"><FaHistory className="me-2" />Historical Significance</h3>
              <div className="forest-divider"></div>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Pre-1700s</div>
                  <div className="timeline-content">
                    <h4>Kingdom Formation</h4>
                    <p>
                      The Sefwi Kingdom was established as an Akan state in what is now Western North Region. 
                      Its strategic location made it important for trade between the forest regions and 
                      northern territories. The kingdom developed unique cultural practices while maintaining 
                      connections to the broader Akan cultural sphere.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1700s-1800s</div>
                  <div className="timeline-content">
                    <h4>Trade & Conflict</h4>
                    <p>
                      The region became a key transit point for gold, kola nuts, and ivory trade. 
                      Various conflicts occurred with neighboring Ashanti and other kingdoms. European 
                      powers began to show interest in the area's natural resources, particularly gold and timber.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Late 1800s</div>
                  <div className="timeline-content">
                    <h4>Cocoa Introduction</h4>
                    <p>
                      Cocoa was introduced to the region, transforming the local economy. The fertile soil 
                      and favorable climate proved ideal for cocoa cultivation. Farmers quickly adopted this 
                      new crop, which would eventually become the region's economic backbone.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1900s-1957</div>
                  <div className="timeline-content">
                    <h4>Colonial Period & Cocoa Boom</h4>
                    <p>
                      Under British colonial rule, the region became one of the world's most productive 
                      cocoa-growing areas. Forest reserves were established to protect some natural areas 
                      while timber extraction increased. Traditional governance systems continued alongside 
                      colonial administration.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">1957-2018</div>
                  <div className="timeline-content">
                    <h4>Post-Independence & Development</h4>
                    <p>
                      After Ghana's independence, the area remained part of Western Region. Cocoa continued 
                      to dominate the economy, though challenges including diseases, aging trees, and price 
                      fluctuations affected production. Conservation efforts focused on protecting remaining 
                      forest reserves amid increasing agricultural expansion.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2018-Present</div>
                  <div className="timeline-content">
                    <h4>New Regional Status</h4>
                    <p>
                      In 2018, Western North was carved out of the Western Region as part of Ghana's 
                      regional reorganization. As a separate administrative region, it gained increased 
                      focus on its development needs. New investments in infrastructure, education, and 
                      sustainable cocoa farming have been prioritized to address historical challenges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="historical-sites mt-5">
                <h4 className="mb-3">Notable Historical Sites</h4>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="historical-site-card">
                      <h5>Ancestral Settlements</h5>
                      <p>
                        Archaeological remains of early Sefwi settlements show evidence of 
                        sophisticated political organization and trade networks. These sites include 
                        historical boundary markers, spiritual groves, and community centers.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="historical-site-card">
                      <h5>Colonial Era Buildings</h5>
                      <p>
                        Several structures from the colonial period remain, including administrative 
                        buildings, trading posts, and early cocoa processing facilities. These buildings 
                        represent the region's economic transformation during the early 20th century.
                      </p>
                    </div>
                  </Col>
                </Row>
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

export default WesternNorthProducts;