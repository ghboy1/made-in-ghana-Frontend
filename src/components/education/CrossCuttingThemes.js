import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaGlobeAfrica, FaArrowRight, FaLeaf, 
  FaHandshake, FaUsers, FaRobot, FaShieldAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';
const CrossCuttingThemes = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaGlobeAfrica className="me-3 text-primary" />
        Cross-Cutting Themes
      </h2>
      <p className="lead mb-4">
        Important topics integrated across all educational levels and subject areas
      </p>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="theme-card h-100 shadow-sm">
            <div className="theme-icon">
              <FaLeaf />
            </div>
            <Card.Body>
              <h4>Sustainability & Climate Action</h4>
              <p>
                Understanding environmental challenges and developing solutions for a sustainable future
              </p>
              <h6 className="mt-3 mb-2">Key Focus Areas:</h6>
              <ul>
                <li>Climate science fundamentals</li>
                <li>Renewable energy solutions</li>
                <li>Conservation practices</li>
                <li>Sustainable development</li>
                <li>Green entrepreneurship</li>
              </ul>
              <Link to="/sustainability" className="btn btn-outline-success mt-2">
                Explore Theme <FaArrowRight className="ms-1" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="theme-card h-100 shadow-sm">
            <div className="theme-icon">
              <FaHandshake />
            </div>
            <Card.Body>
              <h4>Ethics & Social Responsibility</h4>
              <p>
                Developing ethical decision-making skills and understanding impacts on society
              </p>
              <h6 className="mt-3 mb-2">Key Focus Areas:</h6>
              <ul>
                <li>Ethical reasoning</li>
                <li>Digital citizenship</li>
                <li>Social impact assessment</li>
                <li>Community engagement</li>
                <li>Responsible leadership</li>
              </ul>
              <Link to="/ethics" className="btn btn-outline-primary mt-2">
                Explore Theme <FaArrowRight className="ms-1" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="theme-card h-100 shadow-sm">
            <div className="theme-icon">
              <FaUsers />
            </div>
            <Card.Body>
              <h4>Cultural Heritage & Identity</h4>
              <p>
                Celebrating Ghana's cultural diversity and understanding our collective heritage
              </p>
              <h6 className="mt-3 mb-2">Key Focus Areas:</h6>
              <ul>
                <li>Traditional knowledge systems</li>
                <li>Cultural preservation</li>
                <li>Indigenous languages</li>
                <li>Arts and creative expression</li>
                <li>Community storytelling</li>
              </ul>
              <Link to="/cultural-heritage" className="btn btn-outline-danger mt-2">
                Explore Theme <FaArrowRight className="ms-1" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Card className="theme-card h-100 shadow-sm">
            <div className="theme-icon">
              <FaRobot />
            </div>
            <Card.Body>
              <h4>Technology & Society</h4>
              <p>
                Understanding the impact of emerging technologies on our lives and communities
              </p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg="info">AI Ethics</Badge>
                <Badge bg="info">Digital Literacy</Badge>
                <Badge bg="info">Tech Inclusion</Badge>
                <Badge bg="info">Future of Work</Badge>
                <Badge bg="info">Data Privacy</Badge>
              </div>
              
              <div className="learning-modules mt-3">
                <h6>Featured Modules:</h6>
                <div className="module-item d-flex align-items-start mb-2">
                  <div className="module-number me-2">1</div>
                  <div>
                    <strong>AI Literacy for Everyone</strong>
                    <p className="small mb-0">Understanding AI capabilities, limitations, and impacts</p>
                  </div>
                </div>
                
                <div className="module-item d-flex align-items-start mb-2">
                  <div className="module-number me-2">2</div>
                  <div>
                    <strong>Digital Rights & Responsibilities</strong>
                    <p className="small mb-0">Privacy, security, and ethical participation online</p>
                  </div>
                </div>
                
                <div className="module-item d-flex align-items-start">
                  <div className="module-number me-2">3</div>
                  <div>
                    <strong>Technology Impact Assessment</strong>
                    <p className="small mb-0">Evaluating potential benefits and risks of new technologies</p>
                  </div>
                </div>
              </div>
              
              <Link to="/tech-society" className="btn btn-outline-info mt-3">
                Explore Theme <FaArrowRight className="ms-1" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="theme-card h-100 shadow-sm">
            <div className="theme-icon">
              <FaShieldAlt />
            </div>
            <Card.Body>
              <h4>Health & Wellbeing</h4>
              <p>
                Promoting physical health, mental wellness, and balanced lifestyles
              </p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg="success">Mental Health</Badge>
                <Badge bg="success">Nutrition</Badge>
                <Badge bg="success">Physical Activity</Badge>
                <Badge bg="success">Public Health</Badge>
                <Badge bg="success">Digital Wellbeing</Badge>
              </div>
              
              <div className="tools-resources mt-3">
                <h6>Tools & Resources:</h6>
                <Row className="g-2">
                  <Col sm={6}>
                    <div className="resource-box p-2 rounded">
                      <h6 className="mb-1">Wellness Toolkit</h6>
                      <p className="small mb-0">Practical tools for stress management and balanced living</p>
                    </div>
                  </Col>
                  
                  <Col sm={6}>
                    <div className="resource-box p-2 rounded">
                      <h6 className="mb-1">Nutrition Database</h6>
                      <p className="small mb-0">Local foods and their nutritional benefits</p>
                    </div>
                  </Col>
                  
                  <Col sm={6}>
                    <div className="resource-box p-2 rounded">
                      <h6 className="mb-1">Mental Health Guide</h6>
                      <p className="small mb-0">Understanding and supporting mental wellness</p>
                    </div>
                  </Col>
                  
                  <Col sm={6}>
                    <div className="resource-box p-2 rounded">
                      <h6 className="mb-1">Physical Activity Tracker</h6>
                      <p className="small mb-0">Set goals and track your daily activity</p>
                    </div>
                  </Col>
                </Row>
              </div>
              
              <Link to="/health-wellbeing" className="btn btn-outline-success mt-3">
                Explore Theme <FaArrowRight className="ms-1" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Integrating Themes in Education <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          Theme-Based Projects
        </Button>
      </div>
    </div>
  );
};

export default CrossCuttingThemes;