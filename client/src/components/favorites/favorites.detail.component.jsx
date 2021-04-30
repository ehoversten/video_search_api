import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import Favorite from './favorite.component';
import axios from 'axios';
import { useHistory } from 'react-router';

function FavoriteDetail({ match }) {
  const [currentVideo, setCurrentVideo] = useState(null);
  let history = useHistory();

  useEffect(() => {
    getVideo();
  }, []);

  async function onClickHandler() {
    try {
      let res = await axios.delete(`/favorites/${currentVideo._id}`);
      console.log(res);
      history.push('/favorites');
    } catch (err) {
      console.log('error!', err);
    }
  }

  const getVideo = async () => {
    let id = match.params.id;
    let res = await axios.get(`/favorites/${id}`);
    // let vid = favs.data.filter((vid) => vid.video_id === match.params.id);
    setCurrentVideo(res.data.favorite);
  };

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
                <Card.Title>Video Title: {currentVideo.video_title}</Card.Title>
                <Card.Text>Video by: {currentVideo.video_channel}</Card.Text>
                <Card.Text className='mt-2'>
                  {currentVideo.video_description}
                </Card.Text>
                <Button
                  variant='secondary'
                  className='d-block ml-auto'
                  onClick={onClickHandler}
                >
                  Remove
                </Button>
                {/* <Favorite video={currentVideo} />{' '} */}
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
