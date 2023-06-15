import React from 'react';

import classes from './result-preview.module.css';
// Bootstrap Styles
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function ResultPreview({ video }) {
  const {
    title,
    description,
    thumbnails,
    channelTitle,
    publishTime,
  } = video.snippet;
  let video_url = video.id.videoId;
  let video_img = video.snippet.thumbnails.high.url;

  const queryParam = `?video_title=${title}&video_channel=${channelTitle}&video_description=${description}&video_id=${video_url}&video_url=${video_url}&video_published=${publishTime}&video_img=${video_img}`;

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
          <Link
            to={{
              pathname: `/search/${video_url}`,
              search: queryParam,
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

// SearchParams:
// https://stackoverflow.com/questions/29852998/getting-query-parameters-from-react-router-hash-fragment
//How to use query strings: https://tylermcginnis.com/react-router-query-strings/
//dictionaries:https://macwright.org/2017/03/13/maps-not-strictly-better.html
