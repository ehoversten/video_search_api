import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import VideoContext from '../../contexts/videoContext';

function Detail({ match }) {

    const { videos } = useContext(VideoContext);
    const [currentVideo, setCurrentVideo] = useState({});

    useEffect(() => {
        getVideo();
    }, [])
    
    const getVideo = async () => {
        console.log(`Match: ${match.params.id}`);
        let vid = videos.filter(video => video.id.videoId === match.params.id)
        console.log(vid);

        setCurrentVideo(vid);
    }

    return (
        <Container >
            <Row >
                <Col md={12} className="justify-content-center my-3">
                    <Card style={{ width: '100%' }}>
                    <Card.Body>
                        { currentVideo[0] ? (
                            <>
                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVideo[0].id.videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <Card.Title>Video Title: {currentVideo[0].snippet.title}</Card.Title>
                            <Card.Text>
                                <p>Video by: {currentVideo[0].snippet.channelTitle}</p>
                            </Card.Text>
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
        </Container>
    )
}


export default Detail;