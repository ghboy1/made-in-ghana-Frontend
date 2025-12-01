import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaUserGraduate, FaArrowRight, FaCode, 
  FaChartLine, FaLeaf, FaDatabase
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';

const Specialization = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaUserGraduate className="me-3 text-primary" />
        Specialization (Ages 17–20)
      </h2>
      <p className="lead mb-4">
        Develop industry-specific skills and prepare for higher education or career entry
      </p>
      
      <Row className="mb-4">
        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Focus Areas</h4>
              <Row className="g-3">
                <Col lg={3} md={6}>
                  <Card className="h-100 specialty-card">
                    <Card.Body className="text-center">
                      <div className="specialty-icon mb-3">
                        <FaCode />
                      </div>
                      <h5>Software Development</h5>
                      <p className="small">Full-stack, mobile, and cloud development pathways</p>
                      <Badge bg="primary" className="mb-2">High Demand</Badge>
                      <div>
                        <Link to="/software-dev" className="btn btn-sm btn-outline-primary mt-2">Learn More</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={3} md={6}>
                  <Card className="h-100 specialty-card">
                    <Card.Body className="text-center">
                      <div className="specialty-icon mb-3">
                        <FaDatabase />
                      </div>
                      <h5>Data Science</h5>
                      <p className="small">Analytics, machine learning, and visualization</p>
                      <Badge bg="success" className="mb-2">Growing Field</Badge>
                      <div>
                        <Link to="/data-science" className="btn btn-sm btn-outline-primary mt-2">Learn More</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={3} md={6}>
                  <Card className="h-100 specialty-card">
                    <Card.Body className="text-center">
                      <div className="specialty-icon mb-3">
                        <FaChartLine />
                      </div>
                      <h5>Business & Entrepreneurship</h5>
                      <p className="small">Business operations, marketing, and startups</p>
                      <Badge bg="info" className="mb-2">Job Creator</Badge>
                      <div>
                        <Link to="/business" className="btn btn-sm btn-outline-primary mt-2">Learn More</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={3} md={6}>
                  <Card className="h-100 specialty-card">
                    <Card.Body className="text-center">
                      <div className="specialty-icon mb-3">
                        <FaLeaf />
                      </div>
                      <h5>Agriculture Innovation</h5>
                      <p className="small">Agritech, sustainable farming, and food systems</p>
                      <Badge bg="success" className="mb-2">National Priority</Badge>
                      <div>
                        <Link to="/agri-tech" className="btn btn-sm btn-outline-primary mt-2">Learn More</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Accelerated Programs
            </Card.Header>
            <Card.Body>
              <p>
                Intensive 6-12 month training programs designed with industry partners:
              </p>
              <ul className="content-list">
                <li>
                  <strong>Software Engineering Bootcamp</strong> - Full-stack web and mobile development
                </li>
                <li>
                  <strong>Data Analysis Certificate</strong> - Business intelligence and data visualization
                </li>
                <li>
                  <strong>Digital Marketing Intensive</strong> - Social media, SEO, and content strategy
                </li>
                <li>
                  <strong>Agritech Innovations</strong> - Technology solutions for agricultural challenges
                </li>
              </ul>
              <Button variant="outline-primary" size="sm" className="mt-2">
                Application Schedule <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Industry Connections
            </Card.Header>
            <Card.Body>
              <p>
                Our programs connect students directly with potential employers:
              </p>
              <ul className="content-list">
                <li>
                  <strong>Internship Placements</strong> - Real-world experience with leading companies
                </li>
                <li>
                  <strong>Industry Mentors</strong> - One-on-one guidance from professionals
                </li>
                <li>
                  <strong>Networking Events</strong> - Meet employers at job fairs and industry days
                </li>
                <li>
                  <strong>Capstone Projects</strong> - Solve real problems for industry partners
                </li>
              </ul>
              <Button variant="outline-primary" size="sm" className="mt-2">
                Partner Companies <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Find Your Specialization <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          Success Stories
        </Button>
      </div>
    </div>
  );
};

export default Specialization;