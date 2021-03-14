import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Card } from 'react-bootstrap';

export default function ResultsList(props) {

    console.log(`Results List Props: ${props}`);
    console.log(props);

    return (
        <div>
            <h1>Results List</h1>
            { props.dataSet.length > 0  ? (
                props.dataSet.map(video => (
                    <>
                    <div key={video.id.videoId}>
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <Link to={`/search/${video.id.videoId}`} >
                            <h3>{video.snippet.title}</h3>
                        </Link>
                        <h5>{video.snippet.channelTitle}</h5>
                        <p>{video.snippet.description}</p>
                    </div>
                    </>
                ))) : ( <h3>No Results</h3> )
            }
        </div>
    )
}
