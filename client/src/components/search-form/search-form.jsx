import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

// -- TESTING -- //
import VideoContext from '../../contexts/videoContext';
import SearchContext from '../../contexts/searchHistoryContext';

// Bootstrap Styles
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//  temp styles
import classes from './search-form.module.css';
function SearchForm(props) {
  const [query, setQuery] = useState('');
  const { videos, setVideos } = useContext(VideoContext);
  const { search, setSearch } = useContext(SearchContext);

  useEffect(() => {
    const getSearchResults = async () => {
      if (search.results && search.keywordSearch) {
        setVideos(search.results);
        setQuery(search.keywordSearch);
      }
    };
    getSearchResults();
    return () => {
      //cleanup
    };
  }, [search]);
  console.log(videos);
  async function submit(e) {
    e.preventDefault();
    console.log(query);

    let data = await axios.post('/api/', { query });

    // console.log(data.data.items);
    setVideos(data.data.items);
    props.setData(data.data.items);

    setQuery('');
    setSearch({ results: data.data.items, keywordSearch: query });
  }

  return (
    <Row className={` justify-content-start`}>
      <Col xs={10} md={8} lg={12}>
        <Form
          onSubmit={submit}
          className={` justify-content-start ${classes.formContainer}`}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Find a Video</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Video Search'
              name='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Form.Text className='text-muted'>
              Enter a search query to find useful resources
            </Form.Text>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SearchForm;
