import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

// -- TESTING -- //
import SearchResultContext from '../../contexts/search-result.context';
import SearchContext from '../../contexts/searchHistoryContext';

// Bootstrap Styles
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//  temp styles
import classes from './search-form.module.css';
function SearchForm(props) {
  const [query, setQuery] = useState('');
  const [apiError, setApiError] = useState('');
  const { searchResults, setSearchResults } = useContext(SearchResultContext);
  const { search, setSearch } = useContext(SearchContext);

  useEffect(() => {
    const getSearchResults = async () => {
      if (search.results && search.keywordSearch) {
        setSearchResults(search.results);
        setQuery(search.keywordSearch);
      }
    };
    getSearchResults();
    return () => {
      //cleanup
    };
  }, [searchResults]);

  async function submit(e) {
    e.preventDefault();
    try {
      let dataPost = await axios.post('/api/', { query }, { headers: { 'content-type': 'application/json' }});
  //    let dataGet = await axios.get(`/api/${query}`, { headers: { 'content-type': 'application/json' }});
    //  console.log("Post Request: ", dataPost);
      console.log("*************************");
      console.log("Get Request: ", dataGet);

      console.log("Data: ", dataPost.data.items);
      setSearchResults(dataPost.data.items);
      props.setData(dataPost.data.items);

      // console.log("Data: ", dataGet.data.items);
      // setSearchResults(dataGet.data.items);
      // props.setData(dataGet.data.items);

      // // console.log(data.data.items);
      // setSearchResults(data.data.items);
      // props.setData(data.data.items);

      setQuery('');
     setSearch({ results: dataPost.data.items, keywordSearch: query });
      // setSearch({ results: dataGet.data.items, keywordSearch: query });
      setApiError('');
    } catch (err) {
      console.log(err.response.data.msg);
      setApiError(err);
    }
  }

  return (
    <Row className={` justify-content-start`}>
      <Col xs={10} md={8} lg={12}>
        <Form
          onSubmit={submit}
          className={` justify-content-start ${classes.formContainer}`}
        >
          {apiError && (
            <h5 className={classes.errorTag}>Error! Try search again</h5>
          )}
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
