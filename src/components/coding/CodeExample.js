import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Inline SVG Components
const PythonLogo = () => (
  <svg width="30" height="30" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg" className="me-2">
    <defs>
      <linearGradient x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%" id="a">
        <stop stopColor="#387EB8" offset="0%"/>
        <stop stopColor="#366994" offset="100%"/>
      </linearGradient>
      <linearGradient x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%" id="b">
        <stop stopColor="#FFE052" offset="0%"/>
        <stop stopColor="#FFC331" offset="100%"/>
      </linearGradient>
    </defs>
    <path d="M126.916 0c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S0 61.317 0 126.771c0 65.455 36.21 63.105 36.21 63.105h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67 0 126.916 0zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#a)"/>
    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.631 4.672 41.631-60.781c0-65.455-36.21-63.105-36.21-63.105h-21.61v30.356s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.974 62.366 33.974zm34.114-19.661a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#b)"/>
  </svg>
);

const ScratchLogo = () => (
  <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="me-2">
    <rect width="512" height="512" rx="50" fill="#F9A83A"/>
    <g fill="#FFFFFF">
      <circle cx="157" cy="175" r="35"/>
      <circle cx="355" cy="175" r="35"/>
      <path d="M360 280c0 55-47 100-104 100s-104-45-104-100h208z"/>
    </g>
  </svg>
);

const CodeExample = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Coding Examples</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <PythonLogo />
              Python Example
            </Card.Header>
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
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="bg-warning text-white">
              <ScratchLogo />
              Scratch Example
            </Card.Header>
            <Card.Body>
              <pre>
                <code>
                  {`when green flag clicked
say "Hello, World!" for 2 seconds`}
                </code>
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeExample;