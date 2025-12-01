import React from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaLightbulb, FaBookOpen, FaQuestion, FaDownload } from 'react-icons/fa';
import '../coding/assets/CodePlayground.css';

const ScratchPlayground = () => {
  const projects = [
    {
      id: 'dance-party',
      name: 'Dance Party',
      level: 'Beginner',
      description: 'Make sprites dance to a beat by programming sequences of movements.',
      image: '/images/scratch-dance.jpg',
      fallbackImage: 'https://via.placeholder.com/300x200?text=Dance+Party+Project'
    },
    {
      id: 'chase-game',
      name: 'Chase Game',
      level: 'Beginner',
      description: 'Create a simple game where one sprite chases another controlled by the user.',
      image: '/images/scratch-chase.jpg',
      fallbackImage: 'https://via.placeholder.com/300x200?text=Chase+Game+Project'
    },
    {
      id: 'story',
      name: 'Interactive Story',
      level: 'Intermediate',
      description: 'Build a story where characters interact and respond to user choices.',
      image: '/images/scratch-story.jpg',
      fallbackImage: 'https://via.placeholder.com/300x200?text=Interactive+Story'
    },
    {
      id: 'quiz',
      name: 'Ghana Quiz',
      level: 'Intermediate',
      description: 'Create a quiz game about Ghana with scoring and feedback.',
      image: '/images/scratch-quiz.jpg',
      fallbackImage: 'https://via.placeholder.com/300x200?text=Ghana+Quiz'
    }
  ];

  const tutorials = [
    {
      id: 'getting-started',
      title: 'Getting Started with Scratch',
      description: 'Learn the basics of the Scratch interface.',
      duration: '10 minutes'
    },
    {
      id: 'animation',
      title: 'Making Simple Animations',
      description: 'Create your first animated character.',
      duration: '15 minutes'
    },
    {
      id: 'events',
      title: 'Events and Interactions',
      description: 'Make sprites respond to clicks and key presses.',
      duration: '12 minutes'
    },
    {
      id: 'variables',
      title: 'Using Variables',
      description: 'Keep score and track information in your projects.',
      duration: '20 minutes'
    }
  ];

  return (
    <div className="code-playground scratch-playground">
      <div className="playground-header scratch-header">
        <Container>
          <Link to="/basic-coding" className="back-link">
            <FaArrowLeft /> Back to Learning
          </Link>
          <h1>Scratch Playground</h1>
          <p>Create animations, stories, and games with blocks - no typing required!</p>
        </Container>
      </div>

      <Container className="py-4">
        <Alert variant="warning" className="mb-4">
          <div className="d-flex align-items-center">
            <FaLightbulb className="me-3 fs-3" />
            <div>
              <strong>Scratch is web-based!</strong> The best way to use Scratch is directly on the <a href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer" className="alert-link">official Scratch website</a>. This page helps you get started with project ideas and tutorials.
            </div>
          </div>
        </Alert>

        <Row className="mb-4">
          <Col md={8}>
            <Card className="embedded-scratch">
              <Card.Header>
                <h4 className="mb-0">Scratch Editor Preview</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe 
                    src="https://scratch.mit.edu/projects/editor/?tutorial=getStarted" 
                    title="Scratch Editor"
                    className="embed-responsive-item scratch-frame"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant="warning" className="me-2" as="a" href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="me-2" /> Open Full Scratch Editor
                </Button>
                <Button variant="outline-secondary" as="a" href="https://scratch.mit.edu/download" target="_blank" rel="noopener noreferrer">
                  <FaDownload className="me-2" /> Download Offline Editor
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100">
              <Card.Header>
                <h4 className="mb-0">Quick Start Guide</h4>
              </Card.Header>
              <Card.Body>
                <div className="getting-started-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div>Create a free account on <a href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer">Scratch.mit.edu</a></div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">2</div>
                    <div>Click "Create" to start a new project</div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">3</div>
                    <div>Drag blocks from the left panel to the scripts area</div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">4</div>
                    <div>Click the green flag to run your project</div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">5</div>
                    <div>Save your work by clicking "File" then "Save now"</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">Starter Project Ideas</h4>
              </Card.Header>
              <Card.Body>
                <Row className="g-4">
                  {projects.map(project => (
                    <Col md={6} key={project.id}>
                      <Card className="project-card h-100">
                        <div className="project-image">
                          <img 
                            src={project.image}
                            alt={project.name}
                            onError={(e) => {
                              e.target.src = project.fallbackImage;
                            }}
                          />
                          <span className={`level-badge level-${project.level.toLowerCase()}`}>
                            {project.level}
                          </span>
                        </div>
                        <Card.Body>
                          <h5>{project.name}</h5>
                          <p>{project.description}</p>
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            as="a"
                            href={`https://scratch.mit.edu/projects/editor/?tutorial=${project.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Try This Project
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <h4 className="mb-0">Ghana-Themed Project Challenge</h4>
              </Card.Header>
              <Card.Body>
                <div className="challenge-box">
                  <h5>Can you create a project about Ghana?</h5>
                  <p>Choose one of these topics for your Scratch project:</p>
                  
                  <Row className="g-3 mb-4">
                    <Col sm={6} md={3}>
                      <div className="topic-card">
                        <div className="topic-icon">🏛️</div>
                        <div className="topic-name">Ghana Landmarks</div>
                      </div>
                    </Col>
                    <Col sm={6} md={3}>
                      <div className="topic-card">
                        <div className="topic-icon">🎭</div>
                        <div className="topic-name">Traditional Stories</div>
                      </div>
                    </Col>
                    <Col sm={6} md={3}>
                      <div className="topic-card">
                        <div className="topic-icon">🍲</div>
                        <div className="topic-name">Ghanaian Cuisine</div>
                      </div>
                    </Col>
                    <Col sm={6} md={3}>
                      <div className="topic-card">
                        <div className="topic-icon">🥁</div>
                        <div className="topic-name">Music & Dance</div>
                      </div>
                    </Col>
                  </Row>
                  
                  <p>Share your completed project on the Ghana Young Coders community page!</p>
                  <Button variant="warning">Submit Your Project</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Video Tutorials</h4>
                <FaBookOpen />
              </Card.Header>
              <ListGroup variant="flush">
                {tutorials.map(tutorial => (
                  <ListGroup.Item key={tutorial.id} className="tutorial-item">
                    <div className="tutorial-info">
                      <h5>{tutorial.title}</h5>
                      <p className="mb-0">{tutorial.description}</p>
                      <span className="tutorial-duration">{tutorial.duration}</span>
                    </div>
                    <Button variant="outline-primary" size="sm">Watch</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
            
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Help & Resources</h4>
                <FaQuestion />
              </Card.Header>
              <Card.Body>
                <div className="resource-item">
                  <h5>Scratch Cards</h5>
                  <p>Printable cards with quick tutorials for different features</p>
                  <Button variant="link" className="p-0" as="a" href="https://resources.scratch.mit.edu/www/cards/en/scratch-cards-all.pdf" target="_blank" rel="noopener noreferrer">
                    Download PDF
                  </Button>
                </div>
                
                <div className="resource-item">
                  <h5>Scratch Wiki</h5>
                  <p>Community-maintained documentation for all Scratch features</p>
                  <Button variant="link" className="p-0" as="a" href="https://en.scratch-wiki.info/" target="_blank" rel="noopener noreferrer">
                    Visit Wiki
                  </Button>
                </div>
                
                <div className="resource-item">
                  <h5>Scratch Forum</h5>
                  <p>Get help from the global Scratch community</p>
                  <Button variant="link" className="p-0" as="a" href="https://scratch.mit.edu/discuss" target="_blank" rel="noopener noreferrer">
                    Visit Forums
                  </Button>
                </div>
                
                <div className="resource-item mb-0">
                  <h5>Educator Resources</h5>
                  <p>Materials for teachers and parents</p>
                  <Button variant="link" className="p-0" as="a" href="https://scratch.mit.edu/educators" target="_blank" rel="noopener noreferrer">
                    Educator Guide
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ScratchPlayground;