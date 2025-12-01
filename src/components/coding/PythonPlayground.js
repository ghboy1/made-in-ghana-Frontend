import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert, Spinner } from 'react-bootstrap';
import { FaPython, FaPlay, FaUndo, FaCode, FaDownload, FaLightbulb } from 'react-icons/fa';
import './assets/PythonPlayground.css';

const PythonPlayground = () => {
  const [code, setCode] = useState('# Write your Python code here\n\nprint("Hello, Ghana!")\n\n# Try changing the message above\n# Then click "Run Code" to see what happens!');
  const [output, setOutput] = useState('');
  const [activeExample, setActiveExample] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [examples, setExamples] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await fetch('/data/coding/python-examples.json');
        if (!response.ok) {
          throw new Error('Failed to fetch examples');
        }
        const data = await response.json();
        setExamples(data.exercises || []);
      } catch (err) {
        console.error('Error fetching examples:', err);
        setError('Could not load example code. Please try again later.');
        setExamples([
          {
            id: 1,
            title: "Hello World",
            description: "Your first Python program!",
            code: 'print("Hello, Ghana!")',
            difficulty: "Beginner"
          },
          {
            id: 2,
            title: "Variables",
            description: "Store and manipulate data",
            code: 'name = "Kofi"\nage = 12\nprint(f"Hello, my name is {name} and I am {age} years old.")',
            difficulty: "Beginner"
          }
        ]);
      }
    };
    
    fetchExamples();
  }, []);

  const runCode = () => {
    setIsLoading(true);
    setOutput('');
    
    // This is a simple simulation - in a real app, you'd send to a backend
    setTimeout(() => {
      try {
        // Basic simulation of Python output for educational purposes
        let simulatedOutput = '';
        const lines = code.split('\n');
        
        for (const line of lines) {
          if (line.trim().startsWith('print(')) {
            // Extract the content inside print()
            const match = line.match(/print\s*\((.*)\)/);
            if (match && match[1]) {
              let content = match[1].trim();
              
              // Handle string literals
              if ((content.startsWith('"') && content.endsWith('"')) || 
                  (content.startsWith("'") && content.endsWith("'"))) {
                content = content.substring(1, content.length - 1);
              }
              
              // Handle f-strings (very basic simulation)
              if (content.startsWith('f"') || content.startsWith("f'")) {
                content = content.substring(2, content.length - 1);
                // Replace {var} with actual values - extremely simplified!
                content = content.replace(/{name}/g, 'Kofi').replace(/{age}/g, '12');
              }
              
              simulatedOutput += content + '\n';
            }
          }
        }
        
        setOutput(simulatedOutput || "No output to display");
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const loadExample = (example) => {
    setCode(example.code);
    setActiveExample(example.id);
    setOutput('');
  };

  const resetCode = () => {
    setCode('# Write your Python code here\n\nprint("Hello, Ghana!")\n\n# Try changing the message above\n# Then click "Run Code" to see what happens!');
    setActiveExample(null);
    setOutput('');
  };

  return (
    <Container className="python-playground py-4">
      <Row className="mb-4">
        <Col>
          <div className="playground-header">
            <FaPython className="icon me-2" />
            <h2>Python Playground</h2>
          </div>
          <p className="lead">
            This is a simple Python code editor where you can try out basic Python commands.
            Write your code, click "Run", and see the output below!
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="code-editor-card mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <FaCode className="me-2" /> Code Editor
                </div>
                <div>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="me-2"
                    onClick={resetCode}
                  >
                    <FaUndo className="me-1" /> Reset
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={runCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner 
                          as="span" 
                          animation="border" 
                          size="sm" 
                          role="status" 
                          aria-hidden="true" 
                        />
                        <span className="ms-1">Running...</span>
                      </>
                    ) : (
                      <>
                        <FaPlay className="me-1" /> Run Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                style={{ fontFamily: 'monospace' }}
              />
            </Card.Body>
          </Card>

          <Card className="output-card">
            <Card.Header>
              <div className="d-flex align-items-center">
                <span className="me-2">Output</span>
                {isLoading && (
                  <Spinner animation="border" size="sm" />
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <pre className="output-display">
                {output || "Your code output will appear here..."}
              </pre>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="examples-card">
            <Card.Header>
              <FaLightbulb className="me-2" /> Example Programs
            </Card.Header>
            <Card.Body>
              {error ? (
                <Alert variant="warning">{error}</Alert>
              ) : (
                <div className="examples-list">
                  {examples.map(example => (
                    <div 
                      key={example.id} 
                      className={`example-item ${activeExample === example.id ? 'active' : ''}`}
                      onClick={() => loadExample(example)}
                    >
                      <div className="example-title">{example.title}</div>
                      <div className="example-description">{example.description}</div>
                      <span className={`example-badge ${example.difficulty === 'Beginner' ? 'beginner' : 'intermediate'}`}>
                        {example.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-4 help-card">
            <Card.Header>Quick Help</Card.Header>
            <Card.Body>
              <h5>Basic Python Commands:</h5>
              <ul className="help-list">
                <li><code>print("text")</code> - Display text</li>
                <li><code>x = 5</code> - Create a variable</li>
                <li><code>if condition:</code> - Make decisions</li>
                <li><code>for i in range(5):</code> - Repeat actions</li>
              </ul>
              <div className="mt-3">
                <a href="https://www.python.org/about/gettingstarted/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
                  Learn More Python
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PythonPlayground;