import React from 'react';

import classes from './result-preview.module.css';
// Bootstrap Styles
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function ResultPreview({ video }) {
  const {
    title,
    description,
    thumbnails,
    channelTitle,
    publishTime,
  } = video.snippet;
  let id = video.id.videoId;
  
  return (
    <Col xs={12} md={6} lg={4} className={classes.cardContainer}>
      <Card className='h-100'>
        <Card.Img
          variant='top'
          src={thumbnails.medium.url}
          className={classes.cardImg}
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          {/* search: A string representation of query parameters. hash: A hash to
          put in the URL, e.g. #a-hash. state: State to persist to the location. */}
          <Link
            to={{
              pathname: `/search/${id}`,
              search: '?sort=name',
            }}
            className='btn btn-primary btn-block mt-auto'
          >
            View Video{' '}
          </Link>
        
        </Card.Body>
      </Card>
    </Col>
  );
}
