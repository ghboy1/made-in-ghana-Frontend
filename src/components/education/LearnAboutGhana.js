import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaLandmark, FaArrowRight, FaBookOpen, 
  FaMusic, FaUtensils, FaMapMarkedAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './education-components.css';
import { ghanaRegions } from '../../data/ghanaRegions';

const LearnAboutGhana = ({ handleTakeQuiz }) => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaLandmark className="me-3 text-primary" />
        Learn About Ghana
      </h2>
      <p className="lead mb-4">
        Discover Ghana's rich heritage, culture, government, and natural resources
      </p>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaBookOpen className="me-2" /> History & Government
            </Card.Header>
            <Card.Body>
              <ul className="content-list">
                <li>
                  <strong>Pre-Colonial History</strong> - Ancient kingdoms and cultural development
                </li>
                <li>
                  <strong>Colonial Period</strong> - European contact and the Gold Coast
                </li>
                <li>
                  <strong>Independence & Modern Ghana</strong> - Dr. Kwame Nkrumah and nation-building
                </li>
                <li>
                  <strong>Constitutional Development</strong> - Ghana's journey to democratic governance
                </li>
                <li>
                  <strong>Government Structure</strong> - Executive, legislative, and judicial branches
                </li>
              </ul>
              
              <div className="quiz-promo p-3 mt-3 rounded">
                <h5>Test Your Knowledge</h5>
                <p className="small">
                  How well do you know Ghana's constitution and government structure?
                </p>
                <Button variant="primary" onClick={handleTakeQuiz}>
                  Take Constitution Quiz <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaMusic className="me-2" /> Culture & Traditions
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col sm={6}>
                  <div className="culture-card p-2 rounded">
                    <h5><FaMusic className="me-2 text-primary" /> Arts & Music</h5>
                    <p className="small">Traditional instruments, dances, and contemporary music</p>
                    <Badge bg="info" className="me-1">Interactive</Badge>
                    <Badge bg="secondary">Audio Samples</Badge>
                  </div>
                </Col>
                
                <Col sm={6}>
                  <div className="culture-card p-2 rounded">
                    <h5><FaUtensils className="me-2 text-primary" /> Cuisine</h5>
                    <p className="small">Regional dishes, ingredients, and cooking techniques</p>
                    <Badge bg="info" className="me-1">Recipes</Badge>
                    <Badge bg="secondary">Videos</Badge>
                  </div>
                </Col>
                
                <Col sm={6}>
                  <div className="culture-card p-2 rounded">
                    <h5><FaLandmark className="me-2 text-primary" /> Festivals</h5>
                    <p className="small">Traditional celebrations from across Ghana</p>
                    <Badge bg="info" className="me-1">Calendar</Badge>
                    <Badge bg="secondary">Photo Gallery</Badge>
                  </div>
                </Col>
                
                <Col sm={6}>
                  <div className="culture-card p-2 rounded">
                    <h5><FaBookOpen className="me-2 text-primary" /> Languages</h5>
                    <p className="small">Major language groups and basic phrases</p>
                    <Badge bg="info" className="me-1">Pronunciation</Badge>
                    <Badge bg="secondary">Phrasebook</Badge>
                  </div>
                </Col>
              </Row>
              
              <Button variant="outline-primary" size="sm" className="mt-3 w-100">
                Explore Cultural Heritage <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaMapMarkedAlt className="me-2" /> Regions of Ghana
            </Card.Header>
            <Card.Body>
              <p className="mb-3">
                Explore Ghana's 16 diverse regions, each with unique culture, resources, and attractions:
              </p>
              
              <Row className="g-3">
                {ghanaRegions.map(region => (
                  <Col lg={3} md={4} sm={6} key={region.slug}>
                    <div className="region-card p-2 text-center" 
                         style={{borderLeft: `4px solid ${region.color}`}}>
                      <h5>{region.region}</h5>
                      <p className="small mb-2">
                        {region.description}
                      </p>
                      <div className="region-actions">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          as={Link} 
                          to={`/regions/${region.slug}`}
                          className="me-1"
                        >
                          Explore
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          as={Link} 
                          to={`/regions/${region.slug}?tab=products`}
                        >
                          Products
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div className="text-center mt-3">
                <Button variant="primary" size="sm">
                  Interactive Map <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Complete Ghana Guide <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          Virtual Tours
        </Button>
      </div>
    </div>
  );
};

LearnAboutGhana.propTypes = {
  handleTakeQuiz: PropTypes.func.isRequired
};

export default LearnAboutGhana;