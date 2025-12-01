import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaLandmark, 
         FaArrowRight, FaArrowLeft, FaSun, FaBorderAll,
         FaCheckCircle, FaListUl, FaThLarge, FaHands, 
         FaHatCowboy, FaCut, FaHeart, FaHome, FaTree, 
         FaLeaf, FaWater, FaHistory } from 'react-icons/fa';
import { GiElephant } from 'react-icons/gi';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './SavannahProducts.css';

// Savannah Region products data
const savannahProducts = [
  { id: 1001, name: "Premium Shea Butter", category: "Cosmetics", price: 25.00, image: "https://via.placeholder.com/150?text=Shea+Butter", description: "Pure, organic shea butter hand-processed by women in Damongo. Known for its moisturizing and healing properties.", discount: "15% off", rating: 4.9 },
  
  { id: 1002, name: "Handcrafted Leather Bag", category: "Accessories", price: 85.00, image: "https://via.placeholder.com/150?text=Leather+Bag", description: "Traditional leather bag made with techniques passed down through generations. Features natural dyes and local patterns.", discount: null, rating: 4.7 },
  
  { id: 1003, name: "Batik Wall Hanging", category: "Home Decor", price: 45.00, image: "https://via.placeholder.com/150?text=Batik", description: "Handmade batik fabric featuring traditional Gonja symbols and wildlife patterns of the Savannah Region.", discount: null, rating: 4.6 },
  
  { id: 1004, name: "Savannah Honey", category: "Food", price: 12.00, image: "https://via.placeholder.com/150?text=Honey", description: "Wild honey harvested from the Savannah woodlands. Unprocessed and rich with nutrients and distinct floral notes.", discount: "10% off", rating: 4.8 },
  
  { id: 1005, name: "Calabash Bowl", category: "Home Decor", price: 35.00, image: "https://via.placeholder.com/150?text=Calabash", description: "Hand-carved calabash bowl with intricate designs. Traditionally used for serving food and as ceremonial vessels.", discount: null, rating: 4.5 },
  
  { id: 1006, name: "Dawadawa Spice", category: "Food", price: 8.00, image: "https://via.placeholder.com/150?text=Dawadawa", description: "Traditional fermented spice made from locust beans. Used as a flavor enhancer in soups and stews across West Africa.", discount: null, rating: 4.7 },
  
  { id: 1007, name: "Gonja Xylophone (Gyil)", category: "Musical Instruments", price: 180.00, image: "https://via.placeholder.com/150?text=Xylophone", description: "Traditional xylophone handcrafted from aged wood with gourd resonators. Produces rich, melodic tones used in cultural ceremonies.", discount: "8% off", rating: 4.9 },
  
  { id: 1008, name: "Woven Straw Mat", category: "Home Decor", price: 30.00, image: "https://via.placeholder.com/150?text=Straw+Mat", description: "Hand-woven sleeping mat made from native grasses of the Savannah. Features geometric patterns in natural colors.", discount: null, rating: 4.6 },
  
  { id: 1009, name: "Shea Nut Soap", category: "Cosmetics", price: 7.50, image: "https://via.placeholder.com/150?text=Shea+Soap", description: "Natural soap made with local shea butter and herbs. Gentle cleansing properties ideal for sensitive skin.", discount: "Buy 3 Get 1 Free", rating: 4.8 },
  
  { id: 1010, name: "Gonja Traditional Smock", category: "Clothing", price: 120.00, image: "https://via.placeholder.com/150?text=Smock", description: "Hand-woven cotton smock with intricate embroidery patterns unique to the Gonja tradition of the Savannah Region.", discount: null, rating: 4.7 },
  
  { id: 1011, name: "Elephant Grass Basket", category: "Home Decor", price: 22.00, image: "https://via.placeholder.com/150?text=Grass+Basket", description: "Sturdy storage basket woven from elephant grass by skilled artisans in the Savannah Region.", discount: "5% off", rating: 4.5 },
  
  { id: 1012, name: "Wildlife Wood Carving", category: "Art", price: 65.00, image: "https://via.placeholder.com/150?text=Wood+Carving", description: "Hand-carved wooden sculpture depicting savannah wildlife. Made by master carvers using sustainable local wood.", discount: null, rating: 4.6 }
];

const SavannahProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('savannah-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(savannahProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('savannah-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('savannah');
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
    <div className={`region-page savannah-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <GiElephant className="region-icon me-2" /> Savannah Region
        </h1>
        <p className="region-subtitle">Land of Wildlife, Tradition & Natural Beauty</p>
        
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
              Discover authentic products from the Savannah Region, renowned for its 
              premium shea butter, traditional crafts, and unique foods sourced from the heart of Ghana's grasslands.
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
                {savannahProducts
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
                active={activeTab === 'crafts'} 
                onClick={() => setActiveTab('crafts')}
              >
                Traditional Crafts
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <Row>
                <Col md={6}>
                  <div className="image-frame">
                    <img 
                      src="https://via.placeholder.com/600x400?text=Savannah+Region" 
                      alt="Savannah Region" 
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
                  <h3 className="overview-title">The Savannah Region</h3>
                  <p>
                    The Savannah Region is one of Ghana's newest administrative regions, created in 2019. 
                    It covers much of the traditional kingdom of Gonja in the northern part of Ghana. 
                    With its vast grasslands, scattered trees, and seasonal rivers, this region epitomizes 
                    the classic African savannah landscape.
                  </p>
                  <p>
                    <strong>Capital:</strong> Damongo<br />
                    <strong>Population:</strong> Approximately 650,000<br />
                    <strong>Major Languages:</strong> Gonja, Vagla, Tampulma, Hausa, English<br />
                    <strong>Notable Features:</strong> Mole National Park, Larabanga Mosque, Shea Production, Gonja Traditional Smocks
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Wildlife Sanctuary</span>
                    </div>
                    <div className="highlight-item">
                      <FaLeaf className="highlight-icon" />
                      <span>Shea Production</span>
                    </div>
                    <div className="highlight-item">
                      <FaLandmark className="highlight-icon" />
                      <span>Historic Sites</span>
                    </div>
                    <div className="highlight-item">
                      <FaSun className="highlight-icon" />
                      <span>Savannah Climate</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Geography</h5>
                    <p>
                      The Savannah Region has a tropical savannah climate with a single rainy season from 
                      May to October, followed by a dry season characterized by the harmattan winds. The 
                      landscape is dominated by grasslands with scattered trees, seasonal rivers and streams, 
                      and occasional rock formations. The Black Volta River forms part of its western boundary.
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
                    <Card.Header className="culture-card-header">Gonja Kingdom</Card.Header>
                    <Card.Body>
                      <p>
                        The Savannah Region is the heart of the historic Gonja Kingdom, founded in the early 
                        16th century. The Gonja people, led by the Yagbonwura (paramount chief), have a rich 
                        cultural tradition that blends indigenous practices with Islamic influences introduced 
                        through trans-Saharan trade routes.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Gonja+Kingdom" 
                        alt="Gonja Kingdom" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="cultural-info mt-2">
                        <strong>Key Cultural Site:</strong> Palace of the Yagbonwura in Damongo
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Damba Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Damba Festival is one of the most significant cultural celebrations in the 
                        Savannah Region. It commemorates the birth of Prophet Muhammad and features colorful 
                        processions, traditional drumming, dancing, and horseback riding displays. Chiefs 
                        appear in their regalia, showcasing the region's rich cultural heritage.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Damba+Festival" 
                        alt="Damba Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-season">
                        <strong>Festival Season:</strong> Lunar calendar, typically November-December
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Traditional Music</Card.Header>
                    <Card.Body>
                      <p>
                        The Savannah Region has a rich musical tradition featuring instruments like the 
                        gonje (one-string fiddle), the xylophone (gyil), and various drums. Music and dance 
                        play essential roles in cultural ceremonies, festivals, and daily life, with distinctive 
                        rhythms that tell stories of history and heritage.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Music" 
                        alt="Traditional Music" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="spiritual-practices">
                        <Badge bg="info" className="me-1">Ceremonial</Badge>
                        <Badge bg="secondary">Storytelling</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Mole+National+Park" />
                    </div>
                    <Card.Body>
                      <Card.Title>Mole National Park</Card.Title>
                      <Card.Text>
                        Ghana's largest wildlife sanctuary, covering about 4,840 sq km of savannah woodland. 
                        Home to elephants, buffalo, warthogs, antelope species, and occasionally lions. The park 
                        offers walking safaris with armed rangers and vehicle tours, providing an authentic 
                        African wildlife experience.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Northwestern part of Savannah Region</div>
                        <div><strong>Entry Fee:</strong> GH₵60 for locals, GH₵150 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Larabanga+Mosque" />
                    </div>
                    <Card.Body>
                      <Card.Title>Larabanga Mosque</Card.Title>
                      <Card.Text>
                        One of Ghana's oldest and most revered mosques, built in the Sudanese architectural style. 
                        Constructed in 1421, this historic mud-and-stick structure is known as the "Mecca of West Africa" 
                        and remains an important Islamic landmark and pilgrimage site with its distinctive minarets and whitewashed walls.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Larabanga village, near Mole National Park</div>
                        <div><strong>Visiting:</strong> Modest donation requested, modest dress required</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Mystic+Stone" />
                    </div>
                    <Card.Body>
                      <Card.Title>Larabanga Mystic Stone</Card.Title>
                      <Card.Text>
                        According to local legend, this sacred stone was used by the founder of Larabanga village 
                        to determine where to settle. Despite multiple attempts to move it for road construction, the 
                        stone mysteriously returned to its original location each time, leading to its status as a 
                        spiritual landmark with protective powers.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Outskirts of Larabanga village</div>
                        <div><strong>Significance:</strong> Historical, spiritual and cultural</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'crafts' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaHands className="me-2" />Traditional Crafts</h3>
              <Row>
                <Col md={6}>
                  <div className="craft-spotlight">
                    <div className="craft-image-container">
                      <img src="https://via.placeholder.com/500x300?text=Shea+Butter+Processing" alt="Shea Butter" className="craft-image" />
                      <div className="craft-badge">Signature Craft</div>
                    </div>
                    <h4 className="craft-title">Shea Butter Production</h4>
                    <p className="craft-description">
                      The Savannah Region is renowned for its premium shea butter, produced primarily by women 
                      using traditional methods passed down through generations. The process begins with collecting 
                      nuts from the indigenous shea trees that grow throughout the region. After harvesting, the nuts 
                      are cracked, roasted, ground, and kneaded in a labor-intensive process that can take several days.
                    </p>
                    <p>
                      The resulting butter is not only an essential ingredient in local cuisine but also highly 
                      valued for its moisturizing and healing properties. Today, this traditional craft has evolved 
                      into an important economic activity, with cooperatives of women producing high-quality shea 
                      products that are sought after both nationally and internationally.
                    </p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => changeView('products')}
                      className="mt-2 d-flex align-items-center gap-2"
                    >
                      <FaLeaf /> Shop Shea Products
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="craft-list">
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaHatCowboy />
                      </div>
                      <div className="craft-content">
                        <h5>Gonja Smock Weaving</h5>
                        <p>
                          The traditional smock (fugu) is a prestigious garment made from hand-loomed strips 
                          of cotton sewn together and decorated with intricate embroidery. The Gonja style 
                          features distinctive patterns and colors that reflect cultural heritage and status.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaCut />
                      </div>
                      <div className="craft-content">
                        <h5>Leather Craftsmanship</h5>
                        <p>
                          Artisans practice traditional leather tanning and crafting techniques to create 
                          durable and beautiful bags, sandals, and decorative items. The process uses locally 
                          sourced materials and natural dyes from indigenous plants.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaHeart />
                      </div>
                      <div className="craft-content">
                        <h5>Calabash Carving</h5>
                        <p>
                          Skilled craftspeople transform the hard shells of mature calabash gourds into bowls, 
                          cups, and decorative items through careful cutting, cleaning, and intricate pattern 
                          carving. These items serve both practical and ceremonial purposes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaBorderAll />
                      </div>
                      <div className="craft-content">
                        <h5>Grass Weaving</h5>
                        <p>
                          Using elephant grass and other natural fibers, artisans create sturdy and practical 
                          items such as baskets, mats, and fans. Designs often incorporate traditional patterns 
                          that tell stories or represent important cultural symbols.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => changeView('products')} className="action-button">
              Browse Savannah Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavannahProducts;