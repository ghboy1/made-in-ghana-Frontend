import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaLandmark, 
         FaArrowRight, FaArrowLeft, FaSun, FaBorderAll,
         FaCheckCircle, FaListUl, FaThLarge, FaHands, 
         FaFish, FaCut, FaWater, FaSeedling, FaLeaf,
         FaShip, FaHome, FaTshirt } from 'react-icons/fa';
import { GiPalmTree, GiWoodCanoe, GiFishing } from 'react-icons/gi';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './OtiProducts.css';

// Oti Region products data
const otiProducts = [
  { id: 1101, name: "Lake Volta Fish (Smoked)", category: "Food", price: 28.00, image: "https://via.placeholder.com/150?text=Smoked+Fish", description: "Traditional oak-smoked tilapia from Lake Volta, prepared using generations-old techniques. Ready to eat or use in soups and stews.", discount: "10% off", rating: 4.8 },
  
  { id: 1102, name: "Oti Palm Oil", category: "Food", price: 12.50, image: "https://via.placeholder.com/150?text=Palm+Oil", description: "Pure unrefined red palm oil produced in the Oti Region. Rich in vitamins and antioxidants, used in traditional Ghanaian dishes.", discount: null, rating: 4.7 },
  
  { id: 1103, name: "Handwoven Kente Cloth", category: "Textiles", price: 150.00, image: "https://via.placeholder.com/150?text=Kente+Cloth", description: "Authentic kente cloth handwoven by master weavers from Nkwanta. Features intricate geometric patterns in vibrant colors.", discount: null, rating: 4.9 },
  
  { id: 1104, name: "Clay Water Pot", category: "Home Decor", price: 45.00, image: "https://via.placeholder.com/150?text=Clay+Pot", description: "Handcrafted clay pot made by Jasikan potters. Traditionally used for storing water and keeping it cool naturally.", discount: "15% off", rating: 4.6 },
  
  { id: 1105, name: "Oti Yam Flour", category: "Food", price: 8.50, image: "https://via.placeholder.com/150?text=Yam+Flour", description: "Premium yam flour (elubo) made from locally harvested white yams. Perfect for making traditional fufu and other dishes.", discount: null, rating: 4.5 },
  
  { id: 1106, name: "Fish Trap Basket", category: "Home Decor", price: 35.00, image: "https://via.placeholder.com/150?text=Fish+Trap", description: "Traditional fish trap basket handwoven by fishermen from the shores of Lake Volta. Functional decor with cultural significance.", discount: null, rating: 4.7 },
  
  { id: 1107, name: "Cotton Print Fabric", category: "Textiles", price: 25.00, image: "https://via.placeholder.com/150?text=Cotton+Fabric", description: "Locally printed cotton fabric featuring traditional Oti Region symbols and patterns. Sold by the yard.", discount: "Buy 3 Get 1 Free", rating: 4.6 },
  
  { id: 1108, name: "Raffia Market Bag", category: "Accessories", price: 32.00, image: "https://via.placeholder.com/150?text=Raffia+Bag", description: "Durable market bag handcrafted from raffia palm. Features colorful patterns and sturdy handles.", discount: null, rating: 4.8 },
  
  { id: 1109, name: "Bamboo Fishing Rod", category: "Fishing Gear", price: 45.00, image: "https://via.placeholder.com/150?text=Bamboo+Rod", description: "Traditional fishing rod made from local bamboo. Hand-crafted by experienced fishermen from the Oti riverbank communities.", discount: "5% off", rating: 4.4 },
  
  { id: 1110, name: "Adinkra Print Shirt", category: "Clothing", price: 55.00, image: "https://via.placeholder.com/150?text=Adinkra+Shirt", description: "Cotton shirt featuring hand-stamped Adinkra symbols. Made by artisans in Kadjebi using traditional printing techniques.", discount: null, rating: 4.7 },
  
  { id: 1111, name: "Cocoyam Chips", category: "Food", price: 6.50, image: "https://via.placeholder.com/150?text=Cocoyam+Chips", description: "Crispy cocoyam chips seasoned with local spices. A nutritious snack produced by women's cooperatives in the Oti Region.", discount: "3 for GH₵18", rating: 4.6 },
  
  { id: 1112, name: "Palm Leaf Hat", category: "Accessories", price: 28.00, image: "https://via.placeholder.com/150?text=Palm+Hat", description: "Handwoven sun hat made from dried palm leaves. Perfect for protection against the tropical sun while working or at leisure.", discount: null, rating: 4.5 }
];

const OtiProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products'); // 'products' or 'region'
  const [activeTab, setActiveTab] = useState('overview'); // For region tabs
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem('oti-view-mode') || 'grid');
  const [fadeIn, setFadeIn] = useState(false);
  const [neighboringRegions, setNeighboringRegions] = useState([]);
  
  const categories = [...new Set(otiProducts.map(product => product.category))];

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('oti-view-mode', viewMode);
  }, [viewMode]);

  // Animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    // Get neighboring regions
    const neighbors = getNeighboringRegions('oti');
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
    <div className={`region-page oti-region ${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
          <GiWoodCanoe className="region-icon me-2" /> Oti Region
        </h1>
        <p className="region-subtitle">Land of Rivers, Crafts & Cultural Heritage</p>
        
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
              Discover authentic products from the Oti Region, renowned for its fishing heritage, 
              palm oil production, and exquisite handcrafts sourced from the waterways and fertile lands of eastern Ghana.
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
                {otiProducts
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
                      src="https://via.placeholder.com/600x400?text=Oti+Region" 
                      alt="Oti Region" 
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
                  <h3 className="overview-title">The Oti Region</h3>
                  <p>
                    The Oti Region, created in 2019, is one of Ghana's newest administrative regions. 
                    Named after the Oti River which runs through it, this vibrant region is characterized by 
                    its waterways, fertile lands, and diverse ethnic groups that have traditionally relied on 
                    fishing, farming, and artisanal crafts.
                  </p>
                  <p>
                    <strong>Capital:</strong> Dambai<br />
                    <strong>Population:</strong> Approximately 750,000<br />
                    <strong>Major Languages:</strong> Ewe, Akan, Guan, Nawuri, Nchumuru<br />
                    <strong>Notable Features:</strong> Oti River, Lake Volta shoreline, palm oil production, fishing communities, traditional pottery
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaWater className="highlight-icon" />
                      <span>River Communities</span>
                    </div>
                    <div className="highlight-item">
                      <GiPalmTree className="highlight-icon" />
                      <span>Palm Cultivation</span>
                    </div>
                    <div className="highlight-item">
                      <GiFishing className="highlight-icon" />
                      <span>Fishing Heritage</span>
                    </div>
                    <div className="highlight-item">
                      <FaHands className="highlight-icon" />
                      <span>Artisan Crafts</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Geography</h5>
                    <p>
                      The Oti Region has a tropical climate with distinct wet and dry seasons. The region's 
                      geography features numerous water bodies, including the Oti River, a significant tributary 
                      of the Volta, and parts of Lake Volta. The landscape varies from river valleys to rolling hills, 
                      with fertile plains that support agriculture and natural vegetation that provides materials for crafting.
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
                    <Card.Header className="culture-card-header">Ethnic Diversity</Card.Header>
                    <Card.Body>
                      <p>
                        The Oti Region is home to diverse ethnic groups including the Ewe, Akan, Guan, 
                        and various smaller groups such as the Nchumuru and Nawuri. Each community brings 
                        its own cultural traditions, creating a rich tapestry of practices, languages, and 
                        artistic expressions.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Cultural+Diversity" 
                        alt="Cultural Diversity" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="cultural-info mt-2">
                        <strong>Cultural Coexistence:</strong> Harmonious blend of traditions and languages
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Dipo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Dipo festival is a significant rite of passage ceremony for girls in certain 
                        communities within the Oti Region. This traditional coming-of-age ceremony marks the 
                        transition from childhood to womanhood and involves days of rituals, dancing, and 
                        cultural education.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Dipo+Festival" 
                        alt="Dipo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-season">
                        <strong>Festival Season:</strong> Usually celebrated in April-May
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">River Worship</Card.Header>
                    <Card.Body>
                      <p>
                        Many communities in the Oti Region hold deep spiritual connections to the rivers, 
                        particularly the Oti River. Traditional customs include river worship ceremonies, where 
                        offerings are made to river deities to ensure good fishing harvests, protection, and 
                        prosperity for riverine communities.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=River+Ceremony" 
                        alt="River Ceremony" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="spiritual-practices">
                        <Badge bg="info" className="me-1">Spiritual</Badge>
                        <Badge bg="secondary">Agricultural</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Oti+River" />
                    </div>
                    <Card.Body>
                      <Card.Title>Oti River</Card.Title>
                      <Card.Text>
                        The majestic Oti River, a major tributary of the Volta, flows through the region and 
                        into Lake Volta. Visitors can enjoy boat rides, witness traditional fishing techniques, and 
                        experience the serene beauty of the river landscape. The river also offers opportunities for 
                        birdwatching, with numerous species inhabiting its shores.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Throughout the region</div>
                        <div><strong>Activities:</strong> Boating, fishing, birdwatching</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Kyabobo+National+Park" />
                    </div>
                    <Card.Body>
                      <Card.Title>Kyabobo National Park</Card.Title>
                      <Card.Text>
                        Located in the eastern part of the region near the Togo border, Kyabobo National Park 
                        features breathtaking mountains, diverse wildlife, and lush forests. The park offers hiking 
                        trails that lead to spectacular viewpoints, waterfalls, and opportunities to spot monkeys, 
                        antelopes, and numerous bird species in their natural habitat.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Eastern Oti Region, near Nkwanta</div>
                        <div><strong>Entry Fee:</strong> GH₵40 for locals, GH₵100 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Jasikan+Pottery+Village" />
                    </div>
                    <Card.Body>
                      <Card.Title>Jasikan Pottery Village</Card.Title>
                      <Card.Text>
                        Visit the famous pottery village in Jasikan where generations of skilled artisans have 
                        been creating beautiful clay items. Visitors can observe the traditional pottery-making process 
                        from clay extraction to firing, participate in workshops, and purchase authentic handcrafted 
                        pottery items directly from the creators.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Jasikan district</div>
                        <div><strong>Experience:</strong> Demonstrations, workshops, shopping</div>
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
                      <img src="https://via.placeholder.com/500x300?text=Pottery+Making" alt="Pottery" className="craft-image" />
                      <div className="craft-badge">Signature Craft</div>
                    </div>
                    <h4 className="craft-title">Pottery Making</h4>
                    <p className="craft-description">
                      The Oti Region is renowned for its exceptional pottery, particularly from the Jasikan area. 
                      This ancient craft has been passed down through generations, with artisans using traditional 
                      techniques to create functional and decorative pieces.
                    </p>
                    <p>
                      The process begins with carefully selecting and preparing clay from specific local sources. 
                      Potters then shape the clay using hand-building techniques or simple wheels, create decorative 
                      patterns using combs, stamps, or incising tools, and finally fire the pieces in open pits or kilns. 
                      The resulting water pots, cooking vessels, and ceremonial items are not only practical but also 
                      embody the cultural heritage of the region.
                    </p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => changeView('products')}
                      className="mt-2 d-flex align-items-center gap-2"
                    >
                      <FaHome /> Shop Pottery Products
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="craft-list">
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaFish />
                      </div>
                      <div className="craft-content">
                        <h5>Traditional Fishing</h5>
                        <p>
                          Communities along the Oti River and Lake Volta practice traditional fishing methods using 
                          handcrafted canoes, nets, and traps. The smoking and preservation of fish is also an important 
                          craft that creates valued products traded throughout Ghana.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaTshirt />
                      </div>
                      <div className="craft-content">
                        <h5>Textile Weaving & Printing</h5>
                        <p>
                          Local artisans create beautiful textiles using traditional looms and printing techniques. 
                          The region is known for its vibrant patterns and colors, with designs that often incorporate 
                          symbols representing local beliefs and natural elements.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <GiPalmTree />
                      </div>
                      <div className="craft-content">
                        <h5>Palm Oil Production</h5>
                        <p>
                          The production of palm oil is a significant traditional craft in the Oti Region. Producers 
                          harvest palm fruits, extract the oil using traditional methods, and process it for cooking, 
                          soap making, and other applications.
                        </p>
                      </div>
                    </div>
                    
                    <div className="craft-item">
                      <div className="craft-icon">
                        <FaBorderAll />
                      </div>
                      <div className="craft-content">
                        <h5>Basketry</h5>
                        <p>
                          Using materials like raffia, palm leaves, and elephant grass, skilled artisans weave intricate 
                          baskets, mats, and other functional items. These crafts combine utility with artistic expression 
                          through patterns that often tell cultural stories.
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
              Browse Oti Region Products <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtiProducts;