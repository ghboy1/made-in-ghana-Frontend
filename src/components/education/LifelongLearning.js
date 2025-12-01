import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaBrain, FaArrowRight, FaBook, 
  FaPodcast, FaUserFriends, FaVideo
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './education-components.css';
const LifelongLearning = () => {
  return (
    <div className="education-section">
      <h2 className="mb-3 d-flex align-items-center">
        <FaBrain className="me-3 text-primary" />
        Lifelong Learning (All Ages)
      </h2>
      <p className="lead mb-4">
        Continue growing with flexible learning opportunities at any stage of life
      </p>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaBook className="me-2" /> Knowledge Expansion
            </Card.Header>
            <Card.Body>
              <p>
                Explore new subjects and stay updated on emerging trends:
              </p>
              <ul className="content-list">
                <li>
                  <strong>Microlearning Courses</strong> - Short, focused lessons on specific topics
                </li>
                <li>
                  <strong>Book Club & Reading Guides</strong> - Curated reading lists with discussion groups
                </li>
                <li>
                  <strong>Industry Trend Reports</strong> - Quarterly insights on evolving sectors
                </li>
                <li>
                  <strong>Guest Speaker Series</strong> - Talks from leaders and innovators
                </li>
              </ul>
              
              <div className="mt-3 mb-3">
                <Badge bg="primary" className="me-2">Self-Paced</Badge>
                <Badge bg="info">Beginner to Advanced</Badge>
              </div>
              
              <Button variant="outline-primary" size="sm">
                Browse Topics <FaArrowRight className="ms-1" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaPodcast className="me-2" /> Multimedia Resources
            </Card.Header>
            <Card.Body>
              <div className="resource-item mb-3">
                <h5><FaVideo className="me-2 text-primary" /> Video Library</h5>
                <p className="small">Over 5,000 educational videos on a wide range of subjects</p>
                <div className="d-flex mt-2 mb-2">
                  <Badge bg="secondary" className="me-2">On-Demand</Badge>
                  <Badge bg="success">Mobile-Friendly</Badge>
                </div>
                <Link to="/video-library" className="btn btn-sm btn-outline-primary">Browse Videos</Link>
              </div>
              
              <div className="resource-item mb-3">
                <h5><FaPodcast className="me-2 text-primary" /> Podcast Series</h5>
                <p className="small">Weekly episodes on innovation, technology, and business trends</p>
                <div className="d-flex mt-2 mb-2">
                  <Badge bg="secondary" className="me-2">Weekly Updates</Badge>
                  <Badge bg="success">Expert Interviews</Badge>
                </div>
                <Link to="/podcasts" className="btn btn-sm btn-outline-primary">Listen Now</Link>
              </div>
              
              <div className="resource-item">
                <h5><FaUserFriends className="me-2 text-primary" /> Community Forums</h5>
                <p className="small">Connect with peers and experts to discuss and share knowledge</p>
                <div className="d-flex mt-2 mb-2">
                  <Badge bg="secondary" className="me-2">Expert Moderated</Badge>
                  <Badge bg="success">Topic-Based</Badge>
                </div>
                <Link to="/community" className="btn btn-sm btn-outline-primary">Join Discussions</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              Upcoming Events & Workshops
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col lg={4} md={6}>
                  <div className="event-card p-3">
                    <div className="event-date mb-2">
                      <span className="day">15</span>
                      <span className="month">May</span>
                    </div>
                    <h5>Artificial Intelligence in Healthcare</h5>
                    <p className="small">
                      Explore how AI is transforming diagnosis, treatment, and patient care
                    </p>
                    <div className="event-details small">
                      <div><strong>Format:</strong> Virtual Workshop</div>
                      <div><strong>Duration:</strong> 2 hours</div>
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-2 w-100">
                      Register Now
                    </Button>
                  </div>
                </Col>
                
                <Col lg={4} md={6}>
                  <div className="event-card p-3">
                    <div className="event-date mb-2">
                      <span className="day">22</span>
                      <span className="month">May</span>
                    </div>
                    <h5>Sustainable Business Practices</h5>
                    <p className="small">
                      Learn strategies for implementing eco-friendly approaches in business operations
                    </p>
                    <div className="event-details small">
                      <div><strong>Format:</strong> In-Person Seminar</div>
                      <div><strong>Location:</strong> Accra Innovation Hub</div>
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-2 w-100">
                      Register Now
                    </Button>
                  </div>
                </Col>
                
                <Col lg={4} md={6}>
                  <div className="event-card p-3">
                    <div className="event-date mb-2">
                      <span className="day">10</span>
                      <span className="month">Jun</span>
                    </div>
                    <h5>Digital Marketing Masterclass</h5>
                    <p className="small">
                      Comprehensive overview of latest digital marketing strategies and tools
                    </p>
                    <div className="event-details small">
                      <div><strong>Format:</strong> Hybrid (In-Person & Virtual)</div>
                      <div><strong>Duration:</strong> Full Day</div>
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-2 w-100">
                      Register Now
                    </Button>
                  </div>
                </Col>
              </Row>
              
              <div className="text-center mt-3">
                <Link to="/events" className="btn btn-sm btn-primary">
                  View All Upcoming Events <FaArrowRight className="ms-1" />
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" className="rounded-pill me-2">
          Create Learning Plan <FaArrowRight className="ms-2" />
        </Button>
        <Button variant="outline-primary" className="rounded-pill">
          Community Membership
        </Button>
      </div>
    </div>
  );
};

export default LifelongLearning;