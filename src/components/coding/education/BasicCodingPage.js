import React, { useState, useEffect } from 'react';
// Import CSS first
import '../assets/BasicCodingPage.css';
// Then other imports
import { Container, Row, Col, Nav, Tab, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaPython, FaCode, FaArrowLeft, FaLaptopCode, FaBook, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScratchPlayground from '../ScratchPlayground';
import BasicCoding from '../BasicCoding';
import CodeEditor from '../CodeEditor';
import PythonPlayground from '../PythonPlayground';
import CodeExample from '../CodeExample';

const BasicCodingPage = () => {
  const [activeKey, setActiveKey] = useState('intro');
  const [pythonExamples, setPythonExamples] = useState([]);
  const [scratchProjects, setScratchProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load exercises from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Python examples
        const pythonResponse = await fetch('/data/coding/python-examples.json');
        if (!pythonResponse.ok) {
          throw new Error('Failed to fetch Python examples');
        }
        const pythonData = await pythonResponse.json();
        
        // Fetch Scratch examples
        const scratchResponse = await fetch('/data/coding/scratch-examples.json');
        if (!scratchResponse.ok) {
          throw new Error('Failed to fetch Scratch examples');
        }
        const scratchData = await scratchResponse.json();
        
        // Process Python examples
        if (pythonData && pythonData.exercises) {
          const examples = pythonData.exercises.slice(0, 5).map(ex => ({
            id: `python-${ex.id}`,
            title: ex.title,
            description: ex.description,
            code: ex.code,
            difficulty: ex.difficulty
          }));
          setPythonExamples(examples);
        }
        
        // Process Scratch examples
        if (scratchData && scratchData.exercises) {
          const projects = scratchData.exercises.slice(0, 4).map((ex, index) => ({
            id: `scratch-${index + 1}`,
            title: ex.title,
            description: ex.description,
            difficulty: ex.difficulty,
            image: `/images/coding/scratch-project-${index + 1}.png`,
            steps: ex.steps,
            link: ex.link
          }));
          setScratchProjects(projects);
        }
        
      } catch (err) {
        console.error("Error loading exercises:", err);
        setError("Could not load coding exercises. Please try again later.");
        
        // Fallback to hardcoded examples if JSON loading fails
        setPythonExamples([
          {
            id: 'hello-world',
            title: 'Hello World',
            description: 'Your first Python program!',
            code: 'print("Hello, Ghana!")',
            difficulty: 'Beginner'
          },
          {
            id: 'variables',
            title: 'Variables',
            description: 'Store and manipulate data',
            code: 'name = "Kofi"\nage = 12\nprint(f"Hello, my name is {name} and I am {age} years old.")',
            difficulty: 'Beginner'
          },
          {
            id: 'loops',
            title: 'Loops',
            description: 'Repeat actions multiple times',
            code: 'for i in range(5):\n    print(f"Count: {i}")',
            difficulty: 'Beginner'
          }
        ]);
        
        setScratchProjects([
          {
            id: 'simple-animation',
            title: 'Simple Animation',
            description: 'Make a character dance on screen',
            difficulty: 'Beginner',
            image: '/images/coding/scratch-dance.png'
          },
          {
            id: 'catch-game',
            title: 'Catch Game',
            description: 'Create a simple game to catch falling objects',
            difficulty: 'Intermediate',
            image: '/images/coding/scratch-game.png'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Container className="py-5 basic-coding-container">
      <Link to="/education" className="back-link d-inline-flex align-items-center mb-4">
        <FaArrowLeft className="me-2" /> Back to Education
      </Link>
      
      <div className="ghana-banner mb-5">
        <h1 className="text-center mb-0">Learn Basic Coding</h1>
        <div className="ghana-flag-colors"></div>
      </div>
      
      {error && (
        <Alert variant="warning" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Row className="mb-4">
        <Col lg={8} className="mx-auto">
          <p className="lead text-center">
            Start your coding journey with two beginner-friendly languages: Python and Scratch.
            These tools will help you build a strong foundation in programming logic and creative problem-solving.
          </p>
        </Col>
      </Row>
      
      <Tab.Container id="coding-tabs" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Row>
          <Col lg={3} md={4}>
            <div className="coding-sidebar mb-4">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="intro" className="d-flex align-items-center">
                    <FaBook className="me-2" /> Introduction
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="python" className="d-flex align-items-center">
                    <FaPython className="me-2" /> Python
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="scratch" className="d-flex align-items-center">
                    <FaLaptopCode className="me-2" /> Scratch
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="playground" className="d-flex align-items-center">
                    <FaCode className="me-2" /> Code Playground
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="learn" className="d-flex align-items-center">
                    <FaChalkboardTeacher className="me-2" /> Learning Path
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="projects" className="d-flex align-items-center">
                    <FaGraduationCap className="me-2" /> Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          
          <Col lg={9} md={8}>
            <Tab.Content>
              {/* Intro tab content remains the same */}
              <Tab.Pane eventKey="intro">
                {/* Your existing intro tab content */}
                <div className="coding-intro p-4 rounded shadow-sm">
                  {/* Content remains the same */}
                  {/* ... */}
                </div>
              </Tab.Pane>
              
              {/* Python tab with dynamic examples from JSON */}
              <Tab.Pane eventKey="python">
                <div className="coding-section p-4 rounded shadow-sm">
                  <h2><FaPython className="me-2" />Learn Python</h2>
                  <p className="lead">
                    Python is a versatile, readable programming language used by beginners and professionals alike.
                  </p>
                  
                  <div className="py-section mb-4">
                    <h3>Getting Started with Python</h3>
                    <p>
                      Let's begin with some simple examples you can try right in your browser!
                    </p>
                    
                    {loading ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2">Loading Python examples...</p>
                      </div>
                    ) : (
                      pythonExamples.map(example => (
                        <div key={example.id} className="code-example-card mb-4">
                          <h4>{example.title}</h4>
                          <p>{example.description}</p>
                          <CodeExample 
                            code={example.code} 
                            language="python"
                          />
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="badge bg-info">{example.difficulty}</span>
                            <Button size="sm" variant="outline-primary">
                              Try it yourself
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                    
                    <div className="text-center mt-4">
                      <Button 
                        variant="outline-secondary" 
                        as={Link} 
                        to="/python-exercises"
                      >
                        View More Python Exercises
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center mt-5">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => setActiveKey('playground')}
                    >
                      Open Python Playground
                    </Button>
                  </div>
                </div>
              </Tab.Pane>
              
              {/* Scratch tab with improved structure */}
              <Tab.Pane eventKey="scratch" className="fade-in">
                <div className="coding-section scratch-section">
                  <div className="section-header mb-4">
                    <h2>
                      <FaLaptopCode className="me-2" />
                      Learn Scratch
                    </h2>
                    <div className="ghana-accent-line"></div>
                    <p className="lead">
                      Scratch is a block-based visual programming language that makes coding fun and accessible for beginners.
                    </p>
                  </div>
                  
                  <Row className="mb-5 align-items-stretch">
                    <Col lg={6}>
                      <div className="scratch-info">
                        <h3>Why Scratch?</h3>
                        <ul className="feature-list">
                          <li><strong>Visual blocks</strong> - No syntax errors or typing frustration</li>
                          <li><strong>Immediate feedback</strong> - See your code run in real-time</li>
                          <li><strong>Creative expression</strong> - Make stories, games, and animations</li>
                          <li><strong>Share your creations</strong> with a global community</li>
                          <li><strong>Perfect for beginners</strong> - Learn programming concepts easily</li>
                        </ul>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="scratch-preview text-center">
                        <img 
                          src="/images/coding/scratch-interface.png" 
                          alt="Scratch Interface" 
                          className="img-fluid rounded mb-3"
                          loading="lazy" 
                        />
                        <p className="image-caption">The Scratch programming interface</p>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="section-divider">
                    <div className="divider-line"></div>
                    <div className="divider-icon">
                      <img src="/images/adinkra/gye-nyame.png" alt="Gye Nyame Symbol" width="30" />
                    </div>
                    <div className="divider-line"></div>
                  </div>
                  
                  <div className="projects-section my-4">
                    <h3 className="mb-4">Starter Projects</h3>
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="ghana-spinner">
                          <div className="spinner-section red"></div>
                          <div className="spinner-section yellow"></div>
                          <div className="spinner-section green"></div>
                        </div>
                        <p className="mt-3">Loading Scratch projects...</p>
                      </div>
                    ) : (
                      <Row className="scratch-projects">
                        {scratchProjects.map(project => (
                          <Col md={6} key={project.id} className="mb-4">
                            <Card className="h-100 project-card">
                              <div className="card-img-container">
                                <Card.Img 
                                  variant="top" 
                                  src={project.image} 
                                  alt={project.title}
                                  loading="lazy"
                                />
                                <div className="difficulty-badge">
                                  <span className={`badge ${project.difficulty === 'Beginner' ? 'bg-success' : 'bg-warning'}`}>
                                    {project.difficulty}
                                  </span>
                                </div>
                              </div>
                              <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                
                                {project.steps && (
                                  <div className="steps-container">
                                    <h6>Quick Steps:</h6>
                                    <ol className="steps-list">
                                      {project.steps.slice(0, 3).map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                      ))}
                                      {project.steps.length > 3 && (
                                        <li className="more-steps">...and more</li>
                                      )}
                                    </ol>
                                  </div>
                                )}
                              </Card.Body>
                              <Card.Footer className="bg-white border-0">
                                <Button 
                                  variant="outline-primary" 
                                  className="w-100" 
                                  href={project.link} 
                                  target="_blank"
                                >
                                  Open Project <i className="fas fa-external-link-alt ms-1"></i>
                                </Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </div>
                  
                  <div className="cta-container mt-5 text-center">
                    <Row className="justify-content-center">
                      <Col md={6}>
                        <Button 
                          variant="outline-secondary" 
                          as={Link} 
                          to="/scratch-exercises"
                          className="me-3 mb-3 mb-md-0"
                        >
                          View All Projects
                        </Button>
                        
                        <Button 
                          variant="warning" 
                          size="lg"
                          onClick={() => setActiveKey('playground')}
                          className="main-cta"
                        >
                          <FaLaptopCode className="me-2" />
                          Open Scratch Editor
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Tab.Pane>
              
              {/* Code Playground Tab */}
              <Tab.Pane eventKey="playground" className="fade-in">
                <div className="coding-section playground-section">
                  <div className="section-header mb-4">
                    <h2>
                      <FaCode className="me-2" />
                      Code Playground
                    </h2>
                    <div className="ghana-accent-line"></div>
                    <p className="lead">
                      Put your coding skills into practice with our interactive Python and Scratch environments.
                    </p>
                  </div>
                  
                  <Tab.Container defaultActiveKey="python-playground">
                    <Row className="mb-4">
                      <Col>
                        <Nav variant="pills" className="playground-nav">
                          <Nav.Item>
                            <Nav.Link eventKey="python-playground" className="d-flex align-items-center">
                              <FaPython className="me-2" /> Python Editor
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="scratch-playground" className="d-flex align-items-center">
                              <FaLaptopCode className="me-2" /> Scratch Editor
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey="python-playground">
                            <div className="playground-wrapper">
                              <PythonPlayground />
                            </div>
                          </Tab.Pane>
                          
                          <Tab.Pane eventKey="scratch-playground">
                            <div className="playground-wrapper">
                              <ScratchPlayground />
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </Tab.Pane>
              
              {/* Other tabs remain the same */}
              {/* ... */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default BasicCodingPage;