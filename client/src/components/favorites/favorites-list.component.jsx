import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import axios from 'axios';

// Bootstrap Styles
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import FavoritePreview from './favorites-preview.component';

export default function FavoritesList() {

    const { loggedIn } = useContext(AuthContext);
    const [current, setCurrent] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axios
            .get('/favorites/')
            .then(res => {
                console.log(res.data);
                setCurrent(res.data);
            })
            .catch(err => console.log(err));

        axios
            .get('/users/')
            .then(res => {
                console.log("User Data: ", res.data);
                console.log("Users Favs: ", res.data.user_favorites);
                // setCurrent(res.data.user_favorites);
                setCurrentUser(res.data);
            })
            .catch(err => console.log(err));
    }, []); 

    const getUserFavs = async () => {
        let favoritesArr = await axios.get('/favorites')
    }


    return loggedIn ? (
        <Row>
            {/* {currentUser.user_favorites.length > 0 ? ( */}
            {current.length > 0 ? ( 
                <Col xs={10} md={8} lg={12} className='mt-3 mb-2'>
                { currentUser ? ( 
                    <h3>{currentUser.username}'s Saved Favorites</h3>
                ) : (
                    <h3>Favorites List</h3>
                ) 
                }
                </Col>
            ) : null}

            {/* {currentUser.user_favorites.length > 0 ? ( */}
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
    ) : (
        <Redirect to={{ pathname: '/login'}} />
    )
}
