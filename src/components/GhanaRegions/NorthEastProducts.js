import React, { useState } from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { FaArrowRight, FaLandmark, FaMountain, FaMapMarkedAlt, FaHands, FaHorse, FaCut } from 'react-icons/fa';
import { GiBasket, GiCow, GiHornedHelm } from 'react-icons/gi';

const NorthEastProducts = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentView, setCurrentView] = useState('region');
  
  const neighboringRegions = [
    { region: 'Northern Region', slug: 'northern' },
    { region: 'Upper East', slug: 'upper-east' },
    { region: 'Savannah', slug: 'savannah' }
  ];
  
  const navigateToRegion = (slug) => {
    // Navigation function implementation
    console.log(`Navigating to ${slug}`);
  };
  
  const changeView = (view) => {
    setCurrentView(view);
  };
  
  return (
    <div className="region-container">
      {currentView === 'region' && (
        <div className="region-content">
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
      <Row>
        <Col md={6}>
          <div className="image-frame">
            <img 
              src="https://via.placeholder.com/600x400?text=North+East+Region" 
              alt="North East Region" 
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
          <h3 className="overview-title">The North East Region</h3>
          <p>
            The North East Region, created in 2018, is one of Ghana's newest administrative regions. 
            Carved from the former Northern Region, it is home to rich cultural traditions, distinctive 
            basketry crafts, and scenic landscapes that blend savannah with rock formations.
          </p>
          <p>
            <strong>Capital:</strong> Nalerigu<br />
            <strong>Population:</strong> Approximately 650,000<br />
            <strong>Major Languages:</strong> Mampruli, Kusaal, Bimoba, Hausa, English<br />
            <strong>Notable Features:</strong> Gambaga Escarpment, Naa Gbewaa Shrine, Mamprusi Kingdom, Traditional basketry
          </p>
          <div className="region-highlights">
            <div className="highlight-item">
              <GiBasket className="highlight-icon" />
              <span>Master Basketry</span>
            </div>
            <div className="highlight-item">
              <FaMountain className="highlight-icon" />
              <span>Scenic Escarpment</span>
            </div>
            <div className="highlight-item">
              <FaLandmark className="highlight-icon" />
              <span>Mamprusi Heritage</span>
            </div>
            <div className="highlight-item">
              <GiCow className="highlight-icon" />
              <span>Pastoral Traditions</span>
            </div>
          </div>

          <div className="climate-info mt-4">
            <h5>Climate & Geography</h5>
            <p>
              The North East Region has a tropical savanna climate with a single rainy season from May to October, 
              followed by a dry season characterized by the harmattan winds from the Sahara. The landscape features 
              flat plains, the dramatic Gambaga Escarpment, and scattered outcrops of ancient rocks. The White Volta 
              River forms part of its western boundary.
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
            <Card.Header className="culture-card-header">Mamprusi Kingdom</Card.Header>
            <Card.Body>
              <p>
                The Mamprusi Kingdom is one of the oldest traditional states in Northern Ghana, 
                dating back to the 13th century. The Nayiri (King of Mamprugu) resides in Nalerigu, 
                the regional capital, and plays a significant role in the cultural and traditional 
                governance of the area, maintaining ancient customs and dispute resolution systems.
              </p>
              <img 
                src="https://via.placeholder.com/300x200?text=Mamprusi+Kingdom" 
                alt="Mamprusi Kingdom" 
                className="img-fluid rounded mb-2" 
              />
              <div className="cultural-info mt-2">
                <strong>Key Cultural Site:</strong> Palace of the Nayiri in Nalerigu
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 culture-card">
            <Card.Header className="culture-card-header">Damba Festival</Card.Header>
            <Card.Body>
              <p>
                The Damba Festival is celebrated enthusiastically in the North East Region, particularly 
                among the Mamprusi people. This festival commemorates the birth of Prophet Muhammad with 
                elaborate displays of traditional dance, music, and horsemanship. Chiefs appear in their 
                full regalia, showcasing the region's rich cultural heritage.
              </p>
              <img 
                src="https://via.placeholder.com/300x200?text=Damba+Festival" 
                alt="Damba Festival" 
                className="img-fluid rounded mb-2" 
              />
              <div className="festival-season">
                <strong>Festival Season:</strong> Depends on the Islamic lunar calendar
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 culture-card">
            <Card.Header className="culture-card-header">Bimoba Traditions</Card.Header>
            <Card.Body>
              <p>
                The Bimoba people, predominantly found in the eastern part of the region, 
                maintain distinctive cultural practices including unique initiation rites and ceremonies. 
                Their farming traditions, spiritual practices, and community organization systems reflect 
                centuries of adaptation to the local environment.
              </p>
              <img 
                src="https://via.placeholder.com/300x200?text=Bimoba+Traditions" 
                alt="Bimoba Traditions" 
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
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Gambaga+Escarpment" />
            </div>
            <Card.Body>
              <Card.Title>Gambaga Escarpment</Card.Title>
              <Card.Text>
                This dramatic geological formation stretches across the region, offering breathtaking views 
                and hiking opportunities. The escarpment rises sharply from the surrounding plains and is home 
                to diverse plant and animal species. Local guides can lead visitors through trails that showcase 
                the area's natural beauty and cultural significance.
              </Card.Text>
              <div className="attraction-meta">
                <div><strong>Location:</strong> Across the North East Region</div>
                <div><strong>Activities:</strong> Hiking, birdwatching, photography</div>
              </div>
              <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="attraction-card h-100">
            <div className="attraction-img-container">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Naa+Gbewaa+Shrine" />
            </div>
            <Card.Body>
              <Card.Title>Naa Gbewaa Shrine</Card.Title>
              <Card.Text>
                Located in Nalerigu, this shrine honors the legendary ancestor of the Mamprusi, Dagomba, 
                and Nanumba peoples. Naa Gbewaa is considered the founder of these important northern kingdoms. 
                The shrine is a place of historical significance and cultural pilgrimage for many people 
                from northern Ghana.
              </Card.Text>
              <div className="attraction-meta">
                <div><strong>Location:</strong> Nalerigu</div>
                <div><strong>Cultural Significance:</strong> Historical site, ancestral shrine</div>
              </div>
              <Button variant="outline-primary" size="sm" className="mt-3">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="attraction-card h-100">
            <div className="attraction-img-container">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Nalerigu+Defense+Wall" />
            </div>
            <Card.Body>
              <Card.Title>Ancient Nalerigu Defense Wall</Card.Title>
              <Card.Text>
                Also known as the Nalerigu Wall or the Naa Jaringa Wall, this ancient structure was built for 
                defense during pre-colonial times. Parts of this historical wall still stand today, offering 
                insight into the region's history of conflicts and the architectural ingenuity of ancient kingdoms 
                in northern Ghana.
              </Card.Text>
              <div className="attraction-meta">
                <div><strong>Location:</strong> Nalerigu</div>
                <div><strong>Historical Period:</strong> Pre-colonial era</div>
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
              <img src="https://via.placeholder.com/500x300?text=Basketry" alt="Basketry" className="craft-image" />
              <div className="craft-badge">Signature Craft</div>
            </div>
            <h4 className="craft-title">Basket Weaving</h4>
            <p className="craft-description">
              The North East Region is renowned for its exceptional basketry tradition, particularly from areas 
              around Gambaga and Nalerigu. This craft has been perfected over centuries, with techniques passed 
              down through generations of artisans.
            </p>
            <p>
              Craftspeople use locally harvested elephant grass, straw, and other plant fibers to create 
              intricately designed baskets. These materials are first dried, then sometimes dyed using natural 
              colors derived from plants and minerals before being woven into functional and decorative pieces. 
              The distinctive patterns often represent cultural symbols, stories, or natural elements. From 
              large storage baskets to delicate decorative pieces, these items serve both practical and 
              aesthetic purposes in local communities.
            </p>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => changeView('products')}
              className="mt-2 d-flex align-items-center gap-2"
            >
              <GiBasket /> Shop Basketry Products
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="craft-list">
            <div className="craft-item">
              <div className="craft-icon">
                <FaCut />
              </div>
              <div className="craft-content">
                <h5>Leatherwork</h5>
                <p>
                  Artisans create a variety of leather products including bags, sandals, 
                  pouches, and ceremonial items. The process involves traditional tanning methods 
                  using local plants, followed by cutting, stitching, and decorating with geometric patterns.
                </p>
              </div>
            </div>
            
            <div className="craft-item">
              <div className="craft-icon">
                <FaHands />
              </div>
              <div className="craft-content">
                <h5>Pottery</h5>
                <p>
                  Traditional pottery in the North East Region produces functional items like water pots, 
                  cooking vessels, and storage containers. Clay is carefully selected from specific locations, 
                  shaped by hand, decorated with patterns, and fired in open pits.
                </p>
              </div>
            </div>
            
            <div className="craft-item">
              <div className="craft-icon">
                <GiHornedHelm />
              </div>
              <div className="craft-content">
                <h5>Traditional Headwear</h5>
                <p>
                  The creation of ceremonial hats and headwear is an important craft, particularly for 
                  the Mamprusi people. These pieces, made from local fibers, leather, and sometimes adorned 
                  with cowrie shells or feathers, signify status and are worn during cultural ceremonies.
                </p>
              </div>
            </div>
            
            <div className="craft-item">
              <div className="craft-icon">
                <FaHorse />
              </div>
              <div className="craft-content">
                <h5>Saddle Making</h5>
                <p>
                  With horses playing an important role in traditional ceremonies and the history of 
                  northern kingdoms, saddle making remains a specialized craft. Artisans combine woodworking 
                  and leatherwork to create decorated saddles for ceremonial and practical use.
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
      Browse North East Region Products <FaArrowRight className="ms-2" />
    </Button>
  </div>
</div>
)}
</div>
);
};

export default NorthEastProducts;