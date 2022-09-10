import React from 'react';
import {Container, Row, Card} from 'react-bootstrap';

const Loading = ({loadingMessage=''}) => {
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>Loading {loadingMessage}</Card.Title>
            <Card.Text>Please wait...</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Loading;
