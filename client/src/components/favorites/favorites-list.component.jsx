import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Bootstrap Styles
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import FavoritePreview from './favorites-preview.component';

export default function FavoritesList() {

    const [current, setCurrent] = useState([]);

    useEffect(() => {
        axios
            .get('/favorites/')
            .then(res => {
                console.log(res.data);
                setCurrent(res.data);
            })
            .catch(err => console.log(err));

    }, []); 


    return (
        <Row>
            {current.length > 0 ? (
                <Col xs={10} md={8} lg={12} className='mt-3 mb-2'>
                <h3>Favorites List</h3>
                </Col>
            ) : null}

            {current.length > 0 ? (
                current.map((video) => (
                <FavoritePreview video={video} key={video.video_id} />
                ))
            ) : (
                <Col xs={10} md={8} lg={12} className='mt-3'>
                <h3>No Results</h3>
                </Col>
            )}
        </Row>
    )
}
