import React from 'react';
import { Container, Row, Column, Button, Card } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <Container>
      <Row className="justify-content-center">
          <Card className="text-center m-5">
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>Welcome to your YouTube favorite video search!</Card.Title>
              <Card.Text>
                Head on over to the Sign Up page and get started with an account today! Then you can bookmark all your YouTube favorites in one place. 
              </Card.Text>
              <Card.Text>
                Not sure yet? Try a search first and see what you find. Join when you're ready.
              </Card.Text>
              <NavLink to="/signup">
                <Button variant="primary mr-3">Get Started</Button>
              </NavLink>
              <NavLink to="/search">
                <Button variant="success">Try a Search</Button>
              </NavLink>
            </Card.Body>
            <Card.Footer className="text-muted">Built by <a href="https://github.com/Exia01">Jose Gonzalez</a> and <a href="https://github.com/ehoversten">Erik Hoversten</a></Card.Footer>
          </Card>
      </Row>
    </Container>
  );
}
