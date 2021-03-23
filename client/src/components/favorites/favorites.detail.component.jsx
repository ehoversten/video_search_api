import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Favorite from './favorite.component';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function FavoriteDetail({ match }) {
  const [currentVideo, setCurrentVideo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getVideo();
  }, []);

  function onClickHandler() {
    // history.goBack();
  }

  const getVideo = async () => {
    console.log(`Match: ${match.params.id}`);
    let favs = await axios.get('/favorites');
    console.log(favs.data);
    let vid = favs.data.filter(vid => vid.video_id === match.params.id )
    console.log(vid);
    setCurrentVideo(...vid);
  };

  console.log(currentVideo);
  return (
    <Row className='justify-content-center '>
      <Col md={12} lg={8} className='my-3'>
        <Card style={{ width: '100%' }}>
          <Card.Body>
            {currentVideo ? (
              <>
                <iframe
                  title={currentVideo.video_title}
                  width='100%'
                  height='400px'
                  src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <Card.Title>
                  Video Title: {currentVideo.video_title}
                </Card.Title>
                <Card.Text>
                  <p>Video by: {currentVideo.video_channel}</p>
                  <p className='mt-2'>{currentVideo.video_description}</p>
                </Card.Text>
                <Button
                  variant='secondary'
                  className='d-block ml-auto'
                  onClick={onClickHandler}
                >
                  Remove
                </Button>
                <Favorite video={currentVideo}/>{' '}
              </>
            ) : (
              <>
                <Card.Title>Video Title: None</Card.Title>
                <Card.Text>
                  <p>Video by: XXX</p>
                </Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FavoriteDetail;
