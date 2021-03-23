import React, { useState } from 'react';
import axios from 'axios';

export default function Favorite(props) {
    // console.log(props);

    const [isFavorite, setIsFavorite] = useState(false);

    const addFavorite = async (e) => {
        // console.log(props.video)
        let fav = await axios.post('/favorites/create', props.video);
        console.log(fav);
        setIsFavorite(true);
    }

    const removeFavorite = async (e) => {
        let fav = await axios.delete(`/favorites/${props.video.video_id}`);
        console.log(fav);
        setIsFavorite(false);
    }

    return (
        <div>
            { isFavorite ? 
            <i 
                class="fas fa-bookmark"
                onClick={removeFavorite}
            ></i> : 
            <i 
                class="far fa-bookmark" 
                onClick={addFavorite}
            ></i>}
        </div>
    )
}
