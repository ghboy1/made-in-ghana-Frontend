import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import pythonLogo from '../../assets/python-logo.svg';

const PythonSection = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4">
            <img src={pythonLogo} alt="Python Logo" className="me-2" style={{ width: '50px' }} />
            Introduction to Python Programming
          </h2>
          <p className="lead text-center">
            Python is a versatile programming language that is easy to learn and widely used in various fields, including web development, data analysis, artificial intelligence, and more.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">Basic Concepts</Card.Header>
            <Card.Body>
              <ul>
                <li>Variables and Data Types</li>
                <li>Control Structures (if statements, loops)</li>
                <li>Functions and Modules</li>
                <li>Lists, Tuples, and Dictionaries</li>
                <li>File Handling</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">Getting Started with Python</Card.Header>
            <Card.Body>
              <p>To start coding in Python, you can use various IDEs and text editors. Here are some popular options:</p>
              <ul>
                <li>PyCharm</li>
                <li>Visual Studio Code</li>
                <li>Jupyter Notebook</li>
                <li>Online platforms like Replit or Google Colab</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">Example Code</Card.Header>
            <Card.Body>
              <pre>
                <code>
                  {`# Simple Python Program
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`}
                </code>
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PythonSection;