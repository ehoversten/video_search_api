import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SearchForm(props) {

    console.log(props);
    const [query, setQuery] = useState('');
    // const [videoData, setVideoData] = useState([])

    async function submit(e) {
        e.preventDefault();
        console.log(query);

        let data = await axios.post('/api/', {query} )

        // console.log(data.data.items);
        props.setData(data.data.items);
        setQuery('');
    }

    return (
        <Form onSubmit={submit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Video Search</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Video Search"
                    name="search"
                    value={query}
                    onChange={ (e) => setQuery(e.target.value) }
                />
                <Form.Text className="text-muted">
                Enter a search query to find useful resources
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
    )
}


export default SearchForm;