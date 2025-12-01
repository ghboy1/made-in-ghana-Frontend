import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaBriefcase, FaArrowRight, FaGraduationCap, 
  FaHandshake, FaCertificate, FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';

const ProfessionalMastery = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaBriefcase className="me-3 text-primary" />
        Professional Mastery (Ages 20+)
      </h2>
      <p className="lead mb-4">
        Advance your career with specialized training, leadership development, and industry certifications
      </p>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaGraduationCap className="me-2" /> Advanced Certifications
            </Card.Header>
            <Card.Body>
              <p>
                Industry-recognized credentials to validate your expertise:
              </p>
              <ul className="content-list">
                <li>
                  <strong>Professional Cloud Certifications</strong> - AWS, Azure, Google Cloud
                </li>
                <li>
                  <strong>Project Management Professional (PMP)</strong> - Global standard for project managers
                </li>
                <li>
                  <strong>Data Science & AI Specializations</strong> - Advanced analytics and machine learning
                </li>
                <li>
                  <strong>Cybersecurity Certifications</strong> - Security+, CISSP, CEH
                </li>
                <li>
                  <strong>Management & Leadership</strong> - Business administration and team leadership
                </li>
              </ul>
              
              <Button variant="outline-primary" size="sm" className="mt-2">
                Certification Catalog <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaHandshake className="me-2" /> Leadership Development
            </Card.Header>
            <Card.Body>
              <p>
                Comprehensive programs to develop management and leadership capabilities:
              </p>
              <div className="program-item mb-3">
                <h5><FaCertificate className="me-2 text-primary" /> Executive Leadership Program</h5>
                <p className="small">Six-month intensive training for emerging leaders in technical fields</p>
                <Badge bg="info" className="me-2">Corporate Sponsored</Badge>
                <Badge bg="secondary">Quarterly Intake</Badge>
              </div>
              
              <div className="program-item mb-3">
                <h5><FaUsers className="me-2 text-primary" /> Management Accelerator</h5>
                <p className="small">Practical management skills for team leaders and mid-level managers</p>
                <Badge bg="success" className="me-2">100% Job Placement</Badge>
                <Badge bg="secondary">Monthly Workshops</Badge>
              </div>
              
              <Button variant="outline-primary" size="sm" className="mt-2">
                Leadership Pathways <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              Industry-Specific Mastery Programs
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col lg={3} md={6}>
                  <div className="industry-card p-3">
                    <h5 className="mb-2">Technology</h5>
                    <ul className="small-list">
                      <li>Enterprise Architecture</li>
                      <li>DevOps & SRE</li>
                      <li>AI/ML Engineering</li>
                      <li>Blockchain Development</li>
                    </ul>
                    <Link to="/tech-mastery" className="btn btn-sm btn-outline-primary mt-2 w-100">
                      Details
                    </Link>
                  </div>
                </Col>
                
                <Col lg={3} md={6}>
                  <div className="industry-card p-3">
                    <h5 className="mb-2">Business & Finance</h5>
                    <ul className="small-list">
                      <li>Financial Analysis</li>
                      <li>Business Analytics</li>
                      <li>Investment Management</li>
                      <li>Strategic Planning</li>
                    </ul>
                    <Link to="/business-mastery" className="btn btn-sm btn-outline-primary mt-2 w-100">
                      Details
                    </Link>
                  </div>
                </Col>
                
                <Col lg={3} md={6}>
                  <div className="industry-card p-3">
                    <h5 className="mb-2">Creative Industries</h5>
                    <ul className="small-list">
                      <li>UX/UI Leadership</li>
                      <li>Content Strategy</li>
                      <li>Digital Marketing</li>
                      <li>Media Production</li>
                    </ul>
                    <Link to="/creative-mastery" className="btn btn-sm btn-outline-primary mt-2 w-100">
                      Details
                    </Link>
                  </div>
                </Col>
                
                <Col lg={3} md={6}>
                  <div className="industry-card p-3">
                    <h5 className="mb-2">Education</h5>
                    <ul className="small-list">
                      <li>Educational Technology</li>
                      <li>Curriculum Development</li>
                      <li>Education Administration</li>
                      <li>Learning Design</li>
                    </ul>
                    <Link to="/education-mastery" className="btn btn-sm btn-outline-primary mt-2 w-100">
                      Details
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Explore Professional Programs <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          For Employers
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalMastery;