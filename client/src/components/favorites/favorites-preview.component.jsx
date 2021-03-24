import React from 'react';

// import classes from './result-preview.module.css';
// Bootstrap Styles
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function FavoritePreview({ video }) {
  const {
    video_title,
    video_description,
    video_img,
    video_channel,
    video_url
  } = video;
  let id = video._id;
  return (
    <Col xs={12} md={6} lg={4} className="">
      <Card className='h-100'>
        <Card.Img
          variant='top'
          src={video_img}
          className=""
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{video_title}</Card.Title>
          <Card.Text>{video_description}</Card.Text>
          <Link
            to={{
              pathname: `/favorites/${id}`,
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
