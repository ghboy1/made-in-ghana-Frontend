import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Nav, Tabs, Tab } from 'react-bootstrap';
import { FaShoppingCart, FaArrowLeft, FaMapMarkedAlt, FaStore, FaInfo } from 'react-icons/fa';
import { UserContext } from '../contexts/UserContext';
import { ghanaRegions, getRegionBySlug, getNeighboringRegions } from '../data/ghanaRegions';
import './RegionProducts.css';

// Sample products data representing each region
const regionalProducts = {
  'ashanti': [
    { id: 1, name: 'Kente Cloth', price: 300, category: 'Textiles' },
    { id: 2, name: 'Adinkra Symbols Art', price: 150, category: 'Crafts' },
  ],
  'greater-accra': [
    { id: 3, name: 'Ga Kenkey', price: 15, category: 'Food' },
    { id: 4, name: 'Accra Beads', price: 50, category: 'Jewelry' },
  ],
  'central': [
    { id: 5, name: 'Cape Coast Fante Kenkey', price: 10, category: 'Food' },
    { id: 6, name: 'Elmina Batik', price: 200, category: 'Textiles' },
  ],
  'eastern': [
    { id: 7, name: 'Akosombo Textile', price: 250, category: 'Textiles' },
    { id: 8, name: 'Koforidua Beads', price: 60, category: 'Jewelry' },
  ],
  'volta': [
    { id: 9, name: 'Volta Kente', price: 280, category: 'Textiles' },
    { id: 10, name: 'Ho Banku', price: 12, category: 'Food' },
  ],
  'western': [
    { id: 11, name: 'Takoradi Palm Wine', price: 20, category: 'Beverages' },
    { id: 12, name: 'Sekondi Wood Carvings', price: 100, category: 'Crafts' },
  ],
  'bono': [
    { id: 13, name: 'Sunyani Cocoa', price: 50, category: 'Food' },
    { id: 14, name: 'Bono Brassware', price: 150, category: 'Crafts' },
  ],
  'bono-east': [
    { id: 15, name: 'Techiman Yam', price: 30, category: 'Food' },
    { id: 16, name: 'Nkoranza Pottery', price: 80, category: 'Crafts' },
  ],
  'ahafo': [
    { id: 17, name: 'Goaso Cassava', price: 25, category: 'Food' },
    { id: 18, name: 'Ahafo Gold Jewelry', price: 500, category: 'Jewelry' },
  ],
  'north-east': [
    { id: 19, name: 'Walewale Shea Butter', price: 40, category: 'Cosmetics' },
    { id: 20, name: 'Nalerigu Baskets', price: 70, category: 'Crafts' },
  ],
  'savannah': [
    { id: 21, name: 'Damongo Groundnuts', price: 15, category: 'Food' },
    { id: 22, name: 'Salaga Cloth', price: 180, category: 'Textiles' },
  ],
  'upper-east': [
    { id: 23, name: 'Bolgatanga Baskets', price: 90, category: 'Crafts' },
    { id: 24, name: 'Navrongo Smock', price: 120, category: 'Textiles' },
  ],
  'upper-west': [
    { id: 25, name: 'Wa Millet', price: 20, category: 'Food' },
    { id: 26, name: 'Lawra Drums', price: 150, category: 'Musical Instruments' },
  ],
  'oti': [
    { id: 27, name: 'Dambai Fish', price: 35, category: 'Food' },
    { id: 28, name: 'Krachi Beads', price: 55, category: 'Jewelry' },
  ],
  'western-north': [
    { id: 29, name: 'Sefwi Cocoa', price: 45, category: 'Food' },
    { id: 30, name: 'Enchi Woodwork', price: 110, category: 'Crafts' },
  ],
  'northern': [
    { id: 31, name: 'Tamale Rice', price: 25, category: 'Food' },
    { id: 32, name: 'Yendi Leatherwork', price: 130, category: 'Crafts' },
  ],
};

const RegionProducts = () => {
  const { regionSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // Default to products view
  const [neighboringRegions, setNeighboringRegions] = useState([]);

  useEffect(() => {
    if (!regionSlug) {
      setError('Region not specified');
      setLoading(false);
      return;
    }

    // Use the centralized function to get region data
    const foundRegion = getRegionBySlug(regionSlug);
    const neighbors = getNeighboringRegions(regionSlug);

    if (!foundRegion) {
      setError('Region not found');
      setLoading(false);
      return;
    }

    setRegion(foundRegion);
    setNeighboringRegions(neighbors);
    
    // Get region products (this part remains similar)
    const regionProducts = regionalProducts[regionSlug.toLowerCase()] || [];
    setProducts(regionProducts);
    setLoading(false);
  }, [regionSlug]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // New function to handle tab switching
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Container className="my-4 region-container">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3 back-button">
        <FaArrowLeft /> Back
      </Button>
      
      {region && (
        <>
          <div className="region-header" style={{borderColor: region.color}}>
            <h1>{region.region} Region</h1>
            <p className="region-description">{region.description}</p>
          </div>
          
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="mb-4 region-tabs"
          >
            <Tab 
              eventKey="products" 
              title={<span><FaStore className="me-2" />Products</span>}
            >
              <Row>
                {products.map(product => (
                  <Col key={product.id} md={4} className="mb-4">
                    <Card className="product-card">
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          Price: GHS {product.price}
                          <br />
                          <Badge bg="info">{product.category}</Badge>
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          <FaShoppingCart /> Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
            
            <Tab 
              eventKey="explore" 
              title={<span><FaMapMarkedAlt className="me-2" />Explore</span>}
            >
              <Row>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Header style={{backgroundColor: region.color, color: 'white'}}>
                      About {region.region} Region
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <strong>Capital:</strong> {region.capital}<br />
                        <strong>Main Attractions:</strong> {region.attractions.join(', ')}
                      </Card.Text>
                      <div className="region-info-body">
                        <p>
                          {region.description}. This region is known for its unique culture, traditions, 
                          and natural resources that contribute significantly to Ghana's heritage and economy.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                  
                  <Card>
                    <Card.Header style={{backgroundColor: region.color, color: 'white'}}>
                      Neighboring Regions
                    </Card.Header>
                    <Card.Body>
                      <Row className="g-2">
                        {neighboringRegions.map(neighbor => (
                          <Col key={neighbor.slug} xs={6} md={4}>
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              as={Link} 
                              to={`/regions/${neighbor.slug}`}
                              className="w-100 mb-2"
                            >
                              {neighbor.region}
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Header style={{backgroundColor: region.color, color: 'white'}}>
                      Famous Products
                    </Card.Header>
                    <Card.Body>
                      <ul className="famous-products-list">
                        {region.mainProducts.map((product, index) => (
                          <li key={index}>{product}</li>
                        ))}
                      </ul>
                      <Button 
                        variant="primary" 
                        onClick={() => setActiveTab('products')}
                        className="mt-2"
                      >
                        Browse Products <FaStore className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                  
                  <Card>
                    <Card.Header style={{backgroundColor: region.color, color: 'white'}}>
                      Learn More
                    </Card.Header>
                    <Card.Body>
                      <p>
                        Explore more information about the {region.region} Region including history, 
                        culture, tourism, and local activities.
                      </p>
                      <Button 
                        variant="outline-primary" 
                        as={Link} 
                        to={`/learn/regions/${region.slug}`}
                      >
                        Detailed Region Guide <FaInfo className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </>
      )}
    </Container>
  );
};

export default RegionProducts;