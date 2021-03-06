import { useState, createContext } from 'react';

const VideoContext = createContext();

const VideoContextProvider = (props) => {

    const [videos, setVideos] = useState([]);

    return (
        <VideoContext.Provider value={{ videos, setVideos }}>
            { props.children }
        </VideoContext.Provider>
    )
}

export default VideoContext;
export { VideoContextProvider };


