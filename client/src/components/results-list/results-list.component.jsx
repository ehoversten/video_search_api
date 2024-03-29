import React from 'react';
// import { Link } from 'react-router-dom';

// Bootstrap Styles
// import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import ResultPreview from '../result-preview/result-preview.component';

export default function ResultsList(props) {
  console.log(`Results List Props: `);
  console.log(props);

  return (
    <Row>
      {props.dataSet.length > 0 ? (
        <Col xs={10} md={8} lg={12} className='mt-3 mb-2'>
          <h3>Results List</h3>
        </Col>
      ) : null}

      {props.dataSet.length > 0 ? (
        props.dataSet.map((video) => (
          <ResultPreview video={video} key={video.id.videoId} />
        ))
      ) : (
        <Col xs={10} md={8} lg={12} className='mt-3'>
          <h3>No Results</h3>
        </Col>
      )}
    </Row>
  );
}

