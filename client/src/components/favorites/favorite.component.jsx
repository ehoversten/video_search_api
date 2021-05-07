import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Favorite(props) {
  console.log(`props on fav icon ${props}`);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState({});

  useEffect(() => {
    const isFavorite = async () => {
      try {
        let res = await axios.get(`/favorites/find/${props.video.video_id}`);
        setIsFavorite(true);
        setCurrentFavorite(res.data.favorite);
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
    try {
      let res = await axios.post('/favorites/create', props.video);
      console.log(res.data);
      setIsFavorite(true);
      setCurrentFavorite(res.data.favorite);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavorite = async (e) => {
    try {
      let fav = await axios.delete(`/favorites/${currentFavorite._id}`);
      console.log(fav);
      setIsFavorite(false);
      setCurrentFavorite({});
    } catch (err) {
      console.log(err);
    }
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
