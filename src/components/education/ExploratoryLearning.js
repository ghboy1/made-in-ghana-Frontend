import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaLaptopCode, FaArrowRight, FaProjectDiagram, 
  FaFlask, FaMicrochip, FaPalette
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';

const ExploratoryLearning = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaLaptopCode className="me-3 text-primary" />
        Exploratory Learning (Ages 14–17)
      </h2>
      <p className="lead mb-4">
        Dive deeper into specific interests and discover potential career paths through hands-on projects
      </p>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaProjectDiagram className="me-2" /> Project-Based Learning
            </Card.Header>
            <Card.Body>
              <p>
                Students learn through real-world projects that challenge them to apply knowledge across disciplines:
              </p>
              <ul className="content-list">
                <li>
                  <strong>Web & mobile app development</strong> - Create applications that solve community problems
                </li>
                <li>
                  <strong>Environmental monitoring</strong> - Design solutions to track and address local environmental issues
                </li>
                <li>
                  <strong>Market research & entrepreneurship</strong> - Research, develop, and pitch business ideas
                </li>
                <li>
                  <strong>Robotics & automation</strong> - Build systems that address real-world challenges
                </li>
              </ul>
              
              <div className="mt-3">
                <Badge bg="success" className="me-2">Practical Skills</Badge>
                <Badge bg="info">Cross-Disciplinary</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaFlask className="me-2" /> Featured Paths
            </Card.Header>
            <Card.Body>
              <div className="path-item mb-3">
                <h5><FaMicrochip className="me-2 text-primary" /> Technology & Engineering</h5>
                <p>Explore coding, robotics, electrical engineering, and digital design.</p>
                <Link to="/tech-path" className="btn btn-sm btn-outline-primary">Explore Path</Link>
              </div>
              
              <div className="path-item mb-3">
                <h5><FaPalette className="me-2 text-primary" /> Creative Industries</h5>
                <p>Discover digital arts, game design, music production, and content creation.</p>
                <Link to="/creative-path" className="btn btn-sm btn-outline-primary">Explore Path</Link>
              </div>
              
              <div className="path-item">
                <h5><FaProjectDiagram className="me-2 text-primary" /> Entrepreneurship</h5>
                <p>Learn business fundamentals, market research, and product development.</p>
                <Link to="/business-path" className="btn btn-sm btn-outline-primary">Explore Path</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Browse All Exploratory Programs <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          Success Stories
        </Button>
      </div>
    </div>
  );
};

export default ExploratoryLearning;