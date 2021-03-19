import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VideoContext from '../../contexts/videoContext';
import { useHistory } from 'react-router-dom';

function Detail({ match }) {
  const { videos } = useContext(VideoContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getVideo();
  }, []);

  function onClickHandler() {
    history.goBack();
  }

  const getVideo = async () => {
    console.log(`Match: ${match.params.id}`);
    let vid = videos.filter((video) => video.id.videoId === match.params.id);
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
                  title={currentVideo.snippet.title}
                  width='100%'
                  height='400px'
                  src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <Card.Title>
                  Video Title: {currentVideo.snippet.title}
                </Card.Title>
                <Card.Text>
                  <p>Video by: {currentVideo.snippet.channelTitle}</p>
                  <p className='mt-2'>{currentVideo.snippet.description}</p>
                </Card.Text>
                <Button
                  variant='secondary'
                  className='d-block ml-auto'
                  onClick={onClickHandler}
                >
                  Go back
                </Button>{' '}
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

export default Detail;
