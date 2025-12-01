import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { 
  FaChalkboardTeacher, FaArrowRight, FaLaptop, 
  FaMobile, FaTabletAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';

const FoundationalSkills = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaChalkboardTeacher className="me-3 text-primary" />
        Foundational Skills (Ages 10–14)
      </h2>
      <p className="lead mb-4">
        Focus on core literacy, numeracy, and digital fluency to build essential knowledge
      </p>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaLaptop className="me-2" /> Key Areas
            </Card.Header>
            <Card.Body>
              <ul className="content-list">
                <li>
                  <Link to="/basic-coding" className="content-link">
                    Basic coding (Python, Scratch) <FaArrowRight className="ms-1" />
                  </Link>
                </li>
                <li>
                  <Link to="/critical-thinking" className="content-link">
                    Critical thinking & problem-solving <FaArrowRight className="ms-1" />
                  </Link>
                </li>
                <li>
                  <Link to="/financial-literacy" className="content-link">
                    Financial literacy (budgeting, savings) <FaArrowRight className="ms-1" />
                  </Link>
                </li>
                <li>
                  <Link to="/climate-science" className="content-link">
                    Climate science basics <FaArrowRight className="ms-1" />
                  </Link>
                </li>
                <li>
                  <Link to="/digital-citizenship" className="content-link">
                    Digital citizenship (online safety, ethics) <FaArrowRight className="ms-1" />
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaMobile className="me-2" /> Modern Tools
            </Card.Header>
            <Card.Body>
              <ul className="content-list">
                <li>
                  <Link to="/gamified-learning" className="content-link">
                    Gamified learning apps (Duolingo, Prodigy) <FaArrowRight className="ms-1" />
                  </Link>
                </li>
                <li>
                  Collaborative platforms (Google Classroom, Padlet)
                </li>
                <li>
                  AI tutors for personalized learning
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Explore Foundational Learning Programs <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          For Parents
        </Button>
      </div>
    </div>
  );
};

export default FoundationalSkills;