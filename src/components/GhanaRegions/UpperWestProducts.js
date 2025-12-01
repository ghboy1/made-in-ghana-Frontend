import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Card, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkedAlt, FaStore, FaHistory, FaLandmark, FaMusic, 
         FaArrowRight, FaArrowLeft, FaDrum, FaLeaf, FaSeedling, FaTree, FaFeather,
         FaCheckCircle, FaShoppingBasket, FaListUl, FaThLarge, FaGift, FaCoffee } from 'react-icons/fa';
import { getNeighboringRegions } from '../../data/ghanaRegions';
import './WesternNorthProducts.css';

// Western North Region products data
const westernNorthProducts = [
  { id: 801, name: 'Premium Cocoa Nibs', category: 'Food & Beverages', price: 35.00, image: 'https://via.placeholder.com/150?text=Cocoa+Nibs', description: 'Organic cocoa nibs from Sefwi Wiawso, perfect for baking, smoothies, and as a nutritious snack.', discount: '10% off', rating: 4.9 },
  { id: 802, name: 'Handcrafted Cocoa Butter', category: 'Beauty & Wellness', price: 28.50, image: 'https://via.placeholder.com/150?text=Cocoa+Butter', description: 'Pure cocoa butter made from Western North cocoa beans, excellent for skincare and haircare.', discount: null, rating: 4.8 },
  { id: 803, name: 'Artisanal Chocolate Bar', category: 'Food & Beverages', price: 15.00, image: 'https://via.placeholder.com/150?text=Chocolate', description: 'Single-origin chocolate bar crafted from Western North cocoa beans with notes of fruit and spice.', discount: '5% off', rating: 4.7 },
  { id: 804, name: 'Cocoa Pod Craft Decor', category: 'Home & Decor', price: 45.00, image: 'https://via.placeholder.com/150?text=Cocoa+Craft', description: 'Decorative pieces made from dried cocoa pods, showcasing the region\'s cocoa heritage.', discount: null, rating: 4.6 },
  { id: 805, name: 'Forest Honey', category: 'Food & Beverages', price: 30.00, image: 'https://via.placeholder.com/150?text=Forest+Honey', description: 'Wild honey harvested from Bia National Park forest, known for its distinct floral notes.', discount: '8% off', rating: 4.9 },
  { id: 806, name: 'Timber Crafted Jewelry Box', category: 'Home & Decor', price: 75.00, image: 'https://via.placeholder.com/150?text=Jewelry+Box', description: 'Handcrafted jewelry box made from sustainable timber with intricate traditional carvings.', discount: null, rating: 4.7 },
  { id: 807, name: 'Tropical Fruit Jam Set', category: 'Food & Beverages', price: 25.00, image: 'https://via.placeholder.com/150?text=Fruit+Jam', description: 'Set of three jams made from exotic fruits grown in the rich soils of Western North Region.', discount: '12% off', rating: 4.6 },
  { id: 808, name: 'Medicinal Forest Herbs', category: 'Health & Wellness', price: 18.00, image: 'https://via.placeholder.com/150?text=Forest+Herbs', description: 'Traditional medicinal herbs collected from the biodiverse forests of Western North Region.', discount: null, rating: 4.5 },
  { id: 809, name: 'Cocoa Batik Fabric', category: 'Textiles & Clothing', price: 65.00, image: 'https://via.placeholder.com/150?text=Batik', description: 'Hand-dyed batik fabric with cocoa-inspired patterns created by local artisans.', discount: '15% off', rating: 4.8 },
  { id: 810, name: 'Bamboo Basket Collection', category: 'Home & Decor', price: 40.00, image: 'https://via.placeholder.com/150?text=Bamboo+Baskets', description: 'Set of hand-woven baskets made from sustainable bamboo grown in Western North Region.', discount: null, rating: 4.7 },
  { id: 811, name: 'Cocoa Tea', category: 'Food & Beverages', price: 12.00, image: 'https://via.placeholder.com/150?text=Cocoa+Tea', description: 'Traditional tea made from cocoa shells, rich in antioxidants with a gentle chocolate flavor.', discount: '8% off', rating: 4.6 },
  { id: 812, name: 'Carved Wooden Mask', category: 'Art & Culture', price: 95.00, image: 'https://via.placeholder.com/150?text=Wooden+Mask', description: 'Traditional wooden mask hand-carved by artisans from Western North, representing forest spirits.', discount: null, rating: 4.9 }
];

const WesternNorthProducts = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('products');
  const [activeTab, setActiveTab] = useState('overview');
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
      {/* Decorative elements */}
      <div className="cocoa-leaf-1"></div>
      <div className="cocoa-leaf-2"></div>
      <div className="cocoa-pod"></div>
      
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
        <p className="region-subtitle">The Cocoa Heartland of Ghana</p>
        
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
              Discover authentic products from Western North Region, the heart of Ghana's cocoa production,
              featuring handcrafted items from our lush forests and rich agricultural heritage.
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
                active={activeTab === 'cocoa'} 
                onClick={() => setActiveTab('cocoa')}
              >
                Cocoa Story
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
                  <p>
                    Western North Region, created in 2019, is one of Ghana's newest administrative regions, 
                    carved out of the former Western Region. It is located in the southwestern part of Ghana 
                    and is known as the heart of Ghana's cocoa production, contributing significantly to the 
                    country's position as the world's second-largest cocoa producer.
                  </p>
                  <p>
                    <strong>Capital:</strong> Sefwi Wiawso<br />
                    <strong>Population:</strong> Approximately 880,000<br />
                    <strong>Major Languages:</strong> Sefwi, Akan, English<br />
                    <strong>Notable Features:</strong> Bia National Park, Cocoa Farms, Ankasa Forest Reserve
                  </p>
                  <div className="region-highlights">
                    <div className="highlight-item">
                      <FaSeedling className="highlight-icon" />
                      <span>Cocoa Production</span>
                    </div>
                    <div className="highlight-item">
                      <FaTree className="highlight-icon" />
                      <span>Lush Forests</span>
                    </div>
                    <div className="highlight-item">
                      <FaLeaf className="highlight-icon" />
                      <span>Biodiversity</span>
                    </div>
                    <div className="highlight-item">
                      <FaFeather className="highlight-icon" />
                      <span>Wildlife</span>
                    </div>
                  </div>

                  <div className="climate-info mt-4">
                    <h5>Climate & Geography</h5>
                    <p>
                      Western North enjoys a tropical climate with two rainy seasons, supporting its lush 
                      vegetation and agricultural activities. The region is characterized by dense forests, 
                      rolling hills, and fertile soils that make it ideal for cocoa cultivation and other crops. 
                      Its rich biodiversity includes numerous plant and animal species, many found in the 
                      protected areas like Bia National Park.
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
                    <Card.Header className="culture-card-header">Eluo Festival</Card.Header>
                    <Card.Body>
                      <p>
                        The Eluo Festival is celebrated by the Sefwi people of Western North. It's a purification 
                        festival that marks the beginning of the Sefwi New Year. During this festival, the 
                        community comes together to cleanse themselves of past wrongdoings and ask for blessings 
                        for the new year.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Eluo+Festival" 
                        alt="Eluo Festival" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="festival-date mt-2">
                        <strong>When:</strong> October - November annually
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Cocoa Culture</Card.Header>
                    <Card.Body>
                      <p>
                        Cocoa farming is not just an economic activity but a way of life in Western North. 
                        The cultural practices around cocoa cultivation, harvesting, and processing have 
                        evolved over generations and have influenced everything from music to proverbs and 
                        social systems in the region.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Cocoa+Culture" 
                        alt="Cocoa Culture" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="music-sample">
                        <Button variant="outline-primary" size="sm" className="mt-2">
                          <FaMusic className="me-1" /> Listen to Harvest Songs
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 culture-card">
                    <Card.Header className="culture-card-header">Traditional Crafts</Card.Header>
                    <Card.Body>
                      <p>
                        The artisans of Western North are known for their skilled craftsmanship using locally 
                        available materials. These include wood carving, basket weaving using forest vines, 
                        and crafts made from cocoa pods. Many designs incorporate motifs inspired by cocoa pods, 
                        forest animals, and traditional Sefwi symbols.
                      </p>
                      <img 
                        src="https://via.placeholder.com/300x200?text=Traditional+Crafts" 
                        alt="Traditional Crafts" 
                        className="img-fluid rounded mb-2" 
                      />
                      <div className="craft-workshops">
                        <Badge bg="info" className="me-1">Craft Centers</Badge>
                        <Badge bg="secondary">Workshops</Badge>
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
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Bia+National+Park" />
                    </div>
                    <Card.Body>
                      <Card.Title>Bia National Park</Card.Title>
                      <Card.Text>
                        This UNESCO Biosphere Reserve is home to over 62 mammal species, including forest elephants, 
                        bongos, and several monkey species. The park also features more than 160 bird species and 
                        countless rare plants, making it a biodiversity hotspot.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Northern part of Western North Region</div>
                        <div><strong>Entry Fee:</strong> GH₵20 for Ghanaians, GH₵50 for foreigners</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Cocoa+Tour" />
                    </div>
                    <Card.Body>
                      <Card.Title>Cocoa Farm Tours</Card.Title>
                      <Card.Text>
                        Experience the journey of chocolate from tree to bar with guided tours of traditional 
                        cocoa farms. Learn about sustainable farming practices, see how cocoa is harvested and 
                        processed, and taste freshly made chocolate products.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Various farms near Sefwi Wiawso</div>
                        <div><strong>Tour Fee:</strong> GH₵30-50 depending on tour package</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={4}>
                  <Card className="attraction-card h-100">
                    <div className="attraction-img-container">
                      <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Sefwi+Palace" />
                    </div>
                    <Card.Body>
                      <Card.Title>Sefwi Wiawso Palace</Card.Title>
                      <Card.Text>
                        The traditional palace in Sefwi Wiawso showcases the rich cultural heritage of the Sefwi 
                        people. Visitors can learn about the history of the Sefwi kingdom, traditional governance 
                        systems, and see artifacts that tell the story of this influential region.
                      </Card.Text>
                      <div className="attraction-meta">
                        <div><strong>Location:</strong> Sefwi Wiawso town center</div>
                        <div><strong>Visiting Hours:</strong> 9am-4pm, closed on festival days</div>
                      </div>
                      <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {activeTab === 'cocoa' && (
            <div className="tab-content fade-in">
              <h3 className="mb-4"><FaCoffee className="me-2" />The Cocoa Story</h3>
              <div className="cocoa-journey">
                <div className="cocoa-journey-item">
                  <div className="cocoa-journey-number">01</div>
                  <div className="cocoa-journey-content">
                    <h4>Origins in Western North</h4>
                    <p>
                      Cocoa was introduced to Ghana in the late 19th century, with Western North becoming 
                      one of the earliest and most successful regions for its cultivation due to ideal soil 
                      and climate conditions. The Sefwi areas became particularly known for high-quality cocoa.
                    </p>
                    <img 
                      src="https://via.placeholder.com/400x200?text=Cocoa+History" 
                      alt="Cocoa History" 
                      className="img-fluid rounded mb-3" 
                    />
                  </div>
                </div>
                <div className="cocoa-journey-item">
                  <div className="cocoa-journey-number">02</div>
                  <div className="cocoa-journey-content">
                    <h4>Cultivation & Harvesting</h4>
                    <p>
                      Cocoa in Western North is primarily grown on small family farms using traditional methods. 
                      The cocoa trees take 3-5 years to produce their first pods, which are harvested twice yearly. 
                      The harvesting process is done by hand using specialized tools to ensure the trees aren't damaged.
                    </p>
                    <div className="cocoa-facts">
                      <div className="cocoa-fact">
                        <strong>700,000+</strong>
                        <span>Farmers</span>
                      </div>
                      <div className="cocoa-fact">
                        <strong>3-5 Years</strong>
                        <span>Until First Harvest</span>
                      </div>
                      <div className="cocoa-fact">
                        <strong>2 Seasons</strong>
                        <span>Per Year</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cocoa-journey-item">
                  <div className="cocoa-journey-number">03</div>
                  <div className="cocoa-journey-content">
                    <h4>Processing & Craftsmanship</h4>
                    <p>
                      After harvesting, cocoa pods are split open to extract the beans, which are then fermented, 
                      dried, and processed. Western North is also home to artisans who use cocoa by-products 
                      to create everything from cosmetics to decorative items, demonstrating the versatility of this crop.
                    </p>
                    <Row className="g-3 mt-2">
                      <Col sm={4}>
                        <img 
                          src="https://via.placeholder.com/200x150?text=Fermenting" 
                          alt="Fermenting" 
                          className="img-fluid rounded" 
                        />
                      </Col>
                      <Col sm={4}>
                        <img 
                          src="https://via.placeholder.com/200x150?text=Drying" 
                          alt="Drying" 
                          className="img-fluid rounded" 
                        />
                      </Col>
                      <Col sm={4}>
                        <img 
                          src="https://via.placeholder.com/200x150?text=Processing" 
                          alt="Processing" 
                          className="img-fluid rounded" 
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="cocoa-journey-item">
                  <div className="cocoa-journey-number">04</div>
                  <div className="cocoa-journey-content">
                    <h4>Sustainability & Future</h4>
                    <p>
                      Today, Western North is at the forefront of sustainable cocoa production in Ghana. 
                      Initiatives focus on fair trade practices, forest conservation, and improving farmer 
                      livelihoods. The region is also developing cocoa tourism, allowing visitors to 
                      experience the entire bean-to-bar process.
                    </p>
                    <Button variant="success" className="mt-2">
                      <FaGift className="me-2" /> Support Cocoa Sustainability
                    </Button>
                  </div>
                </div>
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