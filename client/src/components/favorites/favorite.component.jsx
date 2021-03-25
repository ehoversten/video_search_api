import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Favorite(props) {
  // console.log(props);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isFavorite = async () => {
      try {
        // let res = await axios.get(`/favorites/${props.video.video_id}`);
        // setIsFavorite(true);
      } catch (err) {
        console.log(err);
      }
    };
    isFavorite();
    return () => {
      //cleanup if needed
    };
  }, []);

  const addFavorite = async (e) => {
    // console.log(props.video)
    let fav = await axios.post('/favorites/create', props.video);
    console.log(fav);
    setIsFavorite(true);
  };

  const removeFavorite = async (e) => {
    let fav = await axios.delete(`/favorites/${props.video.video_id}`);
    console.log(fav);
    setIsFavorite(false);
  };

  return (
    <div className={props.className}>
      {isFavorite ? (
        <i className='fas fa-bookmark' onClick={removeFavorite}></i>
      ) : (
        <i className='far fa-bookmark' onClick={addFavorite}></i>
      )}
    </div>
  );
}
