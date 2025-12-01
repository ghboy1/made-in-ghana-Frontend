import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaLaptopCode } from 'react-icons/fa';

const ScratchSection = () => {
  const [scratchExamples, setScratchExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await fetch('/data/coding/scratch-examples.json');
        if (!response.ok) {
          throw new Error('Failed to fetch scratch examples');
        }
        const data = await response.json();
        setScratchExamples(data.exercises || []);
      } catch (err) {
        console.error('Error fetching scratch examples:', err);
        setError('Could not load Scratch examples. Please try again later.');
        // Fallback examples in case of error
        setScratchExamples([
          {
            id: 1,
            title: "Simple Animation",
            description: "Make a character dance on screen",
            difficulty: "Beginner",
            link: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted"
          },
          {
            id: 2,
            title: "Catch Game",
            description: "Create a simple game to catch falling objects",
            difficulty: "Intermediate",
            link: "https://scratch.mit.edu/projects/editor/"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="mb-3">
            <FaLaptopCode className="me-2" />
            Introduction to Scratch
          </h2>
          <p className="lead">
            Scratch is a visual programming language that allows users to create interactive stories, games, and animations using blocks. It is designed for beginners and is especially popular among children.
          </p>
          <p>
            In Scratch, you can drag and drop code blocks to create scripts that control the behavior of characters (sprites) and other elements in your project. This makes it easy to learn programming concepts without worrying about syntax.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <h3 className="mt-4">Getting Started with Scratch</h3>
          <p>
            To start coding in Scratch, follow these steps:
          </p>
          <ul>
            <li>Visit the <a href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer">Scratch website</a>.</li>
            <li>Create a free account to save your projects.</li>
            <li>Explore the Scratch interface, including the stage, sprite list, and blocks palette.</li>
            <li>Start a new project and experiment with different blocks to see how they work.</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="mt-4">Scratch Code Examples</h3>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="warning" />
              <p className="mt-2">Loading Scratch examples...</p>
            </div>
          ) : error ? (
            <div className="alert alert-warning">{error}</div>
          ) : (
            scratchExamples.map((example, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{example.title}</Card.Title>
                  <Card.Text>{example.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning">{example.difficulty}</span>
                    <Card.Link href={example.link} target="_blank">View Example</Card.Link>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ScratchSection;