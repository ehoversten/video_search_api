import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResultContext from '../../contexts/search-result.context';
import AuthContext from '../../contexts/authContext';

import Favorite from '../favorites/favorite.component';

// Bootstrap
import { Row, Col, Card, Button } from 'react-bootstrap';
// css
import classes from './detail.module.css';

function Detail(props) {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  //search results context
  const { searchResults } = useContext(SearchResultContext);

  //favorites context
  const [currentVideo, setCurrentVideo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getVideo();
  }, []);

  function onClickHandler() {
    history.goBack();
  }

  const getVideo = async () => {
    if (Object.keys(props.location.search).length) {
      let videoObj = {};
      const params = new URLSearchParams(props.location.search);
      for (const [key, value] of params) {
        videoObj[key] = value;
      }
      setCurrentVideo(videoObj);
    }
  };

  const detailsDisplay = currentVideo ? (
    <Row className='justify-content-center video-detail '>
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
                <Card.Title className={classes.detailTitle}>
                  Video Title: {currentVideo.video_title}
                  {loggedIn ? (
                    <Favorite
                      video={currentVideo}
                      className={classes.saveIcon}
                      videoId='1'
                    />
                  ) : null}{' '}
                </Card.Title>
                <Card.Text>Video by: {currentVideo.video_channel}</Card.Text>
                <Card.Text className='mt-2'>
                  {currentVideo.video_description}
                </Card.Text>
                <Button
                  variant='secondary'
                  className='d-block ml-auto'
                  onClick={onClickHandler}
                >
                  Go back
                </Button>
              </>
            ) : (
              <>
                <Card.Title className={classes.detailTitle}>
                  Video Title: None
                </Card.Title>
                <Card.Text>
                  <p>Video by: XXX</p>
                </Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ) : (
    <Row className='justify-content-center video-detail '>
      <Col md={12} lg={8} className='my-3'>
        <h4>Unable to display video</h4>
      </Col>
    </Row>
  );

  return <>{detailsDisplay}</>;
}

export default Detail;
