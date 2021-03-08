import React from 'react';
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
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    <h3>{video.snippet.title}</h3>
                    <h5>{video.snippet.channelTitle}</h5>
                    <p>{video.snippet.description}</p>
                    </>
                ))) : ( <h3>No Results</h3> )
            }
        </div>
    )
}
