import React from 'react';
import { Container, Row, Column, Button, Card } from 'react-bootstrap';

export default function Homepage() {
  return (
    <Container>
      <Row className="justify-content-center">
          <Card className="text-center m-5">
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>Welcome to your YouTube favorite video search!</Card.Title>
              <Card.Text>
                Head on over to the Sign Up page and get started 
              </Card.Text>
              <Button variant="primary mr-3">Get Started</Button>
              <Button variant="success">Try a Search</Button>
            </Card.Body>
            <Card.Footer className="text-muted">Built by @Exia and @Ehoversten</Card.Footer>
          </Card>
      </Row>
    </Container>
  );
}
