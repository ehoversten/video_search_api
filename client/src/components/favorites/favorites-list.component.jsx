import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';


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
        <div>
            <h3>Favorites List</h3>
        </div>
    )
}
